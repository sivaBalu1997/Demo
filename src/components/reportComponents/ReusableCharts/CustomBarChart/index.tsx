import React, { useEffect, useRef } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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
    customTooltip?: boolean;
    data: ChartData[];
    tooltipData: TooltipData;
    barColor?: string[] | string;
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
    customTooltip?: boolean;
    data: ChartData[];
    payload?: any[];
    tooltipData: TooltipData;
    showRelatedTable: boolean;
    setShowRelatedTable: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedValueForChartSlice: React.Dispatch<React.SetStateAction<string>>;
    barColor?: string[] | string;
}

const CustomTooltip = ({ data, customTooltip, active, payload, tooltipData, showRelatedTable, setShowRelatedTable, setSelectedValueForChartSlice, barColor }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0].payload;
        const tooltipInfo :any= tooltipData[name];
        const index = data.findIndex(item => item.name === name);
        const currentColor = Array.isArray(barColor) ? barColor[index % barColor.length] : barColor;

        if (!tooltipInfo) return null;

        const handleClick = () => {
            setSelectedValueForChartSlice(customTooltip ?{id: tooltipInfo?.id, name: name} : name);
            setShowRelatedTable(true);
        };

        return (
            <div className="custom-tooltip" style={{ border: `1px solid ${currentColor}` }}>
                {customTooltip ?
                    <>
                    {/* //TODO: MAKE it Dynamic */}
                        <p>Channel: <strong>{name}</strong></p>
                        <p>Quantity: <strong>{value}</strong></p>
                        <button onClick={handleClick} style={{ border: `1px solid ${currentColor}`, backgroundColor: `${currentColor}` }}>VIEW DETAILS</button>
                    </> : <>
                        <p className="label"><strong>{name}</strong></p>
                        <p>{name} Amount: <strong>${value}</strong></p>
                        <button onClick={handleClick} style={{ border: `1px solid ${currentColor}`, backgroundColor: `${currentColor}` }}>VIEW DETAILS</button>
                    </>
                }
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
    customTooltip = false,
    setShowRelatedTable,
    setSelectedValueForChartSlice
}) => {
    const chartRef2 = useRef<HTMLDivElement>(null);
    const getBarColor = (index: number) => {
        return Array.isArray(barColor) ? barColor[index % barColor.length] : barColor as string;
    };
    return (
        <div className="chart-wrapper">
            <div className="custom-chart-container" ref={chartRef2}>
                <div className="title-and-downloadable">
                    <h3 className="chart-title">{kpiTitle}</h3>
                    <DownloadReport downloadRef={chartRef2} kpiTitle={kpiTitle} tableData={data} />
                </div>
                {data?.length === 0 ?
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
                                cursor={{fill: 'transparent'}}
                                    content={
                                        <CustomTooltip
                                            customTooltip={customTooltip}
                                            data={data}
                                            tooltipData={tooltipData}
                                            showRelatedTable={showRelatedTable}
                                            setShowRelatedTable={setShowRelatedTable}
                                            setSelectedValueForChartSlice={setSelectedValueForChartSlice}
                                            barColor={barColor}
                                        />
                                    }
                
                                    wrapperStyle={{ pointerEvents: "auto" }} // Allows interaction inside tooltip
                                    position={{ y: 200 }}
                                />
                                {/* {data.map((entry, index) => ( */}
                                {/* <Bar dataKey="value" fill={getBarColor(1)} style={barStyle} /> */}
                                {/* ))} */}

                                {/* {data.map((entry, index) => (
                                    <Bar 
                                        key={`bar-${index}`}
                                        dataKey="value"
                                        fill={getBarColor(index)}
                                        style={barStyle}
                                        name={entry.name}
                                    />
                                ))} */}

                                {/* <Bar 
                                    dataKey="value"
                                    fill="#000000"
                                    style={barStyle}
                                    fillOpacity={1}
                                    fill={(entry, index) => getBarColor(index)}
                                /> */}

                                {/* <Bar
                                    dataKey="value"
                                    style={barStyle}
                                    name="value"
                                    stroke={(data: any, index: number) => getBarColor(index)}
                                    fill={(data: any, index: number) => getBarColor(index)}
                                /> */}


                                <Bar 
                                    dataKey="value"
                                    style={barStyle}
                                    name="value"
                                >
                                    {data?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )
                }
            </div>
        </div>
    );
};

export default CustomBarChart;
