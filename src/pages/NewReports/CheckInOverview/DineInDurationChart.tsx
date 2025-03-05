import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DineInDurationChart: React.FC = () => {
  const data = {
    labels: ["Group of 2", "Group of 4", "Group of 6", "Group of 8", "Group of 8+"],
    datasets: [
      {
        label: "Weekend",
        backgroundColor: "#8B4513", // Brown color
        data: [30, 40, 35, 47, 52],
      },
      {
        label: "Weekdays",
        backgroundColor: "#FFA500", // Orange color
        data: [50, 28, 42, 33, 22],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const group = data.labels[context.dataIndex];
            const time = context.raw;
            return `Party: ${group}\nWeekend: ${time} mins`;
          },
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

  return (
      <Bar data={data} options={options} />
  );
};

export default DineInDurationChart;
