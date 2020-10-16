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
  arrowClassName,
  controlClassName
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
      controlClassName={controlClassName}
      arrowClassName={arrowClassName}
      menuClassName="MenuClass"
      placeholderClassName="placeholder-class"
    />
  );
};

export default CustomDropdown;
