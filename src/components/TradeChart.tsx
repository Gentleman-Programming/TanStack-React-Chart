import { Trade } from "../models";
import { AxisOptions, Chart } from "react-charts";

interface TradeChartProps {
  trades: Trade[];
}

interface Datum {
  date: Date;
  price: number;
  color: string;
}

export const TradeChart = ({ trades }: TradeChartProps) => {
  const uniqueSymbols = new Set(trades.map((trade) => trade.symbol));

  const data = Array.from(uniqueSymbols).map((symbol) => ({
    label: symbol,
    data: trades
      .map((trade) => ({
        date: new Date(trade.timestamp),
        price: trade.price,
        color: trade.color,
        symbol: trade.symbol,
      }))
      .filter((trade) => trade.symbol === symbol),
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
