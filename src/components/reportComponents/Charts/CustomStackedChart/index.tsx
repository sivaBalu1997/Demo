import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import BarChartShimmer from "components/reportComponents/Charts/BarChartShimmer";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Interface describing each data item
interface DataListItem {
  xAxisData: string; // e.g. "0–15 mins"
  stackName: string; // e.g. "Group of 2"
  stackValue: number; // e.g. 11
}

// Props for the StackedBarChart component
interface StackedBarChartProps {
  dataList?: DataListItem[]; // optional array of items
  loader?: boolean; // shows/hides shimmer if true
  colorList?: string[]; // optional array of colors for each group
  maxBarThickness?: number;
  toolTipBorderColor?: string;
}

// Helper function to transform raw dataList into Chart.js data
function transformData(
  dataList: DataListItem[],
  colorList: string[]
): ChartData<"bar"> {
  const xAxisDataSet = new Set<string>();
  const stackNameSet = new Set<string>();

  dataList.forEach(({ xAxisData, stackName }) => {
    xAxisDataSet.add(xAxisData);
    stackNameSet.add(stackName);
  });

  const labels = Array.from(xAxisDataSet); // x-axis labels
  const stacksNames = Array.from(stackNameSet); // legend groups

  // Build one dataset per group
  const datasets = stacksNames.map((stacksName, index) => ({
    label: stacksName,
    backgroundColor: colorList[index] || "#AAA", // fallback color
    data: labels.map((xAxisLabel) => {
      const entry = dataList.find(
        (item) => item.xAxisData === xAxisLabel && item.stackName === stacksName
      );
      return entry ? entry.stackValue : 0;
    }),
    stack: "combined", // all series stacked together
  }));

  return { labels, datasets };
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  dataList = [],
  loader,
  colorList = [],
  maxBarThickness,
  toolTipBorderColor,
}) => {
  // Show shimmer if loader is true
  if (loader) {
    return <BarChartShimmer />;
  }
  // Predefined color list for each group
  const defaultColorList: string[] = [
    "#0294A5", // e.g. Group of 2
    "#F99D2B", // e.g. Group of 4
    "#14C9C9", // e.g. Group of 6
    "#0FB36A", // e.g. Group of 8
    "#E3313C", // e.g. Group of 8+
  ];
  // Transform data into Chart.js format
  const chartData = transformData(
    dataList,
    colorList.length > 0 ? colorList : defaultColorList
  );

  // Chart configuration with types
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "#555",
          font: { size: 14 },
        },
        grid: { display: false },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          color: "#555",
          font: { size: 12 },
        },
        grid: { color: "#EEE" },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          usePointStyle: true,
          pointStyle: "rectRounded",
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        borderColor: toolTipBorderColor ? toolTipBorderColor : "#FF8C00",
        borderWidth: 1,
        displayColors: false, // Hide color boxes
        titleColor: "#000",
        titleFont: { weight: "normal", size: 14, family: "Poppins" }, // Title font size set to 14px
        titleMarginBottom: 2,
        bodyFont: { size: 14, family: "Poppins" }, // Body font size set to 14px
        bodyColor: "#333",
        cornerRadius: 4,
        padding: 15,
        bodySpacing: 4,

        caretSize: 0,
        callbacks: {
          // Show the x-axis label in the tooltip title
          title: (tooltipItems) => {
            // if (!tooltipItems.length) return "";
            // return tooltipItems[0].label; // e.g. "0–15 mins"
            return "";
          },
          // Show "Group of 2: 11" etc.
          label: (tooltipItem) => {
            const idx = tooltipItem.dataIndex;
            // Return all dataset values at this index.
            const stackValues = chartData.datasets.map((dataset) => {
              const channel = dataset.label;
              const value = dataset.data[idx];
              return `${channel}: ${value}`;
            });
            return stackValues;
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    datasets: {
      bar: {
        categoryPercentage: 0.5,
        barPercentage: 0.8,
      },
    },
  };
  if (options?.datasets?.bar && maxBarThickness) {
    options.datasets.bar.maxBarThickness = maxBarThickness;
  }
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StackedBarChart;
