import React from "react";
import "./style.scss";

const BarChartShimmer: React.FC = () => {
    return (
        <div className="rep-bar-shimmer-wrapper">
            <div className="rep-bar-shimmer-header"></div>
            <div className="rep-bar-shimmer-chart">
                {[...Array(5)].map((_, idx) => (
                    <div key={idx} className="rep-bar-shimmer-bar">
                        <div className="rep-bar-shimmer-bar-inner"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BarChartShimmer;