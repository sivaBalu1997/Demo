import React, { useContext, useState } from "react";
import PdfViewer from "../../../components/reportComponents/PdfViewer";
import GenAIPdfJustification from "../../../assets/mockData/originalAPIData/GenAIPDF/A2B justification_report_Parsippany_July.pdf";
import NewDemopdf from "../../../assets/mockData/originalAPIData/GenAIPDF/new sid.pdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import default styles
import { ThemeContext } from "../../../helpers/context/ThemeContext";
import "./style.scss";

const GenAiReports = () => {
  const [startDate, setStartDate] = useState("2023-08-06");
  const [endDate, setEndDate] = useState("2024-08-06");
  const [openJustificationReport, setOpenJustificationReport] = useState(false);
  const {isDarkTheme}= useContext(ThemeContext);

  const [openCustomDateRange, setOpenCustomDateRange] = useState(false);

  const displayCustomDateRange = () => {
    setOpenCustomDateRange((op) => !op);
  };
  const openReport = () => {
    setOpenJustificationReport((open) => !open);
  };
  const [openFilter, setOpenFilter] = useState(false);

  const openFilterDropDown = () => {
    setOpenFilter((op) => !op);
  };

  const [selectedPeriod, setSelectedPeriod] = useState("July 2024"); // Initial state

  const handleOptionClick = (option) => {
    setSelectedPeriod(option); // Update the selected period
    setOpenFilter(false); // Close the dropdown after selecting an option
  };
  return (
    <div
      className={`genai-report ${isDarkTheme ? "dark-theme" : "light-theme"}`}
    >
      <div className="genai-head">
        <div className="genai-name-board">
          <h1>Reports Dashboard</h1>
        </div>
        <div className="dates">
          {/* <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            className="start-date"
          />
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            className="end-date"
          /> */}
          <div className="label-time-period">
            <p>Select Time Period</p>
          </div>
          <div className="filter-toggle-btn-container">
            <div className="filter-toggle-btn" onClick={openFilterDropDown}>
              {selectedPeriod} {/* Display the selected option */}
            </div>
            {openFilter && (
              <div className="filter-drop-down-options">
                <p onClick={() => handleOptionClick("July 2024")}>July 2024</p>
                <p onClick={() => handleOptionClick("June 2024")}>June 2024</p>
                <p onClick={() => handleOptionClick("May 2024")}>May 2024</p>
                <p onClick={() => handleOptionClick("April 2024")}>
                  April 2024
                </p>
              </div>
            )}
          </div>
          {openCustomDateRange && (
            <>
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
            </>
          )}
        </div>
        {/* <div className="dates">
          <div className="filter-toggle-btn-container">
            <div className="filter-toggle-btn" onClick={openFilterDropDown}>
              Select Time Period
            </div>
            {openFilter && (
              <div className="filter-drop-down-options">
                <p>July 2024</p>
                <p>June 2024</p>
                <p>May 2024</p>
                <p>April 2024</p>
              </div>
            )}
          </div>
        </div> */}
      </div>
      <div className="genai-name-board-two">
        <h1>Maghil Restaurant, Parsippany</h1>
      </div>
      <div className="genai-report-pdf">
        <div className="genai-title-head-outer">
          <div className="genai-title-head">
            <h1>User Feedback - AI Report</h1>
            <p className="genai-drop-down" onClick={openReport}>
              View Support Document
            </p>
          </div>
        </div>
        <div className="genai-report-pdf-inner">
          <PdfViewer fileUrl={NewDemopdf} />
        </div>
      </div>
      {openJustificationReport && (
        <div className="genai-support-pdf">
          <div className="genai-support-pdf-title">
            <div className="genai-support-pdf-title-inner">
              <h1>Support Document</h1>
            </div>
          </div>
          <div className="genai-support-pdf-inner">
            <PdfViewer fileUrl={GenAIPdfJustification} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GenAiReports;
