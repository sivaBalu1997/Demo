import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import DoughnutChartShimmer from "components/reportComponents/Charts/DoughnutChartShimmer";
import BarChartShimmer from "components/reportComponents/Charts/BarChartShimmer";
import ErrorState from "components/reportComponents/errorstatecomponents/ErrorState";
import { useSelector } from "react-redux";
import { getCurrencySymbol } from "utils";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LinearBarChartProps {
  barColorCode: string;
  dataList: any[];
  loader: boolean;
  isMobile: boolean;
  bottomTitle?:string; 
}

function LinearBarChart({ barColorCode, dataList, loader,isMobile, bottomTitle=""   }: LinearBarChartProps) {
  const countryCode = useSelector((state:any) => state?.newReports?.getDetailsRestaurantSuccess?.country);
  const currencySymbol = useMemo(() => (getCurrencySymbol(countryCode,false)), [countryCode]);
  
  
  // Prepare the Chart.js data object
  const safeDataList = Array.isArray(dataList) ? dataList : [];
  const data = {
    labels: safeDataList?.map((cat) => cat?.categoryName),
    datasets: [
      {
        label: "Sales",
        data: safeDataList?.map((cat) => Number(cat?.totalPrice||0))||[],
        backgroundColor: barColorCode,
        barPercentage: 0.4, // Thinner bars
        categoryPercentage: 0.6,
      },
    ],
  };

  // Chart.js configuration
  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: isMobile,
        text: bottomTitle,
        position: 'bottom',
        padding: {
          top: 10,
          bottom: 10
        },
        font: {
          size: 12,
          family: 'Poppins',
          weight: 500,
        },
        color: '#8D8D8D'
      },
      tooltip: {
        // Customize tooltip styling
        backgroundColor: "#fff",
        borderColor: barColorCode ?? "#6F6F6F",
        caretSize: 0,
        borderWidth: 1,
        titleColor: "#000",
        bodyColor: "#000",
        bodyFont: { size: isMobile?10:14, family: "sans-serif" }, // Body font size set to 14px
        titleFont: { weight: "normal", size: isMobile?10:14, family: "sans-serif" }, // Title font size set to 14px
        titleMarginBottom: 0,
        cornerRadius: 4,
        displayColors: false, // Hide color box in tooltip
        padding: 10, // Padding inside tooltip container
        callbacks: {
          // Show the x-axis label in the tooltip title
          title: (tooltipItems:any) => {
            if (!tooltipItems.length ||!isMobile) return "";
            const { dataIndex } = tooltipItems[0];
            return dataList?.[dataIndex].categoryName;
          },
          // Multi-line body: Qty and Sales
          label: (tooltipItem:any) => {
            const idx = tooltipItem.dataIndex;
            const cat = dataList?.[idx];
            return [`Qty: ${cat?.totalQuantity}`, `Sales: ${currencySymbol}${Number(cat?.totalPrice||0).toFixed(2)}`];
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        grid:{
          display: false,
        },
        ticks: {
           beginAtZero: true,
           autoSkip: false,
          display:!isMobile,
          color: "#555",
          font: { size: 14 },
          minRotation: 45,
          maxRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          autoSkip: false,
          beginAtZero: true,
          color: "#777",
          font: { size: 12 },
          callback: (value:any) => `${currencySymbol}${value}`,
        },
      },
    },
  };

  if(loader) return <BarChartShimmer />

  return !dataList ? (
    <ErrorState pageTitle="Category report" isDataNotAvailable={true} />
  ) : (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default LinearBarChart;