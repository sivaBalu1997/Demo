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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LinearBarChart = ({ barColorCode }) => {
  const data = {
    labels: [
      "Dessert",
      "Morning Delight",
      "Accompaniments",
      "Appetizers",
      "North Indian",
      "Beverages",
      "House Specials",
      "Non veg Soups",
      "Dosai Corner",
      "North Indian",
    ],
    datasets: [
      {
        label: "Sales",
        data: [520, 340, 400, 420, 480, 300, 500, 450, 280, 390],
        backgroundColor: barColorCode,
        borderRadius: 5,
        barPercentage: 0.4, // Adjust this to make bars thinner
        categoryPercentage: 0.6, // Controls spacing
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
          label: (tooltipItem) => `Sales: $${tooltipItem.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#555",
          font: {
            size: 14,
          },
          minRotation: 45, // Minimum rotation (in degrees)
          maxRotation: 45,
        },
      },
      y: {
        ticks: {
          callback: (value) => `$${value}`,
          color: "#777",
          font: { size: 12 },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default LinearBarChart;
