import React, { useState } from 'react'
import ToolTip from "../../../assets/svg/ToolTip.svg"
import "./style.scss";
import { useSelector } from 'react-redux';

interface SummaryBoxProps {
    summaryTitle: string;
    boxValue: number | string;
    toolTipMessage?: string;
    isMonetary?: boolean;
}

const SummaryBox = ({ summaryTitle, boxValue, toolTipMessage, isMonetary }: SummaryBoxProps) => {
    const countryCode = useSelector(
        (state: any) => state?.auth?.restaurantDetails?.country
    );
    const currencySymbol = countryCode === "US" ? '$' : '₹';
    const [showSummaryBoxToolTip, setShowSummaryBoxToolTip] = useState<boolean>(false);
    return (
        <div className="summary-box">
            {boxValue ? <h2>
                {isMonetary === true ? currencySymbol : ""}{boxValue}
            </h2> :
                // <p className="s-summary-no-data">No data found!</p>
                <h2>{isMonetary === true ? currencySymbol : ""}{0}</h2>
            }
            <div className="label-tooltip-container">
                <h3>{summaryTitle}</h3>
                {toolTipMessage && <div
                    className="s-tooltip-wrapper"
                    onMouseEnter={() => setShowSummaryBoxToolTip(true)}
                    onMouseLeave={() => setShowSummaryBoxToolTip(false)}
                >
                    <img className="s-tool-tip-image" src={ToolTip} alt="tool-tip" />
                    {showSummaryBoxToolTip && (
                        <div className="tool-tip-content">
                            {toolTipMessage}
                        </div>
                    )}
                </div>}

            </div>
        </div>
    )
}

export default SummaryBox
