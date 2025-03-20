import React from "react";
import "./SalesReport.scss";
import { ReactComponent as ReportsNotAvailableIcon } from "../../../assets/svg/reportNotAvailable.svg"; 
import { ReactComponent as ErrorIcon } from "../../../assets/svg/loadingError.svg";
import { ReactComponent as PageNotAvailableIcon } from "../../../assets/svg/page-data-not-available-icon.svg";
import { ReactComponent as PageErrorIcon } from "../../../assets/svg/page-error-icon.svg";
import { ReactComponent as NoOrdersFoundStampIcon } from "../../../assets/svg/r-no-orders-found-today-bag.svg";

interface SalesReportProps {
  errorType: "checkinNotFound" | "error"| "salesNotFound"|"noContent"|"reportNotFound" |"customerNotFound"
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
    icon:<PageErrorIcon  className="icon"/>
  },
  salesNotFound:{
    title:"Today's Sales Report Not Available",
    description:"Sales data for today will be available after business hours when the day is closed. Please check back later or view previous days' reports.",
    icon:<ReportsNotAvailableIcon  className="icon"/>
  },
  checkinNotFound:{
    title:"Report Not Available",
    description:"The report will show once the check-in starts",
    icon:<ReportsNotAvailableIcon  className="icon"/>
  },
  noContent:{
    title:"",
    description:"No Orders Found",
    icon:<NoOrdersFoundStampIcon  className="icon"/>
  },
  reportNotFound:{
    title:"Report Not Available",
    description:"The report will show once the data is available",
    icon:<ReportsNotAvailableIcon  className="icon"/>
  },
  customerNotFound:{
    title:"Report Not Available",
    description:"The report will be displayed after entering the customer name or number",
    icon:<ReportsNotAvailableIcon  className="icon"/>
  }
}

const     ReportNotFound: React.FC<SalesReportProps> = ({errorType}) => {
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

export default ReportNotFound;
