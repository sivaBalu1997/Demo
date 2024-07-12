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
  controlClassName,
  style,
  placeholderClass,
  disabled,
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
      controlClassName={`${controlClassName} add-employee-dropdown`}
      arrowClassName={arrowClassName}
      menuClassName="MenuClass"
      disabled={disabled}
      placeholderClassName={
        placeholderClass
          ? `placeholder-class ${placeholderClass}`
          : "placeholder-class"
      }
    />
  );
};

export default CustomDropdown;
