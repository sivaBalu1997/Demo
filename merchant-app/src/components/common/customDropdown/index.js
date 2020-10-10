import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const CustomDropdown = ({
  value,
  options,
  onSelect,
  arrowClosed,
  arrowOpen,
  placeholder,
  name,
}) => {
  return (
    <Dropdown
      options={options}
      onChange={onSelect}
      value={value}
      placeholder={placeholder}
      arrowClosed={arrowClosed}
      arrowOpen={arrowOpen}
      name={name}
      className="report-drop-down"
      menuClassName="menuClassName"
    />
  );
};

export default CustomDropdown;
