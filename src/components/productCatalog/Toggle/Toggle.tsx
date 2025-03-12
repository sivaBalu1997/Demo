import React, { useEffect } from "react";
import "./Toggle.css";

interface ToggleProps {
  toggle: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  togglevalue?: number;
  width?: number;
  height?: number;
  Enabled?: boolean;
  toggleOffCheck?: any;
  hidden?:any
}

const Toggle: React.FC<ToggleProps> = ({
  toggle,
  setToggle,
  Enabled = true,
  togglevalue,
  width,
  height,
  toggleOffCheck,
  hidden
}) => {
  return (
    <div>
      <button
        type="button"
        disabled={hidden==0?true:false}
        // style={{width:`${width}px`,height:`${height}px`}}
        style={{opacity:(Enabled===false || hidden === 0) ?"50%":"100%"}}
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
