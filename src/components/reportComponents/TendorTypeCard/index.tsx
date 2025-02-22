import React, { useState } from "react";
import "./TenderType.scss";
import { ReactComponent as ArrowDown } from "../../../assets/svg/arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../../assets/svg/arrow-down.svg";
import { ReactComponent as PayTapIcon } from "../../../assets/svg/pay_tap.svg";


  interface PaymentMethod {
    type: string;
    icon: string;
    amount: number;
    orders: number;
    percentage: number;
    onPremOrders: number;
    onPremSales: number;
    offPremOrders: number;
    offPremSales: number;
  }
  
  const tenderData: Record<string, PaymentMethod[]> = {
    "Debit card": [
      {
        type: "Swipe/Tap/Dip",
        icon: "swipe-tap-dip.svg",
        amount: 3058.5,
        orders: 46,
        percentage: 18,
        onPremOrders: 35,
        onPremSales: 2520,
        offPremOrders: 11,
        offPremSales: 1563.5,   
      },
      {
        type: "Keyed In",
        icon: "keyed-in.svg",
        amount: 3058.5,
        orders: 46,
        percentage: 6,
        onPremOrders: 15,
        onPremSales: 1200,
        offPremOrders: 5,
        offPremSales: 800,
      },
    ],
    "Credit card": [
      {
        type: "Swipe/Tap/Dip",
        icon: "swipe-tap-dip.svg",
        amount: 3058.5,
        orders: 46,
        percentage: 18,
        onPremOrders: 35,
        onPremSales: 2520,
        offPremOrders: 11,
        offPremSales: 1563.5,
      },
      {
        type: "Keyed In",
        icon: "keyed-in.svg",
        amount: 3058.5,
        orders: 46,
        percentage: 6,
        onPremOrders: 15,
        onPremSales: 1200,
        offPremOrders: 5,
        offPremSales: 800,
      },
    ],
  };

const TenderType: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (type: string) => {
    setExpanded((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="tender-type">
      <h2>Tender type</h2>
      <div className="tender-container">
        {Object.entries(tenderData).map(([category, methods]) => (  
          <div key={category} className="tender-section">
            <h3>{category}</h3>
            <div className="tender-grid">
              {methods.map((method) => (
                <div key={method.type} className="tender-card">
                  <div className="tender-header" onClick={() => toggleExpand(method.type)}>
                    <PayTapIcon className="tender-icon"/>
                    {/* <img src={`/icons/${method.icon}`} alt={method.type}  /> */}
                    <div className="tender-details">
                      <p className="tender-title">{method.type}</p>
                      <p className="tender-amount">${method.amount.toFixed(2)}</p>
                      <p className="tender-orders">{method.orders} Orders</p>
                    </div>
                    <div className={`tender-percentage ${method.percentage > 0 ? "positive" : "negative"}`}>
                      {method.percentage}% {expanded[method.type] ? <ArrowUp /> : <ArrowDown />}
                    </div>
                  </div>
                  {expanded[method.type] && (
                    <div className="tender-expand">
                      <div className="expand-row">
                        <span>On Prem orders:</span> <strong>{method.onPremOrders}</strong>
                        <span>Sales:</span> <strong>${method.onPremSales.toFixed(2)}</strong>
                      </div>
                      <div className="expand-row">
                        <span>Off Prem orders:</span> <strong>{method.offPremOrders}</strong>
                        <span>Sales:</span> <strong>${method.offPremSales.toFixed(2)}</strong>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenderType;
