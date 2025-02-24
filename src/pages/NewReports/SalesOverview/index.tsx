import React, { useState } from "react";
import ReportsNotFound from "components/reportComponents/ReportsNotFound";
import SalesCard from "components/reportComponents/SalesCard";
// import TenderType from "components/reportComponents/TendorTypeCard";
import CardTypeChart from "components/reportComponents/chart";
import EmployeeSalesChart from "components/reportComponents/chart/chartEmployees";
import DiscountAndVoidedOrders from "components/reportComponents/chart/DiscountAndVoidedOrders";
import ChannelSalesChart from "components/reportComponents/chart/channelChart";
import RevenueClassChart from "components/reportComponents/chart/RevenueClassChart";
import StoreFilter from "components/reportComponents/StoreFilter";
import "./SalesOverview.scss"
import CardWithMiniGraph from "components/reportComponents/CardWithMiniGraph";
// import TenderCard from "components/reportComponents/TendorTypeCard/TendorCard";

import { ReactComponent as ArrowDown } from "../../../assets/svg/arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../../assets/svg/arrow-down.svg";
import { ReactComponent as PayTapIcon } from "../../../assets/svg/pay_tap.svg";
// import TenderType from "components/reportComponents/TendorTypeCard";
import DownloadPopOver from "pages/CategoryReport/downloadOption";
import LinearBarChart from "pages/CategoryReport/barChart";


const tabs = ["Today's report", "Sales Overview", "Categories", "Employees", "Trends"];
interface ReportProps { }

const SalesOverview: React.FC<ReportProps> = () => {
  const [selectedDate, setSelectedDate] = useState({ label: "Yesterday", value: "Yesterday" });
  const [selectedStore, setSelectedStore] = useState({ label: "A2B Princeton", value: "A2B Princeton" });
  const salesData = [
    { type: "Total Sales", amount: "$8500.90", trend: "+20%", positive: true, showLineChart: true },
    { type: "Net Sales", amount: "$6990.50", trend: "+20%", positive: true, showLineChart: true },
    { type: "Total Tax", amount: "$425.00", trend: "-20%", positive: false, showLineChart: true },
    { type: "Total Tips", amount: "$250.00", trend: "-20%", positive: false, showLineChart: true },
  ];

  const tenderData = [
    {
      icon: <PayTapIcon />,
      title: "Swipe/Tap/Dip",
      amount: "$3058.50",
      orders: 46,
      percentage: 18,
      details: {
        onPremOrders: 35,
        onPremSales: "$2520.00",
        offPremOrders: 11,
        offPremSales: "$1536.50",
      },
    },
    {
      icon: <PayTapIcon />,
      title: "Keyed In",
      amount: "$3058.50",
      orders: 46,
      percentage: 6,
      details: {
        onPremOrders: 35,
        onPremSales: "$2520.00",
        offPremOrders: 11,
        offPremSales: "$1536.50",
      },
    },
    {
      icon: <PayTapIcon />,
      title: "Cash",
      amount: "$3058.50",
      orders: 46,
      percentage: 13,
    },
    {
      icon: <PayTapIcon />,
      title: "UberEats",
      amount: "$3058.50",
      orders: 46,
      percentage: 12,
    },
    {
      icon: <PayTapIcon />,
      title: "Google Pay",
      amount: "$3058.50",
      orders: 46,
      percentage: 29,
    },
  ];


  return (
    <>

      {/* Date and Store */}
      <StoreFilter selectedDate={selectedDate} selectedStore={selectedStore} setSelectedDate={setSelectedDate} setSelectedStore={setSelectedStore} />

      {/*  ReportsNotFound*/}
      {/* <ReportsNotFound status="notFound"/>
          <ReportsNotFound status="error"/> */}

      {/*  Total Sales*/}

      <div className="sales-overview">
        <h2>Total Sales Overview</h2>
        <div className="grid">

          {/* {salesData.map((data, index) => (
            <SalesCard key={index} {...data} />
          ))} */}
        </div>
      </div>

      <div className="todays-report-sales-overview-box-container-parent">
        <h2>Sales Overview</h2>
        <div className="todays-report-sales-overview-box-container">
          <CardWithMiniGraph cardTitle="Total Sales" cardValue={8500.90} isMonetary={true} loader={false} showMiniGraph={true} incrementOrDecrement="increment" graphType="arrow" isPercent={true} />
          <CardWithMiniGraph cardTitle="Net Sales" cardValue={6990.90} isMonetary={true} loader={false} showMiniGraph={true} incrementOrDecrement="increment" graphType="arrow" isPercent={true} />
          <CardWithMiniGraph cardTitle="Total Tax" cardValue={425.00} isMonetary={true} loader={false} showMiniGraph={true} incrementOrDecrement="increment" graphType="arrow" isPercent={true} />
          <CardWithMiniGraph cardTitle="Total Tips" cardValue={250.00} isMonetary={true} loader={false} showMiniGraph={true} incrementOrDecrement="decrement" graphType="arrow" isPercent={true} />
          <CardWithMiniGraph cardTitle="Gratuity" cardValue={350.00} isMonetary={true} loader={false} showMiniGraph={true} incrementOrDecrement="decrement" graphType="arrow" isPercent={true} />
          <CardWithMiniGraph cardTitle="Transactions" cardValue={2135} isMonetary={false} loader={false} showMiniGraph={true} incrementOrDecrement="increment" graphType="arrow" isPercent={true} />
          <CardWithMiniGraph cardTitle="Discount" cardValue={155.50} isMonetary={true} loader={false} showMiniGraph={true} incrementOrDecrement="decrement" graphType="arrow" isPercent={true} />
          <CardWithMiniGraph cardTitle="Cancelled" cardValue={80.00} isMonetary={true} loader={false} showMiniGraph={true} incrementOrDecrement="decrement" graphType="arrow" isPercent={true} />
        </div>
      </div>

      {/* Tendor type */}
      {/* <div className="tender-list">
      {tenderData.map((tender, index) => (
        <TenderCard key={index} {...tender} />
      ))}
    </div> */}
      <div>
        <h2>Tendor Type</h2>
      </div>
      <div className="reports-tendor-container">
        <div className="left-section">
          <h3>Debit card</h3>
          {/* <TenderType
            icon={<PayTapIcon/>}               />
          <TenderType />

          <h3>Cash</h3>
          <TenderType />
          <h3>Aggregators</h3>
          <TenderType />
          <TenderType />
          <TenderType />

        </div>
        <div className="right-section">
          <h3>Credit card</h3>
          <TenderType />
          <TenderType />
          <h3>Coupons</h3>
          <TenderType />
          <TenderType />
          <h3>Digital Payments</h3>
          <TenderType />
          <TenderType />
          <TenderType /> */}

        </div>


      </div>

      <h2>By Card Type</h2>
      <CardTypeChart />

      <h2>By Employees</h2>
      <EmployeeSalesChart />

      <h2>By Channel</h2>
      <ChannelSalesChart />
      
      <div style={{ display: "flex", width: "100%", height: "500px" }}>
        <div className="left-section" style={{ width: "50%", height: "100%" }}>
          <h2>By Discount</h2>
          <DiscountAndVoidedOrders />
        </div>
        <div className="right-section" style={{ width: "50%", height: "100%" }}>
          <h2>Voided orders</h2>
          <DiscountAndVoidedOrders />
        </div>


      </div>
      <h2>By Revenue class</h2>
      <RevenueClassChart />
    </>
  );
};

export default SalesOverview;
