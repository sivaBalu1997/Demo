import React, { useEffect, useRef, useState } from 'react';
import { generateTooltipContent } from 'utils';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import DownloadReport from "components/reportComponents/DownloadReports";
import CustomDropdown from "components/common/customDropdown";
import "./style.scss"
import BarChartShimmer from 'components/reportComponents/Charts/BarChartShimmer';
import ErrorHandler from 'components/reportComponents/ErrorHandler';

export interface Dataset {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    [key: string]: any | number[] | number; // 👈 Allows any additional dataset fields dynamically
}

interface MultiLineChartProps {
    kpiTitle: string;
    chartFilterOptions?: { value: string, label: string }[];
    handleChartFilter?: (selectedValueForChart: string, kpiTitle: string) => void;
    showChartFilter?: boolean;
    showDownloadReport?: boolean;
    kpiLoaderState: boolean;
    onFailureState?: boolean;
    data: {
        labels: string[];
        datasets: Dataset[];
    };
}

// interface TickWithPosition {
//     x: number;
//     y: number;
//   }

// Define the type for the custom plugin
interface CustomDashedGridLinesPlugin {
    id: string; // Unique ID for the plugin
    beforeDraw: (chart: Chart) => void; // Function to execute before drawing the chart
  }

const MultiLineChart: React.FC<MultiLineChartProps> = ({ data, kpiTitle, chartFilterOptions,handleChartFilter, showChartFilter,showDownloadReport,kpiLoaderState, onFailureState }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [selectedFilter, setSelectedFilter] = useState<{ value: string; label: string; icon?: React.ReactNode } | undefined>(chartFilterOptions?.[0]);
    

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                // Destroy the previous chart instance if it exists
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                // const customDashedGridLines: CustomDashedGridLinesPlugin = {
                //     id: 'customDashedGridLines',
                //     beforeDraw: (chart) => {
                //       const ctx = chart.ctx;
                //       const xAxis = chart.scales['x'];
                //       const yAxis = chart.scales['y'];
          
                //       ctx.save();
                //       ctx.strokeStyle = '#CFCFCF'; // Grid line color
                //       ctx.lineWidth = 1; // Grid line width
                //       ctx.setLineDash([5, 5]); // Dashed pattern: 5px dash, 5px gap
          
                //       // Draw vertical grid lines (for X-axis)
                //       xAxis.ticks.forEach((tick) => {
                //         const tickWithPosition = tick as unknown as TickWithPosition; // Cast to custom type
                //         ctx.beginPath();
                //         ctx.moveTo(tickWithPosition.x, yAxis.bottom);
                //         ctx.lineTo(tickWithPosition.x, yAxis.top);
                //         ctx.stroke();
                //       });
          
                //       // Draw horizontal grid lines (for Y-axis)
                //       yAxis.ticks.forEach((tick) => {
                //         const tickWithPosition = tick as unknown as TickWithPosition; // Cast to custom type
                //         ctx.beginPath();
                //         ctx.moveTo(xAxis.left, tickWithPosition.y);
                //         ctx.lineTo(xAxis.right, tickWithPosition.y);
                //         ctx.stroke();
                //       });
          
                //       ctx.restore();
                //     },
                //   };


                // Create a new chart instance
                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            datalabels: {
                                display: false,
                            },
                            legend: {
                                display: true,
                                position: 'bottom', // Moves legend under the chart
                                labels: {
                                    usePointStyle: true, // Disables default point style
                                    generateLabels: (chart) => {
                                        const { datasets } = chart.data;
                                        return datasets.map((dataset, index) => ({
                                            text: dataset.label || `Dataset ${index + 1}`,
                                            fillStyle: dataset.borderColor as string, // Legend color
                                            strokeStyle: dataset.borderColor as string,
                                            lineWidth: 2,
                                            hidden: !chart.isDatasetVisible(index),
                                            datasetIndex: index,
                                            pointStyle: 'rectRounded', // Rounded rectangle legend
                                        }));
                                    },
                                },
                            },
                            tooltip: {
                                enabled: false, // Disable default tooltip
                                external: (context) => {
                                  const tooltipEl = tooltipRef.current;
                                  if (!tooltipEl) return;
                
                                  if (context.tooltip.opacity === 0) {
                                    tooltipEl.style.opacity = '0';
                                    return;
                                  }
                
                                  const dataIndex = context.tooltip.dataPoints[0].dataIndex;
                                  const dataset = data.datasets[context.tooltip.dataPoints[0].datasetIndex];
                                  const label = dataset.label || '';
                
                                  const detailsHTML = generateTooltipContent(dataset, dataIndex); // Use the helper function

                                    tooltipEl.innerHTML = `
                                        <div style="display: flex; flex-direction: column;">
                                            <div style="display: flex; flex-direction: row;">
                                                <span style=" text-align: left; color: #8D8D8D">Label:</span>
                                                <span>${label}</span>
                                            </div>
                                            ${detailsHTML}
                                        </div>
                                        `;

                                  // Position the tooltip relative to the chart
                                  const { caretX, caretY, width } = context.tooltip;
                                  const chartRect = context.chart.canvas.getBoundingClientRect();
                                  const tooltipWidth = tooltipEl.offsetWidth;
                                  const tooltipHeight = tooltipEl.offsetHeight;
                                  const borderColor = dataset.borderColor as string;

                                // **Calculate new position**
                                let left = chartRect.left + caretX;
                                let top = chartRect.top + caretY;

                                // **Check for right boundary overflow**
                                const rightOverflow = left + tooltipWidth > window.innerWidth;
                                if (rightOverflow) {
                                    left -= tooltipWidth * 0.4; // Move slightly left instead of fully shifting
                                }

                                // **Prevent left boundary overflow**
                                if (left < chartRect.left) {
                                    left = chartRect.left + 10;
                                }

                                // **Prevent bottom overflow**
                                if (top + tooltipHeight > window.innerHeight) {
                                    top -= tooltipHeight + 10;
                                }

                
                                  tooltipEl.style.opacity = '1';
                                  tooltipEl.style.borderColor = borderColor;
                                  tooltipEl.style.left = `${left}px`;
                                  tooltipEl.style.top = `${top}px`;
                                },
                              },
                            
                        },
                        interaction: {
                            mode: 'nearest', // Show tooltip for the nearest point
                            intersect: false, // Allow hovering over the line, not just the point
                        },
                        scales: {
                            x: {
                                offset: true,
                                display: true,
                                // title: {
                                //     display: true,
                                //     text: 'Days of the Week',
                                // },
                                grid: {
                                    display: false,
                                    color: '#CFCFCF', // Color of the grid lines
                                    lineWidth: 1, // Width of the grid lines
                                    drawOnChartArea: true,
                                    // borderDash: [5, 5],
                                    // drawTicks: true,
                                    // tickBorderDash: [5, 5],
                                    // tickBorderDashOffset: 10,
                                },
                                // ticks: {
                                //     borderDash: [5, 5], // Dashed lines for axis ticks
                                //   },
                            },
                            y: {
                                display: true,
                                // title: {
                                //     display: true,
                                //     text: 'Sales Metrics',
                                // },
                                beginAtZero: true,
                                grid: {
                                    display: true,
                                    color: '#CFCFCF', // Color of the grid lines
                                    drawOnChartArea: true,
                                    // drawTicks: true,
                                    // tickBorderDash: [10, 10],
                                    // tickBorderDashOffset: 10,
                                    // tickColor: "orange"
                                },
                                // ticks: {
                                //     borderDash: [5, 5], // Dashed lines for axis ticks
                                //   },
                            },
                        },
                    },
                });
            }
        }

        // Cleanup function to destroy the chart instance when the component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [data]);

    const handleChartFilterParent = (selectedValue: { label: string, value: string }) => {
        setSelectedFilter(selectedValue)
        if (handleChartFilter) {
          handleChartFilter(selectedValue?.value, kpiTitle);
        }
      };

    if (kpiLoaderState) return <BarChartShimmer />

    return (
        <div className='multi-line-chart'>
            <div className="multi-line-chart-filter-download-container">
                <h1>{kpiTitle}</h1>
                <div className="multi-line-chart-filter-download">
                    {showChartFilter && data?.datasets && (
                        <CustomDropdown
                            value={selectedFilter || "option"}
                            options={chartFilterOptions || [{ value: "option", label: "option" }]}
                            onSelect={handleChartFilterParent}
                            placeholder="Select Date"
                            className="table-date-dropdown"
                            disabled={false}
                        />
                    )}
                    {showDownloadReport && data?.datasets?.length > 0 && <DownloadReport kpiTitle={kpiTitle} tableData={data?.datasets} />}
                </div>
            </div>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <ErrorHandler data={data} isError={onFailureState} isLoading={kpiLoaderState}>
                    <canvas ref={chartRef} />
                    <div
                        ref={tooltipRef}
                        style={{
                            position: 'fixed', // Use fixed positioning for accurate placement
                            opacity: 0,
                            pointerEvents: 'none',
                            backgroundColor: '#fff',
                            border: '1px solid #2682D9',
                            borderRadius: '4px',
                            padding: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            transition: 'opacity 0.3s',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            transform: 'translate(-50%, -100%)', // Center tooltip above the point
                        }}
                    />
                </ErrorHandler>
            </div>
        </div>
    );
};

export default MultiLineChart;