import React, { useEffect } from "react";
import "./Toggle.scss";

interface ToggleProps {
  toggle: boolean;
  setToggle?: any;
  togglevalue?: number;
  width?: number;
  height?: number;
  togglecolor?: string;
  roundwidth?: number;
  roundheight?: number;
  item?:any
  name:any
}

const Toggle: React.FC<ToggleProps> = ({
  toggle,
  setToggle,
  togglevalue,
  width,
  height,
  togglecolor,
  item,
  name,
}) => {
  return (
    <div>
      <button
        type="button"
        className={`toggleBtn${toggle ? " Toggled" : ""}`}
        onClick={() => {
          if(name=='Date')
          {
setToggle((pre:any)=>!pre)
          }
          else{
            setToggle(item)
          }
         
        }}
      >
        <div className="thumb"></div>
      </button>
    </div>
  );
};

export default Toggle;
