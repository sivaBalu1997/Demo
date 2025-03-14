import React, { useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import DownloadReport from "components/reportComponents/DownloadReports";
import CustomDropdown from "components/common/customDropdown";
import "./style.scss";
import { useSelector } from "react-redux";


export type SingleDataType = {
  day: string;
  value: number;
};

export type MultiDataType = {
  day: string;
  [key: string]: string | number;
};

type ChartProps = {
  graphType: "single" | "multi";
  data: SingleDataType[] | MultiDataType[];
  colors: string[];
  kpiTitle: string;
  chartFilterOptions?: { value: string, label: string }[];
  handleChartFilter?: (selectedValueForChart : string, kpiTitle : string) => void;
  showChartFilter?: boolean;
  showDownloadReport?: boolean;
  kpiLoaderState: boolean;
  customLegendData?: { value: string; color: string[] }[];
  xyData: {x: string | number, y: string | number}[];
  toolTipData: Record<string, any>[];
};

const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="custom-legend">
        {payload?.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="legend-item" style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                borderRadius: "4px",
                backgroundColor: entry.color,
                marginRight: "5px",
              }}
            ></span>
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

const CustomTooltip = ({ active, payload, colors }: any) => {

  const countryCode = useSelector(    (state: any) => state?.auth?.restaurantDetails?.country  );

  const currencySymbol = countryCode === "US" ? "$" : "₹";

    // const [hoveredKey, setHoveredKey] = useState<string | null>(null);
    if (!active || !payload || payload.length === 0) return null;


    const borderColor = payload?.[0]?.dataKey 
        ? colors?.[payload?.[0]?.dataKey] || "#f9a826" 
        : "#f9a826";
    
      const regex = /^(Sales|sales|Tips|tips|Gratuities|gratuities)$/;

    return (
        <div className="custom-tooltip" style={{ borderColor: "lightgray" }}>
            {payload.map((entry: any, index: number) => (
                entry?.value !== undefined && (  // Ensuring entry is valid
                    <p key={index} className="tooltip-item">
                        <span className="tooltip-label">{entry.name || "N/A"}: </span>
                        <span className="tooltip-value">{regex.test(entry.name) ? `${currencySymbol}${entry.value}` : entry.value}</span>
                    </p>
                )
            ))}
        </div>
    );
};

const ChartComponent: React.FC<ChartProps> = ({ graphType, data, colors, kpiTitle="Chart title", chartFilterOptions, handleChartFilter, showChartFilter, showDownloadReport, kpiLoaderState, customLegendData }) => {

  
  const singleMultiRef = useRef<HTMLDivElement>(null);
  const countryCode = useSelector(    (state: any) => state?.auth?.restaurantDetails?.country  );

  const currencySymbol = countryCode === "US" ? "$" : "₹";
  
  const colorMap = graphType === "multi" 
    ? Object.keys(data[0])
        .filter((key) => key !== "day")
        .reduce((acc, key, index) => {
          acc[key] = colors[index % colors.length] || "#8884d8";
          return acc;
        }, {} as Record<string, string>)
    : { value: colors[0] || "#8884d8" };

  const handleChartFilterParent = (selectedValue: { label: string, value: string }) => {
    if (handleChartFilter) {
      handleChartFilter(selectedValue?.value, kpiTitle);
    }
  }

  const singleKey = graphType === "single" ? Object.keys(data[0]).find(key => key !== "day") : "value";




  return (
    <div className="line-re-chart-container" ref={singleMultiRef}>
      <div className="kpi-title-chart-filter-download-container">
        <h1>{kpiTitle}</h1>
        <div className="re-chart-filter-download-container">
          {showChartFilter && <CustomDropdown
            value={chartFilterOptions?.[0]?.value ? chartFilterOptions?.[0]?.value : {value: "option", label: "option"}}
            options={chartFilterOptions ? chartFilterOptions : [{value: "option", label: "option"}]}
            onSelect={handleChartFilterParent}
            placeholder="Select Date"
            className="table-date-dropdown"
            disabled={false}
          />}
          {showDownloadReport && <DownloadReport kpiTitle={kpiTitle} tableData={data} downloadRef={singleMultiRef} />}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip content={<CustomTooltip colors={colorMap} />} />
          {graphType === "multi" &&  <Legend content={<CustomLegend />} />}

          {graphType === "single" ? (
            <Line type="linear" dataKey={singleKey} stroke={colors?.[0] || "#8884d8"} strokeWidth={2} dot={{ r: 4 }} />
          ) : (
            Object.keys(data[0])
              .filter((key) => key !== "day")
              .map((key, index) => (
                <Line
                  key={key}
                  type="linear"
                  dataKey={key}
                  stroke={colorMap[key]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              ))
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
