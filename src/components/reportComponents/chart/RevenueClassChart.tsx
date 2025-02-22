import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import "./RevenueChart.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const data = {
  labels: ["Food", "North Indian", "South Indian", "Soft Drinks", "South Indian", "Soft Drinks"],
  datasets: [
    {
      label: "Sales",
      data: [210, 170, 265, 110, 220, 190],
      backgroundColor: "#B8860B",
      borderRadius: 5,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: (tooltipItem: any) => `Sales: $${tooltipItem.raw.toFixed(2)}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
    },
  },
};

const RevenueClassChart = () => {
  return (
    <div className="chart-container">
      <h3>By Revenue Class</h3>
      <div className="chart-wrapper">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueClassChart;
