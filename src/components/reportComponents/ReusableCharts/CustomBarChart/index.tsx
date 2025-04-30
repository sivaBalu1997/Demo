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

interface ColorFunction {
    (name: string): string;
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
    getBarColor: ColorFunction; // Add this line
}

const CustomTooltip = ({ data, customTooltip, active, payload, tooltipData, showRelatedTable, setShowRelatedTable, setSelectedValueForChartSlice, barColor, getBarColor }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0].payload;
        const tooltipInfo :any= tooltipData[name];
        const index = data.findIndex(item => item.name === name);
        // const currentColor = Array.isArray(barColor) ? barColor[index % barColor.length] : barColor;
        const currentColor = getBarColor(name);

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
    // const getBarColorSpecifically = (name: string) => {
    //     let color = "#6b7d4a";
    //     switch(name) {
    //       case "Delivery":
    //         color = "#14A789";
    //         break;
    //       case "DineIn":
    //         color = "#E17100";
    //         break;
    //       case "Pickup":
    //         color = "#67833E";
    //         break;
    //       case "Grubhub":
    //         color = "#FF8C00";
    //         break;
    //       case "UberEats":
    //         color = "#06C167";
    //         break; 
    //       case "DoorDash":
    //         color = "#FF0000";
    //         break;
    //       default:
    //         if (Array.isArray(barColor)) {
    //           const index = data.findIndex(item => item.name === name);
    //           color = barColor[index % barColor.length];
    //         } else if (typeof barColor === "string") {
    //           color = barColor;
    //         }
    //     }
    //     return color;
    //   };
    const getBarColorSpecifically = (name: string) => {
        // Specific color mappings
        const colorMap: Record<string, string> = {
            "Delivery": "#14A789",
            "DineIn": "#E17100",
            "Pickup": "#67833E",
            "Grubhub": "#FF8C00",
            "UberEats": "#06C167",  
            "DoorDash": "#FF0000",
            "Swiggy": "#FF6B6B",  
            "Zomato": "#CB202D"  
        };
    
        // Check if we have a specific color for this name
        if (colorMap[name]) {
            return colorMap[name];
        }
    
        // If no specific color, use the barColor array if provided
        if (Array.isArray(barColor) && barColor.length > 0) {
            const index = data.findIndex(item => item.name === name);
            return barColor[index % barColor.length];
        }
    
        // Fallback to default color
        return typeof barColor === 'string' ? barColor : "#6b7d4a";
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
                                            // barColor={barColor}
                                            getBarColor={getBarColorSpecifically}
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
                                        <Cell 
                                            key={`cell-${index}`} 
                                            // fill={getBarColor(index)}
                                            fill={getBarColorSpecifically(entry?.name)}    
                                        />
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
