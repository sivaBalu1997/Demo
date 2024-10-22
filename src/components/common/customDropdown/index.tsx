import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  value?: Option | string;
  options: Array<{ value: string; label: string }>;
  onSelect: any;
  arrowClosed?: React.ReactNode;
  arrowOpen?: React.ReactNode;
  placeholder?: string;
  name?: string;
  arrowClassName?: string;
  controlClassName?: string;
  style?: React.CSSProperties;
  placeholderClass?: string;
  disabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
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
      value={typeof value === 'string' ? undefined : value}
      placeholder={""}
      arrowClosed={arrowClosed}
      arrowOpen={arrowOpen}
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
