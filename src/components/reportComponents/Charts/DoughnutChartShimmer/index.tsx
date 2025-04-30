import React from "react";
import "./style.scss";

const DoughnutChartShimmer = () => {
    return (
        <div className="rep-dough-container">
            <div className="rep-dough-chart">
                <div className="rep-dough-center"></div>
            </div>
            <div className="rep-dough-labels">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="rep-dough-label-shimmer"></div>
                ))}
            </div>
        </div>
    );
};

export default DoughnutChartShimmer;