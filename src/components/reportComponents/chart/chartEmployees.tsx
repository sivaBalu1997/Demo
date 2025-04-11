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
} from "chart.js";
// @ts-ignore
import ChartDataLabels from "chartjs-plugin-datalabels";
import BarChartShimmer from "../Charts/BarChartShimmer";
import ErrorState from "../errorstatecomponents/ErrorState";
import { getCurrencySymbol } from "utils";
import { useSelector } from "react-redux";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface EmployeeSalesChartProps {
  dataList: Record<string, any>[];
  loader: boolean;
}

const EmployeeSalesChart: React.FC<EmployeeSalesChartProps> = ({
  dataList = [],
  loader,
}) => {
  const countryCode = useSelector(
    (state: any) => state?.newReports?.getDetailsRestaurantSuccess?.country
  );
  const currencySymbol = getCurrencySymbol(countryCode, false);
  const processedData = useMemo(() => {
    const sorted = [...dataList].sort((a: any, b: any) => Number(b.total || 0) - Number(a.total || 0));
  
    const top20 = sorted.slice(0, 20);
    const rest = sorted.slice(20);
  
    const formattedData = [
      ...top20.map((item: any) => ({
        x: item.fullName,
        y: Number(item.total || 0),
        orders: item.orders,
      })),

    ];
    if(rest.length) {
    const otherTotal = rest.reduce((acc: number, item: any) => acc + Number(item.total || 0), 0);
    const otherOrders = rest.reduce((acc: number, item: any) => acc + Number(item.orders || 0), 0); 
    formattedData.push({
      x: "Others",
      y: otherTotal,
      orders: otherOrders
    })
  }
  
    return formattedData
  }, [dataList]);
  const data = {
    labels: Array.from(new Set(processedData?.map((item: any) => item?.fullName))),
    datasets: [
      {
        label: `Sales (${currencySymbol})`,
        data: processedData,
        backgroundColor: "#1F77B4", // Blue color
        barPercentage: 0.6, // Thinner bars
        categoryPercentage: 0.6,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItem: any) => {
            return "";
          },
          label: (tooltipItem: any) => {
            const dataPoint = tooltipItem.raw;
            return [
              `Orders: ${dataPoint.orders}`,
              `Sales: ${currencySymbol}${dataPoint.y.toFixed(2)}`,
            ];
          },
        },
        backgroundColor: "rgba(255, 255, 255, 0.9)",

        titleColor: "#333",
        bodyColor: "#333",
        borderColor: "#2196F3",
        titleFont: { weight: "normal", size: 14 }, // Title font size set to 14px
        bodyFont: { size: 14, family: "sans-serif" }, // Body font size set to 14px
        borderWidth: 1,
        padding: 15,
        displayColors: false,
        caretSize: 0,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { autoSkip: false } },
      y: { beginAtZero: true },
    },
  };

  if (loader) return <BarChartShimmer />;

  return processedData?.length === 0 ? (
    <ErrorState pageTitle="Sales report" isDataNotAvailable={true} />
  ) : (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default EmployeeSalesChart;
