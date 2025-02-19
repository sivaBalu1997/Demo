import React, { useMemo } from "react";
import { ReactComponent as IncrementGraph } from "../../../assets/svg/r-increment-graph-icon.svg";
import { ReactComponent as IncrementArrow } from "../../../assets/svg/r-increment-arrow-icon.svg";
import { ReactComponent as DecrementGraph } from "../../../assets/svg/r-decrement-graph-icon.svg";
import { ReactComponent as DecrementArrow } from "../../../assets/svg/r-decrement-arrow-icon.svg";
import { useSelector } from "react-redux";
import "./style.scss";

interface CardWithMiniGraphProps {
    cardTitle: string;
    cardValue: number | string;
    showMiniGraph: boolean;
    isMonetary: boolean;
    incrementDecrementValue: number | string;
    incrementOrDecrement: "increment" | "decrement";
}

const CardWithMiniGraph: React.FC<CardWithMiniGraphProps> = ({
    cardTitle,
    cardValue,
    showMiniGraph,
    isMonetary,
    incrementDecrementValue,
    incrementOrDecrement,
}) => {
    const countryCode = useSelector(
        (state: any) => state?.auth?.restaurantDetails?.country
    );

    const currencySymbol = useMemo(() => (countryCode === "US" ? "$" : "₹"), [countryCode]);

    return (
        <div className="card-mini-graph-container">
            {/* Card Header */}
            <div className="card-title-value-container">
                <h4 className="card-title">{cardTitle}</h4>
                <h2 className="card-value">
                    {isMonetary && currencySymbol}
                    {cardValue}
                </h2>
            </div>

            {/* Mini Graph Section */}
            {
                showMiniGraph && (
                    <div className="mini-graph-container">
                        <div className="increment-decrement-value">
                            {incrementOrDecrement === "increment" ? (
                                <>
                                    <IncrementArrow />
                                    <span style={{ color: incrementOrDecrement === "increment" ? "#14AE26" : "#FB2C36" }}>+{" "}{incrementDecrementValue}</span>
                                </>
                            ) : (
                                <>
                                    <DecrementArrow />
                                    <span style={{ color: incrementOrDecrement === "decrement" ? "#FB2C36" : "#14AE26" }}>-{" "}{incrementDecrementValue}</span>
                                </>
                            )}
                        </div>
                        {incrementOrDecrement === "increment" ? <IncrementGraph /> : <DecrementGraph />}
                    </div>
                )
            }
        </div >
    );
};

export default CardWithMiniGraph;
