import { useCallback, useState } from "react";
import "./App.css";
import { useWebSocket } from "./hooks/WebSocketClient";
import { Trade } from "./models";
import { TradeChart } from "./components/TradeChart";

const App = () => {
  const [trades, setTrades] = useState<Trade[]>([]);

  // Handle incoming WebSocket messages
  const handleOnMessage = useCallback((data: any) => {
    setTrades((prevTrades) => [...prevTrades, ...data]);
  }, []);

  // Handle the error, such as displaying a message to the user
  const handleOnError = useCallback((error: Event) => {
    console.error("WebSocket connection error:", error);
  }, []);

  // Handle the connection closure, such as attempting to reconnect
  const handleOnClose = useCallback((event: Event) => {
    console.warn("WebSocket connection closed:", event);
  }, []);

  const { isConnected } = useWebSocket({
    url: "ws://localhost:8080/ws/trades",
    onMessage: handleOnMessage,
    onError: handleOnError,
    onClose: handleOnClose,
  });
  return (
    <div>
      {isConnected ? <span>Conexión activa</span> : <span>Conectando...</span>}
      <TradeChart trades={trades} />
    </div>
  );
};

export default App;
