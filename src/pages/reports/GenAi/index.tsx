import React, { useContext, useState } from "react";
import PdfViewer from "../../../components/reportComponents/PdfViewer";
import GenAIPdfJustification from "../../../assets/mockData/originalAPIData/GenAIPDF/A2B justification_report_Parsippany_July.pdf";
import NewDemopdf from "../../../assets/mockData/originalAPIData/GenAIPDF/new sid.pdf";
import { ThemeContext } from "../../../context/ThemeContext";
import "./style.scss";
import SidePanel from "pages/SidePanel";
import Topnavbar from "components/reportComponents/TopNavbar";

const GenAiReports: React.FC = () => {
  const [openJustificationReport, setOpenJustificationReport] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };

  const openReport = () => {
    setOpenJustificationReport((open) => !open);
  };
  const [openFilter, setOpenFilter] = useState(false);

  const openFilterDropDown = () => {
    setOpenFilter((op) => !op);
  };

  const [selectedPeriod, setSelectedPeriod] = useState("July 2024");

  const handleOptionClick = (option: string) => {
    setSelectedPeriod(option);
    setOpenFilter(false);
  };
  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      <SidePanel />
      <div
      className={`genai-report ${isDarkTheme ? "dark-theme" : "light-theme"}`}
    >
      <Topnavbar />
      <div className="genai-head">
        <div className="genai-name-board">
          <h1>Reports Dashboard</h1>
        </div>
        <div className="dates">
          <div className="label-time-period">
            <p>Select Time Period</p>
          </div>
          <div className="filter-toggle-btn-container">
            <div className="filter-toggle-btn" onClick={openFilterDropDown}>
              {selectedPeriod}
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
        </div>
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
    </div>
  );
};

export default GenAiReports;
