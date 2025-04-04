import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { amountFormatter } from "utils";
import DoughnutChartShimmer from "../../Charts/DoughnutChartShimmer";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
type DataItem = {
  label: string;
  count?: string;
  voidedItems?: string;
};

type Slice = {
  label: string;
  percent: number;
  color: string;
  items: number;
  value: number;
};

const predefinedColors = [
  "#E17100", // Orange
  "#E60076", // Pink  
  "#009689", // Teal
  "#F54900", // Redish orange
  "#049E16", // Green
  "#CE9E0F", // Yellow
  "#AF4B7E", // Purple
  "#17BECF", // Light blue
  "#1F77B4", // Blue

  "#ff0000", // Red
  "#0000ff", // Blue
  "#008000", // Green
  "#ffA500", // Orange
  "#800080", // Purple
  "#a52a2a", // Brown
  "#808080", // Gray
  "#ffc0cb", // Pink
];

const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart:any) => {
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
    ctx.fillText(chart.config.options.totalValue, centerX, centerY + 20);
    ctx.restore();
  },
};
interface DoughnutChartProps {
  dataList?: any[];
  countryCode?: string;
  handleClick?: (param?:any) => void;
  handleOther?: (param?:any) => void;
  loader?: boolean;
  clickable?: boolean;
  xKey:string;
  yKey:string;
  labelKeys:{key:string;value:string;isAmount?:boolean}[]
  isAmount?:boolean;
  customLabel?:boolean;
  otherKeys?:string[]
}
const DoughnutChart: React.FC<DoughnutChartProps> = ({
  dataList = [],
  labelKeys,
  xKey,
  yKey,
  countryCode,
  handleClick,
  handleOther,
  loader,
  isAmount = false,
  clickable = true,
  otherKeys,
})=> {
  const chartRef = useRef<any>(null);
  const containerRef = useRef(null);
  const [hoverInfo, setHoverInfo] = useState<any>(null);
  const [labelPositions, setLabelPositions] = useState([]);
  const overlayHoverRef = useRef(false);
  const [totalValue, setTotalValue] = useState(`${isAmount?countryCode:null}0`);
  const [reRenderChart, setReRenderChart] = useState(true);
  const [slices, setSlices] = useState<any[]>([]);
  const [data, setData] = useState<any>({
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
        const positions = meta.data.map((arc:any) => {
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

  const handleHover = (event:any, elements:any) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      if (!hoverInfo || hoverInfo.index !== index) {
        const pos:any = labelPositions[index];
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



  const options :any= {
    responsive: true,
    maintainAspectRatio: false,
    totalValue: totalValue, // Pass total sales to plugin
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
          generateLabels: (chart:any) => {
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


  useEffect(() => {

    if (dataList?.length) {
      const totalDisplay = dataList?.reduce(
        (sum, item) => sum + (Number(item?.[yKey]) || 0),
        0
      );

      const formattedTotal = isAmount ? amountFormatter(totalDisplay, countryCode) : totalDisplay;
      // Assign colors from predefined palette
      const colors = dataList.map(
        (_, index) => predefinedColors[index % predefinedColors.length]
      );

      setTotalValue(formattedTotal);

      // Sort by totalValue (descending) **ensuring correct numeric sorting**
      const sortedData = [...dataList].sort(
        (a, b) => Number(b?.[yKey] || 0) - Number(a?.[yKey] || 0)
      );

      // Get the top 10 records
      const top10 = sortedData.slice(0, 10)?.map((slice, index) => ({
        label: slice?.[xKey],
        percent: ((Number(slice?.[yKey] || 0) * 100) / totalDisplay),
        color: colors[index],
        ...otherKeys?.reduce((acc:Record<string, any>, item:string) => {
          acc[item] = slice?.[item];
          return acc;
        }, {}),
      }));

      // Sum remaining records into "Other"
      const otherRecords = sortedData.slice(10);
      let tempSlice = top10
      if (otherRecords.length > 0) {
        const other:any=[]    
        const otherSummary = otherRecords.reduce(
          (acc, item) => {

            other.push(item?.[xKey])
            acc.percent += ((Number(item?.[yKey] || 0) * 100) / totalDisplay)
            acc.value += Number(item?.[yKey] || 0)
            otherKeys?.forEach((key) => {
              if(!isNaN(Number(item?.[key]))){
                acc[key] +=Number(item?.[key] || 0)
              }
            });
            return acc;
          },
          { label: "Other", percent: 0, color: colors[10], items: 0, value: 0, ...otherKeys?.reduce((acc:Record<string, any>, item:string) => {
            acc[item] = 0;
            return acc;
          }
          , {}) }
        );


        tempSlice = [...top10, otherSummary]
        if(clickable){
          handleOther && handleOther(other?.join(","));
        }
      }
      const tempData = {
        labels: tempSlice?.map((slice) => slice.label),
        datasets: [
          {
            data: tempSlice.map((slice) => slice.percent),
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
        ref={chartRef}
        data={data}
        options={options}
        plugins={[centerTextPlugin]}
      // redraw={reRenderChart}
      />

      {/* Render floating labels for each slice using computed positions */}
      {/* {labelPositions.length > 0 &&
        slices?.map((slice, index) => {
          const pos:any = labelPositions[index];
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
                    {customLabel?slice.label:null}
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                    {customLabel?<>
                      {xLabel}: {slice.items} <br />
                    </>:<>
                    {xLabel}: {slice.label} <br /></>
                    }                           
                    {yLabel}: {isAmount ? amountFormatter(slice?.orgAmount, countryCode) : slice?.orgAmount}
                  </div>
                  {clickable?
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
                    :null}
                </>
              )}
            </div>
          );
        })} */}

{labelPositions.length > 0 &&
  hoverInfo && // Ensure a slice is actually hovered over
  slices?.map((slice, index) => {
    if (!hoverInfo || hoverInfo.index !== index) return null; // Hide when not hovered
    const pos: any = labelPositions[index];
    if (!pos) return null;
    
    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: `${hoverInfo.x}px`,
          top: `${hoverInfo.y}px`,
          transform: "translate(-50%, -50%)",
          background: "#fff",
          border: `2px solid ${slice.color}`,
          borderRadius: "8px",
          padding: "12px",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "bold",
          pointerEvents: "auto",
          transition: "all 0.2s ease-in-out",
          zIndex: 1000,
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
{clickable?
        <div style={{ color: slice.color, marginBottom: "5px" }}>
          {slice.label}
        </div>
        :null}
        <div style={{ marginBottom: "5px" }}>
          {labelKeys?.map((item) =>   <>
                {item?.key}: {item?.isAmount?amountFormatter(slice[item?.value], countryCode):slice[item?.value]} <br />
              </>
            )}
          Percentage: {(slice.percent)?.toFixed(2)}%
        </div>
        {clickable ? (
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
        ) : null}
      </div>
    );
  })}
    </div>
  );
}

export default DoughnutChart;