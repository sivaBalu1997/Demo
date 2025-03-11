import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartOptions } from "chart.js";
import { TooltipItem } from "chart.js";
import ErrorState from "components/reportComponents/errorstatecomponents/ErrorState";

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
  const channels = Array.from(new Set(dataList?.map((d) => d?.channelName).filter(Boolean)));
  const hours=Array.from({ length: 24 }, (_, i) => i.toString())

  const datasets = channels.map((channel, index) => ({
    label: channel!,
    data: hours.map((hour) =>
      dataList?.filter((d) => d.checkinHour==hour && d.channelName === channel)
        .reduce((sum, item) => sum + item.totalGuests, 0)
    ),
    backgroundColor: ["#36A2EB", "#4BC0C0", "#FF9F40"][index], // Colors for channels
  }));
  const data = {
    labels:hours ,
    datasets: datasets
    
    
    // [
    //   {
    //     label: "Online",
    //     data: [20, 30, 40, 25, 50, 30, 40, 35, 50, 40, 25, 20, 30, 45, 35, 40, 50, 55, 40, 30, 25, 35, 40, 45],
    //     backgroundColor: "#007bff",
    //     stack: "Stack 0",
    //   },
    //   {
    //     label: "Merchant",
    //     data: [50, 60, 70, 80, 60, 70, 80, 75, 70, 60, 50, 45, 60, 70, 80, 85, 70, 60, 75, 80, 65, 55, 60, 70],
    //     backgroundColor: "#17a2b8",
    //     stack: "Stack 0",
    //   },
    //   {
    //     label: "Kiosk",
    //     data: [40, 50, 45, 55, 40, 50, 60, 55, 65, 70, 50, 40, 55, 65, 70, 75, 80, 85, 70, 60, 50, 55, 60, 65],
    //     backgroundColor: "#f39c12",
    //     stack: "Stack 0",
    //   },
    // ],
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
        backgroundColor: "#fff", // White background
        borderColor: "#E0E0E0", // Border color
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
              console.log({tooltipItem});
              
              const dataPoint = tooltipItem.raw;
              return [
                `Reservation Time: ${tooltipItem.label}-${Number(tooltipItem.label)+1}`,
                `Channel: ${tooltipItem?.dataset?.label}`,
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


  //   data?.length === 0 ? (
  //   <ErrorState pageTitle="Sales report" isDataNotAvailable={true} />
  // ) :( 
  return(
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}


export default HourlyCheckinChartGuest;
