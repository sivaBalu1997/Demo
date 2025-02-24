import React, { ReactNode, useState } from "react";
import "./TenderType.scss";

type TenderCardProps = {
  icon: ReactNode;
  title: string;
  amount: string;
  orders: number;
  percentage: number;
  details?: {
    onPremOrders: number;
    onPremSales: string;
    offPremOrders: number;
    offPremSales: string;
  };
};

const TenderCard: React.FC<TenderCardProps> = ({
  icon,
  title,
  amount,
  orders,
  percentage,
  details,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
<div className={`tender-card ${isOpen ? "open" : ""}`}>
  <div className="card-header" onClick={() => setIsOpen(!isOpen)}>
    <div className="icon">{icon}</div>
    <div className="info">
      <span className="title">{title}</span>
      <span className="amount">{amount}</span>
      <span className="orders">{orders} Orders</span>
    </div>
    <span className={`percentage ${percentage >= 15 ? "high" : "low"}`}>
      {percentage}%
    </span>
  </div>

  {isOpen && details && (
    <div className="card-details">
      <div>
        <span>On Prem orders:</span> <span>{details.onPremOrders}</span>
      </div>
      <div>
        <span>Sales:</span> <span>${details.onPremSales}</span>
      </div>
      <div>
        <span>Off Prem orders:</span> <span>{details.offPremOrders}</span>
      </div>
      <div>
        <span>Sales:</span> <span>${details.offPremSales}</span>
      </div>
    </div>
  )}
</div>

);
};

export default TenderCard;