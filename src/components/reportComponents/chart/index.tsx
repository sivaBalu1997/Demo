import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./chart.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["Amex", "Discover", "Visa", "Master", "RuPay"],
  datasets: [
    {
      label: "Credit card",
      data: [270, 150, 154.5, 100, 130],
      backgroundColor: "#2196F3", // Blue
      barPercentage: 0.7,    // Thinner bars
      categoryPercentage: 0.6,
    },
    {
      label: "Debit card",
      data: [0, 100, 110.5, 110, 140],
      backgroundColor: "#D98F2B", // Orange
      barPercentage: 0.7,    // Thinner bars
      categoryPercentage: 0.6,
      
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom" as const },
    tooltip: {
      callbacks: {
        label: (tooltipItem: any) => {
          return `${tooltipItem.dataset.label}: $${tooltipItem.raw}`;
        },
      },
    },
    datalabels: {
      display: false,
    },
  },
  scales: {
    x: { stacked: true },
    y: { stacked: true },
  },
};




const CardTypeChart = () => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
      </div>
  );
};

export default CardTypeChart;
