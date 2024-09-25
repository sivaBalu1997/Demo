import React, { ReactNode, CSSProperties, useState } from "react";
import "./Tooltip.scss";
import tooltiparrow from "../../../assets/svg/ArrowHover.svg";

interface TooltipProps {
  message: string;
  children: ReactNode; // This will allow any valid JSX element inside Tooltip
  styles?: CSSProperties; 
  Arrowstyle?:CSSProperties
  // Optional styles
 
}

const TooltipMsg: React.FC<TooltipProps> = ({ message, children, styles,Arrowstyle }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      tabIndex={0} 
     
    >
      {children}

      {visible && (
        <div  style={styles} >
          <img src={tooltiparrow} alt="tooltip arrow" style={Arrowstyle}/>
          <span className="Text">{message}</span>
        </div>
      )}
    </div>
  );
};

export default TooltipMsg;
