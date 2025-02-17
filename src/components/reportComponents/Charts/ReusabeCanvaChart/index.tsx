import React, { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import CanvasJSReact from "@canvasjs/react-charts";
import "./style.scss";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface ReusableCanvaChartProps {
  ChartTitle?: string
  options: any;
  loader?: boolean;
}

const ReusableCanvaChart: React.FC<ReusableCanvaChartProps> = ({
  options,
  loader = true,
  ChartTitle,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const hasData = options?.data?.some((dataset: any) => dataset.dataPoints?.length > 0);

  return (
    <div className={`chart-container ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      {loader ? (
        <div className="loader"></div>
      ) : hasData ? (
        <CanvasJSChart options={options} />
      ) : (
        <div className="no-data">
          <h2>{ChartTitle}</h2>
          No Data Found!
        </div>
      )}
    </div>
  );
};

export default ReusableCanvaChart;
