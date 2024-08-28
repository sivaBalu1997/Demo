import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../helpers/context/ThemeContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "../../../components/reportComponents/Table";
import { EmployeeD } from "../../../assets/mockData/originalAPIData/OemployeeData";
import moment from "moment";
import "./style.scss";

const EmployeeInsights = () => {
  const {isDarkTheme}= useContext(ThemeContext);
  const [startDate, setStartDate] = useState("2023-08-06");
  const [endDate, setEndDate] = useState("2024-08-06");
  const [openFilter, setOpenFilter] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const openFilterDropDown = () => {
    setOpenFilter((op) => !op);
  };
  const [openCustomDateRange, setOpenCustomDateRange] = useState(false);

  const displayCustomDateRange = () => {
    setOpenCustomDateRange((op) => !op);
  };

  const XemployeeNameBar = EmployeeD["Sales By Employee"].map(
    (item) => item["Employee Name"]
  );
  console.log({ XemployeeNameBar });
  const YemployeeSalesBar = EmployeeD["Sales By Employee"].map(
    (item) => item.Sales
  );
  console.log({ YemployeeSalesBar });

  const [selectedPeriod, setSelectedPeriod] = useState("Today");

  const handleOptionClickForDate = (option) => {
    setSelectedPeriod(option); // Update the selected period
    if (option === "Select Custom Date Range") {
      setOpenCustomDateRange(true);
      setOpenStartDatePicker(true);
      setOpenEndDatePicker(true);
      setStartDate(moment().format("MM-DD-YYYY"));
      setEndDate(moment().format("MM-DD-YYYY"));
    } else {
      setOpenCustomDateRange(false);
      setOpenStartDatePicker(false);
      setOpenEndDatePicker(false);
    }
    setOpenFilter(false);
  };

  console.log(EmployeeD["Sales By Employee"]);
  return (
    <div
      className={`employee-container ${
        isDarkTheme ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="employee-head">
        <div className="name-board">
          <h1>Reports Dashboard</h1>
        </div>
        <div className="dates">
          <div className="label-time-period">
            <p>Select Time Period</p>
          </div>
          <div className="filter-toggle-btn-container">
            <div className="filter-toggle-btn" onClick={openFilterDropDown}>
              {selectedPeriod} {/* Display the selected option */}
            </div>
            {openFilter && (
              <div className="filter-drop-down-options">
                <p onClick={() => handleOptionClickForDate("Today")}>Today</p>
                <p onClick={() => handleOptionClickForDate("This Week")}>
                  This Week
                </p>
                <p onClick={() => handleOptionClickForDate("Last 7 days")}>
                  Last 7 days
                </p>
                <p onClick={() => handleOptionClickForDate("This Month")}>
                  This Month
                </p>
                <p onClick={() => handleOptionClickForDate("Last Month")}>
                  Last Month
                </p>
                <p onClick={() => handleOptionClickForDate("Last 30 days")}>
                  Last 30 days
                </p>
                <p
                  onClick={() =>
                    handleOptionClickForDate("Select Custom Date Range")
                  }
                >
                  Select Custom Date Range
                </p>
              </div>
            )}
          </div>
          {openCustomDateRange && (
            <div className="date-range-style">
              <DatePicker
                placeholderText="Start Date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd MMM yyyy"
                className="start-date"
              />
              <DatePicker
                placeholderText="End Date"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd MMM yyyy"
                className="end-date"
              />
            </div>
          )}
        </div>
      </div>
      <div className="name-board-two">
        <h1>Maghil Restaurant, Parsippany</h1>
      </div>
      <div className="employee-details-container">
        <Table
          Heading="Employee Tips & Fee Summary"
          tableData={EmployeeD["Table one"]}
          viewType="full"
          recordsPerPage={6}
        />
      </div>
      <div className="employee-details-container">
        <Table
          Heading="Sales By Employee - Details"
          tableData={EmployeeD["Sales By Employee"]}
          viewType="full"
          recordsPerPage={6}
        />
      </div>
    </div>
  );
};

export default EmployeeInsights;
