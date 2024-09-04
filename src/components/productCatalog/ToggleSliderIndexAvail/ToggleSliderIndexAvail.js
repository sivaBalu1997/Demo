import React from 'react';
import "./ToggleSliderAvail.scss";

const Toggle = ({ toggle, setToggle, pen, index }) => {
  return (
    <div>
      <button
        className={`toggleBtnAvail${toggle ? " ToggledAvail" : ""}`}
        onClick={() => setToggle(index)}
      >
        <div className={`thumbAvail` }></div>
      </button>
    </div>
  );
};

export default Toggle;
