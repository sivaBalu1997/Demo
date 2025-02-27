import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DiscountChart = ({ dataList=[] }: { dataList: any[] }) => {
  // Calculate total sales for percentage calculation
  const totalSales = dataList?.reduce((sum, item) => sum + parseFloat(item?.totalSales), 0);

  // Chart Data
  const data = {
    labels: dataList?.map((item) => item?.offerName?.replace(/([A-Z])/g, " $1").trim()), // Format names
    datasets: [
      {
        data: dataList?.map((item) => parseFloat(item?.totalSales)), // Use sales as data
        backgroundColor: ["#E67E22", "#E74C3C", "#E91E63", "#26A69A", "#3498DB"],
        hoverBackgroundColor: ["#D35400", "#C0392B", "#AD1457", "#00897B", "#2980B9"],
        borderWidth: 0,
      },
    ],
  };

  // Chart Options
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "bottom", // Ensure this is one of "top", "bottom", "left", "right", "chartArea"
        labels: {
          color: "#333",
          font: { size: 14, weight: "bold" },
          boxWidth: 12,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#fff",
        titleColor: "#333",
        titleFont: { weight: "bold", size: 14 },
        bodyColor: "#333",
        borderColor: "#E67E22",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => ` ${tooltipItems[0].label}`,
          label: (tooltipItem) => {
            const item = dataList?.[tooltipItem.dataIndex];
            return [`Orders: ${item?.totalOrders}`, `Sales: $${parseFloat(item?.totalSales)?.toFixed(2)}`];
          },
        },
      },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 14 },
        formatter: (value: number) => `${((value / totalSales) * 100)?.toFixed(0)}%`,
        anchor: "center",
      },
    },
  };
  

  return (
    <div style={{ width: "400px", height: "400px", position: "relative", margin: "0 auto" }}>
      <Doughnut data={data} options={options} />
      {/* Centered Total Sales Text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
        }}
      >
        Total <br /> ${totalSales?.toFixed(2)}
      </div>
    </div>
  );
};

export default DiscountChart;
