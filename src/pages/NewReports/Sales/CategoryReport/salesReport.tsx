import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import BarChartShimmer from "components/reportComponents/Charts/BarChartShimmer";
import ErrorState from "components/reportComponents/errorstatecomponents/ErrorState";
import { useSelector } from "react-redux";
import { getCurrencySymbol } from "utils";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface SalesChartProps {
  dataList: {
    categoryName: string;
    channelName: string;
    totalAmount: number;
  }[];
  loader: boolean;
  isMobile: boolean;
  bottomTitle?: string;
}

interface RootState {
  newReports?: {
    getDetailsRestaurantSuccess?: {
      country?: string;
    };
  };
}

const channelColorMap: Record<string, string> = {
  Pickup: "#E17100",
  Grubhub: "#FF8C00",
  Swiggy: "#FF5200",
  Zomato: "#EF4F5F",
  Doordash: "#EE2637",
  "Uber eats": "#06C167",
  GloriaFood: "#735557",
  Dinein: "#67833E",
  Delivery: "#14A789",
  "delivery": "#14A789",
  "Direct Online": "#C9CC3F",
  Instore: "#00FF7F",
};

const SalesChart: React.FC<SalesChartProps> = ({
  dataList,
  loader,
  isMobile,
  bottomTitle = "",
}) => {
  const countryCode:string = useSelector(
    (state: RootState) =>
      state?.newReports?.getDetailsRestaurantSuccess?.country
  )!;

  const currencySymbol = useMemo(() => getCurrencySymbol(countryCode), [countryCode]);

  function transformData(datalist: SalesChartProps["dataList"]) {
    const categoryTotals: Record<string, number> = {};
  
    // Step 1: Total sales per category
    datalist?.forEach(({ categoryName, totalAmount }) => {
      categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + totalAmount;
    });
  
    // Step 2: Sort and select top 20 categories
    const sortedCategories = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)
      .map(([category]) => category);
  
    const topCategories = sortedCategories.slice(0, 20);
    const restCategories = new Set(sortedCategories.slice(20));
  
    const labels = [...topCategories];
    if (restCategories.size > 0) {
      labels.push("Others");
    }
  
    // Step 3: Get all channels
    const channelSet = new Set<string>();
    datalist?.forEach(({ channelName }) => channelSet.add(channelName));
    const channels = Array.from(channelSet);
  
    // Step 4: Prepare datasets
    const datasets = channels.map((channel) => {
      const data: number[] = [];
  
      // Values for top categories
      topCategories?.forEach((category) => {
        const entry = datalist.find(
          (item) => item.categoryName === category && item.channelName === channel
        );
        data.push(entry ? entry.totalAmount : 0);
      });
  
      // Sum values for rest ("Others")
      let othersTotal = 0;
      datalist?.forEach((item) => {
        if (item.channelName === channel && restCategories.has(item.categoryName)) {
          othersTotal += item.totalAmount;
        }
      });
      if (restCategories.size > 0) {
        data.push(othersTotal);
      }
  
      return {
        label: channel,
        backgroundColor: channelColorMap[channel] || "#E87C3D",
        data,
      };
    });
  
    return { labels, datasets };
  }
  
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: isMobile ? 10 : 12,
          boxHeight: isMobile ? 10 : 12,
          usePointStyle: true,
          pointStyle: "rectRounded",
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      title: {
        display: isMobile,
        text: bottomTitle,
        position: "bottom",
        padding: { top: 10, bottom: 10 },
        font: {
          size: 12,
          family: "Poppins",
          weight: 500,
        },
        color: "#8D8D8D",
      },
      tooltip: {
        backgroundColor: "#fff",
        borderColor: "#FF8C00",
        borderWidth: 1,
        displayColors: false,
        titleColor: "#000",
        titleFont: {
          weight: "normal",
          size: isMobile ? 10 : 14,
          family: "sans-serif",
        },
        titleMarginBottom: 2,
        bodyFont: {
          size: isMobile ? 10 : 14,
          family: "sans-serif",
        },
        bodyColor: "#000",
        cornerRadius: 4,
        caretSize: 0,
        callbacks: {
          title: (tooltipItems) => {
            if (!tooltipItems.length) return "";
            return `Category: ${tooltipItems[0].label}`;
          },
          label: (tooltipItem) => {
            const channel = tooltipItem.dataset.label as string;
            const category = tooltipItem.label;
          
            let value = 0;
            if (category === "Others") {
              value = dataList
                .filter(
                  (data) =>
                    !dataList
                      .map((d) => d.categoryName)
                      .slice(0, 20)
                      .includes(data.categoryName) &&
                    data.channelName === channel
                )
                .reduce((acc, curr) => acc + curr.totalAmount, 0);
            } else {
              value =
                dataList.find(
                  (data) =>
                    data.categoryName === category && data.channelName === channel
                )?.totalAmount || 0;
            }
          
            return [`Channel: ${channel}`, `Sales: ${currencySymbol}${value.toFixed(2)}`];
          },
          
        },
      },
      datalabels: {
        display: false,
      },
    },
    datasets: {
      bar: {
        maxBarThickness: 30,
        categoryPercentage: 0.5,
        barPercentage: 0.8,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: {
          display: !isMobile,
          color: "#555",
          font: { size: 14 },
          minRotation: 45,
          maxRotation: 45,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          color: "#555",
          font: { size: 12 },
        },
      },
    },
  };


  const data=transformData(dataList)
  if (loader) return <BarChartShimmer />;

  return dataList?.length === 0 ? (
    <ErrorState pageTitle="Category report" isDataNotAvailable={true} />
  ) : (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesChart;
