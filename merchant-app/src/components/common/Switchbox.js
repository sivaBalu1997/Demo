import React from "react";
import "../../styles/common.scss";

const Switchbox = ({ isChecked, handleSwitch }) => {
  return (
    <div className="switch-container">
      <label>
        <input
          checked={isChecked}
          onChange={() => {
            handleSwitch();
          }}
          className="switch-input"
          type="checkbox"
        />
        <div>
          <div></div>
        </div>
      </label>
    </div>
  );
};

export default Switchbox;
