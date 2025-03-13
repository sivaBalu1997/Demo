import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./style.scss";

type SingleDataType = {
  day: string;
  value: number;
};

type MultiDataType = {
  day: string;
  [key: string]: string | number;
};

type ChartProps = {
  graphType: "single" | "multi";
  data: SingleDataType[] | MultiDataType[];
  colors: string[];
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
    if (!active || !payload || payload.length === 0) return null;

    const borderColor = payload?.[0]?.dataKey 
        ? colors?.[payload?.[0]?.dataKey] || "#f9a826" 
        : "#f9a826";

    return (
        <div className="custom-tooltip" style={{ borderColor }}>
            {payload.map((entry: any, index: number) => (
                entry?.value !== undefined && (  // Ensuring entry is valid
                    <p key={index} className="tooltip-item">
                        <span className="tooltip-label">{entry.name || "N/A"}: </span>
                        <span className="tooltip-value">{`$${entry.value}`}</span>
                    </p>
                )
            ))}
        </div>
    );
};

const ChartComponent: React.FC<ChartProps> = ({ graphType, data, colors }) => {
  return (
    <div className="line-re-chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          {graphType === "multi" &&  <Legend content={<CustomLegend />} />}

          {graphType === "single" ? (
            <Line type="linear" dataKey="value" stroke={colors?.[0] || "#8884d8"} strokeWidth={2} dot={{ r: 4 }} />
          ) : (
            Object.keys(data[0])
              .filter((key) => key !== "day")
              .map((key, index) => (
                <Line
                  key={key}
                  type="linear"
                  dataKey={key}
                  stroke={colors[index % colors.length] || "#8884d8"}
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
