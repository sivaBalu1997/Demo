import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import "./RevenueChart.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface RevenueChartProps {
  dataList: Array<{
    [key: string]: any;  
  }> | {
    [key: string]: any;  
  };
}

const RevenueClassChart: React.FC<RevenueChartProps> = ({dataList}) => {
  const dataArray = Array.isArray(dataList) ? dataList : Object.entries(dataList || {}).map(([hour, data]) => ({
    hour,
    ...data
  }));

  const data = {
    labels: dataArray.map((item) => item?.hour) || [],
    datasets: [
      {
        label: "Sales",
        data: dataArray.map((item) => item?.totalAmount || item?.totalSales || 0) || [],
        backgroundColor: "#B8860B",
        borderRadius: 5,
        barPercentage: 0.7,
        categoryPercentage: 0.6,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `Sales: $${tooltipItem.raw?.toFixed(2) || 0}`,
        },
      },
      datalabels: {
        display: false,
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
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RevenueClassChart;
