import React, { useState } from "react";
import SidePanel from "../../SidePanel";
import "./report.scss";
import Header from "components/Header";
import SalesOverview from "../SalesOverview";

const tabs = ["Today's report", "Sales Overview", "Categories", "Employees", "Trends"];

interface ReportProps { }

const SalesReport: React.FC<ReportProps> = () => {
    const [activeTab, setActiveTab] = useState("Sales Overview");
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <SidePanel />
                <div className="reportsContainer">

                    {/* Header */}
                    <Header isExpanded={isExpanded} title="Reports & Insights" />

                    {/* Tab Navigation */}
                    <div className={"tabsContainer"}>
                        {tabs.map((tab) => (
                            <div
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`${"tab"} ${activeTab === tab ? "active" : ""}`}
                            >
                                {tab}
                                {activeTab === tab && <span className={"underline"}></span>}
                            </div>
                        ))}
                    </div>

                    {/* Sample Screen (Dynamic Content) */}
                    <div className={"sampleScreen"}>
                        {activeTab === "Today's Report" ? (
                            <div className={"noData"}>
                                <img src="/no-report.png" alt="No report available" />
                                <h3>Today's Sales Report Not Available</h3>
                                <p>
                                    Sales data for today will be available after business hours when the day is closed.
                                    Please check back later or view previous days' reports.
                                </p>
                            </div>
                        ) : (
                            <div>
                                {/* Tabs: all tabs comes here */}
                                {activeTab === "Sales Overview" ? (
                                    <SalesOverview />
                                ) : (<>
                                    <h3>{activeTab}</h3>
                                    <p>Data visualization or insights for {activeTab} will be shown here.</p>
                                </>)}

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SalesReport;
