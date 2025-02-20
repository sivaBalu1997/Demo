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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalesChart = () => {
  const data = {
    labels: [
      "Dessert",
      "South Indian",
      "Soups",
      "Biryani",
      "North Indian",
      "Dessert",
      "South Indian",
      "Soups",
      "Biryani",
      "North Indian",
    ],
    datasets: [
      {
        label: "Pickup",
        backgroundColor: "#E87C3D",
        data: [100, 120, 150, 170, 140, 130, 160, 180, 190, 175],
      },
      {
        label: "Delivery",
        backgroundColor: "#14C9C9",
        data: [80, 100, 130, 160, 120, 110, 140, 160, 170, 150],
      },
      {
        label: "Dine-in",
        backgroundColor: "#787B4B",
        data: [60, 70, 90, 110, 85, 80, 95, 120, 125, 105],
      },
      {
        label: "Grubhub",
        backgroundColor: "#F99D2B",
        data: [50, 60, 80, 100, 70, 65, 85, 100, 110, 90],
      },
      {
        label: "UberEats",
        backgroundColor: "#0FB36A",
        data: [90, 110, 140, 170, 135, 125, 150, 175, 185, 160],
      },
      {
        label: "Doordash",
        backgroundColor: "#E3313C",
        data: [70, 90, 120, 140, 115, 105, 130, 150, 160, 140],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `$${tooltipItem.raw.toFixed(2)}`,
        },
      },
    },
    datasets: {
      bar: {
        maxBarThickness: 30, // Set maximum bar thickness in pixels
        categoryPercentage: 0.5,
        barPercentage: 0.8,
      },
    },
    scales: {
      x: {
        stacked: true,
        barPercentage: 0.6,
        categoryPercentage: 0.8, // Adjusts spacing between bars
        ticks: {
          color: "#555",
          font: { size: 14 },
          minRotation: 45, // Minimum rotation (in degrees)
          maxRotation: 45,
        },
      },

      y: {
        stacked: true,
        beginAtZero: true,
        ticks: { color: "#555", font: { size: 12 } },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesChart;
