import React, { useEffect, useState } from "react";
import "../Sales/report.scss";
import Header from "components/reportComponents/Header";
import TabNavigation from "components/common/TabNavigation";
import CheckInLiveReport from "../CheckInLive";
import SidePanel from "pages/SidePanel/indexNew";
import { useDispatch } from "react-redux";

const tabs = ["Live Check-in Report", "Check-in Overview", "Inception"]; //"Trends"

interface ReportProps {}

const CheckInReport: React.FC<ReportProps> = () => {
  const [activeTab, setActiveTab] = useState("Live Check-in Report");
  const [isExpanded, setIsExpanded] = useState(false); //TODO: use redux

  const dispatch = useDispatch();
  /*********************************************************** */

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SidePanel />
        <div className="reports-container ">
          {/* Header */}
          <Header isExpanded={isExpanded} title="Reports & Insights" />

          {/* Tab Navigation */}
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {activeTab === "Live Check-in Report" ? <CheckInLiveReport /> : null}
        </div>
      </div>
    </>
  );
};

export default CheckInReport;
