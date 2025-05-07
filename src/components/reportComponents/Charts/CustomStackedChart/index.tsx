import React, { useMemo, useRef } from "react";
import { Bar, getElementsAtEvent } from "react-chartjs-2";
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
  showLabelInToolTip?:boolean;
}

// Helper function to transform raw dataList into Chart.js data

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
  tenureOrder = [],
  showLabelInToolTip=true
}) => {
  const [hiddenDatasets, setHiddenDatasets] = React.useState<string[]>([]);
  const chartData = useMemo(() => {
    return !kpiTitle
      ? transformData(
        dataList,
        colorList.length > 0 ? colorList : defaultColorList,
        xKey,
        stackNameKey,
        valueKey,
        hiddenDatasets
      )
      : transformDataTenure(
        dataList,
        colorList.length > 0 ? colorList : defaultColorList,
        xKey,
        stackNameKey,
        valueKey,
        tenureOrder,
        hiddenDatasets
      );
  }, [dataList, hiddenDatasets]);
  // Show shimmer if loader is true
  if (loader) {
    return <BarChartShimmer />;
  }

  // Predefined color list for each group
  function transformData(
    dataList: any[],
    colorList: string[],
    xKey: string,
    stackNameKey: string,
    valueKey: string,
    hiddenDatasets: string[] 
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
    const rawDatasets = stackNames.map((stackName, index) => {
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
        hidden: hiddenDatasets.includes(stackName)
      };
    });

    const visibleLabelIndices = labels.reduce<number[]>((indices, label, idx) => {
      const sum = rawDatasets.reduce((acc, dataset) => {
        if (hiddenDatasets.includes(dataset.label)) return acc;
        return acc + (Number(dataset.data[idx]) || 0);
      }, 0);
      if (sum > 0) indices.push(idx);
      return indices;
    }, []);

    const filteredLabels = visibleLabelIndices.map(i => labels[i]);
    const filteredDatasets = rawDatasets.map(dataset => ({
      ...dataset,
      data: visibleLabelIndices.map(i => dataset.data[i])
    }));

    return { labels: filteredLabels, datasets: filteredDatasets };
  }

  function transformDataTenure(
    dataList: any[],
    colorList: string[],
    xKey: string,
    stackNameKey: string,
    valueKey: string,
    tenureOrder: string[]=[], // Add this parameter
   hiddenDatasets: string[] 
  ): ChartData<"bar"> {

    if (tenureOrder) {
      const firstItem = tenureOrder[0];
      const lastItem = tenureOrder[tenureOrder.length - 1];

      dataList = dataList.map(item => {
        const original = item[xKey];
        if (original === firstItem || original === lastItem) {
          return item;
        }

        // Replace xKey value to match transformed label
        return {
          ...item,
          [xKey]: `1-${original}`
        };
      });
    }

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
      labels = tenureOrder.filter(item => !!itemTotals?.[item]);
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

    const rawDatasets = stackNames.map((stackName, index) => {
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
        hidden: hiddenDatasets.includes(stackName)
      };
    });

    const visibleLabelIndices = labels.reduce<number[]>((indices, label, idx) => {
      const sum = rawDatasets.reduce((acc, dataset) => {
        if (hiddenDatasets.includes(dataset.label)) return acc;
        return acc + (Number(dataset.data[idx]) || 0);
      }, 0);
      if (sum > 0) indices.push(idx);
      return indices;
    }, []);

    const filteredLabels = visibleLabelIndices.map(i => labels[i]);
    const filteredDatasets = rawDatasets.map(dataset => ({
      ...dataset,
      data: visibleLabelIndices.map(i => dataset.data[i])
    }));

    return { labels: filteredLabels, datasets: filteredDatasets };
  }

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
          callback: function (value) {
            const label = this.getLabelForValue(value as number);
            return label.length > 15 ? label.substring(0, 15) + '…' : label;
          },
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
        onClick: (e, legendItem, legend) => {
          const label = legendItem.text;          
          setHiddenDatasets(prev =>
            prev.includes(label)
              ? prev.filter(d => d !== label)
              : [...prev, label]
          );

        }
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
            return showLabelInToolTip?tooltipItems[0].label:""; // e.g. "0–15 mins"            
          },
          // Show "Group of 2: 11" etc.
          label: (tooltipItem) => {
            const idx = tooltipItem.dataIndex;          
            // Return all dataset values at this index.
            const stackValues = chartData.datasets?.filter((dataset:any) => !!dataset.data[idx] && !hiddenDatasets?.includes(dataset.label))?.map((dataset) => {
              const channel = dataset.label; 
              const value = dataset.data[idx];
              return `${channel}: ${value}`;
            })
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
