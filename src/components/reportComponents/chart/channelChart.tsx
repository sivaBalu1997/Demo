import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./chart.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["Dinein", "Instore", "Kiosk", "Direct Online", "Doordash", "UberEats", "Grubhub"],
  datasets: [
    {
      label: "Sales ($)",
      data: [2700, 2000, 2150, 1400, 900, 2100, 2200],
      backgroundColor: ["#E53935", "#4CAF50", "#E67E22", "#26A69A", "#D32F2F", "#2ECC71", "#F39C12"],
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
        label: (tooltipItem: any) => `Sales: $${tooltipItem.raw.toFixed(2)}`,
      },
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

const ChannelSalesChart = () => {
  return (
    <div className="chart-container">
      <h2>By Channel</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChannelSalesChart;
