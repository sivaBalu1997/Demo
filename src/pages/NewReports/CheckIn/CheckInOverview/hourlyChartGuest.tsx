import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartOptions } from "chart.js";
import { amPmFormat, titleCase } from "utils";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
interface CheckinData {
  channelName: string | null;
  totalGuests: number;
  checkinHour: string;
}

interface ReportProps {
  dataList: CheckinData[];
  loader: boolean;
}

const HourlyCheckinChartGuest: React.FC<ReportProps> = ({dataList=[], loader=false}) => {
  const channels = Array.from(new Set(dataList?.map((d) => titleCase(d?.channelName||"")).filter(Boolean)));
  const hours=Array.from({ length: 24 }, (_, i) => i.toString())

  const datasets =  channels.map((channel, index) => ({
    label: channel!,
    data: hours.map((hour) =>
      dataList?.filter((d) => d.checkinHour==hour && d.channelName === channel)
        .reduce((sum, item) => sum + item.totalGuests, 0)
    ),
    backgroundColor: [ "#2797FE","#3FE1C0", "#F89B29"][index] // Colors for channels
  }));
  const data = {
    labels:hours ,
    datasets: datasets
  
  };




  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom",
               labels: {
        boxWidth: 12, // Set legend box width
        boxHeight: 12, // Set legend box height
        usePointStyle: true,
        pointStyle: "rectRounded", // Rounded rectangle legend symbol
      }, },
      tooltip: {
        borderColor: (context) => {
          const tooltipItem = context.tooltip.dataPoints[0];
        if (tooltipItem?.dataset?.label === 'MERCHANT') {
            return '#2797FE'; 
          }else if (tooltipItem?.dataset?.label === 'ONLINE') {
            return '#3FE1C0'; 
          }
          return '#F89B29'; // fallback
        },
        backgroundColor: "#fff", // White background
        // borderColor: "#3FE1C0", // Border color
        borderWidth: 1,
        displayColors: false, // Hide dataset color boxes
        titleColor: "#000", // Black title text
        bodyColor: "#000", // Black body text
        cornerRadius: 4,
        caretSize: 0, // Remove tooltip arrow
        caretPadding: 0,
        padding: 10, // Padding inside tooltip container
        titleFont: { weight: "normal", size: 14, family: "Poppins" }, // Title font size set to 14px
        bodyFont: { size: 14, family: "Poppins" }, // Body font size set to 14px
        titleMarginBottom: 0,
        bodySpacing: 0,
        callbacks: {
            title: (tooltipItem: any) => {
              return "";
            },
            label: (tooltipItem: any) => {              
              const dataPoint = tooltipItem.raw;
              return [
                `Reservation Time: ${tooltipItem.label}-${Number(tooltipItem.label)+1} ${amPmFormat(Number(tooltipItem.label)+1)} `,
                `Channel: ${titleCase(tooltipItem?.dataset?.label)}`,
                `Count: ${tooltipItem?.formattedValue||0}`,
                
              ];
            },          
        },
      },
      datalabels: { display: false } as any,
    },
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: { stacked: true },
    },
  } as ChartOptions<"bar">;


  return(
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}


export default HourlyCheckinChartGuest;
