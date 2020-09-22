import React from "react";
import "../../styles/common.scss";

const Checkbox = () => {
  return (
    <label className="checkbox-circle">
      <input type="checkbox" defaultChecked />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
