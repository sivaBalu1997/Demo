import React from "react";
import "./style.scss";

const ShimmerTenderCard = () => {
    return (
        <div className="ten-tender-type ten-shimmer-box">
            <div className="ten-tender-container">
                <div className="ten-tender-section">
                    <div className="ten-tender-grid">
                        <div className="ten-tender-card ten-shimmer-box">
                            <div className="ten-tender-header">
                                <div className="ten-tender-icon ten-shimmer-box"></div>
                                <div className="ten-tender-details">
                                    <div className="ten-tender-details-name">
                                        <p className="ten-tender-title ten-shimmer-box"></p>
                                    </div>
                                    <div className="ten-tender-amount-order-container">
                                        <span className="ten-tender-amount ten-shimmer-box"></span>
                                        <span className="ten-tender-orders ten-shimmer-box"></span>
                                    </div>
                                </div>
                                <div className="ten-tender-percentage ten-shimmer-box"></div>
                            </div>
                            {/* <div className="ten-tender-expand">
                                <div className="ten-expand-row ten-top">
                                    <div className="ten-expand-item ten-shimmer-box"></div>
                                    <div className="ten-expand-item ten-shimmer-box"></div>
                                </div>
                                <div className="ten-expand-row">
                                    <div className="ten-expand-item ten-shimmer-box"></div>
                                    <div className="ten-expand-item ten-shimmer-box"></div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShimmerTenderCard;
