import React from "react";
import "./style.scss";
import CanvasJSReact from "@canvasjs/react-charts";

interface CanvaPieChartProps {
  options: any;
}

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CanvaPieChart: React.FC<CanvaPieChartProps> = ({ options }) => {
  return (
    <>
      <CanvasJSChart options={options} />
    </>
  );
};

export default CanvaPieChart;
