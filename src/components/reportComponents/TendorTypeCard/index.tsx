import React, { useState, ReactNode } from "react";
import "./TenderType.scss";
import { ReactComponent as ArrowDown } from "../../../assets/svg/arrow_down.svg";
import { ReactComponent as ArrowUp } from "../../../assets/svg/arrow_up.svg";
import { ReactComponent as PayTapIcon } from "../../../assets/svg/pay_tap.svg";

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
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

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
                    <span className="tender-amount">${amount.toFixed(2)}</span>
                    <span className="tender-orders">{orders} Orders</span>
                  </div>
                </div>
                <div
                  className={`tender-percentage ${
                    percentage > 0 ? "positive" : "negative"
                  }`}
                >
                  {percentage}%{" "}
                  {expandable && (expanded ? <ArrowUp /> : <ArrowDown />)}
                </div>
              </div>
              {expandable && expanded && (
                <div className="tender-expand">
                  <div className="expand-row">
                    <span>On Prem orders:</span> <strong>{onPremOrders}</strong>
                    <span>Sales:</span>{" "}
                    <strong>${onPremSales.toFixed(2)}</strong>
                  </div>
                  <div className="expand-row">
                    <span>Off Prem orders:</span>{" "}
                    <strong>{offPremOrders}</strong>
                    <span>Sales:</span>{" "}
                    <strong>${offPremSales.toFixed(2)}</strong>
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
