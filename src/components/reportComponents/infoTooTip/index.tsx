import React, { useState } from "react";
import "./InfoTooTip.scss";
import { ReactComponent as InfoIcon } from "../../assets/svg/info1.svg";
interface InfoTooltipProps {
  title: string;
  description: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ title, description }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="info-container">
      <h2 className="title">{title}</h2>
      <div
        className="info-icon-wrapper"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)} 
      >
        <InfoIcon className="info-icon" />
        {isVisible && (
          <div className="tooltip">
            <p>
              {description}
            </p>
            <span className="tooltip-arrow"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoTooltip;
