// CanvaPieChart.tsx
import React from "react";
import "./style.scss";
import CanvasJSReact from "@canvasjs/react-charts";

// Define the type for the `options` prop
interface CanvaPieChartProps {
  options: any; // You can refine this type based on the actual structure of the `options` prop
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
