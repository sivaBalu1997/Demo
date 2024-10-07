import React, { useState } from 'react';
import "./ToggleSliderInventory.scss";

const Toggle = ({toggle,setToggle,pen}) => {


  

  return (
    <div>
      <button
        className={`toggleBtnInventory${toggle ? " ToggledInventory" : ""}`}
        onClick={() => setToggle(!toggle)}
        >
        <div className={`thumbInventory`}></div>
      </button>
    </div>
  );
};

export default Toggle;
