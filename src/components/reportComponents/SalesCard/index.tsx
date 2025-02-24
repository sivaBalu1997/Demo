import React from "react";
import "./SalesCard.scss";
import { ReactComponent as ArrowUpIcon } from "../../../assets/svg/gainArraow.svg"; 
import { ReactComponent as ArrowDownIcon } from "../../../assets/svg/lossArrow.svg"; 
import { ReactComponent as GainChartIcon } from "../../../assets/svg/gainChart.svg";
import { ReactComponent as LossChartIcon } from "../../../assets/svg/lossChart.svg";

interface SalesCardProps {
  type: string;
  amount: string | number;
  trend: string;
  positive: boolean;
  showLineChart?: boolean;
}

const SalesCard: React.FC<SalesCardProps> = ({
  type,
  amount,
  trend,
  positive,
  showLineChart = true,  
}) => {
  return (
    <div className="reports-sales-card">
      <div className="card-header">
        <span  className="card-header-title">{type}</span>
        <span className={`trend ${positive ? "positive" : "negative"}`}>
          {trend} {positive ? <ArrowUpIcon className="icon" /> : <ArrowDownIcon className="icon" />}
        </span>
      </div>
      <div className="card-body">
        <h3 className={positive ? "positive" : "negative"}>{amount}</h3>
        {showLineChart?(positive? <GainChartIcon className="vchart-icon" />:<LossChartIcon className="vchart-icon" />):
        (positive? <GainChartIcon className="vchart-icon" />:<LossChartIcon className="vchart-icon" />)  }
      </div>
    </div>
  );
};




export default SalesCard;
