import React, { ReactNode, CSSProperties, useState } from "react";
import "./Tooltip.scss";
import tooltiparrow from "../../../assets/svg/ArrowHover.svg";

interface TooltipProps {
  message: string;
  children: ReactNode; // This will allow any valid JSX element inside Tooltip
  styles?: CSSProperties; // Optional styles
 
}

const Tooltip: React.FC<TooltipProps> = ({ message, children, styles, }) => {
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
      tabIndex={0} // For accessibility, allows focusing via keyboard
    >
      {children}

      {visible && (
        <div className={`tooltip-message`} style={styles}>
          <img src={tooltiparrow} alt="tooltip arrow" />
          {message}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
