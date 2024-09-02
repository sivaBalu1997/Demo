import React, { useContext } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "./style.scss";
import { ThemeContext } from "../../../../helpers/context/ThemeContext";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface ReusableCanvaChartProps {
  options: any;
}

const ReusableCanvaChart: React.FC<ReusableCanvaChartProps> = ({
  options,
}: ReusableCanvaChartProps) => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <div
      className={`chart-container ${
        isDarkTheme ? "dark-theme" : "light-theme"
      }`}
    >
      <CanvasJSChart options={options} />
    </div>
  );
};

export default ReusableCanvaChart;
