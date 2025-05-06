import React, { useState } from "react";
import "./style.scss";

const tabs = [
    { id: "today", label: "Today's Report" },
    { id: "sales", label: "Sales Overview" },
    { id: "categories", label: "Categories" },
    { id: "employees", label: "Employees" },
    { id: "trends", label: "Trends" },
];

interface ReportsTabSwitchProps {
    onTabChange: (activeTab: string) => void;
}

const ReportsTabSwitch: React.FC<ReportsTabSwitchProps> = ({ onTabChange }) => {
    const [activeTab, setActiveTab] = useState<string>("today");

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        onTabChange(tabId);
    };

    return (
        <div className="reports-tab-switch">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`tab ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => handleTabClick(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default ReportsTabSwitch;
