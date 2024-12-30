// live reports page
import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { LD } from "../../../assets/mockData/originalAPIData/OliveReportData";
import { DDDD } from "assets/mockData/mock D/nested";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import Table from "../../../components/reportComponents/Table";
import Topnavbar from "../../../components/reportComponents/TopNavbar";
import SidePanel from "pages/SidePanel";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";

const CustomerInsights = () => {
  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SidePanel />
      <div
        className={`live-reports ${isDarkTheme ? "dark-theme" : "light-theme"
          } ${isExpanded ? "l-expanded-width-sales" : ""}`}
      >
        <Topnavbar />
        <div className="cust-insights-head">
          <div className="name-board">
            <h1 className="liveHeader">Reports Dashboard</h1>
          </div>
        </div>
        <div className="location-name">
          <h1>Maghil Restaurant, Parsippany</h1>
        </div>
        <div className="l-live-boxes-container">
          <div className={isExpanded ? "l-live-inner-box-expanded" : "l-live-inner-box"}>
            <div className="l-live-box">
              <h2>Discounts</h2>
              <h3>{LD?.discounts?.map((dis) => dis?.Discounts)}</h3>
            </div>
            <div className="l-live-box">
              <h2>Refund</h2>
              <h3>{LD?.refunds?.map((refund) => refund?.refunds)}</h3>
            </div>
            <div className="l-live-box">
              <h2>Open Sales</h2>
              <h3>{LD?.["open sales"]?.map((openSale) => openSale?.["Open Sales"])}</h3>
            </div>
            <div className="l-live-box">
              <h2>Net Sales</h2>
              <h3>{LD?.["net sales"]?.map((netSale) => netSale?.["Net Sales"])}</h3>
            </div>
          </div>
        </div>
        <div className="tables-container-one">
          <Table
            Heading="Live Orders"
            tableData={LD["Live Orders New"]}
            viewType="full"
            recordsPerPage={3}
          />
        </div>
        <div className="live-orders-non-dine-in">
          <Table Heading="Live Orders (Non-Dine-In)" tableData={LD["Live Orders (Non Dine In)"]} viewType="full" recordsPerPage={5} />
        </div>
        {/* <div className="tables-container-two">
          <Table
            Heading="Pick-Up & Delivery"
            tableData={DDDD["PickUp/Delivery"]}
            viewType="full"
            recordsPerPage={5}
          />
          <Table
            Heading="Check-In"
            tableData={LD["Check-In"]}
            viewType="full"
            recordsPerPage={5}
          />
        </div> */}
      </div>
    </div>
  );
};

export default CustomerInsights;
