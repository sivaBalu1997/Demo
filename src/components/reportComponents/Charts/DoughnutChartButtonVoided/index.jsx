import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { amountFormatter } from "utils";
import DoughnutChartShimmer from "../DoughnutChartShimmer";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const predefinedColors = [
  "#ff0000", // Red
  "#0000ff", // Blue
  "#008000", // Green
  "#ffA500", // Orange
  "#800080", // Purple
  "#ffc0cb", // Pink
  "#a52a2a", // Brown
  "#808080", // Gray
  "#ff0000", // Red
  "#0000ff", // Blue
  "#008000", // Green
  "#ffA500", // Orange
  "#800080", // Purple
  "#ffc0cb", // Pink
  "#a52a2a", // Brown

  "#808080", // Gray
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
    ctx.fillStyle = "#8D8D8D";
    ctx.font = "400 16px Poppins";
    ctx.fillText("Total", centerX, centerY - 15);
    ctx.fillStyle = "#000";
    ctx.font = "600 28px Poppins";
    ctx.fillText(chart.config.options.totalSales, centerX, centerY + 20);
    ctx.restore();
  },
};
function DoughnutChartButtonVoided({
  dataList = [],
  countryCode,
  handleClick,
  handleOther,
  loader,
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

  // Update window width on resize to trigger re-render.
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
  // Force recalculation on initial render after a short delay.
  useEffect(() => {
    let observer;
    if (containerRef.current) {
      observer = new ResizeObserver(() => {
        computeLabelPositions();
      });
      observer.observe(containerRef.current);
    }
    return () => observer?.disconnect();
  }, []);
  // Recompute label positions when windowWidth changes.
  useEffect(() => {
    computeLabelPositions();
  }, [windowWidth, computeLabelPositions]);

  // Also re-calc positions when container size changes.
  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        computeLabelPositions();
      });
      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [containerRef, computeLabelPositions]);

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
        position: "bottom", labels: {
          generateLabels: (chart) => {
            const original = ChartJS.overrides.doughnut.plugins.legend.labels.generateLabels;
            const labels = original(chart);

            return labels.map(label => ({
              ...label,
              // Custom draw function to add border-radius
              pointStyle: 'rectRounded',
              borderRadius: 4, // This is not default, but helps if supported in future versions
            }));
          },
          usePointStyle: true, // Needed to apply the pointStyle shape 
          padding: 20, boxWidth: 12, boxHeight: 12
        }
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
  //   "voidedReasons": "CHEF NOT AVAILABLE",
  //   "orderCount": 51128547
  // }


  useEffect(() => {

    if (dataList?.length) {
      const totalDisplay = dataList?.reduce(
        (sum, item) => sum + (Number(item?.amount) || 0),
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
        (a, b) => Number(b?.amount || 0) - Number(a?.amount || 0)
      );

      // Get the top 10 records
      const top10 = sortedData.slice(0, 10)?.map((slice, index) => ({
        label: slice?.voidedReasons,
        value: ((Number(slice?.amount || 0) * 100) / totalDisplay),
        color: colors[index],
        items: Number(slice?.orderCount || 0),
        amount: Number(slice?.voidedItems || 0),
        orgAmount: Number(slice?.amount || 0),
      }));

      // Sum remaining records into "Other"
      const otherRecords = sortedData.slice(10);
      let tempSlice = top10
      if (otherRecords.length > 0) {
        const other=[]    
        const otherSummary = otherRecords.reduce(
          (acc, item) => {

            other.push(item?.voidedReasons)
            acc.value += ((Number(item?.amount || 0) * 100) / totalDisplay)
            acc.items += Number(item?.count || 0)
            acc.amount += Number(item?.items || 0)

            acc.orgAmount += Number(item?.amount || 0)
            return acc;
          },
          { label: "Other", value: 0, color: colors[10], items: 0, amount: 0, orgAmount: 0 }
        );


        tempSlice = [...top10, otherSummary]
        handleOther(other?.join(","))

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
        key={JSON.stringify(

        )}
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
                fontSize: "14px",
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
                <span style={{ color: slice.color }}>{slice.value?.toFixed(2)}%</span>
              ) : (
                <>
                  <div style={{ color: slice.color, marginBottom: "5px" }}>
                    {slice.label}
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                    Order: {slice.items} <br />
                    Sales: ${slice?.orgAmount.toFixed(2)}
                  </div>
                  <button
                    style={{
                      background: slice.color,
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleClick && handleClick(slice)}
                  >
                    View Details
                  </button>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default DoughnutChartButtonVoided;
