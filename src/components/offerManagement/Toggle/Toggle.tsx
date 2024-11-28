import React, { useEffect } from "react";
import "./Toggle.scss";

interface ToggleProps {
  toggle: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  togglevalue?: number;
  width?: number;
  height?: number;
  togglecolor?: string;
  roundwidth?: number;
  roundheight?: number;
}

const Toggle: React.FC<ToggleProps> = ({
  toggle,
  setToggle,
  togglevalue,
  width,
  height,
  togglecolor,
}) => {
  return (
    <div>
      <button
        type="button"
        className={`toggleBtn${toggle ? " Toggled" : ""}`}
        onClick={() => {
          if (setToggle) {
            setToggle((prev) => !prev);
          }
        }}
      >
        <div className="thumb"></div>
      </button>
    </div>
  );
};

export default Toggle;
