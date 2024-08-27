import React, { useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { ThemeContext } from "../../context/ThemeContext";
import { LD } from "../../originalAPIData/OliveReportData";
import Table from '../../components/Table';
import "./style.scss";
import Topnavbar from "components/reports-sprint99/components/TopNavbar";

const CustomerInsights = () => {
  const {isDarkTheme} = useContext(ThemeContext);

  return (
    <div
      className={`live-reports ${isDarkTheme ? "dark-theme" : "light-theme"}`}
    >
      <Topnavbar />
      <div className="cust-insights-head">
        <div className="name-board">
          <h1>Reports Dashboard</h1>
        </div>
      </div>
      <div className="location-name">
        <h1>Maghil Restaurant, Parsippany</h1>
      </div>
      <div className="tables-container-one">
        <Table
          Heading="Live Orders"
          tableData={LD["Dine-In"]}
          viewType="full"
          recordsPerPage={3}
        />
      </div>
      <div className="tables-container-two">
        <Table
          Heading="Pick-Up & Delivery"
          tableData={LD["PickUp/Delivery"]}
          viewType="full"
          recordsPerPage={5}
        />
        <Table
          Heading="Check-In"
          tableData={LD["Check-In"]}
          viewType="full"
          recordsPerPage={5}
        />
      </div>
    </div>
  );
};

export default CustomerInsights;
