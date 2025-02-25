import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./chart.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface EmployeeSalesChartProps {
  dataList: Record<string, any>[];
}

const EmployeeSalesChart: React.FC<EmployeeSalesChartProps> = ({ dataList }) => {
  const data = {
    labels: dataList?.map((item: any) => item?.fullName),
    datasets: [
      {
        label: "Sales ($)",
        data: dataList?.map((item: any) => item?.serviceFee),
        backgroundColor: "#2196F3", // Blue color
        barPercentage: 0.6,    // Thinner bars
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
          label: (tooltipItem: any) => {
            return `Sales: $${tooltipItem?.raw}`;
          },
        },
      },
            datalabels: {
          display: false,
        },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };
  return (
    <div style={{ width: "100%", height: "500px" }}>   
      <Bar data={data} options={options} />
    </div>
  );
};

export default EmployeeSalesChart;
