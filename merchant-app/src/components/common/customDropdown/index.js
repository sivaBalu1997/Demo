import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const CustomDropdown = ({ value, options, onSelect }) => {
  return (
    <Dropdown
      options={options}
      onChange={onSelect}
      value={value}
    />
  );
};

export default CustomDropdown;
