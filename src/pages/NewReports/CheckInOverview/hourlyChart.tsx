import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HourlyCheckinChart: React.FC = () => {
  const data = {
    labels: Array.from({ length: 24 }, (_, i) => i.toString()),
    datasets: [
      {
        label: "Online",
        data: [20, 30, 40, 25, 50, 30, 40, 35, 50, 40, 25, 20, 30, 45, 35, 40, 50, 55, 40, 30, 25, 35, 40, 45],
        backgroundColor: "#007bff",
        stack: "Stack 0",
      },
      {
        label: "Merchant",
        data: [50, 60, 70, 80, 60, 70, 80, 75, 70, 60, 50, 45, 60, 70, 80, 85, 70, 60, 75, 80, 65, 55, 60, 70],
        backgroundColor: "#17a2b8",
        stack: "Stack 0",
      },
      {
        label: "Kiosk",
        data: [40, 50, 45, 55, 40, 50, 60, 55, 65, 70, 50, 40, 55, 65, 70, 75, 80, 85, 70, 60, 50, 55, 60, 65],
        backgroundColor: "#f39c12",
        stack: "Stack 0",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems: any) => `Reservation time: ${tooltipItems[0].label} - ${parseInt(tooltipItems[0].label) + 1} AM`,
          label: (tooltipItem: any) => `Channel: ${tooltipItem.dataset.label}\nCount: ${tooltipItem.raw}`,
        },
      },
      legend: {
        position: "bottom" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
      },
      x: {
        stacked: true,
      },
    },
  };

  return (

      <Bar data={data} options={options} />  );
};

export default HourlyCheckinChart;
