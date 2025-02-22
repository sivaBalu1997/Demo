import React from "react";
import "./style.scss";

const ShimmerCardMiniGraph: React.FC = () => {
    return (
        <div className="shimmer-card-mini-graph-container">
            {/* Card Header Shimmer */}
            <div className="shimmer-card-title-value-container">
                <div className="shimmer shimmer-title"></div>
                <div className="shimmer shimmer-value"></div>
            </div>

            {/* Mini Graph Section Shimmer */}
            <div className="shimmer-mini-graph-container">
                <div className="shimmer increment-decrement-shimmer"></div>
                <div className="shimmer mini-graph-shimmer"></div>
            </div>
        </div>
    );
};

export default ShimmerCardMiniGraph;
