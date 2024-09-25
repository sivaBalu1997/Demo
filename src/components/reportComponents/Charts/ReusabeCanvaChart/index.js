import React, { useContext } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "./style.scss";
import { ThemeContext } from "../../../../context/ThemeContext";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ReusableCanvaChart = ({ options }) => {
  const {isDarkTheme}= useContext(ThemeContext);
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
