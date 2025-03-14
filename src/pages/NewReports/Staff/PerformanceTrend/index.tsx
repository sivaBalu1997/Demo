import React from 'react';
import "./style.scss";
import LineOrMultiChart from 'components/reportComponents/ReusableCharts/LineOrMultiChart';
import ChartComponent from 'components/reportComponents/ReusableCharts/ReusableLineChart';

const revenueImpactData = [
  { day: "Sunday", value: 40 },
  { day: "Monday", value: 60 },
  { day: "Tuesday", value: 42 },
  { day: "Wednesday", value: 42.5 },
  { day: "Thursday", value: 30 },
  { day: "Friday", value: 58 },
  { day: "Saturday", value: 45 },
];

const salesPerformanceComparisonData = [
  { day: "Sunday", JamesBond: 100, AlanFox: 220, AjithKumar: 80 },
  { day: "Monday", JamesBond: 90, AlanFox: 150, AjithKumar: 110 },
  { day: "Tuesday", JamesBond: 120, AlanFox: 135.5, AjithKumar: 260 },
  { day: "Wednesday", JamesBond: 140, AlanFox: 100, AjithKumar: 180 },
  { day: "Thursday", JamesBond: 130, AlanFox: 50, AjithKumar: 90 },
  { day: "Friday", JamesBond: 160, AlanFox: 110, AjithKumar: 190 },
  { day: "Saturday", JamesBond: 180, AlanFox: 120, AjithKumar: 150 },
];

const PerformanceTrend = () => {
  const multiLineColors = ["#FF6384", "#33ff57", "#3357ff"];
  return (
    <div>
            <h2>Single Line Chart</h2>
      <ChartComponent graphType="single" data={revenueImpactData} colors={["plum"]}/>

      <h2>Multi Line Chart</h2>
      <ChartComponent graphType="multi" data={salesPerformanceComparisonData} colors={multiLineColors}/>
    </div>
  )
}

export default PerformanceTrend
