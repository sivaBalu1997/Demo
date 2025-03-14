import React from 'react';
import "./ToggleSliderAvail.scss";

const Toggle = ({ toggle, setToggle, Enable,pen,hidden }) => {
  return (
    <div>
      <button
        className={`toggleBtnAvail${toggle ? " ToggledAvail" : ""} ${(!Enable || hidden==0 )? "DisabledAvail" : ""}`}
        style={{opacity:hidden==0?"50%":"100%"}}
        onClick={() => {
          //if (Enable) {
            setToggle?.((prev) => !prev);
          //}
        }}
        disabled={hidden==0} 
      >
        <div className={`thumbAvail`}></div>
      </button>
    </div>
  );
};

export default Toggle;
