import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import BarChartShimmer from "components/reportComponents/Charts/BarChartShimmer";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const colorList = [
  "#0294A5", // Group of 2
  "#F99D2B", // Group of 4
  "#14C9C9", // Group of 6
  "#0FB36A", // Group of 8
  "#E3313C", // Group of 8+
];

function transformData(dataList) {
  // dataList is an array of objects like:
  // {
  //   timeRange: "0–15 mins",
  //   groupName: "Group of 2",
  //   count: 11
  // }
  // We'll build the stacked bar from these fields.

  const timeRangeSet = new Set();
  const groupSet = new Set();

  dataList.forEach(({ timeRange, groupName }) => {
    timeRangeSet.add(timeRange);
    groupSet.add(groupName);
  });

  // Convert to arrays
  const labels = Array.from(timeRangeSet);
  const groups = Array.from(groupSet);

  // Build one dataset per group
  const datasets = groups.map((group, index) => {
    return {
      label: group,
      backgroundColor: colorList[index] || "#AAA", // fallback color
      data: labels.map((range) => {
        const entry = dataList.find(
          (item) => item.timeRange === range && item.groupName === group
        );
        return entry ? entry.count : 0;
      }),
      stack: "combined", // all series stacked together
    };
  });

  return { labels, datasets };
}

const StackedBarChart = ({ dataList = [], loader }) => {
  // Sample data if none is provided:
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

  if (loader) return <BarChartShimmer />;

  const chartData = transformData(dataList);

  // Chart configuration
  const options = {
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
        bodyColor: "#000",
        cornerRadius: 4,
        caretSize: 0,
        callbacks: {
          // Show the x-axis label in the tooltip title
          title: (tooltipItems) => {
            if (!tooltipItems.length) return "";
            return tooltipItems[0].label; // e.g. "0–15 mins"
          },
          // Show "Group of 2: 11" etc.
          label: (tooltipItem) => {
            console.log("Here is the tooltip item for the tooltip group",tooltipItem)
            const datasetLabel = tooltipItem.dataset.label; // e.g. "Group of 2"
            const value = tooltipItem.parsed.y;             // numeric stacked value
            return `${datasetLabel}: ${value}`;
          },
        },
      },
      datalabels:{
        display:false
      }
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
