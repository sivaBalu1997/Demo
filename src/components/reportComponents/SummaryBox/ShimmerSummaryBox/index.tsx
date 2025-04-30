import React from "react";
import "./style.scss";

const ShimmerSummaryBox = () => {
    return (
        <div className="summary-box shimmer">
            <div className="shimmer-line shimmer-title"></div>
            <div className="shimmer-line shimmer-value"></div>
        </div>
    );
};

export default ShimmerSummaryBox;