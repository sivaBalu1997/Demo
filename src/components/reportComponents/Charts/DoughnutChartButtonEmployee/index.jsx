import React, { useRef, useState, useEffect, useCallback } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { amountFormatter, getRandomColor } from "utils";
 
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
 
function DoughnutChartButtonEmployee({dataList=[], countryCode,handleClick}) {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [labelPositions, setLabelPositions] = useState([]);
  const overlayHoverRef = useRef(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [voidedAmount, setvoidedAmount] = useState("$0");
  const [slices, setSlices] = useState([]);
  const [reRenderChart, setReRenderChart] = useState(false);


const [centerTextPlugin, setCenterTextPlugin] = useState(  {
  id: "centerText",
  beforeDraw: (chart) => {
    const { ctx, chartArea: { left, right, top, bottom } } = chart;
    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000";
    ctx.font = "16px Poppins";
    ctx.fillText("Total", centerX, centerY - 10);
    ctx.font = "24px Poppins";
    ctx.fillText(voidedAmount, centerX, centerY + 15);
    ctx.restore();
  },
});

useEffect(()=>{
  if(dataList?.length) {

    const totalDisplay =dataList?.reduce((sum, item) => sum + (Number(item?.voidedAmount) || 0), 0);
    console.log(totalDisplay, dataList);
  const formattedTotal = amountFormatter(totalDisplay, countryCode);
  setvoidedAmount(formattedTotal);
  setReRenderChart(true);
  setCenterTextPlugin(  {
    id: "centerText",
    beforeDraw: (chart) => {
      const { ctx, chartArea: { left, right, top, bottom } } = chart;
      const centerX = (left + right) / 2;
      const centerY = (top + bottom) / 2;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000";
      ctx.font = "16px Poppins";
      ctx.fillText("Total", centerX, centerY - 10);
      ctx.font = "24px Poppins";
      ctx.fillText(formattedTotal, centerX, centerY + 15);
      ctx.restore();
    },
  }); 
  const colors = [
    "#0FB36A",
    "#F99D2B",
    "#B33BB3",
    "#14C9C9",
    "#E3313C",
    ...Array(dataList?.length)?.map(()=>getRandomColor())
  ];
 
  const sliceData = dataList?.map((slice, index) => ({
    label: slice?.steward,
    value: (Number(slice?.voidedAmount||0)*100/totalDisplay)?.toFixed(2),
    color:colors[index],
    items: Number(slice?.orderCount||0),
    amount: Number(slice?.voidedItems||0),
  }));
  setSlices(sliceData);
  const initTimer = setTimeout(() => {
    // setReRenderChart(false);
  }, 1000); 
  return () => clearTimeout(initTimer);
}
},[dataList,countryCode])
 
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
  useEffect(() => {
    const timer = setTimeout(() => {
      computeLabelPositions();
    }, 500); // 500ms delay to allow chart rendering
    return () => clearTimeout(timer);
  }, [computeLabelPositions]);
 
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
    plugins: {
      tooltip: { enabled: false },
      legend: { position: "bottom", labels: { padding: 20 } },
      datalabels: { display: false },
    },
  };
 
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
        ref={chartRef}
        data={data}
        options={options}
        plugins={[centerTextPlugin]}
        redraw={reRenderChart}
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
                zIndex: 10,
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
                    Total items: {slice.items} <br />
                    Amount: ${slice.amount.toFixed(2)}
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
 
export default DoughnutChartButtonEmployee;
