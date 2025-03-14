import React from 'react';
import LineOrMultiChart from 'components/reportComponents/ReusableCharts/LineOrMultiChart';
import ChartComponent, { MultiDataType } from 'components/reportComponents/ReusableCharts/ReusableLineChart';
import "./style.scss";


const salesPerformanceData = [
  {
    day: "Sunday",
    employees: [
      { name: "James Bond", orders: 30, sales: 120.5, tips: 25.0, gratuities: 18.0 },
      // { name: "Alan Fox", orders: 45, sales: 220.0, tips: 40.0, gratuities: 35.5 },
      // { name: "Ajith Kumar", orders: 20, sales: 50.0, tips: 15.0, gratuities: 10.0 },
    ],
  },
  {
    day: "Monday",
    employees: [
      { name: "Alan Fox", orders: 25, sales: 80.0, tips: 20.0, gratuities: 15.0 },
      // { name: "Alan Fox", orders: 40, sales: 150.0, tips: 30.0, gratuities: 25.0 },
      // { name: "Ajith Kumar", orders: 28, sales: 90.0, tips: 18.0, gratuities: 12.5 },
    ],
  },
  {
    day: "Tuesday",
    employees: [
      { name: "Ajith Kumar", orders: 35, sales: 110.0, tips: 22.5, gratuities: 17.0 },
      // { name: "Alan Fox", orders: 42, sales: 135.5, tips: 38.5, gratuities: 40.5 },
      // { name: "Ajith Kumar", orders: 50, sales: 250.0, tips: 45.0, gratuities: 35.0 },
    ],
  },
  {
    day: "Wednesday",
    employees: [
      { name: "Shunmuga", orders: 40, sales: 150.0, tips: 30.0, gratuities: 20.0 },
      // { name: "Alan Fox", orders: 30, sales: 70.0, tips: 25.0, gratuities: 18.0 },
      // { name: "Ajith Kumar", orders: 38, sales: 130.0, tips: 28.5, gratuities: 20.0 },
    ],
  },
  {
    day: "Thursday",
    employees: [
      { name: "Siddharth", orders: 42, sales: 160.0, tips: 28.0, gratuities: 22.0 },
      // { name: "Alan Fox", orders: 25, sales: 60.0, tips: 18.5, gratuities: 14.5 },
      // { name: "Ajith Kumar", orders: 32, sales: 100.0, tips: 22.0, gratuities: 17.5 },
    ],
  },
  {
    day: "Friday",
    employees: [
      { name: "Jayesh", orders: 45, sales: 170.0, tips: 35.0, gratuities: 24.0 },
      // { name: "Alan Fox", orders: 37, sales: 130.0, tips: 32.5, gratuities: 20.0 },
      // { name: "Ajith Kumar", orders: 46, sales: 200.0, tips: 40.0, gratuities: 30.0 },
    ],
  },
  {
    day: "Saturday",
    employees: [
      { name: "Ramanadhaa", orders: 50, sales: 190.0, tips: 38.0, gratuities: 28.0 },
      // { name: "Alan Fox", orders: 40, sales: 140.0, tips: 36.0, gratuities: 22.5 },
      // { name: "Ajith Kumar", orders: 44, sales: 160.0, tips: 37.5, gratuities: 25.0 },
    ],
  },
];


const revenueImpactData = [
  { day: "Sunday", Sales: 40 },
  { day: "Monday", Sales: 60 },
  { day: "Tuesday", Sales: 42 },
  { day: "Wednesday", Sales: 42.5 },
  { day: "Thursday", Sales: 30 },
  { day: "Friday", Sales: 58 },
  { day: "Saturday", Sales: 45 },
];

// const salesPerformanceComparisonData = [
//   { day: "Sunday", JamesBond: 100, AlanFox: 220, AjithKumar: 80 },
//   { day: "Monday", JamesBond: 90, AlanFox: 150, AjithKumar: 110 },
//   { day: "Tuesday", JamesBond: 120, AlanFox: 135.5, AjithKumar: 260 },
//   { day: "Wednesday", JamesBond: 140, AlanFox: 100, AjithKumar: 180 },
//   { day: "Thursday", JamesBond: 130, AlanFox: 50, AjithKumar: 90 },
//   { day: "Friday", JamesBond: 160, AlanFox: 110, AjithKumar: 190 },
//   { day: "Saturday", JamesBond: 180, AlanFox: 120, AjithKumar: 150 },
// ];

const PerformanceTrend = () => {
  const multiLineColors = ["#049E16", "#F89B29", "#2682D9","#FF5733","#FF33A1","#A133FF","#33FFF5","#FF6F61","#6B8E23","#DC143C"];

  const chartFilterOptions: { value: string, label: string }[] = [
    { value: "Overall", label: "Overall" },
    { value: "Weekdays", label: "Weekdays" },
    { value: "Weekends", label: "Weekends" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
  ];
  const orderFilterOptions = [
    { value: "Orders", label: "Orders" },
    { value: "Sales", label: "Sales" },
    { value: "Tips", label: "Tips" },
    { value: "Gratuities", label: "Gratuities" },
  ]
  const refundsFilterOptions = [
    { value: "Refunds", label: "Refunds" },
    { value: "Complementary", label: "Complementary" },
    { value: "Taxes", label: "Taxes" },
    { value: "Tips", label: "Tips" },
    { value: "Discounts", label: "Discounts" },
    { value: "Gratuities", label: "Gratuities" },
  ]
  const deletedFilterOptions = [
    { value: "Deleted", label: "Deleted" },
    { value: "Voids", label: "Voids" },
    { value: "Re-fires", label: "Re-fires" },
  ]
  const handleChartFilter = (selectedValue: string, kpiTitle: string) => {
    console.log(`Filter changed to ${selectedValue} for kpiTitle : ${kpiTitle}`);
  };
  const transformSalesDataForChart = (salesPerformanceData: any[]): MultiDataType[] => {
    return salesPerformanceData.map((dayData) => {
      const transformedEntry: MultiDataType = { day: dayData.day }; // Ensure type compatibility
  
      dayData.employees.forEach((employee: any) => {
        transformedEntry[`Employee`] = employee.name;
        transformedEntry[`Orders`] = employee.orders;
        transformedEntry[`Sales`] = employee.sales;
        transformedEntry[`Tips`] = employee.tips;
        transformedEntry[`Gratuities`] = employee.gratuities;
      });
  
      return transformedEntry;
    });
  };
  
  const salesPerformanceComparisonData: MultiDataType[] = transformSalesDataForChart(salesPerformanceData);
  
  return (
    <div className='performance-trend-page-container'>
      <ChartComponent kpiTitle="Single Line Chart" kpiLoaderState={false} chartFilterOptions={chartFilterOptions} handleChartFilter={handleChartFilter} showChartFilter={true} showDownloadReport={true} graphType="single" data={revenueImpactData} colors={["#F89B29"]}/>

      <ChartComponent kpiTitle="Multi Line Chart" kpiLoaderState={false} chartFilterOptions={orderFilterOptions} handleChartFilter={handleChartFilter} showChartFilter={true} showDownloadReport={true} graphType="multi" data={salesPerformanceComparisonData} colors={multiLineColors}/>
    </div>
  )
}

export default PerformanceTrend
