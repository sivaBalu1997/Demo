import React, {   useState } from "react";
import ReportsNotFound from "components/reportComponents/ReportsNotFound";
import SalesCard from "components/reportComponents/SalesCard";
import TenderType from "components/reportComponents/TendorTypeCard";
import CardTypeChart from "components/reportComponents/chart";
import EmployeeSalesChart from "components/reportComponents/chart/chartEmployees";
import DiscountAndVoidedOrders from "components/reportComponents/chart/DiscountAndVoidedOrders";
import ChannelSalesChart from "components/reportComponents/chart/channelChart";
import RevenueClassChart from "components/reportComponents/chart/RevenueClassChart";
import StoreFilter from "components/reportComponents/StoreFilter";

const tabs = ["Today's report", "Sales Overview", "Categories", "Employees", "Trends"];

interface ReportProps {}

const SalesOverview: React.FC<ReportProps> = () => {
      const [selectedDate, setSelectedDate] = useState( { label: "Yesterday", value: "Yesterday" });
      const [selectedStore, setSelectedStore] = useState({ label: "A2B Princeton", value: "A2B Princeton" });
  const salesData = [
    { type: "Total Sales", amount: "$8500.90", trend: "+20%", positive: true, showChart: true },
    { type: "Net Sales", amount: "$6990.50", trend: "+20%", positive: true, showVChart: true },
    { type: "Total Tax", amount: "$425.00", trend: "-20%", positive: false, showChart: true },
    { type: "Total Tips", amount: "$250.00", trend: "-20%", positive: false, showVChart: true },
  ];
  

  
  return (
    <>
  
          {/* Date and Store */}
<StoreFilter selectedDate={selectedDate} selectedStore={selectedStore} setSelectedDate={setSelectedDate} setSelectedStore={setSelectedStore}/>

          {/*  ReportsNotFound*/}
          {/* <ReportsNotFound status="notFound"/>
          <ReportsNotFound status="error"/> */}

          {/*  Total Sales*/}

          <div className="sales-overview">
      <h2>Total Sales Overview</h2>
      <div className="grid">
        {salesData.map((data, index) => (
          <SalesCard key={index} {...data} />
        ))}
      </div>
    </div>

{/* Tendor type */}

<TenderType/>

<CardTypeChart/>
<EmployeeSalesChart/>
<ChannelSalesChart/>  
<DiscountAndVoidedOrders/>
<RevenueClassChart/>
        
    </>
  );
};

export default SalesOverview;
