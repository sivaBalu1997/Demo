import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import "./chart.scss";
import BarChartShimmer from "../Charts/BarChartShimmer";
import ErrorState from "../errorstatecomponents/ErrorState";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface ChartData {
  label: string;
  sales: number;
  qty: number;
}

const ChannelSalesChart = ({ dataList = [], loader }: { dataList: any[], loader: boolean }) => {
  const data = {
    labels: Array.from(
      new Set(dataList?.map((item: any) => item?.channelName))
    ),
    datasets: [
      {
        label: "Sales ($)",
        data: dataList?.map((item: any) => ({
          x: item.channelName, // X-axis label
          y: Number(item.sales || 0), // Y-axis sales value
          orders: item.orders, // Store orders for tooltips
        })),
        backgroundColor: [
          "#E52333",
          "#67833E",
          "#E4601B",
          "#14B292",
          "#EE2637",
          "#06C167",
          "#FF8C00",
        ],
        barPercentage: 0.7, 
        categoryPercentage: 0.6,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItem: any) => {
            return "";
          },
          label: (tooltipItem: any) => {
            const dataPoint = tooltipItem.raw;
            return [
              `Orders: ${dataPoint.orders}`,
              `Sales: $${dataPoint.y.toFixed(2)}`,
            ];
          },
        },
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#333",
        borderColor: "#e76f51",
        displayColors: false,
        borderWidth: 1,
        padding: 10, // Padding inside tooltip container
        titleFont: { weight: "normal", size: 14 }, // Title font size set to 14px
        bodyFont: { size: 14 }, // Body font size set to 14px        displayColors: false,
        caretSize: 0,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (tickValue: string | number) {
            return `$${Number(tickValue) / 1000} K`;
          },
        },
      },
    },
  };

  if (loader) return <BarChartShimmer />

  return  dataList?.length === 0 ? (
    <ErrorState pageTitle="Sales report" isDataNotAvailable={true} />
  ) :( 
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChannelSalesChart;
