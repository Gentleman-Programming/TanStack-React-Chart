import { useEffect, useState } from "react";
import "./App.css";
import { useWebSocket } from "./hooks/WebSocketClient";
import { Trade } from "./models";
import { TradeChart } from "./components/TradeChart";

const App = () => {
  // Initialize WebSocket connection to the specified URL
  const { messages } = useWebSocket("ws://localhost:8080/ws/trades");
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Check if there are any new messages
    if (messages.length > 0) {
      // Extract trade data from messages
      const newTrades = messages.flatMap((messages) => messages.data || []);

      // Update the trades state with the new trade data
      setTrades(newTrades);
    }
  }, [messages]);

  return (
    <div>
      {/* Render the TradeChart component with the current trades */}
      <TradeChart trades={trades} />
    </div>
  );
};

export default App;
