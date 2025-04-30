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
  ChartOptions,
  TooltipItem,
} from "chart.js";
import "./chart.scss";
import BarChartShimmer from "../Charts/BarChartShimmer";
import ErrorState from "../errorstatecomponents/ErrorState";
import { useSelector } from "react-redux";
import { getCurrencySymbol } from "utils";

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
  const countryCode = useSelector(
    (state: any) => state?.newReports?.getDetailsRestaurantSuccess?.country
  );
  const currencySymbol = getCurrencySymbol(countryCode, false);

  const cardNames = Array.from(
    new Set(dataList?.map((item: any) => item?.cardName))
  );
  const data = {
    labels: cardNames,
    datasets: [
      {
        label: "Credit card",
        data: cardNames.map((cardName) => {
          const creditCard = dataList.find(
            (item: any) =>
              item?.cardType === "CREDIT" && item?.cardName === cardName
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
            (item: any) =>
              item?.cardType === "DEBIT" && item?.cardName === cardName
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
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12, // Set legend box width
          boxHeight: 12, // Set legend box height
          usePointStyle: true,
          pointStyle: "rectRounded", // Rounded rectangle legend symbol
        },
      },
      tooltip: {
        // enabled: false, // Disable default tooltip
        // external: (context) => {
        //   let tooltipEl = document.getElementById("chart-tooltip");

        //   // Create tooltip element if it doesn't exist
        //   if (!tooltipEl) {
        //     tooltipEl = document.createElement("div");
        //     tooltipEl.id = "chart-tooltip";
        //     tooltipEl.style.position = "absolute";
        //     tooltipEl.style.background = "rgba(255, 255, 255, 0.9)";
        //     tooltipEl.style.border = "1px solid #E0E0E0";
        //     tooltipEl.style.padding = "8px 12px";
        //     tooltipEl.style.borderRadius = "4px";
        //     tooltipEl.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
        //     tooltipEl.style.pointerEvents = "none";
        //     tooltipEl.style.fontFamily = "Poppins, sans-serif";
        //     tooltipEl.style.zIndex = "9999";
        //     document.body.appendChild(tooltipEl);
        //   }

        //   const tooltipModel = context.tooltip;
        //   if (!tooltipModel || tooltipModel.opacity === 0) {
        //     tooltipEl.style.opacity = "0";
        //     return;
        //   }

        //   const dataset = tooltipModel.dataPoints[0];
        //   const index = dataset.dataIndex;
        //   const label = dataset.label;
        //   const currencyHtml = `<span style="font-weight:bold; font-size:16px; color:#2682D9;">${currencySymbol}</span>`;

        //   let tooltipContent = `<div style="font-size:14px; color:#000; font-weight:bold; margin-bottom:4px;">${label}</div>`;
        //   data.datasets.forEach((dataset) => {
        //     const cardType = dataset.label || "";
        //     const value = dataset.data[index] as number;

        //     tooltipContent += `
        //       <div style="display:flex; align-items:center; font-size:14px; color:#333; margin-bottom:2px;">
        //         <span style="font-family: 'Poppins', sans-serif; font-weight:600;">${cardType}:</span>
        //         <span style="margin-left:4px;">${currencyHtml} ${value.toFixed(2)}</span>
        //       </div>`;
        //   });

        //   tooltipEl.innerHTML = tooltipContent;

        //   // Position the tooltip
        //   const { offsetLeft, offsetTop } = context.chart.canvas;
        //   tooltipEl.style.left = `${offsetLeft + tooltipModel.caretX}px`;
        //   tooltipEl.style.top = `${offsetTop + tooltipModel.caretY - 40}px`;
        //   tooltipEl.style.opacity = "1";
        // },

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
        titleFont: { weight: "normal", size: 14, family: "sans-serif" }, // Title font size set to 14px
        bodyFont: { size: 14, family: "sans-serif" }, // Body font size set to 14px
        titleMarginBottom: 0,
        bodySpacing: 0,
        callbacks: {
          title: (tooltipItems: TooltipItem<"bar">[]) => {
            if (!tooltipItems.length) return "";
            const index = tooltipItems[0].dataIndex;
            const total = data.datasets.reduce((sum, dataset) => {
              return sum + (dataset.data[index] as number);
            }, 0);
            return `${
              tooltipItems[0].label
            } - ${currencySymbol} ${total?.toFixed(2)}`;
          },
          label: (tooltipItem: TooltipItem<"bar">) => {
            const index = tooltipItem.dataIndex;
            return data.datasets.map((dataset) => {
              const cardType = dataset.label || "";
              const value = dataset.data[index] as number;
              return `${cardType}:  ${currencySymbol} ${value?.toFixed(2)}`;
            });
          },
        },
      },
      datalabels: { display: false } as any,
    },
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: { stacked: true },
    },
  } as ChartOptions<"bar"> & { plugins: { datalabels?: any } };

  if (loader) return <BarChartShimmer />;

  return dataList?.length === 0 ? (
    <ErrorState pageTitle="Sales report" isDataNotAvailable={true} />
  ) : (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CardTypeChart;
