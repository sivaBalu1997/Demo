import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./discountChart.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const discountData = {
  labels: ["Student offer", "Customer offer", "Veteran offer", "Other offer"],
  datasets: [
    {
      data: [14, 26, 43, 17], // Percentage values
      backgroundColor: ["#E67E22", "#E91E63", "#26A69A", "#F39C12"],
    },
  ],
};

const voidedOrdersData = {
  labels: ["Closing time", "Spillage", "Order entry error", "Chef not available", "Item not available", "Customer complaints"],
  datasets: [
    {
      data: [20, 8, 9, 18, 25, 20], // Percentage values
      backgroundColor: ["#9B59B6", "#E74C3C", "#F39C12", "#26A69A", "#E67E22", "#2ECC71"],
    },
  ],
};

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

const DiscountAndVoidedOrders = () => {
  return (
    <div className="charts-container">
      <div className="chart-card">
        <h3>By Discount</h3>
        <div className="chart-wrapper">
          <Doughnut data={discountData} options={options} />
          <div className="chart-center">
            <p>Total</p>
            <h2>$1200.50</h2>
          </div>
        </div>
      </div>

      <div className="chart-card">
        <h3>Voided Orders</h3>
        <div className="chart-wrapper">
          <Doughnut data={voidedOrdersData} options={options} />
          <div className="chart-center">
            <p>Total</p>
            <h2>$856.75</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountAndVoidedOrders;
