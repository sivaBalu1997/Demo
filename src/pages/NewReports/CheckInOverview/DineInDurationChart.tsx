import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartOptions } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
interface ReportProps {
  dataList: { day: string; groupSize: number | null; avgDineInDuration: number | null }[];
  loader: boolean;
}
const DineInDurationChart: React.FC <ReportProps>= ({dataList=[], loader=false}) => {

  const uniqueGroupSizes = Array.from(
    new Set(dataList.map((item) => item.groupSize).filter((size) => size !== null))
  ).sort((a, b) => (a as number) - (b as number)) as number[];

  // Format labels dynamically
  const labels = uniqueGroupSizes.map((size) => `Group of ${size}`);

  const weekendData = uniqueGroupSizes.map(
    (size) => dataList.find((d) => d.day === "WEEKEND" && d.groupSize === size)?.avgDineInDuration || 0
  );

  const weekdayData = uniqueGroupSizes.map(
    (size) => dataList.find((d) => d.day === "WEEKDAY" && d.groupSize === size)?.avgDineInDuration || 0
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Weekend",
        backgroundColor: "#8B4513", // Brown color
        data:weekendData,
      },
      {
        label: "Weekdays",
        backgroundColor: "#FFA500", // Orange color
        data: weekdayData,
      },
    ],
  };

  const options:ChartOptions<"bar"> = {
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
              `Party: ${tooltipItem.label}`,
              `Weekend: ${tooltipItem?.formattedValue||0} mins`,
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

  return (
    <div className="dine-in-duration" style={{height: "500px"}}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DineInDurationChart;
