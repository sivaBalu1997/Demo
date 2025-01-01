import React from 'react';
import "./ToggleSliderAvail.scss";

const Toggle = ({ toggle, setToggle, Enable,pen }) => {
  return (
    <div>
      <button
        className={`toggleBtnAvail${toggle ? " ToggledAvail" : ""} ${!Enable ? "DisabledAvail" : ""}`}
        onClick={() => {
          if (Enable) {
            setToggle?.((prev) => !prev);
          }
        }}
        disabled={!Enable} 
      >
        <div className={`thumbAvail`}></div>
      </button>
    </div>
  );
};

export default Toggle;
