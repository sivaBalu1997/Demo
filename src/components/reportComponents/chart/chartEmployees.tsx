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
// @ts-ignore
import ChartDataLabels from "chartjs-plugin-datalabels";
import BarChartShimmer from "../Charts/BarChartShimmer";
import ErrorState from "../errorstatecomponents/ErrorState";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface EmployeeSalesChartProps {
  dataList: Record<string, any>[];
  loader: boolean
}

const EmployeeSalesChart: React.FC<EmployeeSalesChartProps> = ({
  dataList = [],
  loader,
}) => {
  const data = {
    labels: Array.from(new Set(dataList?.map((item: any) => item?.fullName))),
    datasets: [
      {
        label: "Sales ($)",
        data: dataList?.map((item: any) => ({
          x: item.fullName, // X-axis label
          y: Number(item.total || 0), // Y-axis sales value
          orders: item.orders, // Store orders for tooltips
        })),
        backgroundColor: "#1F77B4", // Blue color
        barPercentage: 0.6, // Thinner bars
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
        borderColor: "#2196F3",
        titleFont: { weight: "normal", size: 14 }, // Title font size set to 14px
        bodyFont: { size: 14 }, // Body font size set to 14px
        borderWidth: 1,
        padding: 15,
        displayColors: false,
        caretSize: 0,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  if (loader) return <BarChartShimmer />

  return dataList?.length === 0 ? (
      <ErrorState pageTitle="Sales report" isDataNotAvailable={true} />
    ) : (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default EmployeeSalesChart;
