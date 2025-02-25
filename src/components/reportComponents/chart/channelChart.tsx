import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./chart.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const ChannelSalesChart = ({dataList}: {dataList: any[]}) => {
  const data = {
    labels: dataList?.map((item:any) => item?.channelName),
    datasets: [
      {
        label: "Sales ($)",
        data: dataList?.map((item:any) => item?.totalAmount),
        backgroundColor: ["#E53935", "#4CAF50", "#E67E22", "#26A69A", "#D32F2F", "#2ECC71", "#F39C12"],
        //TODO: check if it changes based on data
        barPercentage: 0.7,    // Thinner bars
        categoryPercentage: 0.6,
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
      datalabels: {
        display: false,
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
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChannelSalesChart;
