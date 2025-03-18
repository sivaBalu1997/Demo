import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { amountFormatter } from "utils";
import DoughnutChartShimmer from "../DoughnutChartShimmer";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type DataItem = {
  label: string;
  amount?: string;
  count?: string;
  voidedItems?: string;
};

type Slice = {
  label: string;
  value: number;
  color: string;
  items: number;
  amount: number;
  orgAmount: number;
};

type Props = {
  dataList?: DataItem[];
  countryCode?: string;
  handleClick?: (slice: Slice) => void;
  handleOther?: (labels: string) => void;
  loader?: boolean;
  clickable?: boolean;
};

const predefinedColors = ["#ff0000", "#0000ff", "#008000", "#ffA500", "#800080", "#ffc0cb", "#a52a2a", "#808080"];

const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart: any) => {
    const { ctx, chartArea: { left, right, top, bottom } } = chart;
    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#8D8D8D";
    ctx.font = "400 16px Poppins";
    ctx.fillText("Total", centerX, centerY - 15);
    ctx.fillStyle = "#000";
    ctx.font = "600 28px Poppins";
    ctx.fillText(chart.config.options.totalSales, centerX, centerY + 20);
    ctx.restore();
  },
};

const DoughnutChart: React.FC<Props> = ({ dataList = [], countryCode, handleClick, handleOther, loader, clickable = true }) => {
  const chartRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [totalSales, setTotalSales] = useState("$0");
  const [slices, setSlices] = useState<Slice[]>([]);
  type ChartData = {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
      hoverOffset: number;
    }[];
  };

  const [data, setData] = useState<ChartData>({ labels: [], datasets: [{ data: [], backgroundColor: [], borderWidth: 0, hoverOffset: 15 }] });

  useEffect(() => {
    if (dataList?.length) {
      const totalDisplay = dataList.reduce((sum, item) => sum + (Number(item?.amount) || 0), 0);
      const formattedTotal = amountFormatter(totalDisplay, countryCode);
      const colors = dataList.map((_, index) => predefinedColors[index % predefinedColors.length]);
      setTotalSales(formattedTotal);
      const sortedData = [...dataList].sort((a, b) => Number(b?.amount || 0) - Number(a?.amount || 0));
      const top10 = sortedData.slice(0, 10).map((slice, index) => ({
        label: slice.label,
        value: (Number(slice?.amount || 0) * 100) / totalDisplay,
        color: colors[index],
        items: Number(slice?.count || 0),
        amount: Number(slice?.voidedItems || 0),
        orgAmount: Number(slice?.amount || 0),
      }));
      const otherRecords = sortedData.slice(10);
      let tempSlice = top10;
      if (otherRecords.length > 0) {
        const otherSummary = otherRecords.reduce(
          (acc, item) => {
            acc.value += (Number(item?.amount || 0) * 100) / totalDisplay;
            acc.items += Number(item?.count || 0);
            acc.amount += Number(item?.voidedItems || 0);
            acc.orgAmount += Number(item?.amount || 0);
            return acc;
          },
          { label: "Other", value: 0, color: colors[10], items: 0, amount: 0, orgAmount: 0 }
        );
        tempSlice = [...top10, otherSummary];
        handleOther?.(otherRecords.map(item => item.label).join(","));
      }
      setData({
        labels: tempSlice.map((slice) => slice.label),
        datasets: [{
          data: tempSlice.map((slice) => slice.value),
          backgroundColor: tempSlice.map((slice) => slice.color),
          borderWidth: 0,
          hoverOffset: 15,
        }],
      });
      setSlices(tempSlice);
    }
  }, [dataList, countryCode]);

  if (loader) return <DoughnutChartShimmer />;
  return (
    <div ref={containerRef} style={{ width: "100%", maxWidth: "550px", height: "450px", position: "relative", overflow: "visible", padding: "20px 5px", borderRadius: "5px", border: "1px solid #E0E0E0" }}>
      <Doughnut ref={chartRef} data={data} options={{ responsive: true, maintainAspectRatio: false, cutout: "80%" }} plugins={[centerTextPlugin]} />
    </div>
  );
};

export default DoughnutChart;
