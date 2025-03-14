import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, GridLineOptions } from "chart.js";
import "./style.scss";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineOrMultiChartProps {
  kpiTitle: string;
  lineColors: string[];
  data: Record<string, any>[];
  graphType: "singleLine" | "multiLines";
  handleChartFilter?: (selectedValueForChart: string, kpiTitle: string) => void;
  xPrefix?: string;
  xSuffix?: string;
  yPrefix?: string;
  ySuffix?: string;
  isQuantity: boolean;
  tooltipStyles?: {
    backgroundColor?: string;
    borderColor?: string;
    titleColor?: string;
    bodyColor?: string;
  };
}

const LineOrMultiChart: React.FC<LineOrMultiChartProps> = ({
  kpiTitle,
  lineColors,
  data,
  graphType,
  handleChartFilter,
  xPrefix,
  xSuffix,
  yPrefix,
  ySuffix,
  isQuantity,
  tooltipStyles
}) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: graphType === "singleLine" ? [
      {
        label: data[0].label,
        data: data[0].values,
        borderColor: lineColors[0],
        fill: false,
      }
    ] : data.map((item, index) => ({
      label: item.label,
      data: item.values,
      borderColor: lineColors[index],
      fill: false,
    })),
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      tooltip: {
        backgroundColor: tooltipStyles?.backgroundColor || '#fff',
        borderColor: tooltipStyles?.borderColor || '#ccc',
        titleColor: tooltipStyles?.titleColor || '#000',
        bodyColor: tooltipStyles?.bodyColor || '#000',
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${value}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          ...( { borderDash: [5, 5] } as Partial<GridLineOptions> ),
        },
        title: {
          display: !!xPrefix || !!xSuffix,
          text: `${xPrefix || ''}X Axis${xSuffix || ''}`,
        },
      },
      y: {
        grid: {
          display: true,
          ...( { borderDash: [5, 5] } as Partial<GridLineOptions> ),
        },
        title: {
          display: !!yPrefix || !!ySuffix,
          text: `${yPrefix || ''}Y Axis${ySuffix || ''}`,
        },
      },
    },
  };

  return (
    <div className='report-product-charts-container'>
      <div className='report-product-heading-download-container'>
        <div className="title-switchable-box-container">
          <h2 className="report-product-chart-heading">{kpiTitle || "Chart title"}</h2>
          {/* Add SwitchableBox component if needed */}
        </div>
        <div className="chart-filter-download-report-container">
          {/* Add CustomDropdown and DownloadReport components if needed */}
        </div>
      </div>
      <div style={{ width: "100%", height: "500px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineOrMultiChart
