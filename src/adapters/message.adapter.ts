import { Trade } from "../models";

const colorMap: { [key: string]: string } = {
  BTC_USDT: "#eb6f92",
  ETH_USDT: "#9ccfd8",
  XRP_USDT: "#c4a7e7",
  ADA_USDT: "#f6c177",
  DOGE_USDT: "#31748f",
};

export const messageAdapter = (message: string): Trade[] => {
  try {
    const parsedData = JSON.parse(message);
    if (
      parsedData &&
      Array.isArray(parsedData.data) &&
      parsedData.data.every(
        (item: Trade) =>
          "symbol" in item && "timestamp" in item && "price" in item,
      )
    ) {
      return parsedData.data.map((trade: Trade) => ({
        ...trade,
        color: colorMap[trade.symbol] || "#000000",
      }));
    }

    console.error("Invalid message format:", message);
    return [];
  } catch (error) {
    console.error("Error parsing message:", error);
    return [];
  }
};
