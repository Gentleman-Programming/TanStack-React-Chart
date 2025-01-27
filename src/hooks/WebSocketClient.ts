import { useEffect, useRef, useState } from "react";
import { messageAdapter } from "../adapters/message.adapter";
import { Trade } from "../models";

interface WebSocketOptions {
  url: string;
  onMessage: (data: Trade[]) => void;
  onError: (error: Event) => void;
  onClose: (event: CloseEvent) => void;
}

export const useWebSocket = (options: WebSocketOptions) => {
  const { url, onMessage, onError, onClose } = options;
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const adaptedData = messageAdapter(event.data);
      onMessage(adaptedData);
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
      onError(error);
    };

    ws.onclose = (event) => {
      setIsConnected(false);
      onClose(event);
    };

    return () => {
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [url, onMessage, onError, onClose]);

  const sendMessage = (message: string) => {
    if (isConnected && wsRef.current) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected");
    }
  };

  return { isConnected, sendMessage };
};
