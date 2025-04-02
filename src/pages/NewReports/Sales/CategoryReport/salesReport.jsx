import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import BarChartShimmer from "components/reportComponents/Charts/BarChartShimmer";
import ErrorState from "components/reportComponents/errorstatecomponents/ErrorState";
import { useSelector } from "react-redux";
import { getCurrencySymbol } from "utils";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalesChart = ({dataList, loader,isMobile}) => {

  const countryCode = useSelector((state) => state?.newReports?.getDetailsRestaurantSuccess?.country);
  const currencySymbol = useMemo(() => (getCurrencySymbol(countryCode)), [countryCode]);

// const colorList=["#E17100", "#14A789", "#67833E","#FF8C00","#06C167","#EE2637"]

  const channelColorMap = {
    "Pickup": "#E17100",
    "Dinein": "#67833E",
    "Grubhub": "#FF8C00",
    "Doordash": "#EE2637",
    "Delivery": "#14A789",
    "UberEats": "#06C167",
    "Direct Online": "#C9CC3F",
    "Instore": "#00FF7F",
  };

  function transformData(datalist) {
    const categorySet = new Set();
    const channelSet = new Set();
    
    datalist?.forEach(({ categoryName, channelName }) => {
      categorySet.add(categoryName);
      channelSet.add(channelName);
    });
    // console.log(datalist ,"The whole data i")


    const labels = Array.from(categorySet);
    const channels = Array.from(channelSet);

    
    const datasets = channels.map((channel) => {
      return {
        label: channel,
        backgroundColor: channelColorMap[channel] || "#E87C3D",
        data: labels.map((category) => {
          const entry = datalist.find(
            (item) => item.categoryName === category &&item.channelName === channel );
          return entry ? entry?.totalAmount : 0;
        }),
      };
    });


    return { labels, datasets };
    
  }
  


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom",labels: {
        boxWidth: isMobile?10:12, // Set legend box width
        boxHeight:isMobile?10: 12, // Set legend box height
        usePointStyle: true,
        pointStyle: "rectRounded", // Rounded rectangle legend symbol
        font:{
          size:isMobile?10:12
        }
      },  },
      tooltip: {
        // Tooltip style
        backgroundColor: "#fff",
        borderColor: "#FF8C00",
        borderWidth: 1,
        displayColors: false, // Hide color boxes
        titleColor: "#000",
        titleFont: { weight: "normal", size: isMobile?10:14, family: "sans-serif" }, // Title font size set to 14px
        titleMarginBottom: 2,
        bodyFont: { size: isMobile?10:14, family: "sans-serif" }, // Body font size set to 14px
        bodyColor: "#000",
        cornerRadius: 4,
        caretSize: 0,
        // Custom tooltip content
        callbacks: {
          // The title callback returns the x-axis label
          title: (tooltipItems) => {
            if (!tooltipItems.length) return "";
            return `Category: ${tooltipItems[0].label}`;
          },
          // The label callback returns two lines: Channel and Sales
          label: (tooltipItem) => {
            // tooltipItem.label="appetizers"
            // tooltipItem.dataset.label="dineIn"
            // console.log(tooltipItem,"Here is th tooltip item");
            const channel = tooltipItem.dataset.label;
            const value = dataList?.find(data=>data.categoryName==tooltipItem.label&&data.channelName==tooltipItem.dataset.label)?.totalAmount
            return [`Channel: ${channel}`, `Sales: ${currencySymbol}${value?.toFixed(2)}`];
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    datasets: {
      bar: {
        maxBarThickness: 30,
        categoryPercentage: 0.5,
        barPercentage: 0.8,
      },
    },
    scales: {
      x: {
        
        grid:{display:false},
        stacked: true,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
        ticks: {
          display:!isMobile,
          color: "#555",
          font: { size: 14 },
          minRotation: 45,
          maxRotation: 45,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          color: "#555",
          font: { size: 12 },
        },
      },
    },
  };
const data=transformData(dataList)
// console.log("data is loaded from",data)
if(loader) return <BarChartShimmer />

  return dataList?.length === 0 ? (
    <ErrorState pageTitle="Category report" isDataNotAvailable={true} />
  ) : (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesChart;
