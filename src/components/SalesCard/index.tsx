import React from "react";
import "./SalesCard.scss";
import { ReactComponent as ArrowUpIcon } from "../../assets/svg/gainArraow.svg"; 
import { ReactComponent as ArrowDownIcon } from "../../assets/svg/lossArrow.svg"; 
import { ReactComponent as GainChartIcon } from "./../../assets/svg/gainChart.svg";
import { ReactComponent as LossChartIcon } from "./../../assets/svg/lossChart.svg";

interface SalesCardProps {
  type: string;
  amount: string | number;
  trend: string;
  positive: boolean;
  showChart?: boolean;
  showVChart?: boolean;
}

const SalesCard: React.FC<SalesCardProps> = ({
  type,
  amount,
  trend,
  positive,
  showChart = false,  
  showVChart = false,
}) => {
  return (
    <div className="sales-card">
      <div className="card-header">
        <span>{type}</span>
        <span className={`trend ${positive ? "positive" : "negative"}`}>
          {trend} {positive ? <ArrowUpIcon className="icon" /> : <ArrowDownIcon className="icon" />}
        </span>
      </div>
      <div className="card-body">
        <h3 className={positive ? "positive" : "negative"}>{amount}</h3>
        {showChart && <div className={`chart ${positive ? "positive" : "negative"}`}></div>}
        {showVChart &&positive? <GainChartIcon className="vchart-icon" />:<LossChartIcon className="vchart-icon" />}
      </div>
    </div>
  );
};




export default SalesCard;
