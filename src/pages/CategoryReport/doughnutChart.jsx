import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components and plugins
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// const slices = [
//   {
//     label: "Service delay",
//     value: 22,
//     color: "#0FB36A",
//     items: 125,
//     amount: 87.5,
//   },
//   {
//     label: "Wrong order",
//     value: 13,
//     color: "#F99D2B",
//     items: 55,
//     amount: 45.25,
//   },
//   {
//     label: "Taste issue",
//     value: 21,
//     color: "#B33BB3",
//     items: 78,
//     amount: 60.0,
//   },
//   {
//     label: "Missing item",
//     value: 21,
//     color: "#14C9C9",
//     items: 90,
//     amount: 72.1,
//   },
//   {
//     label: "Extra order",
//     value: 23,
//     color: "#E3313C",
//     items: 100,
//     amount: 80.0,
//   },
// ];

const colorList=["#0FB36A", "#F99D2B", "#B33BB3", "#14C9C9", "#E3313C"]

const totalDisplay = "$1200.50";

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

function DoughnutChart({ dataList }) {
  const data = {
    labels: dataList?.map((slice) => slice?.categoryName),
    datasets: [
      {
        data: dataList?.map((slice) => slice?.value),
        backgroundColor: colorList,
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
              `Total item: ${slice?.items}`,
              `Amount: $${slice?.amount.toFixed(2)}`,
            ];
          }
          return `${value}%`;
        },
        backgroundColor: "#fff",
        borderColor: (context) => colorList[context.dataIndex],
        borderWidth: 2,
        borderRadius: 4,
        padding: 6,
      },
    },
  };

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
