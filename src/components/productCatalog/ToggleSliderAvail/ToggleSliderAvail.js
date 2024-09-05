import React, { useState } from 'react';
import "./ToggleSliderAvail.scss";

const Toggle = ({toggle,setToggle,pen}) => {


  

  return (
    <div>
      <button
        className={`toggleBtnAvail${toggle ? " ToggledAvail" : ""}`}
        onClick={() => setToggle(!toggle)}
       
        
      >
        <div className={`thumbAvail `}></div>
      </button>
    </div>
  );
};

export default Toggle;
