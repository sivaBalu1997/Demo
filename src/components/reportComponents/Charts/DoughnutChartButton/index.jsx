import React, { useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const slices = [
  {
    label: "Service delay",
    value: 22,
    color: "#0FB36A",
    items: 125,
    amount: 87.5,
  },
  {
    label: "Wrong order",
    value: 13,
    color: "#F99D2B",
    items: 55,
    amount: 45,
  },
  {
    label: "Taste issue",
    value: 21,
    color: "#B33BB3",
    items: 78,
    amount: 60.0,
  },
  {
    label: "Missing item",
    value: 21,
    color: "#14C9C9",
    items: 90,
    amount: 72.1,
  },
  {
    label: "Extra order",
    value: 23,
    color: "#E3313C",
    items: 100,
    amount: 80.0,
  },
];

const totalDisplay = "$1200.50";

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
    ctx.fillText(totalDisplay, centerX, centerY + 15);
    ctx.restore();
  },
};

function DoughnutChartWithButton() {
  const chartRef = useRef(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const overlayHoverRef = useRef(false);

  const handleHover = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      if (!hoverInfo || hoverInfo.index !== index) {
        const center = elements[0].element.getCenterPoint();
        setHoverInfo({ index, x: center.x, y: center.y });
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
  const datalabels = {
    color: "#fff",
    font: { weight: "bold", size: 14 },
    formatter: (value) => `${value}%`, // Ensure percentage display
    align: "end", // Position near the edge
    anchor: "center", // Keeps label within slice
    offset: 5, // Reduce offset to bring labels closer
    backgroundColor: "#fff",
    borderColor: (ctx) => ctx.dataset.backgroundColor[ctx.dataIndex],
    borderWidth: 2,
    borderRadius: 6,
    padding: { top: 4, bottom: 4, left: 6, right: 6 },
    textAlign: "center",
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "80%",
    onHover: handleHover,
    plugins: {
      tooltip: { enabled: false },
      legend: { position: "bottom", labels: { padding: 20 } },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
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
      />

      {/* Floating labels for percentages and hover details */}
      {slices.map((slice, index) => {
        const element = chartRef.current?.getDatasetMeta(0)?.data[index];
        if (!element) return null;

        const center = element.tooltipPosition();
        const angle =
          element.startAngle + (element.endAngle - element.startAngle) / 2;
        const radiusOffset = 20; // Move labels slightly outward

        const newX = center.x + radiusOffset * Math.cos(angle);
        const newY = center.y + radiusOffset * Math.sin(angle);

        const isHovered = hoverInfo && hoverInfo.index === index;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${isHovered ? center.x : newX}px`,
              top: `${isHovered ? center.y : newY}px`,
              transform: "translate(-50%, -50%)",
              background: "#fff",
              border: `2px solid ${slice.color}`,
              borderRadius: isHovered ? "8px" : "0px",
              padding: isHovered ? "12px" : "6px",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "bold",
              pointerEvents: "auto",
              transition: "all 0.2s ease-in-out",
              zIndex: 10,
            }}
            onMouseEnter={() => {
              overlayHoverRef.current = true;
              setHoverInfo({ index, x: newX, y: newY });
            }}
            onMouseLeave={() => {
              overlayHoverRef.current = false;
              setHoverInfo(null);
            }}
          >
            {!isHovered ? (
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
                  onClick={() => alert(`Viewing details for ${slice.label}`)}
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

export default DoughnutChartWithButton;
