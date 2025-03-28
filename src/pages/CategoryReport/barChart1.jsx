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
import BarChartShimmer from "components/reportComponents/Charts/BarChartShimmer";
import ErrorState from "components/reportComponents/errorstatecomponents/ErrorState";
import { useSelector } from "react-redux";
import { getCurrencySymbol } from "utils";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function LinearBarChartCategorySales({ barColorCode, dataList, loader ,isMobile, bottomTitle="" }) {
  const countryCode = useSelector((state) => state?.newReports?.getDetailsRestaurantSuccess?.country);
  const currencySymbol = useMemo(() => (getCurrencySymbol(countryCode)), [countryCode]);
  // console.log(dataList);
  // Prepare the Chart.js data object
  const data = {
    labels: dataList?.map((cat) => cat?.categoryName)||[],
    datasets: [
      {
        label: "Sales",
        data: dataList?.map((cat) => Number(cat?.voidedAmount||0))||[],
        backgroundColor: barColorCode,
        barPercentage: 0.4,    // Thinner bars
        categoryPercentage: 0.6,
      },
    ],
  };

  // Chart.js configuration
  const options = {
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
        borderColor: barColorCode??"#6F6F6F",
        borderWidth: 1,
        titleColor: "#000",
        bodyColor: "#000",
        bodyFont: { size: isMobile?10:14, family: "sans-serif" }, // Body font size set to 14px
        titleFont: { weight: "normal", size: isMobile?10:14, family: "sans-serif" }, // Title font size set to 14px

        cornerRadius: 4,      
        padding: 10, // Padding inside tooltip container
        displayColors: false, // Hide color box in tooltip
        callbacks: {
          // Show the x-axis label in the tooltip title
          title: (tooltipItems) => {
            if (!tooltipItems.length ||!isMobile) return "";
            const { dataIndex } = tooltipItems[0];
            return dataList?.[dataIndex].categoryName;
          },
          // Multi-line body: Qty and Sales
          label: (tooltipItem) => {
            const idx = tooltipItem.dataIndex;
            const cat = dataList?.[idx];
            return [`Qty: ${cat?.voidedQuantity}`, `Sales: ${currencySymbol}${Number(cat?.voidedAmount||0).toFixed(2)}`];
          },
        },

      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display:!isMobile,
          color: "#555",
          font: { size: 14},
          minRotation: 45,
          maxRotation: 45,
        },
         grid: { display: false } 
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#777",
          font: { size: 12 },
          callback: (value) => `${currencySymbol}${value}`,
        },
      },
    },
  };

  if(loader) return <BarChartShimmer />

  return dataList?.length === 0 ? (
    <ErrorState pageTitle="Category report" isDataNotAvailable={true} />
  ) : (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default LinearBarChartCategorySales;
