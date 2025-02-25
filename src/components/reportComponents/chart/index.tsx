import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./chart.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);




const CardTypeChart = ({dataList}: {dataList: any[]}) => {


const data = {
  labels:  Array.from(new Set(dataList?.map((item:any) => item?.cardName))),
  datasets: [
    {
      label: "Credit card",
      data:  dataList?.filter((item:any) => item?.cardType === "CREDIT")?.map((item:any) => item?.totalSales||0),
      backgroundColor: "#2196F3", // Blue
      barPercentage: 0.7,    // Thinner bars
      categoryPercentage: 0.6,
      // barThickness: 80,
      // minBarLength: 5,
    },
    {
      label: "Debit card",
      data: dataList?.filter((item:any) => item?.cardType === "DEBIT")?.map((item:any) => item?.totalSales||0),
      backgroundColor: "#D98F2B", // Orange
      barPercentage: 0.7,    // Thinner bars
      categoryPercentage: 0.6,
      // barThickness: 80,//TODO: check for larger no of bars
      // minBarLength: 5,
      
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
          return `${tooltipItem?.dataset?.label}: $${tooltipItem?.raw?.toFixed(2) || 0}`;
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

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
      </div>
  );
};

export default CardTypeChart;
