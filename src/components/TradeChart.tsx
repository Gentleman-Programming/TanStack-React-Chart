import { Trade } from "../models";
import { AxisOptions, Chart } from "react-charts";

type TradeChartProps = {
  trades: Trade[];
};

type Datum = {
  date: Date;
  price: number;
};

export const TradeChart = ({ trades }: TradeChartProps) => {
  const colorMap: { [key: string]: string } = {
    BTC_USDT: "#eb6f92",
    ETH_USDT: "#9ccfd8",
    XRP_USDT: "#c4a7e7",
    ADA_USDT: "#f6c177",
    DOGE_USDT: "#31748f",
  };

  const uniqueSymbols = Array.from(
    new Set(trades.map((trade) => trade.symbol)),
  );

  const data = uniqueSymbols.map((symbol) => ({
    label: symbol,
    data: trades
      .filter((trade) => trade.symbol === symbol)
      .map((trade) => ({
        date: new Date(trade.timestamp),
        price: trade.price,
        color: colorMap[symbol] || "#000000",
      })),
  }));

  const primaryAxis: AxisOptions<Datum> = {
    getValue: (datum) => datum.date,
    scaleType: "time",
  };
  const secondaryAxes: AxisOptions<Datum>[] = [
    {
      getValue: (datum) => datum.price,
      scaleType: "linear",
      elementType: "line",
    },
  ];

  if (trades.length === 0) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          getSeriesStyle: (series) => ({
            color: series.originalSeries.data[0].color,
          }),
        }}
      />
    </div>
  );
};
