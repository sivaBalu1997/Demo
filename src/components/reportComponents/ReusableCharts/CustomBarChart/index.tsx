import React, { useEffect, useRef } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import DownloadReport from "components/reportComponents/DownloadReports";
import "./style.scss";
import ErrorState from "components/reportComponents/errorstatecomponents/ErrorState";

// Type Definitions
interface ChartData {
    name: string;
    value: number;
}

interface TooltipData {
    [key: string]: {
        tooltipContent: string;
    };
}

interface CustomBarChartProps {
    data: ChartData[];
    tooltipData: TooltipData;
    barColor?: string[];
    barStyle?: React.CSSProperties;
    showGrid?: boolean;
    gridColor?: string;
    gridStrokeWidth?: number;
    kpiTitle?: string;
    showRelatedTable: boolean;
    setShowRelatedTable: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedValueForChartSlice: React.Dispatch<React.SetStateAction<string>>;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    tooltipData: TooltipData;
    showRelatedTable: boolean;
    setShowRelatedTable: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedValueForChartSlice: React.Dispatch<React.SetStateAction<string>>;
}

const CustomTooltip = ({ active, payload, tooltipData, showRelatedTable, setShowRelatedTable, setSelectedValueForChartSlice }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0].payload;
        const tooltipInfo = tooltipData[name];

        if (!tooltipInfo) return null;

        const handleClick = () => {
            setSelectedValueForChartSlice(name);
            setShowRelatedTable(true);
        };

        return (
            <div className="custom-tooltip">
                <p className="label"><strong>{name}</strong></p>
                <p>{name} Amount: <strong>${value}</strong></p>
                <button onClick={handleClick}>VIEW DETAILS</button>
            </div>
        );
    }
    return null;
};


const CustomBarChart: React.FC<CustomBarChartProps> = ({
    data,
    tooltipData,
    barColor = "#6b7d4a",
    barStyle = {},
    showGrid = true,
    gridColor = "#ddd",
    gridStrokeWidth = 1,
    kpiTitle = "KPI Title",
    showRelatedTable,
    setShowRelatedTable,
    setSelectedValueForChartSlice
}) => {
    const chartRef2 = useRef<HTMLDivElement>(null);
    const getBarColor = (index: number) => {
        return barColor.length === 1 ? barColor[0] : barColor[index % barColor.length];
    };
    return (
        <div className="chart-wrapper">
            <div className="custom-chart-container" ref={chartRef2}>
                <div className="title-and-downloadable">
                    <h3 className="chart-title">{kpiTitle}</h3>
                    <DownloadReport downloadRef={chartRef2} kpiTitle={kpiTitle} tableData={data} />
                </div>
                { data?.length === 0 ? 
                (
                    <ErrorState pageTitle="Category report" isDataNotAvailable={true} />
                ) 
                : 
                (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ bottom: 40, left: 20, right: 20, top: 10 }}>
                            {showGrid && <CartesianGrid stroke={gridColor} strokeWidth={gridStrokeWidth} />}
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                content={
                                    <CustomTooltip
                                        tooltipData={tooltipData}
                                        showRelatedTable={showRelatedTable}
                                        setShowRelatedTable={setShowRelatedTable}
                                        setSelectedValueForChartSlice={setSelectedValueForChartSlice}
                                    />
                                }
                                wrapperStyle={{ pointerEvents: "auto" }} // Allows interaction inside tooltip
                                position={{ y: 200 }}
                            />
                            {data.map((entry, index) => (
                                <Bar key={index} dataKey="value" fill={getBarColor(index)} style={barStyle} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                )
                }
            </div>
        </div>
    );
};

export default CustomBarChart;
