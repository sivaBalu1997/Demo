// BarChart.js
import React, { useContext, useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./style.scss"; // Import your SCSS for styling
import { ThemeContext } from "../../../context/ThemeContext";

const BarChart = ({
  xAxisData,
  yAxisData,
  label = "Data",
  backgroundColor = "rgba(75, 192, 192, 0.2)", // Default background color
  borderColor = "rgba(75, 192, 192, 1)", // Default border color
  xAxisGridColor = "#283347",
  yAxisGridColor = "#283347",
  xAxisTicksColor = "#fff",
  yAxisTicksColor = "#fff",
  pluginLegendLabelsColor = "#fff",
  ttTitleColor = "#fff", // Corrected typo for consistency
  ttBodyColor = "#fff", // Corrected typo for consistency
  yAxisLabel,
  xAxisLabel,
  BatChartTitle = "",
}) => {
  const chartRef = useRef(null); // Ref to hold the canvas element
  const isDarkTheme = useContext(ThemeContext);

  useEffect(() => {
    // Register necessary components from Chart.js
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend
    );

    const ctx = chartRef.current.getContext("2d"); // Get the context for the canvas
    const chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: xAxisData,
        datasets: [
          {
            label,
            data: yAxisData,
            backgroundColor: Array.isArray(backgroundColor)
              ? backgroundColor
              : [backgroundColor], // Ensure backgroundColor is an array
            borderColor: Array.isArray(borderColor)
              ? borderColor
              : [borderColor], // Ensure borderColor is an array
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: yAxisGridColor,
            },
            ticks: {
              color: yAxisTicksColor,
            },
            title: {
              display: true,
              text: yAxisLabel,
              color: isDarkTheme ? "#fff" : "#000", // Adjust as needed
              font: {
                size: 14, // Adjust as needed
              },
            },
          },
          x: {
            grid: {
              color: xAxisGridColor,
            },
            ticks: {
              color: xAxisTicksColor,
            },
            title: {
              display: true,
              text: xAxisLabel,
              color: isDarkTheme ? "#fff" : "#000", // Adjust as needed
              font: {
                size: 14, // Adjust as needed
              },
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: BatChartTitle,
            color: isDarkTheme ? "#fff" : "#000",
            font: {
              size: "25rem",
              weight: "bold",
            },
          },
          legend: {
            labels: {
              color: pluginLegendLabelsColor,
            },
          },
          tooltip: {
            titleColor: ttTitleColor, // Corrected variable name for tooltip title color
            bodyColor: ttBodyColor, // Corrected variable name for tooltip body color
          },
        },
      },
    });

    return () => {
      chartInstance.destroy(); // Cleanup on unmount
    };
  }, [
    xAxisData,
    yAxisData,
    label,
    backgroundColor,
    borderColor,
    xAxisGridColor,
    yAxisGridColor,
    xAxisTicksColor,
    yAxisTicksColor,
    pluginLegendLabelsColor,
    ttTitleColor,
    ttBodyColor,
    yAxisLabel,
    xAxisLabel,
    BatChartTitle,
    isDarkTheme,
  ]); // Add color dependencies

  return (
    <div
      className={`bar-chart-container ${
        isDarkTheme ? "dark-theme" : "light-theme"
      }`}
    >
      <canvas ref={chartRef}></canvas> {/* Canvas for rendering the chart */}
    </div>
  );
};

export default BarChart;
