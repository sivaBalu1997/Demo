import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "../../../components/reportComponents/Table";
import { EmployeeD } from "../../../assets/mockData/originalAPIData/OemployeeData";
import SidePanel from "pages/SidePanel";
import Topnavbar from "components/reportComponents/TopNavbar";
import "./style.scss";
import { Contextpagejs } from "pages/productCatalog/contextpage";

const EmployeeInsights: React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [openFilter, setOpenFilter] = useState(false);
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);

  const [openStartDatePicker, setOpenStartDatePicker] =
    useState<boolean>(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState<boolean>(false);

  const openFilterDropDown = () => {
    setOpenFilter((op) => !op);
  };
  const [openCustomDateRange, setOpenCustomDateRange] = useState(false);

  const XemployeeNameBar = EmployeeD["Sales By Employee"].map(
    (item) => item["Employee Name"]
  );
  console.log({ XemployeeNameBar });
  const YemployeeSalesBar = EmployeeD["Sales By Employee"].map(
    (item) => item.Sales
  );
  console.log({ YemployeeSalesBar });

  const [selectedPeriod, setSelectedPeriod] = useState("Today");

  const handleOptionClickForDate = (option: string) => {
    setSelectedPeriod(option);
    if (option === "Custom Range") {
      setOpenCustomDateRange(true);
    } else {
      setOpenCustomDateRange(false);
    }
    setOpenFilter(false);
  };

  // console.log(EmployeeD["Sales By Employee"]);
  // console.log("is", isExpanded);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SidePanel />
      <div
        className={`employee-container ${
          isDarkTheme ? "dark-theme" : "light-theme"
        } ${isExpanded ? "e-expanded-width-sales" : ""}`}
      >
        <Topnavbar />
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
                      handleOptionClickForDate("Custom Range")
                    }
                  >
                    Custom Range
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {openCustomDateRange && (
          <div className="e-date-range-style">
            <label className="e-dateLabel" htmlFor="e-start-date">
              From
            </label>
            <DatePicker
              placeholderText="Start Date"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat="dd MMM yyyy"
              className="e-start-date"
              onSelect={() => setOpenStartDatePicker(false)}
              onFocus={() => {
                setOpenStartDatePicker(true);
              }}
            />
            <label className="e-dateLabel" htmlFor="e-end-date">
              To
            </label>
            <DatePicker
              placeholderText="End Date"
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              dateFormat="dd MMM yyyy"
              className="e-end-date"
              onSelect={() => setOpenEndDatePicker(false)}
              onFocus={() => {
                setOpenEndDatePicker(true);
              }}
            />
          </div>
        )}
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
    </div>
  );
};

export default EmployeeInsights;
