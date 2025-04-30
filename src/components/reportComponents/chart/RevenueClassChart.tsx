import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import BarChartShimmer from "../Charts/BarChartShimmer";
import ErrorState from "../errorstatecomponents/ErrorState";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
interface ChartData {
  label: string;
  sales: number;
  qty: number;
}
// Sample data
const chartDatas: ChartData[] = [
  { label: "Food", sales: 210, qty: 28 },
  { label: "North Indian", sales: 170, qty: 22 },
  { label: "South Indian", sales: 265, qty: 35 },
  { label: "Soft Drinks", sales: 110, qty: 12 },
  { label: "South Indian", sales: 220, qty: 30 },
  { label: "Soft Drinks", sales: 190, qty: 20 },
];

interface RevenueChartProps {
  dataList:
  | Array<{
    [key: string]: any;
  }>
  | {
    [key: string]: any;
  };
  loader: boolean;
}

const RevenueClassChart: React.FC<RevenueChartProps> = ({ dataList = [], loader }) => {
    const processedData = useMemo(() => {
      const sorted = Array.isArray(dataList) ? [...dataList].sort((a: any, b: any) => Number(b.totalSales || 0) - Number(a.totalSales || 0)) : [];
    
      const top20 = sorted.slice(0, 20);
      const rest = sorted.slice(20);
    
      const formattedData = [
        ...top20.map((item: any) => ({
          x: item.revenueClass,
          y: Number(item.totalSales || 0),
          itemsSold: item.itemsSold,
        })),
  
      ];
      if(rest.length) {
      const otherTotal = rest.reduce((acc: number, item: any) => acc + Number(item.totalSales || 0), 0);
      const otherOrders = rest.reduce((acc: number, item: any) => acc + Number(item.itemsSold || 0), 0); 
      formattedData.push({
        x: "Others",
        y: otherTotal,
        itemsSold: otherOrders
      })
    }
    
      return formattedData
    }, [dataList]);
  
  const data = {
    labels:processedData?.map((item: any) => item?.x),
    datasets: [
      {
        label: "Sales",
        data: processedData,
        backgroundColor: "#CE9E0F",
        borderRadius: 5,
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
              `Items sold: ${dataPoint.itemsSold}`,
              `Sales: $${dataPoint.y.toFixed(2)}`,
            ];
          },
        },
        backgroundColor: "rgba(255, 255, 255, 0.9)",

        titleColor: "#333",
        bodyColor: "#333",
        borderColor: "#CE9E0F",
        titleFont: { weight: "normal", size: 14 }, // Title font size set to 14px
        bodyFont: { size: 14 }, // Body font size set to 14px
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
      x: { grid: { display: false },ticks: { autoSkip: false } },
      y: { beginAtZero: true },
    },
  };

  if (loader) return <BarChartShimmer />

  return processedData?.length === 0 ? (
    <ErrorState pageTitle="Sales report" isDataNotAvailable={true} />
  ) : (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RevenueClassChart;
