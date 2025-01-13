import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { custIn } from "../../../assets/mockData/originalAPIData/OcustomerInsights";
import DatePicker from "react-datepicker";
import Table from "../../../components/reportComponents/Table";
import SidePanel from "pages/SidePanel";
import Topnavbar from "components/reportComponents/TopNavbar";
import "./style.scss";

const CustIns: React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [openFilter, setOpenFilter] = useState(false);
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const [totalPageNoCurrentPageCustomerOrderDetails, setTotalPageNoCurrentPageCustomerOrderDetails] = useState<number>(5)
  const [currentPageCustomerOrderDetails, setCurrentPageCustomerOrderDetails] = useState<number>(1);
  console.log({ currentPageCustomerOrderDetails });

  const [totalPageNoCurrentPageDineInInsights, setTotalPageNoCurrentPageDineInInsights] = useState<number>(5)
  const [currentPageDineInInsights, setCurrentPageDineInInsights] = useState<number>(1);
  console.log({ currentPageDineInInsights });

  const openFilterDropDown = () => {
    setOpenFilter((op) => !op);
  };
  const [openCustomDateRange, setOpenCustomDateRange] = useState(false);
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
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SidePanel />
      <div
        className={`ci-employee-container ${isDarkTheme ? "dark-theme" : "light-theme"
          } ${isExpanded ? "ci-on-expanded" : ""}`
        }
      >
        <Topnavbar />
        <div className="employee-head">
          <div className="name-board">
            <h1>Reports Dashboard</h1>
          </div>
          <div className="dates">
            <div className="label-time-period">
              <p className="e-time-period-label">Select Time Period</p>
            </div>
            <div className="filter-toggle-btn-container">
              <div className="filter-toggle-btn" onClick={openFilterDropDown}>
                {selectedPeriod}
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
          <div className="ci-date-range-style">
            <label className="ci-dateLabel" htmlFor="ci-start-date">
              From
            </label>
            <DatePicker
              placeholderText="Start Date"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat="dd MMM yyyy"
              className="ci-start-date"
              onSelect={() => setOpenStartDatePicker(false)}
              onFocus={() => {
                setOpenStartDatePicker(true);
              }}
            />
            <label className="ci-dateLabel" htmlFor="ci-end-date">
              To
            </label>
            <DatePicker
              placeholderText="End Date"
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              dateFormat="dd MMM yyyy"
              className="ci-end-date"
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Table
            currentPage={currentPageCustomerOrderDetails}
            setCurrentPage={setCurrentPageCustomerOrderDetails}
            Heading="Customer order details"
            tableData={custIn["Customer order details"]}
            viewType="full"
            recordsPerPage={6}
            totalpageNo={totalPageNoCurrentPageCustomerOrderDetails}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Table
            currentPage={currentPageDineInInsights}
            setCurrentPage={setCurrentPageDineInInsights}
            Heading="DineIn Insights"
            tableData={custIn["DineIn Insights"]}
            viewType="full"
            recordsPerPage={6}
            totalpageNo={totalPageNoCurrentPageDineInInsights}
          />
        </div>
      </div>
    </div>
  );
};

export default CustIns;
