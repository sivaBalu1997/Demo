import React from "react";
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
import BarChartShimmer from "../../Charts/BarChartShimmer";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
interface ChartData {
  label: string;
  sales: number;
  qty: number;
}
// Sample data
interface RevenueChartProps {
  dataList:
    | Array<{
        [key: string]: any;
      }>
    | {
        [key: string]: any;
      };
  loader: boolean;
  xAxisTooltipLabel: string;
  yAxisTooltipLabel: string;
  toolTipBorderColor: string;
  barColor: string;
  yAxisTooltipAppendInFront?: string;
  yAxisTooltipAppendInBack?: string;
  label?:string
  showLabel?:boolean
}

const RevenueClassChart: React.FC<RevenueChartProps> = ({
  dataList = [],
  loader,
  xAxisTooltipLabel = "",
  yAxisTooltipLabel = "",
  toolTipBorderColor,
  barColor,
  yAxisTooltipAppendInFront = "",
  yAxisTooltipAppendInBack = "",
  label="",
  showLabel=false
}) => {
  //   {
  //     "revenueClass": "Beverages",
  //     "itemsSold": 23,
  //     "totalSales": "742.00"
  // }

  const data = {
    labels:Array.from(new Set(dataList?.map((item: any) => item?.xAxisValue))),
    datasets: [
      {
        label: label,
        data: dataList?.map((item: any) => ({
          x: item.xAxisValue, // X-axis label
          y: Number(item.yAxisValue || 0), // Y-axis sales value
          tooltipValue: item.tooltipValue, // Store orders for tooltips
        })),
        backgroundColor: barColor,
        borderRadius: 0,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: showLabel?{ position: "bottom",
        labels: {
 boxWidth: 12, // Set legend box width
 boxHeight: 12, // Set legend box height
 usePointStyle: true,
 pointStyle: "rectRounded", // Rounded rectangle legend symbol
},
 }:{display:false},
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItem: any) => {
            return "";
          },
          label: (tooltipItem: any) => {
            const dataPoint = tooltipItem.raw;
            let toolTipData = [
              `${xAxisTooltipLabel}: ${dataPoint.x}`,
              `${yAxisTooltipLabel}: ${yAxisTooltipAppendInFront}${dataPoint.y.toFixed(
                0
              )}${yAxisTooltipAppendInBack}`,
            ];
            if (
              xAxisTooltipLabel?.length > 0 &&
              yAxisTooltipLabel?.length > 0
            ) {
              return toolTipData;
            } else {
              if (
                xAxisTooltipLabel?.length > 0 &&
                (yAxisTooltipLabel.length == 0 ||
                  yAxisTooltipLabel == undefined)
              ) {
                return toolTipData[0];
              }
              if (
                yAxisTooltipLabel?.length > 0 &&
                (xAxisTooltipLabel.length == 0 ||
                  xAxisTooltipLabel == undefined)
              ) {
                return toolTipData[1];
              }
            }
          },
        },
        backgroundColor: "rgba(255, 255, 255, 0.9)",

        titleColor: "#333",
        bodyColor: "#333",
        borderColor: toolTipBorderColor,
        titleFont: { weight: "normal", size: 14 }, // Title font size set to 14px
        bodyFont: { size: 14 }, // Body font size set to 14px
        borderWidth: 1,
        padding: 15,
        caretSize: 0,
        displayColors: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  if (loader) return <BarChartShimmer />;

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RevenueClassChart;
