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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Example data array storing both sales and quantity
const categories = [
  { label: "Dessert",         sales: 520, qty: 24 },
  { label: "Morning Delight", sales: 340, qty: 18 },
  { label: "Accompaniments",  sales: 400, qty: 12 },
  { label: "Appetizers",      sales: 420, qty: 20 },
  { label: "North Indian",    sales: 480, qty: 25 },
  { label: "Beverages",       sales: 300, qty: 10 },
  { label: "House Specials",  sales: 500, qty: 22 },
  { label: "Non veg Soups",   sales: 450, qty: 16 },
  { label: "Dosai Corner",    sales: 280, qty: 15 },
  { label: "North Indian",    sales: 390, qty: 19 },
];

function LinearBarChart({ barColorCode  }) {
  // Prepare the Chart.js data object
  const data = {
    labels: categories.map((cat) => cat.label),
    datasets: [
      {
        label: "Sales",
        data: categories.map((cat) => cat.sales),
        backgroundColor: barColorCode,
        barPercentage: 0.4,    // Thinner bars
        categoryPercentage: 0.6,
      },
    ],
  };

  // Chart.js configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        // Customize tooltip styling
        backgroundColor: "#fff",
        borderColor: barColorCode??"#6F6F6F",
        borderWidth: 1,
        titleColor: "#000",
        bodyColor: "#000",
        cornerRadius: 4,
        displayColors: false, // Hide color box in tooltip
        callbacks: {
          // Show the x-axis label in the tooltip title
          title: (tooltipItems) => {
            if (!tooltipItems.length) return "";
            const { dataIndex } = tooltipItems[0];
            return categories[dataIndex].label;
          },
          // Multi-line body: Qty and Sales
          label: (tooltipItem) => {
            const idx = tooltipItem.dataIndex;
            const cat = categories[idx];
            return [`Qty: ${cat.qty}`, `Sales: $${cat.sales.toFixed(2)}`];
          },
        },

      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#555",
          font: { size: 14 },
          minRotation: 45,
          maxRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#777",
          font: { size: 12 },
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default LinearBarChart;
