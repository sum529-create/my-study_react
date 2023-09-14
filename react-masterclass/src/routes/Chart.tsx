import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistory[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000, // 10초 마다 refetch
    }
  );

  return (
    <h1>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "sales",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 1000,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "stepline",
              width: 4,
            },
            yaxis: {
              show: true,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: true },
              //   type: "datetime",
              categories: data?.map((date) => {
                const time = new Date(date.time_close * 1000);
                return time.toLocaleDateString();
              }),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#9c88ff"], stops: [0, 100] },
            },
            colors: ["#4cd137"],
            tooltip: {
              y: {
                formatter: (v) => `$ ${v.toFixed(0)}`, // 소수점 0자리까지
              },
            },
          }}
        />
      )}
    </h1>
  );
}

export default Chart;
