import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Chart,
} from "chart.js";
import type { ChartJSOrUndefined } from "react-chartjs-2/dist/types";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Interface for our custom Intersection plugin
interface IntersectionPlugin {
  id: string;
  beforeDatasetsDraw: (chart: Chart) => void;
  afterDatasetsDraw: (chart: Chart) => void;
}

// Define dataset types that can be used in our chart
type DatasetType = "bar" | "line";

// Define our dataset interface with proper typing
interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  type?: DatasetType;
  barPercentage?: number;
  categoryPercentage?: number;
  yAxisID?: string;
  order?: number;
  fill?: boolean;
  borderWidth?: number;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  showLine?: boolean;
  pointHoverRadius?: number;
}

// Define the chart data structure
interface ChartDataStructure {
  labels: string[];
  datasets: ChartDataset[];
}

const BarChartWithLine: React.FC = () => {
  // Fix the ref type to match what react-chartjs-2 expects
  const chartRef = useRef<ChartJSOrUndefined<"bar">>(null);

  // Example data for days (x-axis)
  const labels: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // The bar dataset (blue) for "Guest"
  // The line dataset (orange) for "Check-in"
  const data: ChartDataStructure = {
    labels,
    datasets: [
      {
        label: "Guest",
        data: [100, 120, 110, 90, 130, 150, 180],
        backgroundColor: "#0284C7",
        borderColor: "#0284C7",
        type: "bar",
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        yAxisID: "y",
        order: 1, // Lower number means this dataset renders first
      },
      {
        label: "Check-in",
        data: [40, 50, 45, 55, 60, 80, 90],
        backgroundColor: "#F97316",
        borderColor: "#F89B29",
        type: "line",
        fill: false,
        yAxisID: "y",
        order: 0, // Higher number renders on top
        borderWidth: 3,
      },
      // Hidden dataset to handle intersection tooltips
      {
        label: "Intersection",
        // Will be populated by plugin
        data: Array(labels.length).fill(null),
        backgroundColor: "transparent",
        borderColor: "transparent",
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
        type: "line",
        showLine: false,
        pointHoverRadius: 0,
        yAxisID: "y",
        order: -1, // Highest order to ensure it gets events first
      },
    ],
  };

  // Plugin to create cutouts and handle intersection points
  const intersectionPlugin: IntersectionPlugin = {
    id: "intersectionsPlugin",
    beforeDatasetsDraw: (chart) => {
      const barData = chart.data.datasets[0].data as number[];
      const lineData = chart.data.datasets[1].data as number[];
      const intersectionData: (number | null)[] = Array(barData.length).fill(
        null
      );

      // Calculate intersection points and update hidden dataset
      for (let i = 0; i < barData.length; i++) {
        if (lineData[i] <= barData[i]) {
          intersectionData[i] = lineData[i];
        }
      }

      // Update the third dataset with intersection points
      chart.data.datasets[2].data = intersectionData;
    },
    afterDatasetsDraw: (chart) => {
      const ctx = chart.ctx;
      const barDataset = chart.data.datasets[0];
      const lineDataset = chart.data.datasets[1];

      const barData = barDataset.data as number[];
      const lineData = lineDataset.data as number[];

      // Only proceed if both datasets are present
      if (!barData || !lineData) return;

      // For each data point
      for (let i = 0; i < barData.length; i++) {
        const barValue = barData[i];
        const lineValue = lineData[i];

        // Check if the line value is less than or equal to the bar value
        if (lineValue <= barValue) {
          // Get the bar's meta data
          const barMeta = chart.getDatasetMeta(0).data[i];
          const xPos = barMeta.x;

          // Get the y position based on line value
          const yScale = chart.scales.y;
          const yPos = yScale.getPixelForValue(lineValue);

          // Create cutout in the bar
          ctx.save();
          ctx.globalCompositeOperation = "destination-out";

          // Draw white circle cutout
          const cutoutRadius = 9; // Slightly larger than the point
          ctx.beginPath();
          ctx.arc(xPos, yPos, cutoutRadius, 0, 2 * Math.PI);
          ctx.fillStyle = "white";
          ctx.fill();
          ctx.restore();

          // Draw intersection point without border
          ctx.save();
          ctx.beginPath();
          ctx.arc(xPos, yPos, 6, 0, 2 * Math.PI);
          ctx.fillStyle = "#F89B29"; // Red
          ctx.fill();
          ctx.closePath();
          ctx.restore();

          // Update the hidden dataset point for tooltip detection
          const intersectionMeta = chart.getDatasetMeta(2);
          if (intersectionMeta.data[i]) {
            intersectionMeta.data[i].x = xPos;
            intersectionMeta.data[i].y = yPos;
          }
        }
      }
    },
  };

  // Chart.js configuration
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 14, family: "Poppins" },
          padding: 20,
          filter: function (legendItem) {
            // Hide the "Intersection" dataset from the legend
            return legendItem.text !== "Intersection";
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: true,
        backgroundColor: "#fff",
        borderColor: "#CCC",
        borderWidth: 1,
        cornerRadius: 4,
        displayColors: false,
        titleColor: "#000",
        bodyColor: "#000",
        titleFont: { size: 14, weight: "normal", family: "Poppins" },
        bodyFont: { size: 14, family: "Poppins" },
        padding: 10,
        callbacks: {
          title: (tooltipItems) => {
            if (!tooltipItems.length) return "";
            const dayLabel = tooltipItems[0].label;
            return `Day: ${dayLabel}`;
          },
          label: (tooltipItem) => {
            const datasetLabel = tooltipItem.dataset.label || "";
            const value = tooltipItem.parsed.y;

            // Special handling for intersection points
            if (datasetLabel === "Intersection" && value !== null) {
              return [
                `Intersection Point`,
                `Value: ${value}`,
                `Guest: ${
                  (tooltipItem.chart.data.datasets[0].data as number[])[
                    tooltipItem.dataIndex
                  ]
                }`,
                `Check-in: ${value}`,
              ];
            }

            return [`Channel: ${datasetLabel}`, `Count: ${value}`];
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#777",
          font: { size: 12, family: "Poppins" },
        },
        grid: { color: "#eee" },
      },
      x: {
        ticks: {
          color: "#555",
          font: { size: 14, family: "Poppins" },
        },
        grid: { display: false },
      },
    },
    elements: {
      point: {
        hitRadius: 10,
      },
    },
    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
    interaction: {
      mode: "nearest",
      intersect: true,
    },
    animation: {
      duration: 1000,
    },
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar
        ref={chartRef}
        data={data as ChartData<"bar">}
        options={options}
        plugins={[intersectionPlugin]}
      />
    </div>
  );
};

export default BarChartWithLine;
