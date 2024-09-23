import React from "react";
import "./Tooltip.scss";
import tooltiparrow from "../../../assets/svg/ArrowHover.svg";

const Tooltip = ({ message, children }) => {
  return (
    <div className="tooltip-container">
      {children}

      <div className="tooltip-message">
        <img src={tooltiparrow} alt="" />
        {message}
      </div>
    </div>
  );
};

export default Tooltip;
