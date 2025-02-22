import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./chart.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: [
    "Darlene", "Victoria", "Colleen", "Philip", "Eduardo", "Arlene",
    "Angel", "Courtney", "Dianne", "Marjorie", "Philip", "Eduardo", "Arlene"
  ],
  datasets: [
    {
      label: "Sales ($)",
      data: [210, 160, 260, 90, 220, 180, 140, 230, 210, 260, 140, 170, 210],
      backgroundColor: "#2196F3", // Blue color
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (tooltipItem: any) => {
          return `Sales: $${tooltipItem.raw.toFixed(2)}`;
        },
      },
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true },
  },
};

const EmployeeSalesChart = () => {
  return (
    <div className="chart-container">
      <h2>By Employees</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default EmployeeSalesChart;
