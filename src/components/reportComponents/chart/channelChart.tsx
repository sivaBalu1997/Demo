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
import "./chart.scss";
import BarChartShimmer from "../Charts/BarChartShimmer";
import ErrorState from "../errorstatecomponents/ErrorState";
import { getCurrencySymbol } from "utils";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface ChartData {
  label: string;
  sales: number;
  qty: number;
}


const ChannelSalesChart = ({ dataList = [], loader }: { dataList: any[], loader: boolean }) => {
  const countryCode = useSelector((state : any) => state?.newReports?.getDetailsRestaurantSuccess?.country);
  const currencySymbol = useMemo(() => (getCurrencySymbol(countryCode,false)), [countryCode]);
  const processedData = useMemo(() => {
    const sorted = [...dataList].sort((a: any, b: any) => Number(b.sales || 0) - Number(a.sales || 0));
  
    const top20 = sorted.slice(0, 20);
    const rest = sorted.slice(20);
  
    const formattedData = [
      ...top20.map((item: any) => ({
        x: item.channelName,
        y: Number(item.sales || 0),
        orders: item.orders,
      })),

    ];
    if(rest.length) {
    const otherTotal = rest.reduce((acc: number, item: any) => acc + Number(item.sales || 0), 0);
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
    labels: Array.from(
      new Set(processedData?.map((item: any) => item?.channelName))
    ),
    datasets: [
      {
        label: `Sales (${currencySymbol})`,
        data: processedData,
        backgroundColor: [
          "#E52333",
          "#67833E",
          "#E4601B",
          "#14B292",
          "#EE2637",
          "#06C167",
          "#FF8C00",
        ],
        barPercentage: 0.7,
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
        borderColor: "#e76f51",
        displayColors: false,
        borderWidth: 1,
        padding: 10, // Padding inside tooltip container
        titleFont: { weight: "normal", size: 14 }, // Title font size set to 14px
        bodyFont: { size: 14 }, // Body font size set to 14px        displayColors: false,
        caretSize: 0,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: { grid: { display: false },ticks: { autoSkip: false } },
      y: {
        beginAtZero: true,
        ticks: {
          // stepSize: 1000,
          callback: function (tickValue: string | number) {
            const value = Number(tickValue);
            return value < 1000
              ? `${currencySymbol} ${value}`
              : `${currencySymbol}${value / 1000} K`;
          },
        },
      },
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

export default ChannelSalesChart;
