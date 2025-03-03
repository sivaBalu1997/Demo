import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import { ChartData } from "chart.js";
import "./chart.scss";
import BarChartShimmer from "../Charts/BarChartShimmer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CardTypeChart = ({
  dataList = [],
  loader,
}: {
  dataList: any[];
  loader: boolean;
}) => {
  const cardNames= Array.from(new Set(dataList?.map((item: any) => item?.cardName)))
  const data = {
    labels: cardNames,
    datasets: [
      {
        label: "Credit card",
        data: cardNames.map((cardName) => {
          const creditCard = dataList.find(
            (item: any) => item?.cardType === "CREDIT" && item?.cardName === cardName
          );
          return creditCard ? Number(creditCard?.totalSales || 0) : 0;
        }),
        backgroundColor: "#2682D9", // Blue
        barPercentage: 0.7,
        categoryPercentage: 0.6,
        // barThickness: 80,
        // minBarLength: 5,
      },
      {
        label: "Debit card",
        data: cardNames.map((cardName) => {
          const creditCard = dataList.find(
            (item: any) => item?.cardType === "DEBIT" && item?.cardName === cardName
          );
          return creditCard ? Number(creditCard?.totalSales || 0) : 0;
        }),
        backgroundColor: "#F89B29", // Orange
        barPercentage: 0.7,
        categoryPercentage: 0.6,

      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
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
          title: (tooltipItems: TooltipItem<"bar">[]) => {
            if (!tooltipItems.length) return "";
            const index = tooltipItems[0].dataIndex;
            const total = data.datasets.reduce((sum, dataset) => {
              return sum + (dataset.data[index] as number);
            }, 0);
            return `${tooltipItems[0].label} - $${total?.toFixed(2)}`;
          },
          label: (tooltipItem: TooltipItem<"bar">) => {
            const index = tooltipItem.dataIndex;
            return data.datasets.map((dataset) => {
              const cardType = dataset.label || "";
              const value = dataset.data[index] as number;
              return `${cardType}:  $${value?.toFixed(2)}`;
            });
          },
        },
      },
      datalabels: { display: false } as any,
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  } as ChartOptions<"bar"> & { plugins: { datalabels?: any } };

  if (loader) return <BarChartShimmer />;

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CardTypeChart;
