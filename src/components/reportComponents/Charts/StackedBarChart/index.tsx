import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import BarChartShimmer from "components/reportComponents/Charts/BarChartShimmer";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Interface describing each data item
interface DataListItem {
  timeRange: string; // e.g. "0–15 mins"
  groupName: string; // e.g. "Group of 2"
  count: number; // e.g. 11
}

// Props for the StackedBarChart component
interface StackedBarChartProps {
  dataList?: DataListItem[]; // optional array of items
  loader?: boolean; // shows/hides shimmer if true
}

// Predefined color list for each group
const colorList: string[] = [
  "#0294A5", // e.g. Group of 2
  "#F99D2B", // e.g. Group of 4
  "#14C9C9", // e.g. Group of 6
  "#0FB36A", // e.g. Group of 8
  "#E3313C", // e.g. Group of 8+
];

// Helper function to transform raw dataList into Chart.js data
function transformData(dataList: DataListItem[]): ChartData<"bar"> {
  // Collect all distinct timeRanges and groupNames
  const timeRangeSet = new Set<string>();
  const groupSet = new Set<string>();

  dataList.forEach(({ timeRange, groupName }) => {
    timeRangeSet.add(timeRange);
    groupSet.add(groupName);
  });

  const labels = Array.from(timeRangeSet); // x-axis labels
  const groups = Array.from(groupSet); // legend groups

  // Build one dataset per group
  const datasets = groups.map((group, index) => ({
    label: group,
    backgroundColor: colorList[index] || "#AAA", // fallback color
    data: labels.map((range) => {
      const entry = dataList.find(
        (item) => item.timeRange === range && item.groupName === group
      );
      return entry ? entry.count : 0;
    }),
    stack: "combined", // all series stacked together
  }));

  return { labels, datasets };
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  dataList = [],
  loader,
}) => {
  // Provide default sample data if none is passed
  if (dataList.length === 0) {
    dataList = [
      { timeRange: "0–15 mins", groupName: "Group of 2", count: 11 },
      { timeRange: "0–15 mins", groupName: "Group of 4", count: 6 },
      { timeRange: "0–15 mins", groupName: "Group of 6", count: 5 },
      { timeRange: "0–15 mins", groupName: "Group of 8", count: 10 },
      { timeRange: "0–15 mins", groupName: "Group of 8+", count: 9 },

      { timeRange: "15–30 mins", groupName: "Group of 2", count: 8 },
      { timeRange: "15–30 mins", groupName: "Group of 4", count: 5 },
      { timeRange: "15–30 mins", groupName: "Group of 6", count: 4 },
      { timeRange: "15–30 mins", groupName: "Group of 8", count: 7 },
      { timeRange: "15–30 mins", groupName: "Group of 8+", count: 6 },

      { timeRange: "30–45 mins", groupName: "Group of 2", count: 6 },
      { timeRange: "30–45 mins", groupName: "Group of 4", count: 3 },
      { timeRange: "30–45 mins", groupName: "Group of 6", count: 5 },
      { timeRange: "30–45 mins", groupName: "Group of 8", count: 8 },
      { timeRange: "30–45 mins", groupName: "Group of 8+", count: 4 },

      { timeRange: "45–60 mins", groupName: "Group of 2", count: 6 },
      { timeRange: "45–60 mins", groupName: "Group of 4", count: 8 },
      { timeRange: "45–60 mins", groupName: "Group of 6", count: 4 },
      { timeRange: "45–60 mins", groupName: "Group of 8", count: 10 },
      { timeRange: "45–60 mins", groupName: "Group of 8+", count: 5 },

      { timeRange: "60+ mins", groupName: "Group of 2", count: 5 },
      { timeRange: "60+ mins", groupName: "Group of 4", count: 6 },
      { timeRange: "60+ mins", groupName: "Group of 6", count: 7 },
      { timeRange: "60+ mins", groupName: "Group of 8", count: 12 },
      { timeRange: "60+ mins", groupName: "Group of 8+", count: 9 },
    ];
  }

  // Show shimmer if loader is true
  if (loader) {
    return <BarChartShimmer />;
  }

  // Transform data into Chart.js format
  const chartData = transformData(dataList);

  // Chart configuration with types
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "#555",
          font: { size: 14 },
        },
        grid: { display: false },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          color: "#555",
          font: { size: 12 },
        },
        grid: { color: "#EEE" },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          usePointStyle: true,
          pointStyle: "rectRounded",
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        borderColor: "#FF8C00",
        borderWidth: 1,
        displayColors: false, // Hide color boxes
        titleColor: "#000",
        titleFont: { weight: "normal", size: 14, family: "Poppins" }, // Title font size set to 14px
        titleMarginBottom: 2,
        bodyFont: { size: 14, family: "Poppins" }, // Body font size set to 14px
        bodyColor: "#333",
        cornerRadius: 4,
        padding: 15,
        bodySpacing: 4,

        caretSize: 0,
        callbacks: {
          // Show the x-axis label in the tooltip title
          title: (tooltipItems) => {
            // if (!tooltipItems.length) return "";
            // return tooltipItems[0].label; // e.g. "0–15 mins"
            return "";
          },
          // Show "Group of 2: 11" etc.
          label: (tooltipItem) => {
            const idx = tooltipItem.dataIndex;
            // Return all dataset values at this index.
            const stackValues = chartData.datasets.map((dataset) => {
              const channel = dataset.label;
              const value = dataset.data[idx];
              return `${channel}: ${value}`;
            });
            return stackValues;
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    datasets: {
      bar: {
        maxBarThickness: 30,
        categoryPercentage: 0.5,
        barPercentage: 0.8,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StackedBarChart;
