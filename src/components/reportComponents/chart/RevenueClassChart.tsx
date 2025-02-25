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

//   {
//     "revenueClass": "Beverages",
//     "itemsSold": 23,
//     "totalSales": "742.00"
// }
  const data = {
    labels:  Array.from(new Set(dataList?.map((item:any) => item?.revenueClass))),
    datasets: [
      {
        label: "Sales",
        data: dataList?.map((item:any) => item?.totalSales||0),
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
          label: (tooltipItem: any) => `Sales: $${tooltipItem.raw || 0}`,
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
