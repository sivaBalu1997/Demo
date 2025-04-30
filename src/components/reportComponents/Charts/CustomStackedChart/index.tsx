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
  kpiTitle?: string;
  dataList?: any[];
  loader?: boolean;
  colorList?: string[];
  maxBarThickness?: number;
  toolTipBorderColor?: string;
  xKey: string;
  stackNameKey: string;
  valueKey: string;
  tenureOrder?: string[];
}

// Helper function to transform raw dataList into Chart.js data

function transformData(
  dataList: any[],
  colorList: string[],
  xKey: string,
  stackNameKey: string,
  valueKey: string,
): ChartData<"bar"> {
  // Calculate totals for sorting
  const itemTotals: Record<string, number> = {};
  dataList.forEach((item) => {
    const xValue = item[xKey];
    const value = Number(item[valueKey]) || 0;
    itemTotals[xValue] = (itemTotals[xValue] || 0) + value;
  });

  // Sort and get top 20 items
  const sortedItems = Object.entries(itemTotals)
    .sort(([, a], [, b]) => b - a)
    .map(([item]) => item);

  const topItems = sortedItems.slice(0, 20);
  const restItems = new Set(sortedItems.slice(20));

  // Get unique stack names
  const stackNameSet = new Set<string>();
  dataList.forEach((item) => stackNameSet.add(item[stackNameKey]));
  const stackNames = Array.from(stackNameSet);

  // Prepare labels including "Others" if needed
  const labels = [...topItems];
  if (restItems.size > 0) {
    labels.push("Others");
  }

  // Build datasets
  const datasets = stackNames.map((stackName, index) => {
    const data: number[] = [];

    // Values for top items
    topItems.forEach((item) => {
      const entry = dataList.find(
        (dataItem) => dataItem[xKey] === item && dataItem[stackNameKey] === stackName
      );
      data.push(entry ? Number(entry[valueKey]) || 0 : 0);
    });

    // Sum values for "Others"
    if (restItems.size > 0) {
      const othersTotal = dataList.reduce((sum, item) => {
        if (item[stackNameKey] === stackName && restItems.has(item[xKey])) {
          return sum + (Number(item[valueKey]) || 0);
        }
        return sum;
      }, 0);
      data.push(othersTotal);
    }

    return {
      label: stackName,
      backgroundColor: colorList[index] || defaultColorList[index] || "#AAA",
      data,
      stack: "combined",
    };
  });

  return { labels, datasets };
}

function transformDataTenure(
  dataList: any[],
  colorList: string[],
  xKey: string,
  stackNameKey: string,
  valueKey: string,
  tenureOrder?: string[] // Add this parameter
): ChartData<"bar"> {
  // Calculate totals for each x-axis category
  const itemTotals: Record<string, number> = {};
  dataList.forEach((item) => {
    const xValue = item[xKey];
    const value = Number(item[valueKey]) || 0;
    itemTotals[xValue] = (itemTotals[xValue] || 0) + value;
  });

  // Determine labels based on whether tenureOrder is provided
  let labels: string[];
  if (tenureOrder) {
    // Use custom order, filtering out items not present in data
    labels = tenureOrder.filter(item => !!itemTotals?.[item] );
  } else {
    // Original sorting logic
    const sortedItems = Object.entries(itemTotals)
      .sort(([, a], [, b]) => b - a)
      .map(([item]) => item);
    labels = sortedItems.slice(0, 20);
  }

  // Rest of the function remains the same
  const stackNameSet = new Set<string>();
  dataList.forEach((item) => stackNameSet.add(item[stackNameKey]));
  const stackNames = Array.from(stackNameSet);

  const datasets = stackNames.map((stackName, index) => {
    const data: number[] = [];
    
    labels.forEach((label) => {
      const entry = dataList.find(
        (dataItem) => dataItem[xKey] === label && dataItem[stackNameKey] === stackName
      );
      data.push(entry ? Number(entry[valueKey]) || 0 : 0);
    });

    return {
      label: stackName,
      backgroundColor: colorList[index] || defaultColorList[index] || "#AAA",
      data,
      stack: "combined",
    };
  });

  return { labels, datasets };
}

const defaultColorList: string[] = [
  "#0294A5", // e.g. Group of 2
  "#F99D2B", // e.g. Group of 4
  "#14C9C9", // e.g. Group of 6
  "#0FB36A", // e.g. Group of 8
  "#E3313C", // e.g. Group of 8+
];

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  kpiTitle="",
  dataList = [],
  loader,
  colorList = [],
  maxBarThickness,
  toolTipBorderColor,
  xKey,
  stackNameKey,
  valueKey,
  tenureOrder = []
}) => {
  
  // Show shimmer if loader is true
  if (loader) {
    return <BarChartShimmer />;
  }

  // Predefined color list for each group

  // Transform data into Chart.js format
  const chartData = !kpiTitle ? transformData(
    dataList,
    colorList.length > 0 ? colorList : defaultColorList,
    xKey,
    stackNameKey,
    valueKey,
  ) : transformDataTenure(
    dataList,
    colorList.length > 0 ? colorList : defaultColorList,
    xKey,
    stackNameKey,
    valueKey,
    tenureOrder
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
