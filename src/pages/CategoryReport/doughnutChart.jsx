import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { amountFormatter } from "utils";
import DoughnutChartShimmer from "components/reportComponents/Charts/DoughnutChartShimmer";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const predefinedColors = [
  "#0FB36A",
  "#F99D2B",
  "#B33BB3",
  "#14C9C9",
  "#E3313C",
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#774F38",
  "#E1A679",
  "#0366d6",
  "#28a745",
  "#6f42c1",
  "#d73a49",
  "#f66a0a",
  "#17a2b8",
  "#e83e8c",
  "#6c757d",
];
const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart) => {
    const {
      ctx,
      chartArea: { left, right, top, bottom },
    } = chart;
    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000";
    ctx.font = chart.config.options.isMobile ? "12px Poppins" : "16px Poppins";
    ctx.fillText("Total", centerX, centerY - 10);
    ctx.font = chart.config.options.isMobile ? "20px Poppins" : "24px Poppins";
    ctx.fillText(chart.config.options.totalSales, centerX, centerY + 15);
    ctx.restore();
  },
};
function DoughnutChartButtonVoided({
  dataList = [],
  countryCode,
  loader,
  isMobile,
}) {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [labelPositions, setLabelPositions] = useState([]);
  const overlayHoverRef = useRef(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [totalSales, setTotalSales] = useState("$0");
  const [reRenderChart, setReRenderChart] = useState(true);
  const [slices, setSlices] = useState([]);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderWidth: 0,
        hoverOffset: 15,
      },
    ],
  });

  useEffect(() => {
    if (reRenderChart) {
      setReRenderChart(false);
    }
  }, [reRenderChart]);

  const computeLabelPositions = useCallback(() => {
    if (
      !chartRef.current ||
      !chartRef.current.canvas ||
      !document.body.contains(chartRef.current.canvas)
    )
      return; // Guard clause
    if (chartRef.current) {
      const meta = chartRef.current.getDatasetMeta(0);
      if (meta && meta.data.length > 0) {
        const positions = meta.data.map((arc) => {
          const centerX = arc.x;
          const centerY = arc.y;
          const angle = (arc.startAngle + arc.endAngle) / 2;
          const offset = 20; // Adjust offset as needed
          return {
            x: centerX + (arc.outerRadius + offset) * Math.cos(angle),
            y: centerY + (arc.outerRadius + offset) * Math.sin(angle),
          };
        });
        setLabelPositions(positions);
      }
    }
  }, []);


// Compute label positions using arc.x, arc.y, outerRadius, and mid-angle.

  const handleHover = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      if (!hoverInfo || hoverInfo.index !== index) {
        const pos = labelPositions[index];
        if (pos) {
          setHoverInfo({ index, x: pos.x, y: pos.y });
        }
      }
    } else {
      if (!overlayHoverRef.current) {
        setHoverInfo(null);
      }
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    totalSales: totalSales, // Pass total sales to plugin
    isMobile: isMobile,
    cutout: "80%",
    onHover: handleHover,
    layout: {
      padding: {
        top: 35,
      },
    },
    plugins: {
      tooltip: { enabled: false },
      legend: {
        position: "bottom",
        labels: {
          generateLabels: (chart) => {
            const original =
              ChartJS.overrides.doughnut.plugins.legend.labels.generateLabels;
            const labels = original(chart);

            return labels.map((label) => ({
              ...label,
              // Custom draw function to add border-radius
              pointStyle: "rectRounded",
              borderRadius: 4, // This is not default, but helps if supported in future versions
            }));
          },
          usePointStyle: true, // Needed to apply the pointStyle shape
          padding: 20,
          boxWidth: isMobile?10:12,
          boxHeight:isMobile?10: 12,
          font:{
            size:isMobile?10:12
          }
        },
      },
      datalabels: { display: false },
    },
    animation: {
      onComplete: () => {
        computeLabelPositions();
      },
    },
  };

  // {
  //   "steward": "",
  //   "voidedAmount": "798.72",
  //   "voidedItems": "",
  //   "itemName": "CHEF NOT AVAILABLE",
  //   "orderCount": 51128547
  // }

  useEffect(() => {
    if (dataList?.length) {
      const totalDisplay = dataList?.reduce(
        (sum, item) => sum + (Number(item?.voidedAmount) || 0),
        0
      );

      const formattedTotal = amountFormatter(totalDisplay, countryCode);
      // Assign colors from predefined palette
      const colors = dataList.map(
        (_, index) => predefinedColors[index % predefinedColors.length]
      );

      setTotalSales(formattedTotal);

      // Sort by totalSales (descending) **ensuring correct numeric sorting**
      const sortedData = [...dataList].sort(
        (a, b) => Number(b?.voidedAmount || 0) - Number(a?.voidedAmount || 0)
      );

      // Get the top 10 records
      const top10 = sortedData.slice(0, 10)?.map((slice, index) => ({
        label: slice?.itemName,
        value: (Number(slice?.voidedAmount || 0) * 100) / totalDisplay,
        color: colors[index],
        items: Number(slice?.voidedQuantity || 0),
        amount: Number(slice?.voidedItems || 0),
        voidedAmount: Number(slice?.voidedAmount || 0),
      }));

      // Sum remaining records into "Other"
      const otherRecords = sortedData.slice(10);
      let tempSlice = top10;
      if (otherRecords.length > 0) {
        const otherSummary = otherRecords.reduce(
          (acc, item) => {
            acc.value += (Number(item?.voidedAmount || 0) * 100) / totalDisplay;

            acc.items += Number(item?.voidedQuantity || 0);
            acc.amount += Number(item?.voidedItems || 0);

            acc.voidedAmount += Number(item?.voidedAmount || 0);
            return acc;
          },
          {
            label: "Other",
            value: 0,
            color: predefinedColors[10],
            items: 0,
            amount: 0,
            voidedAmount: 0,
          }
        );

        tempSlice = [...top10, otherSummary];
      }
      const tempData = {
        labels: tempSlice?.map((slice) => slice.label),
        datasets: [
          {
            data: tempSlice.map((slice) => slice.value),
            backgroundColor: tempSlice.map((slice) => slice.color),
            borderWidth: 0,
            hoverOffset: 15,
          },
        ],
      };
      setData(tempData);

      setReRenderChart(true);
      setSlices(tempSlice);
    }
  }, [dataList, countryCode]);

  if (loader) return <DoughnutChartShimmer />;
  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: "550px",
        height: "450px",
        position: "relative",
        overflow: "visible",
        padding: "20px 5px",
        borderRadius: "5px",
        border: "1px solid #E0E0E0",
      }}
      onMouseLeave={() => {
        if (!overlayHoverRef.current) setHoverInfo(null);
      }}
    >
      <Doughnut
        key={JSON.stringify()}
        ref={chartRef}
        data={data}
        options={options}
        plugins={[centerTextPlugin]}
        // redraw={reRenderChart}
      />

      {/* Render floating labels for each slice using computed positions */}
      {labelPositions.length > 0 &&
        slices?.map((slice, index) => {
          const pos = labelPositions[index];
          if (!pos) return null;
          const isHovered = hoverInfo && hoverInfo.index === index;
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${isHovered && hoverInfo ? hoverInfo.x : pos.x}px`,
                top: `${isHovered && hoverInfo ? hoverInfo.y : pos.y}px`,
                transform: "translate(-50%, -50%)",
                background: "#fff",
                border: `2px solid ${slice.color}`,
                borderRadius: isHovered ? "8px" : "6px",
                padding: isHovered ? "12px" : "6px",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
                fontSize:isMobile?"10px": "14px",
                fontWeight: "bold",
                pointerEvents: "auto",
                transition: "all 0.2s ease-in-out",
                zIndex: isHovered ? 1000 : index, // Dynamic z-index based on hover and position
                minWidth: "50px",
              }}
              onMouseEnter={() => {
                overlayHoverRef.current = true;
                setHoverInfo({ index, x: pos.x, y: pos.y });
              }}
              onMouseLeave={() => {
                overlayHoverRef.current = false;
                setHoverInfo(null);
              }}
            >
              {!hoverInfo || hoverInfo.index !== index ? (
                <span style={{ color: slice.color }}>
                  {slice.value?.toFixed(2)}%
                </span>
              ) : (
                <>
                  {isMobile ? (
                    ""
                  ) : (
                    <div style={{ color: slice.color, marginBottom: "5px" }}>
                      {slice.label}
                    </div>
                  )}
                  <div style={{ marginBottom: "5px" }}>
                   <div> Total item: {Number(slice?.items || 0)}</div>
                   <div> Amount: ${Number(slice?.voidedAmount || 0).toFixed(2)}</div>
                  </div>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default DoughnutChartButtonVoided;
