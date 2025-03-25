import React, { useState, ReactNode, useMemo } from "react";
import { ReactComponent as ArrowDown } from "../../../assets/svg/arrow_down.svg";
import { ReactComponent as ArrowUp } from "../../../assets/svg/arrow_up.svg";
import { formatNumberByCountry, roundNum } from "utils";
import { useSelector } from "react-redux";
import ShimmerTenderCard from "./ShimmerTenderCard";
import "./TenderType.scss";

interface PaymentMethod {
  expandable?: boolean;
  icon?: ReactNode;
  tendorTitle?: string;
  amount?: number;
  orders?: number;
  percentage?: number;
  onPremOrders?: number;
  onPremSales?: number;
  offPremOrders?: number;
  offPremSales?: number;
  loader?: boolean;
}

const TenderType: React.FC<PaymentMethod> = ({
  expandable = false,
  tendorTitle = "",
  icon,
  amount = 0,
  orders = 0,
  percentage = 0,
  onPremOrders = 0,
  onPremSales = 0,
  offPremOrders = 0,
  offPremSales = 0,
  loader = false,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

    const countryCodeFromNewReports = useSelector(
      (state: any) =>  state?.newReports?.getDetailsRestaurantSuccess?.country
    );

    const currencySymbol = countryCodeFromNewReports === "US" ? "$" : "₹";

    // console.log("From TendorTypeCard", {countryCodeFromNewReports});

  if (loader) return <ShimmerTenderCard />;

  return (
    <div className="tender-type">
      <div className="tender-container">
        {/* {Object.entries(tenderData).map(([category, methods]) => (   */}
        <div className="tender-section">
          <div className="tender-grid">
            {/* {methods.map((method) => ( */}
            <div className="tender-card">
              <div className="tender-header" onClick={toggleExpand}>
                <div className="tender-icon">{icon}</div>
                {/* <PayTapIcon className="tender-icon"/> */}
                {/* <img src={`/icons/${icon}`} alt={type}  /> */}
                <div className="tender-details">
                  <div className="tender-details-name">
                    <p className="tender-title">{tendorTitle}</p>
                  </div>
                  <div className="tender-amount-order-container">
                    <span className="tender-amount">{currencySymbol}{formatNumberByCountry(amount, countryCodeFromNewReports, true)}</span>
                    <span className="tender-orders">{orders} {orders>1?"Orders":"Order"}</span>
                  </div>
                </div>
                <div
                  className={`tender-percentage ${percentage > 0 ? "positive" : "negative"
                    }`}
                >
                  {roundNum(percentage)}%{" "}
                  {expandable && (expanded ? <ArrowUp /> : <ArrowDown />)}
                </div>
              </div>
              {expandable && expanded && (
                <div className="tender-expand">
                  <div className="expand-row top">
                    <div>
                      <span>On Prem orders:</span>{" "}
                      <strong>{formatNumberByCountry(onPremOrders, countryCodeFromNewReports, false)}</strong>
                    </div>
                    <div>
                      <span>Sales:</span>{" "}
                      <strong>{currencySymbol}{formatNumberByCountry(onPremSales, countryCodeFromNewReports, true)}</strong>
                    </div>
                  </div>
                  <div className="expand-row">
                    <div>
                      <span>Off Prem orders:</span>{" "}
                      <strong>{formatNumberByCountry(offPremOrders, countryCodeFromNewReports, false)}</strong>
                    </div>
                    <div>
                      <span>Sales:</span>{" "}
                      <strong>{currencySymbol}{formatNumberByCountry(offPremSales, countryCodeFromNewReports, true)}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* ))} */}
          </div>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default TenderType;
