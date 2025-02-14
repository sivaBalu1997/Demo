import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ToolTip from "../../../assets/svg/ToolTip.svg"
import "./style.scss";
import ShimmerSummaryBox from './ShimmerSummaryBox';

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
    // const dailyCheckInBoxAPIReduxLoader = useSelector((state: any) => state?.newReports?.dailyCheckInLoading)
    // const dailyGuestBoxAPIReduxloader = useSelector((state: any) => state?.newReports?.dailyGuestLoading)
    // const dailyCancellationBoxAPIReduxLoader = useSelector((state: any) => state?.newReports?.dailyCancellationLoading)
    // const newCustomerSizeBoxAPIReduxLoader = useSelector((state: any) => state?.newReports?.newCustomerSizeLoading)
    // const repeatCustomerCountBoxAPIReduxLoader = useSelector((state: any) => state?.newReports?.customerSizeloading)
    const [currencySymbol, setCurrencySymbol] = useState(countryCode === "US" ? '$' : '₹');
    // useEffect(() => {
    //     setCurrencySymbol(countryCode === "US" ? '$' : '₹');
    // }, [countryCode]);
    // console.log("4444", { currencySymbol })
    const [showSummaryBoxToolTip, setShowSummaryBoxToolTip] = useState<boolean>(false);

    // const isLoading = dailyCheckInBoxAPIReduxLoader && dailyGuestBoxAPIReduxloader && dailyCancellationBoxAPIReduxLoader && newCustomerSizeBoxAPIReduxLoader && repeatCustomerCountBoxAPIReduxLoader;
    // if (isLoading) {
    //     return <ShimmerSummaryBox />;
    // }
    // if (summaryTitle && boxValue) {
    //     return <ShimmerSummaryBox />;
    console.log("5555", { boxValue })
    // }
    return (
        <div className="summary-box">
            {/* <h2>{isMonetary ? currencySymbol : ""}{boxValue || 0}</h2> */}
            {/* <h2>{isMonetary ? `${currencySymbol}${boxValue}` : boxValue}</h2> */}
            {/* <h2>{isMonetary ? `${currencySymbol}${boxValue}` : (boxValue)}</h2> */}
            <h2>{isMonetary ? `${currencySymbol}${boxValue}` : (boxValue)}</h2>
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
