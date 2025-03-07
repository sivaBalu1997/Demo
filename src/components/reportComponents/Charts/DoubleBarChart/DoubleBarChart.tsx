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
  ChartData,
  TooltipItem,
} from "chart.js";
import BarChartShimmer from "components/reportComponents/Charts/BarChartShimmer";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define the structure of a single category
interface ChartCategory {
  categoryName: string;
  weekendMins: number;
  weekdayMins: number;
}

// Define the props for our DoubleBarChart component
interface DoubleBarChartProps {
  dataList?: ChartCategory[];
  loader?: boolean;
}

const DoubleBarChart: React.FC<DoubleBarChartProps> = ({
  dataList = [
    {
      categoryName: "Group of 2",
      weekendMins: 15,
      weekdayMins: 12,
    },
    {
      categoryName: "Group of 4",
      weekendMins: 25,
      weekdayMins: 20,
    },
    {
      categoryName: "Group of 6",
      weekendMins: 35,
      weekdayMins: 28,
    },
    {
      categoryName: "Group of 8",
      weekendMins: 47,
      weekdayMins: 40,
    },
    {
      categoryName: "Group of 8+",
      weekendMins: 55,
      weekdayMins: 48,
    },
  ],
  loader = false,
}) => {
  // Prepare the chart data using the provided dataList.
  const data: ChartData<"bar"> = {
    labels: dataList.map((cat) => cat.categoryName),
    datasets: [
      {
        label: "Weekend",
        data: dataList.map((cat) => Number(cat.weekendMins || 0)),
        backgroundColor: "#AA562A", // Orange/brown
        barPercentage: 0.7,
        categoryPercentage: 0.5,
      },
      {
        label: "Weekdays",
        data: dataList.map((cat) => Number(cat.weekdayMins || 0)),
        backgroundColor: "#F89B29", // Teal
        barPercentage: 0.7,
        categoryPercentage: 0.5,
      },
    ],
  };

  // Configure chart options with proper typings.
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: { size: 14, family: "Poppins" },
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        borderColor: "#CCC",
        borderWidth: 1,
        bodyColor: "#000",
        titleColor: "#000",
        titleFont: { size: 14, weight: "normal", family: "Poppins" },
        bodyFont: { size: 14, family: "Poppins" },
        cornerRadius: 4,
        displayColors: false,
        padding: 10,
        callbacks: {
          title: (tooltipItems: TooltipItem<"bar">[]) => {
            if (!tooltipItems.length) return "";
            return `Party: ${tooltipItems[0].label}`;
          },
          label: (tooltipItem: TooltipItem<"bar">) => {
            const datasetLabel = tooltipItem.dataset.label || "";
            const value = tooltipItem.parsed.y;
            return `${datasetLabel}: ${value} mins`;
          },
        },
      },
      // If you are not using the ChartDataLabels plugin, you can leave it as follows:
      datalabels: { display: false } as any,
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#555",
          font: { size: 14, family: "Poppins" },
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#EEE" },
        ticks: {
          color: "#777",
          font: { size: 12, family: "Poppins" },
          callback: (value) => `${value} mins`,
        },
      },
    },
  };

  if (loader) return <BarChartShimmer />;

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DoubleBarChart;
