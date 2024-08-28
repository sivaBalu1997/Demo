import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart.js (auto includes all necessary components)
import "./style.scss";

const DoughnutChart = ({ data, options }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Ref to hold the chart instance

  useEffect(() => {
    if (chartRef.current && data && options) {
      if (chartInstance.current) {
        // If chartInstance exists, destroy it
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: options,
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, options]);

  return (
    <div className="doughnut-chart-container">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default DoughnutChart;
