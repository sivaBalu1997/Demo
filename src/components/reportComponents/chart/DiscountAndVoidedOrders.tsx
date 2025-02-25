import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./discountChart.scss";

ChartJS.register(ArcElement, Tooltip, Legend);



const DiscountAndVoidedOrders = ({ dataList }: { dataList: any }) => {
  const data = {
    labels: dataList?.map((item:any) => item?.label)||[],
    datasets: [
      {
        data: dataList?.map((item:any) => item?.percentage)||[],
        backgroundColor: ["#E67E22", "#E91E63", "#26A69A", "#F39C12"], //["#9B59B6", "#E74C3C", "#F39C12", "#26A69A", "#E67E22", "#2ECC71"]
      },
    ],
  };
  // const voidedOrdersData = {
  //   labels:dataList?.map((item:any) => item?.label)||[],
  //   datasets: [
  //     {
  //       data: dataList?.map((item:any) => item?.percentage)||[], // Percentage values
  //       backgroundColor: ,
  //     },
  //   ],
  // };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
    },
  };
  return (
    <div>

    <Doughnut data={data} options={options} />
  </div>

  );
};

export default DiscountAndVoidedOrders;
