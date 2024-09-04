import React, { useState } from 'react';
import "./ToggleSlider.scss";

const Toggle = ({toggle,setToggle,pen}) => {


  

  return (
    <div>
      <button
        className={`toggleBtnSlider${toggle ? " ToggledSlider" : ""}`}
        onClick={() => setToggle(!toggle)}
       
        
      >
        <div className={`thumbSlider` }></div>
      </button>
    </div>
  );
};

export default Toggle;
