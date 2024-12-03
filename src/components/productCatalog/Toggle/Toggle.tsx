import React, { useEffect } from "react";
import "./Toggle.css";

interface ToggleProps {
  toggle: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  togglevalue?: number;
  width?: number;
  height?: number;
  Enabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  toggle,
  setToggle,
  Enabled = true,
  togglevalue,
  width,
  height,
}) => {
  return (
    <div>
      <button
        type="button"
        // style={{width:`${width}px`,height:`${height}px`}}
        style={{opacity:Enabled===true?"100%":"50%"}}
        className={`toggleBtn${toggle ? " Toggled" : ""}`}
        onClick={() => {
          if (Enabled) {
            if (setToggle) {
              setToggle((prev) => !prev);
            }
          }
        }}
      >
        <div className="thumb"></div>
      </button>
    </div>
  );
};

export default Toggle;
