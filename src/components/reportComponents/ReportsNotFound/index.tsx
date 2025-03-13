import React from "react";
import "./SalesReport.scss";
import { ReactComponent as SalesIcon } from "../../../assets/svg/loadingError.svg"; 
import { ReactComponent as ErrorIcon } from "../../../assets/svg/loadingError.svg";

interface SalesReportProps {
  errorType: "notStarted" | "error"| "notFound"
}


const statusBasedMsg:  {
  [key: string]: {
    title: string;
    description: string;
    icon: JSX.Element;
  };
}={
  error:{
    title:"Error loading data",
    description:"There was an error loading the data. Please try again later",
    icon:<ErrorIcon  className="icon"/>
  },
  notFound:{
    title:"Today's Sales Report Not Available",
    description:"Sales data for today will be available after business hours when the day is closed. Please check back later or view previous days' reports.",
    icon:<SalesIcon  className="icon"/>
  },
  notStarted:{
    title:"Report Not Available",
    description:"The report will show once the check-in starts",
    icon:<SalesIcon  className="icon"/>
  }
}
const ReportsWarning: React.FC<SalesReportProps> = ({errorType}) => {
  return (
    <div className="sales-report-container">
      <div className="content">
        <div className="icon-cointainer">
        {statusBasedMsg?.[errorType]?.icon}
        </div>
        <div>
        <h2>{statusBasedMsg?.[errorType]?.title}</h2>
        <p>
        {statusBasedMsg?.[errorType]?.description}
        </p>
        </div>
      </div>
    </div>
  );
};

export default ReportsWarning;
