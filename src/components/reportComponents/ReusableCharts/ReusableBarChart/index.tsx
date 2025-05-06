import React, {  useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";
// @ts-ignore
import ChartDataLabels from "chartjs-plugin-datalabels";
import BarChartShimmer from "components/reportComponents/Charts/BarChartShimmer";
import CustomDropdown from "components/common/customDropdown";
import DownloadReport from "components/reportComponents/DownloadReports";
import SwitchableBox from "components/reportComponents/SwitchableBox";
import "./style.scss";
import { formatNumberByK } from "utils";
import ReportNotFound from "../../ReportsNotFound";

// Register required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

interface BarChartProps {
    kpiTitle: string;
    dataList: Record<string, any>[]; // Accepts any dataset
    loader: boolean;
    error: boolean;
    xKey: string; // Key for X-axis labels
    yKey: string; // Key for Y-axis values
    xLabel: string;
    yLabel: string;
    extraKeys?: string[]; // Additional keys for tooltips (e.g., "orders")
    barColor?: string; // Custom bar color
    title?: string; // Chart title
    xPrefix?: string; // Prefix for X-axis labels
    xSuffix?: string; // Suffix for X-axis labels
    yPrefix?: string; // Prefix for Y-axis values
    ySuffix?: string; // Suffix for Y-axis values
    tooltipStyles?: {
        backgroundColor?: string;
        borderColor?: string;
        titleColor?: string;
        bodyColor?: string;
    };
    formatAmount?: boolean;
    titleFontSize?: number;
    bodyFontSize?: number;
    barPercentage?: number;
    categoryPercentage?: number;
    showChartFilter: boolean,
    handleChartFilter?: (selectedValueForChart: string, kpiTitle: string) => void,
    getToggledValueInParentPage?: (activeTextForChart: string, kpiTitle: string) => void;
    switchableTextOne?: string;
    switchableTextTwo?: string;
    showSwitchable: boolean;
    isYAxisQuantity?: boolean;
    isSwitchActive?: boolean;
    setIsSwitchActive?: () => void;
    chartFilterOptions?: { value: string, label: string }[]
}

// const chartFilterOptions: { value: string, label: string }[] = [
//     { value: "Overall", label: "Overall" },
//     { value: "Weekdays", label: "Weekdays" },
//     { value: "Weekends", label: "Weekends" },
//     // { value: "Lunch", label: "Lunch" },
//     // { value: "Dinner", label: "Dinner" },
// ];

const ReusableBarChart: React.FC<BarChartProps> = ({
    kpiTitle,
    dataList = [],
    loader,
    error,
    xKey,
    yKey,
    xLabel,
    yLabel,
    extraKeys = [],
    barColor = "#1F77B4",
    title = "Sales Chart",
    xPrefix = "",
    xSuffix = "",
    yPrefix = "",
    ySuffix = "",
    formatAmount = false,
    tooltipStyles = {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderColor: "#2196F3",
        titleColor: "#333",
        bodyColor: "#333",
    },
    titleFontSize = 14,
    bodyFontSize = 14,
    barPercentage = 0.6,
    categoryPercentage = 0.6,
    handleChartFilter,
    showChartFilter = true,
    getToggledValueInParentPage,
    switchableTextOne = "Option 1",
    switchableTextTwo = "Option 2",
    showSwitchable = "true",
    isYAxisQuantity = "false",
    isSwitchActive = false,
    setIsSwitchActive = () => { },
    chartFilterOptions = [],
}) => {

    const reusableBarChartRef = useRef<HTMLDivElement>(null)
    const [activeTextForSwitchableBox, setActiveTextForSwitchableBox] = useState<string>(switchableTextOne);
    const [selectedFilter, setSelectedFilter] = useState<{ value: string; label: string; icon?: React.ReactNode } | undefined>(chartFilterOptions?.[0]);

    const data = {
        labels: dataList?.length ? Array.from(
            new Set(dataList?.map((item) => `${xPrefix}${item[xKey]}${xSuffix}`))
        ) : [],
        datasets: [
            {
                label: title,
                data: (dataList || [])?.map((item) => ({
                    x: `${xPrefix}${item[xKey]}${xSuffix}`,
                    y: Number(item[yKey] || 0),
                    ...extraKeys?.reduce((acc, key) => ({ ...acc, [key]: item[key] }), {}),
                })),
                backgroundColor: barColor,
                barPercentage,
                categoryPercentage,
            },
        ],
    };

    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                callbacks: {
                    title: () => "",
                    label: (tooltipItem: any) => {
                        const dataPoint = tooltipItem.raw;
                        const extraInfo = extraKeys
                            ?.map((key) => `${key}: ${dataPoint[key]}`)
                            ?.join("\n");
                        const yValue = isYAxisQuantity ? dataPoint?.y : dataPoint?.y?.toFixed(2);
                        return [
                            `${xLabel}: ${dataPoint?.x}`,
                            `${yLabel}: ${yPrefix}${yValue}${ySuffix}`,
                            //   extraInfo ,
                        ];
                    },
                },
                backgroundColor: tooltipStyles.backgroundColor,
                borderColor: tooltipStyles.borderColor,
                titleColor: tooltipStyles.titleColor,
                bodyColor: tooltipStyles.bodyColor,
                titleFont: { size: titleFontSize },
                bodyFont: { size: bodyFontSize },
                borderWidth: 1,
                padding: 15,
                displayColors: false,
                caretSize: 0,
            },
            datalabels: { display: false },
        },
        scales: {
            x: { grid: { display: false } ,
            // ticks: {
            //     maxRotation: 90,
            //     minRotation:60
            //   }
            ticks: {
                callback: (value: any, index: number, ticks: any) => {
                  const label = data.labels?.[index] || "";
                  const maxLength = 15; // customize this length
                  return label.length > maxLength ? label.slice(0, maxLength) + "..." : label;
                },
              }
        },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${yPrefix}${formatAmount ? formatNumberByK(value) : value}${ySuffix}`,
                }
            },
        },
    };

    const handleChartFilterParent = (selectedValue: { label: string, value: string }) => {
        setSelectedFilter(selectedValue)
        if (handleChartFilter) {
            handleChartFilter(selectedValue?.value, kpiTitle);
        }
    }

    const handleToggleSwitchParent = () => {
        setIsSwitchActive();
        setActiveTextForSwitchableBox((prev) => {
            const newValue = prev === switchableTextOne ? switchableTextTwo : switchableTextOne;
            if (getToggledValueInParentPage) {
                getToggledValueInParentPage(newValue, kpiTitle);
            }
            return newValue;
        });
    }


    if (loader) return <BarChartShimmer />;


    return (
        <div className='report-product-charts-container' ref={reusableBarChartRef}>
            <div className='report-product-heading-download-container'>
                <div className="title-switchable-box-container">
                    <h2 className="report-product-chart-heading">{title || "Chart title"}</h2>
                    {showSwitchable &&
                        <SwitchableBox
                            textOne={switchableTextOne}
                            textTwo={switchableTextTwo}
                            isActive={isSwitchActive}
                            toggleSwitch={handleToggleSwitchParent}
                        />
                    }
                </div>
                <div className="chart-filter-download-report-container" style={{ justifyContent: !showChartFilter ? "flex-end" : "" }}>
                    {showChartFilter &&
                        <div className="chart-filter-container">
                            <CustomDropdown
                                value={selectedFilter}
                                options={chartFilterOptions}
                                onSelect={handleChartFilterParent}
                                placeholder="Select Date"
                                className="table-date-dropdown"
                                disabled={false}
                            />
                        </div>
                    }
                    <DownloadReport kpiTitle={kpiTitle} tableData={dataList} downloadRef={reusableBarChartRef} />
                </div>
            </div>

            <div className='sm-report-product-heading-download-container'>
                <div className="sm-title-chart-filter-download-report-container">
                    <h2 className="sm-report-product-chart-heading">{title || "Chart title"}</h2>
                    {/* <div className="sm-chart-filter-container" style={{ justifyContent: !showChartFilter ? "flex-end" : "" }}> */}
                    {showChartFilter &&
                        <div className="sm-chart-filter-container">
                            <CustomDropdown
                                value={selectedFilter}
                                options={chartFilterOptions}
                                onSelect={handleChartFilterParent}
                                placeholder="Select Date"
                                className="table-date-dropdown"
                                disabled={false}
                            />
                        </div>
                    }
                    {/* </div> */}
                    <DownloadReport kpiTitle={kpiTitle} tableData={dataList} downloadRef={reusableBarChartRef} />
                </div>
                <div className="sm-switchable-box">
                    {showSwitchable &&
                        <SwitchableBox
                            textOne={switchableTextOne}
                            textTwo={switchableTextTwo}
                            isActive={isSwitchActive}
                            toggleSwitch={handleToggleSwitchParent}
                        />
                    }
                </div>
            </div>

            {dataList?.length === 0 ? (
                <ReportNotFound errorType={"reportNotFound"} />
            ) : (error ? <ReportNotFound errorType={"reportNotFound"} /> :
                <div style={{ width: "100%", height: "500px" }}>
                    <Bar data={data} options={options} />
                </div>
            )}
        </div>
    )
};

export default ReusableBarChart;
