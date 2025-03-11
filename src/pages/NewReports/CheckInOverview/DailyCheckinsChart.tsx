import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import"./DailyCheckinChart.scss"

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);
interface ReportProps {
  dataList: any[];
  loader: boolean;
}
const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const  DailyCheckinsChart: React.FC<ReportProps>=({dataList=[], loader=false}) =>{
  const data:ChartData<"bar"|"line"> = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: "Check-in",
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data:dataList.map((item) => item.totalCheckins),
      },
      {
        type: 'bar' as const,
        label: "Guest",
        backgroundColor: 'rgb(75, 192, 192)',
        data: dataList.map((item) => item.totalGuests),
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };

    const options:ChartOptions<"bar" |"line"> = {
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
          enabled: true,
          callbacks: {
            title: (tooltipItem: any) => {
              return "";
            },
            label: (tooltipItem: any) => {             
              const dataPoint = tooltipItem.raw;
              return [
                `Day: ${tooltipItem?.label}`,
                `Channel: ${tooltipItem?.dataset?.label}`,
                `Count: ${tooltipItem?.formattedValue||0}`,
              ];
            },
          },
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          titleColor: "#333",
          bodyColor: "#333",
          borderColor: "#e76f51",
          displayColors: false,
          borderWidth: 1,
          padding: 10, // Padding inside tooltip container
          titleFont: { weight: "normal", size: 14 }, // Title font size set to 14px
          bodyFont: { size: 14 }, // Body font size set to 14px        displayColors: false,
          caretSize: 0,
        },
        datalabels: {
          display: false,
        },
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: true,
        },
      },
    };
  return     <div style={{ width: "100%", height: "500px" }}>
        <Chart  className='daily-checkin-chart' style={{ width: "100%", height:"500px" }} type='bar' data={data} options={options} />
      </div>
}

export default DailyCheckinsChart