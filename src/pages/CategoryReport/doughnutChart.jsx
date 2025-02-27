import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { amountFormatter, getRandomColor } from "utils";
import DoughnutChartShimmer from "components/reportComponents/Charts/DoughnutChartShimmer";

// Register Chart.js components and plugins
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, Colors );


function DoughnutChart({ dataList=[] ,countryCode, loader}) {

  // categoryName
  // : 
  // null
  // itemName
  // : 
  // "Veg Clear Soup"
  // percent
  // : 
  // "0.200799"
  // voidedAmount
  // : 
  // "6.39"
  // voidedQuantity
  // : 
  // "1"
  // voidedReason
  // : 
  // "ORDER ENTRY ERROR"
const [totalDisplay, setTotalDisplay] = useState("$0.00");


const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart) => {
    const {
      ctx,
      chartArea: { left, right, top, bottom },
    } = chart;
    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000";
    ctx.font = "16px Poppins";
    ctx.fillText("Total", centerX, centerY - 10);
    ctx.font = "24px Poppins";
    ctx.fillText(totalDisplay, centerX, centerY + 15);
    ctx.restore();
  },
};

useEffect(() => {
  if(dataList?.length > 0) {
    const total = dataList?.reduce((sum, slice) => sum + Number(slice?.voidedAmount||0), 0);
    setTotalDisplay(amountFormatter(total, countryCode));
  }
  },[dataList])
  const data = {
    labels: dataList?.map((slice) => slice?.itemName)||[],
    datasets: [
      {
        data: dataList?.map((slice) => Number(slice?.voidedAmount||0))||[],
        backgroundColor: Colors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "80%",
    layout: {
      padding: {
        // bottom: 5, // Adjust this value as needed for extra bottom space
      },
    },
    plugins: {
      tooltip: { enabled: false },
      legend: {
        position: "bottom",
        labels: {
          //   Increase padding so the legend appears further below the chart
          padding: 20,
        },
      },
      datalabels: {
        clip: false,
        display: true,
        color: "#000",
        font: { size: 12, weight: "bold" },
        anchor: "end",
        align: "end",
        offset: -15,
        formatter: (value, context) => {
          const activeElements = context.chart.getActiveElements();
          let isActive = false;
          activeElements.forEach((el) => {
            if (el.index === context.dataIndex) {
              isActive = true;
            }
          });
          if (isActive) {
            const slice = dataList[context.dataIndex];
            return [
              `Total item: ${Number(slice?.voidedQuantity||0)}`,
              `Amount: $${Number(slice?.voidedAmount||0).toFixed(2)}`,
            ];
          }
          return `${value}%`;
        },
        backgroundColor: "#fff",
        borderColor: (context) => Colors[context.dataIndex],
        borderWidth: 2,
        borderRadius: 4,
        padding: 6,
      },
    },
  };

  if(loader) return <DoughnutChartShimmer />

  return (
    <div
      style={{
        width: "100%",
        maxWidth:"550px",
        height: "450px",
        position: "relative",
        overflow: "visible",
        padding: "20px 5px",
        borderRadius: "5px",
        border: "1px solid #E0E0E0",
      }}
    >
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
}

export default DoughnutChart;
