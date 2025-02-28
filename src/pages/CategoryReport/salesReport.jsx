import React from "react";
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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalesChart = ({dataList, loader}) => {
const colorList=["#E87C3D", "#14C9C9", "#787B4B","#F99D2B","#0FB36A","#E3313C"]
  function transformData(datalist) {
    const categorySet = new Set();
    const channelSet = new Set();
    
    datalist?.forEach(({ categoryName, channelName }) => {
      categorySet.add(categoryName);
      channelSet.add(channelName);
    });
    console.log(datalist ,"The whole data i")
    const labels = Array.from(categorySet);
    const channels = Array.from(channelSet);
    
    const datasets = channels.map((channel,index) => {
      return {
        label: channel,
        backgroundColor: colorList?.[index]||"#E87C3D",
        data: labels.map((category) => {
          const entry = datalist.find(
            (item) => item.categoryName === category );
          return entry ? entry.totalAmount : 0;
        }),
      };
    });
    
    return { labels, datasets };
  }
  




  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        // Tooltip style
        backgroundColor: "#fff",
        borderColor: "#FF8C00",
        borderWidth: 1,
        displayColors: false, // Hide color boxes
        titleColor: "#000",
        titleFont: { weight: "normal", size: 14, family: "Poppins" }, // Title font size set to 14px
        titleMarginBottom: 2,
        bodyFont: { size: 14, family: "Poppins" }, // Body font size set to 14px
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
            const value = dataList?.find(data=>data.categoryName==tooltipItem.label&&data.channelName==tooltipItem.dataset.label).totalAmount
            return [`Channel: ${channel}`, `Sales: $${value.toFixed(2)}`];
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
        stacked: true,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
        ticks: {
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

if(loader) return <BarChartShimmer />

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesChart;
