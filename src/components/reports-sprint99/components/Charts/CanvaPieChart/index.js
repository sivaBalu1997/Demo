import React from "react";
import "./style.scss";
import CanvasJSReact from "@canvasjs/react-charts";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CanvaPieChart = ({ options }) => {
  return (
    // <div>
    <>
      <CanvasJSChart options={options} />
    </>
    // </div>
  );
};

export default CanvaPieChart;
