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
import "./style.scss";
import { ThemeContext } from "../../../../helpers/context/ThemeContext";

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
}: BarchartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const isDarkTheme = useContext(ThemeContext);

  useEffect(() => {
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
      className={`c-bar-chart-container ${
        isDarkTheme ? "chart-dark-js" : "chart-light-js"
      }`}
    >
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;
