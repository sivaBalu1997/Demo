import React, { useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import DownloadReport from "components/reportComponents/DownloadReports";
import CustomDropdown from "components/common/customDropdown";
import "./style.scss";

type ChartProps = {
  graphType: "single" | "multi";
  colors: string[];
  kpiTitle: string;
  chartFilterOptions?: { value: string, label: string }[];
  handleChartFilter?: (selectedValueForChart: string, kpiTitle: string) => void;
  showChartFilter?: boolean;
  showDownloadReport?: boolean;
  kpiLoaderState: boolean;
  customLegendData?: { value: string; color: string }[];
  xyDataForSingleLine?: Record<string, any>[];
  xyDataForMultiLine?: Record<string, any>[];
  toolTipData?: Record<string, any>[];
};

const CustomLegend = ({ customLegendData }: { customLegendData?: { value: string; color: string }[] }) => (
  <div className="custom-legend">
    {customLegendData?.map((entry, index) => (
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
        <span>{entry?.value}</span>
      </div>
    ))}
  </div>
);

const CustomTooltip = ({ active, payload, colors }: any) => {
  const countryCode = useSelector((state: any) => state?.auth?.restaurantDetails?.country);
  const currencySymbol = countryCode === "US" ? "$" : "₹";

  if (!active || !payload || payload?.length === 0) return null;

  const regex = /^(Sales|sales|Tips|tips|Gratuities|gratuities)$/;

  return (
    <div className="custom-tooltip" style={{ borderColor: "lightgray" }}>
      {payload?.map((entry: any, index: number) => (
        entry?.value !== undefined && (
          <p key={index} className="tooltip-item">
            <span className="tooltip-label">{entry?.name || "N/A"}: </span>
            <span className="tooltip-value">{regex.test(entry?.name) ? `${currencySymbol}${entry?.value}` : entry?.value}</span>
          </p>
        )
      ))}
    </div>
  );
};

const ChartComponent: React.FC<ChartProps> = ({
  graphType,
  colors,
  kpiTitle = "Chart title",
  chartFilterOptions,
  handleChartFilter,
  showChartFilter,
  showDownloadReport,
  kpiLoaderState,
  customLegendData,
  xyDataForSingleLine = [],
  xyDataForMultiLine = [],
  toolTipData
}) => {
  const singleMultiRef = useRef<HTMLDivElement>(null);

  const handleChartFilterParent = (selectedValue: { label: string, value: string }) => {
    if (handleChartFilter) {
      handleChartFilter(selectedValue?.value, kpiTitle);
    }
  };

  return (
    <div className="line-re-chart-container" ref={singleMultiRef}>
      <div className="kpi-title-chart-filter-download-container">
        <h1>{kpiTitle}</h1>
        <div className="re-chart-filter-download-container">
          {showChartFilter && (
            <CustomDropdown
              value={chartFilterOptions?.[0]?.value || "option"}
              options={chartFilterOptions || [{ value: "option", label: "option" }]}
              onSelect={handleChartFilterParent}
              placeholder="Select Date"
              className="table-date-dropdown"
              disabled={false}
            />
          )}
          {showDownloadReport && <DownloadReport kpiTitle={kpiTitle} tableData={graphType === "single" ? xyDataForSingleLine : xyDataForMultiLine} downloadRef={singleMultiRef} />}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {graphType === "single" ? (
          <LineChart data={xyDataForSingleLine} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip colors={colors} />} />
            <Line type="linear" dataKey="value" stroke={colors?.[0] || "#8884d8"} strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        ) : (
          <LineChart data={xyDataForMultiLine} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip colors={colors} toolTipData={toolTipData} />} />
            <Legend content={<CustomLegend customLegendData={customLegendData} />} />
            {/* {customLegendData?.map((entry, index) => (
              <Line key={entry?.value} type="linear" dataKey={entry?.value} stroke={colors[index] || "#8884d8"} strokeWidth={2} dot={{ r: 4 }} />
            ))} */}
            {xyDataForMultiLine?.map((mappedData:any, index:number)=>(
                <Line key={mappedData?.name} type="linear" dataKey={mappedData?.name} stroke={colors[index] || "#8884d8"} strokeWidth={2} dot={{ r: 4 }} />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
