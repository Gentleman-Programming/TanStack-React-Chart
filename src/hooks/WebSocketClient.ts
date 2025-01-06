import { useEffect, useState } from "react";
import { SocketData } from "../models";

export const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<SocketData[]>([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [data, ...prevMessages]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { messages };
};
