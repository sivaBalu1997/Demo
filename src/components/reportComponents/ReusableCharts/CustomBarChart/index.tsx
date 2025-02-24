import React, { useEffect, useRef } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import DownloadReport from "components/reportComponents/DownloadReports";
import "./style.scss";

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
    barColor?: string;
    barStyle?: React.CSSProperties;
    showGrid?: boolean;
    gridColor?: string;
    gridStrokeWidth?: number;
    kpiTitle?: string;
    showRelatedTable: boolean;
    setShowRelatedTable: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    tooltipData: TooltipData;
    showRelatedTable: boolean;
    setShowRelatedTable: React.Dispatch<React.SetStateAction<boolean>>;
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, tooltipData, showRelatedTable, setShowRelatedTable }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0].payload;
        const tooltipInfo = tooltipData[name];

        if (!tooltipInfo) return null;

        const handleClick = () => {
            // alert(`Viewing details for: ${name}`);
            setShowRelatedTable(true);
        };

        return (
            <div className="custom-tooltip">
                <p className="label"><strong>{name}</strong></p>
                {/* <p className="desc">{tooltipInfo.tooltipContent}</p> */}
                <p>Tax amount: <strong>${value}</strong></p>
                <button onClick={handleClick}>VIEW DETAILS</button>
            </div>
        );
    }
    return null;
};

// Reusable Bar Chart Component
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
    setShowRelatedTable
}) => {
    // useEffect(() => {
    //     const resizeObserverError = (event: any) => {
    //         if (event.message === 'ResizeObserver loop completed with undelivered notifications.') {
    //             event.stopImmediatePropagation();
    //         }
    //     };
    //     window.addEventListener('error', resizeObserverError);
    //     return () => {
    //         window.removeEventListener('error', resizeObserverError);
    //     };
    // }, []);
    const chartRef = useRef<HTMLDivElement>(null);
    return (
        <div className="chart-wrapper">
            <div className="custom-chart-container" ref={chartRef}>
                <div className="title-and-downloadable">
                    <h3 className="chart-title">{kpiTitle}</h3>
                    <DownloadReport downloadRef={chartRef} kpiTitle={kpiTitle} tableData={data} />
                </div>
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
                                />
                            }
                            wrapperStyle={{ pointerEvents: "auto" }} // Allows interaction inside tooltip
                            position={{ y: 200 }}
                        />
                        <Bar dataKey="value" fill={barColor} style={barStyle} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CustomBarChart;
