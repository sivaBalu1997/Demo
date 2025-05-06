import React, { useState } from "react";
import "./TabNavigation.scss"

interface TabNavigationProps {
    tabs: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const TabNavigation = ({ tabs, activeTab, setActiveTab}: TabNavigationProps) => {

    return (
        <div className={"reports-tab-container"}>
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
    );
};

export default TabNavigation;
