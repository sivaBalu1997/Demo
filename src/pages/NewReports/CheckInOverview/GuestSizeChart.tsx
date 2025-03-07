import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GuestSizeChart: React.FC = () => {
  const data = {
    labels: ["Group of 2", "Group of 4", "Group of 6", "Group of 8", "Group of 8+"],
    datasets: [
      {
        label: "Guest Count",
        data: [78, 63, 48, 73, 50], // Sample data from the image
        backgroundColor: "rgba(76, 101, 56, 0.8)", // Greenish shade
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Hide legend
      tooltip: {
        callbacks: {
          title: (tooltipItems: any) => `Party: ${tooltipItems[0].label}`,
          label: (tooltipItem: any) => `Count: ${tooltipItem.raw}`,
        },
        backgroundColor: "white",
        titleColor: "#4c6538",
        bodyColor: "black",
        borderColor: "#4c6538",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 15,
        },
      },
    },
  };

  return (
 
      <Bar data={data} options={options} />

  );
};

export default GuestSizeChart;
