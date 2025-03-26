import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as IncrementGraph } from "../../../assets/svg/r-increment-graph-icon.svg";
import { ReactComponent as IncrementArrow } from "../../../assets/svg/r-increment-arrow-icon.svg";
import { ReactComponent as DecrementGraph } from "../../../assets/svg/r-decrement-graph-icon.svg";
import { ReactComponent as DecrementArrow } from "../../../assets/svg/r-decrement-arrow-icon.svg";
import { ReactComponent as LossArrowIcon } from "../../../assets/svg/lossArrow1.svg";
import { ReactComponent as GainArrowIcon } from "../../../assets/svg/gainarrow1.svg";
import { ICardWithMiniGraphProps } from "interface/newReportsInterface";
import { getCurrencySymbol, transformSalesData } from "utils";
import ShimmerCardMiniGraph from "./ShimmerCardMiniGraph";
import "./style.scss";


const CardWithMiniGraph: React.FC<ICardWithMiniGraphProps> = ({
    cardTitle,
    cardValue,
    showMiniGraph,
    isMonetary=false,
    incrementDecrementValue,
    loader,
    isPercent,

    graphType = "chart"
}) => {
    const incrementOrDecrement = useMemo(() => transformSalesData(incrementDecrementValue || 0), [incrementDecrementValue]);
    const countryCode = useSelector(
          (state: any) =>  state?.newReports?.getDetailsRestaurantSuccess?.country
        );

    const currencySymbol = useMemo(() => (getCurrencySymbol(countryCode)), [countryCode]);

    if (loader) return <ShimmerCardMiniGraph />
    return (
        <div className="card-mini-graph-container">

            <div className="card-title-value-container">
                <h4 className="card-title">{cardTitle?.trim() ? cardTitle : "Title"}</h4>
                <h2 className="card-value">
                    {isMonetary && currencySymbol} {cardValue !== null && cardValue !== undefined && cardValue !== "" ? cardValue : "0"}
                </h2>
            </div>


            {showMiniGraph && incrementOrDecrement && (
                <div className="mini-graph-container">
                    <div className="increment-decrement-value">
                        {incrementOrDecrement === "increment" ? (
                            <>
                                {/* <IncrementArrow /> */}
                                <span style={{ color: incrementOrDecrement === "increment" ? "#14AE26" : "#FB2C36" }}>{incrementDecrementValue !== null && incrementDecrementValue !== undefined && incrementDecrementValue !== "" ? incrementDecrementValue : "0"}{isPercent ? "%" : ""}</span>
                            </>
                        ) : (
                            <>
                                {/* <DecrementArrow /> */}
                                <span style={{ color: incrementOrDecrement === "decrement" ? "#FB2C36" : "#14AE26" }}>{incrementDecrementValue !== null && incrementDecrementValue !== undefined && incrementDecrementValue !== "" ? incrementDecrementValue : "0"}
                                    {isPercent ? "%" : ""}
                                </span>
                            </>
                        )}
                    </div>
                    {incrementOrDecrement === "increment" ? (graphType === "chart" ? <IncrementGraph className="increment-mini-graph"/> : <GainArrowIcon className="gain-arrow-icon"/>) : graphType === "chart" ? <DecrementGraph className="decrement-mini-graph"/> : <LossArrowIcon className="loss-arrow-icon"/>}
                </div>
            )
            }
        </div >
    );
};

export default CardWithMiniGraph;
