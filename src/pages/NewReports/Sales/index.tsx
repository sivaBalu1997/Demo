import React, { useState } from "react";
import "./report.scss";
import SalesOverview from "../SalesOverview/index";
import Header from "components/reportComponents/Header";
import TabNavigation from "components/common/TabNavigation";
import CategoryReport from "pages/CategoryReport";
import TodaysReport from "../TodaysReport";
import Employees from "../Employees";
import SidePanel from "pages/SidePanel";

const tabs = ["Today's report", "Sales Overview", "Categories", "Employees"]; //"Trends"

interface ReportProps {}

const SalesReport: React.FC<ReportProps> = () => {
    const [activeTab, setActiveTab] = useState("Today's report");
    const [isExpanded, setIsExpanded] = useState(false); //TODO: use redux

    

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <SidePanel />
                <div className="reports-container ">

                    {/* Header */}
                    <Header isExpanded={isExpanded} title="Reports & Insights" />

                    {/* Tab Navigation */}
                    <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                    {activeTab === "Sales Overview" ? <SalesOverview /> : null}
                    {activeTab === "Today's report" ? <TodaysReport /> : null}
                    {activeTab === "Categories" ? <CategoryReport /> : null}
                    {activeTab === "Employees" ? <Employees /> : null}
                    {/* {activeTab === "Trends" ?  <Trends /> : null} */}
                </div>
            </div>
        </>
    );
};

export default SalesReport;
