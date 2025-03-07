import React from "react";
import { ReactComponent as RefreshIcon } from "../../../assets/svg/r-refresh-icon.svg";
import "./style.scss";

interface ReportsRefreshButtonProps {
  onRefreshClick: () => void;
  loader: boolean;
}

const ReportsRefreshButton: React.FC<ReportsRefreshButtonProps> = ({
  onRefreshClick,
  loader,
}) => {
  if (loader) return <p>Loading...</p>;
  return (
    <button className="reports-refresh-button" onClick={onRefreshClick}>
      <RefreshIcon />
      <span className="reports-refresh-button-text">Refresh</span>
    </button>
  );
};

export default ReportsRefreshButton;
