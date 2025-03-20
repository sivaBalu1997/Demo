import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    "Mutton soup",
    "Potato bajji",
    "Fried Idli",
    "Aloo matar",
    // Add other labels
  ],
  datasets: [
    {
      data: [200, 150, 67, 120], // Sample values
      backgroundColor: [
        "#2C7BE5",
        "#F4A261",
        "#8D4F34",
        "#E63946",
        "#2A9D8F",
      ],
      hoverOffset: 4,
    },
  ],
};

const options :any= {
  plugins: {
    tooltip: {
      callbacks: {
        label: function (tooltipItem:any) {
          let value = tooltipItem.raw;
          let total = data.datasets[0].data.reduce((a, b) => a + b, 0);
          let percentage = ((value / total) * 100).toFixed(1);
          return `Items: ${value} (${percentage}%)`;
        },
      },
    },
    legend: {
      position: "bottom",
    },
  },
};

const DoughnutChart = () => {
  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
