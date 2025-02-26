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

// Sample data
const chartDatas: ChartData[] = [
  { label: "Dinein", sales: 2100, qty: 280 },
  { label: "Instore", sales: 1600, qty: 220 },
  { label: "Kiosk", sales: 2200, qty: 350 },
  { label: "Direct Online", sales: 2100, qty: 12 },
  { label: "Doordash", sales: 2000, qty: 300 },
  { label: "UberEats", sales: 2300, qty: 250 },
  { label: "Grubhub", sales: 2400, qty: 108 },
];

const ChannelSalesChart = ({ dataList }: { dataList: any[] }) => {
  //   {
  //     "channelName": "Dinein",
  //     "orders": 369,
  //     "sales": "42429.03"
  // }
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
          "#E53935",
          "#4CAF50",
          "#E67E22",
          "#26A69A",
          "#D32F2F",
          "#2ECC71",
          "#F39C12",
        ],
        //TODO: check if it changes based on data
        barPercentage: 0.7, // Thinner bars
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
        borderWidth: 1,
        padding: 8,
        displayColors: false,
        caretSize: 0,
      },
      // tooltip: {
      //   callbacks: {
      //     label: (tooltipItem: any) => `Sales: $${tooltipItem.raw.toFixed(2)}`,
      //   },
      // },
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
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChannelSalesChart;
