import React, { useContext, useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./style.scss"; // Import your SCSS for styling
import { ThemeContext } from "../../../../context/ThemeContext";

interface BarchartProps {
  xAxisData: string[];
  yAxisData: number[];
  label?: string;
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  xAxisGridColor?: string;
  yAxisGridColor?: string;
  xAxisTicksColor?: string;
  yAxisTicksColor?: string;
  pluginLegendLabelsColor?: string;
  ttTitleColor?: string;
  ttBodyColor?: string;
  yAxisLabel?: string;
  yAxislabelColor?: string;
  xAxisLabel?: string;
  xAxislabelColor?: string;
  BatChartTitle?: string;
  TitleColor?: string;
  barChartLoading?: any;
}

const BarChart: React.FC<BarchartProps> = ({
  xAxisData,
  yAxisData,
  label = "Data",
  backgroundColor = "rgba(75, 192, 192, 0.2)",
  borderColor = "rgba(75, 192, 192, 1)",
  xAxisGridColor = "#283347",
  yAxisGridColor = "#283347",
  xAxisTicksColor = "#fff",
  yAxisTicksColor = "#fff",
  pluginLegendLabelsColor = "#fff",
  ttTitleColor = "#fff",
  ttBodyColor = "#fff",
  yAxisLabel,
  yAxislabelColor = "",
  xAxisLabel,
  xAxislabelColor = "",
  BatChartTitle = "",
  TitleColor = "",
  barChartLoading
}: BarchartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const isDarkTheme = useContext(ThemeContext);

  const hasData = xAxisData?.length > 0 && yAxisData?.length > 0;

  useEffect(() => {
    if (!hasData) return;
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend
    );

    const ctx = chartRef.current?.getContext("2d");
    if (ctx) {
      const chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: xAxisData,
          datasets: [
            {
              label,
              data: yAxisData,
              backgroundColor: Array.isArray(backgroundColor)
                ? backgroundColor
                : [backgroundColor],
              borderColor: Array.isArray(borderColor)
                ? borderColor
                : [borderColor],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: yAxisGridColor,
              },
              ticks: {
                color: yAxisTicksColor,
              },
              title: {
                display: !!yAxisLabel,
                text: yAxisLabel,
                color: yAxislabelColor,
                font: {
                  size: 14,
                },
              },
            },
            x: {
              grid: {
                color: xAxisGridColor,
              },
              ticks: {
                color: xAxisTicksColor,
              },
              title: {
                display: !!xAxisLabel,
                text: xAxisLabel,
                color: xAxislabelColor,
                font: {
                  size: 14,
                },
              },
            },
          },
          plugins: {
            title: {
              display: !!BatChartTitle,
              text: BatChartTitle,
              color: TitleColor,
              font: {
                size: 25,
                weight: "bold",
              },
            },
            legend: {
              labels: {
                color: pluginLegendLabelsColor,
              },
            },
            tooltip: {
              titleColor: ttTitleColor,
              bodyColor: ttBodyColor,
            },
          },
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [
    hasData,
    xAxisData,
    yAxisData,
    label,
    backgroundColor,
    borderColor,
    xAxisGridColor,
    yAxisGridColor,
    xAxisTicksColor,
    yAxisTicksColor,
    pluginLegendLabelsColor,
    ttTitleColor,
    ttBodyColor,
    yAxisLabel,
    xAxisLabel,
    BatChartTitle,
    isDarkTheme,
    TitleColor,
    xAxislabelColor,
    yAxislabelColor,
  ]);

  return (
    <div
      className={`c-bar-chart-container ${isDarkTheme ? "chart-dark-js" : "chart-light-js"
        }`}
    >
      {barChartLoading ? (
        <div className="no-data-found" style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }} >
          <h2 style={{ color: pluginLegendLabelsColor }}>{BatChartTitle}</h2>
          <div>
            <div className="bar-chart-loader"></div>
          </div>
        </div>
      ) : hasData ? (
        <canvas ref={chartRef}></canvas>
      ) : (
        <div className="no-data-found" style={{ textAlign: "center", marginTop: "20px" }}>
          <h2 style={{ color: pluginLegendLabelsColor }}>{BatChartTitle}</h2>
          <p style={{ color: pluginLegendLabelsColor }}>No Data Found</p>
        </div>
      )
      }
    </div >
  );
};

export default BarChart;