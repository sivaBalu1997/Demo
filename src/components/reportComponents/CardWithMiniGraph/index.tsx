import React, { useMemo } from "react";
import { ReactComponent as IncrementGraph } from "../../../assets/svg/r-increment-graph-icon.svg";
import { ReactComponent as IncrementArrow } from "../../../assets/svg/r-increment-arrow-icon.svg";
import { ReactComponent as DecrementGraph } from "../../../assets/svg/r-decrement-graph-icon.svg";
import { ReactComponent as DecrementArrow } from "../../../assets/svg/r-decrement-arrow-icon.svg";
import { ReactComponent as LossArrowIcon } from "../../../assets/svg/lossArrow1.svg";
import { ReactComponent as GainArrowIcon } from "../../../assets/svg/gainarrow1.svg";
import { useSelector } from "react-redux";
import "./style.scss";
import ShimmerCardMiniGraph from "./ShimmerCardMiniGraph";

interface CardWithMiniGraphProps {
    cardTitle: string | undefined | null | "";
    cardValue: number | string | undefined | "" | null;
    isMonetary: boolean;
    showMiniGraph?: boolean;
    incrementDecrementValue?: number | string | undefined | "" | null;
    incrementOrDecrement?: "increment" | "decrement";
    loader?: boolean;
    isPercent?: boolean;
    graphType?: "chart" | "arrow"
}

const CardWithMiniGraph: React.FC<CardWithMiniGraphProps> = ({
    cardTitle,
    cardValue,
    showMiniGraph,
    isMonetary,
    incrementDecrementValue,
    incrementOrDecrement,
    loader,
    isPercent,
    graphType = "chart"
}) => {
    const countryCode = useSelector(
        (state: any) => state?.auth?.restaurantDetails?.country
    );

    const currencySymbol = useMemo(() => (countryCode === "US" ? "$" : "₹"), [countryCode]);

    if (loader) return <ShimmerCardMiniGraph />
    return (
        <div className="card-mini-graph-container">

            <div className="card-title-value-container">
                <h4 className="card-title">{cardTitle?.trim() ? cardTitle : "Title"}</h4>
                <h2 className="card-value">
                    {isMonetary && currencySymbol}
                    {cardValue !== null && cardValue !== undefined && cardValue !== "" ? cardValue : "0"}
                </h2>
            </div>


            {showMiniGraph && (
                <div className="mini-graph-container">
                    <div className="increment-decrement-value">
                        {incrementOrDecrement === "increment" ? (
                            <>
                                <IncrementArrow />
                                <span style={{ color: incrementOrDecrement === "increment" ? "#14AE26" : "#FB2C36" }}>+{incrementDecrementValue !== null && incrementDecrementValue !== undefined && incrementDecrementValue !== "" ? incrementDecrementValue : "0"}{isPercent ? "%" : ""}</span>
                            </>
                        ) : (
                            <>
                                    <DecrementArrow />
                                <span style={{ color: incrementOrDecrement === "decrement" ? "#FB2C36" : "#14AE26" }}>-{incrementDecrementValue !== null && incrementDecrementValue !== undefined && incrementDecrementValue !== "" ? incrementDecrementValue : "0"}
                                    {isPercent ? "%" : ""}
                                </span>
                            </>
                        )}
                    </div>
                    {incrementOrDecrement === "increment" ? (graphType === "chart" ? <IncrementGraph /> : <GainArrowIcon />) : graphType === "chart" ? <DecrementGraph /> : <LossArrowIcon />}
                </div>
            )
            }
        </div >
    );
};

export default CardWithMiniGraph;
