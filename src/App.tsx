import { useEffect, useState } from "react";
import "./App.css";
import { useWebSocket } from "./hooks/WebSocketClient";
import { Trade } from "./models";
import { TradeChart } from "./components/TradeChart";

const App = () => {
  const { messages } = useWebSocket("ws://localhost:8080/ws/trades");
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    if (messages.length > 0) {
      const newTrades = messages.flatMap((messages) => messages.data || []);

      setTrades(newTrades);
    }
  }, [messages]);

  return (
    <div>
      <TradeChart trades={trades} />
    </div>
  );
};

export default App;
