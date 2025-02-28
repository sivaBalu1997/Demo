import React, { useRef, useState, useEffect, useCallback } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { amountFormatter, getRandomColor } from "utils";
import DoughnutChartShimmer from "../DoughnutChartShimmer";
 
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// {
//   "steward": "",
//   "voidedAmount": "798.72",
//   "voidedItems": "",
//   "voidedReasons": "CHEF NOT AVAILABLE",
//   "orderCount": 51128547
// }

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
    ctx.font = "16px Poppins";
    ctx.fillText("Total", centerX, centerY - 10);
    ctx.font = "24px Poppins";
    ctx.fillText(chart.config.options.voidedAmount, centerX, centerY + 15);
    ctx.restore();
  },
};
function DoughnutChartWithButtonVoided({
  dataList = [],
  countryCode,
  handleClick = (data) => {},
  loader
}) {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [labelPositions, setLabelPositions] = useState([]);
  const overlayHoverRef = useRef(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [voidedAmount, setvoidedAmount] = useState("$0");
  const [slices, setSlices] = useState([]);
  const [reRenderChart, setReRenderChart] = useState(true);
  // const mockData = [
  //   {
  //     steward: "John Smith",
  //     voidedAmount: "798.72",
  //     voidedItems: "45",
  //     voidedReasons: "CHEF NOT AVAILABLE",
  //     orderCount: 156,
  //   },
  //   {
  //     steward: "Emma Johnson",
  //     voidedAmount: "523.45",
  //     voidedItems: "37",
  //     voidedReasons: "CUSTOMER CHANGED MIND",
  //     orderCount: 124,
  //   },
  //   {
  //     steward: "Michael Davis",
  //     voidedAmount: "325.19",
  //     voidedItems: "29",
  //     voidedReasons: "WRONG ORDER",
  //     orderCount: 85,
  //   },
  //   {
  //     steward: "Sarah Wilson",
  //     voidedAmount: "412.60",
  //     voidedItems: "31",
  //     voidedReasons: "FOOD QUALITY ISSUE",
  //     orderCount: 97,
  //   },
  //   {
  //     steward: "Robert Taylor",
  //     voidedAmount: "678.33",
  //     voidedItems: "42",
  //     voidedReasons: "SYSTEM ERROR",
  //     orderCount: 138,
  //   },
  //   {
  //     steward: "Jennifer Brown",
  //     voidedAmount: "245.87",
  //     voidedItems: "19",
  //     voidedReasons: "ITEM UNAVAILABLE",
  //     orderCount: 72,
  //   },
  //   {
  //     steward: "David Miller",
  //     voidedAmount: "189.50",
  //     voidedItems: "15",
  //     voidedReasons: "PREPARATION TIME TOO LONG",
  //     orderCount: 63,
  //   },
  // ];
  // dataList = mockData;
  const predefinedColors = [
    "#ff0000", // Red
    "#0000ff", // Blue
    "#008000", // Green
    "#ffff00", // Yellow
    "#ffA500", // Orange
    "#800080", // Purple
    "#ffc0cb", // Pink
    "#a52a2a", // Brown
    "#808080", // Gray
    "#ff0000", // Red
    "#0000ff", // Blue
    "#008000", // Green
    "#ffff00", // Yellow
    "#ffA500", // Orange
    "#800080", // Purple
    "#ffc0cb", // Pink
    "#a52a2a", // Brown

    "#808080", // Gray
  ];
  // const [centerTextPlugin, setCenterTextPlugin] = useState(  {
  //   id: "centerText",
  //   beforeDraw: (chart) => {
  //     const { ctx, chartArea: { left, right, top, bottom } } = chart;
  //     const centerX = (left + right) / 2;
  //     const centerY = (top + bottom) / 2;
  //     ctx.save();
  //     ctx.textAlign = "center";
  //     ctx.textBaseline = "middle";
  //     ctx.fillStyle = "#000";
  //     ctx.font = "16px Poppins";
  //     ctx.fillText("Total", centerX, centerY - 10);
  //     ctx.font = "24px Poppins";
  //     ctx.fillText(voidedAmount, centerX, centerY + 15);
  //     ctx.restore();
  //   },
  // });

  useEffect(() => {
    if (dataList?.length) {
      const totalDisplay = dataList?.reduce(
        (sum, item) => sum + (Number(item?.voidedAmount) || 0),
        0
      );
      console.log(totalDisplay, dataList);
      const formattedTotal = amountFormatter(totalDisplay, countryCode);
      // Assign colors from predefined palette
      const colors = dataList.map(
        (_, index) => predefinedColors[index % predefinedColors.length]
      );
      setvoidedAmount(formattedTotal);
      setReRenderChart(true);
      // setCenterTextPlugin(  );

      // console.log({Colors});

      const sliceData = dataList?.map((slice, index) => ({
        label: slice?.voidedReasons,
        value: (
          (Number(slice?.voidedAmount || 0) * 100) /
          totalDisplay
        )?.toFixed(2),
        color: colors[index],
        items: Number(slice?.orderCount || 0),
        amount: Number(slice?.voidedItems || 0),
        voidedAmount:Number(slice?.voidedAmount || 0),
      }));
      console.log(dataList,"here is the slice data 77777777777777777777777777777777")
      setSlices(sliceData);
      // const initTimer = setTimeout(() => {
      //   // setReRenderChart(false);
      // }, 1000);
      // return () => clearTimeout(initTimer);
    }
  }, [dataList, countryCode]);
  useEffect(()=>{
    if(reRenderChart){
      setReRenderChart(false)
      
    }
  },[reRenderChart])
  // Update window width on resize to trigger re-render.
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const computeLabelPositions = useCallback(() => {
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
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     computeLabelPositions();
  //   }, 500); // 500ms delay to allow chart rendering
  //   return () => clearTimeout(timer);
  // }, [computeLabelPositions]);
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

  const data = {
    labels: slices.map((slice) => slice.label),
    datasets: [
      {
        data: slices.map((slice) => slice.value),
        backgroundColor: slices.map((slice) => slice.color),
        borderWidth: 0,
        hoverOffset: 15,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "80%",
    onHover: handleHover,   
    layout: {
      padding: {
        top: 35,
        // bottom: 60,
        // left: 25,
        // right: 25
      }
    },
    voidedAmount: voidedAmount, // Pass total sales to plugin
    plugins: {
      tooltip: { enabled: false },
      legend: { position: "bottom", labels: { padding: 20 } },
      datalabels: { display: false },
    },
    animation: {
      onComplete: () => {
        computeLabelPositions();
      }}
  };

  if(loader) return <DoughnutChartShimmer />
 
  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: "550px",
        height: dataList?.length>7?"650px": "450px",
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
        ref={chartRef}
        data={data}
        options={options}
        plugins={[centerTextPlugin]}
        // redraw={reRenderChart}
      />

      {/* Render floating labels for each slice using computed positions */}
      {labelPositions.length > 0 &&
        slices.map((slice, index) => {
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
                <span style={{ color: slice.color }}>{slice.value}%</span>
              ) : (
                <>
                  <div style={{ color: slice.color, marginBottom: "5px" }}>
                    {slice.label}
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                    Orders: {slice.items} <br />
                    Refund: ${slice.voidedAmount}
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
                    onClick={() => handleClick(slice)}
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

export default DoughnutChartWithButtonVoided;
