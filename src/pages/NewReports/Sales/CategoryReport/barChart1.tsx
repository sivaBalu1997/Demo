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
} from "chart.js";
import BarChartShimmer from "components/reportComponents/Charts/BarChartShimmer";
import ErrorState from "components/reportComponents/errorstatecomponents/ErrorState";
import { useSelector } from "react-redux";
import { getCurrencySymbol } from "utils";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
interface ExtraKey {
  key: string;
  label: string;
}

interface DataItem {
  [key: string]: any; // You can replace this with specific keys if your data is strongly typed
}

interface LinearBarChartCategorySalesProps {
  barColorCode?: string;
  dataList: DataItem[];
  loader?: boolean;
  isMobile?: boolean;
  bottomTitle?: string;
}

function LinearBarChartCategorySales({ barColorCode, dataList = [], loader, isMobile, bottomTitle = "" }: LinearBarChartCategorySalesProps) {
  const countryCode = useSelector((state: any) => state?.newReports?.getDetailsRestaurantSuccess?.country);
  const currencySymbol = useMemo(() => (getCurrencySymbol(countryCode)), [countryCode]);
  // console.log(dataList);
  const processedData: any = useMemo(() => {
    const sorted = [...dataList].sort((a: any, b: any) => Number(b.voidedAmount || 0) - Number(a.voidedAmount || 0));

    const top20 = sorted.slice(0, 20);
    const rest = sorted.slice(20);

    const formattedData = [
      ...top20.map((item: any) => ({
        x: item.categoryName,
        y: Number(item.voidedAmount || 0),
        voidedQuantity: item.voidedQuantity,
      })),

    ];
    if (rest.length) {
      const otherTotal = rest.reduce((acc: number, item: any) => acc + Number(item.voidedAmount || 0), 0);
      const otherTotalQuantity = rest.reduce((acc: number, item: any) => acc + Number(item.voidedQuantity || 0), 0);
      formattedData.push({
        x: "Others",
        y: otherTotal,
        voidedQuantity: otherTotalQuantity
      })
    }

    return formattedData
  }, [dataList]);
  // Prepare the Chart.js data object
  const data = {
    labels: processedData?.map((cat: any) => cat?.x),
    datasets: [
      {
        label: "Sales",
        data: processedData,
        backgroundColor: barColorCode,
        barPercentage: 0.4,    // Thinner bars
        categoryPercentage: 0.6,
      },
    ],
  };

  // Chart.js configuration
  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: isMobile,
        text: bottomTitle,
        position: 'bottom',
        padding: {
          top: 10,
          bottom: 10
        },
        font: {
          size: 12,
          family: 'Poppins',
          weight: 500,
        },
        color: '#8D8D8D'
      },
      tooltip: {
        // Customize tooltip styling
        backgroundColor: "#fff",
        borderColor: barColorCode ?? "#6F6F6F",
        borderWidth: 1,
        titleColor: "#000",
        bodyColor: "#000",
        bodyFont: { size: isMobile ? 10 : 14, family: "sans-serif" }, // Body font size set to 14px
        titleFont: { weight: "normal", size: isMobile ? 10 : 14, family: "sans-serif" }, // Title font size set to 14px

        cornerRadius: 4,
        padding: 10, // Padding inside tooltip container
        displayColors: false, // Hide color box in tooltip
        caretSize: 0, // Remove the caret
        callbacks: {
          // Show the x-axis label in the tooltip title
          title: (tooltipItems: any) => {
            if (!tooltipItems.length || !isMobile) return "";
            const { dataIndex } = tooltipItems[0];
            return processedData?.[dataIndex].categoryName;
          },
          // Multi-line body: Qty and Sales
          label: (tooltipItem: any) => {
            const idx = tooltipItem.dataIndex;
            const cat = processedData?.[idx];
            return [`Qty: ${cat?.voidedQuantity}`, `Voided amount: ${currencySymbol}${Number(cat?.y || 0).toFixed(2)}`];
          },
        },

      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: !isMobile,
          color: "#555",
          font: { size: 14 },
          minRotation: 45,
          maxRotation: 45,
        },
        grid: { display: false }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#777",
          font: { size: 12 },
          callback: (value: any) => `${currencySymbol}${value}`,
        },
      },
    },
  };

  if (loader) return <BarChartShimmer />

  return dataList?.length === 0 ? (
    <ErrorState pageTitle="Category report" isDataNotAvailable={true} />
  ) : (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default LinearBarChartCategorySales;
