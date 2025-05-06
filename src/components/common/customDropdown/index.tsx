import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useSelector } from "react-redux";
interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface CustomDropdownProps {
  value?: Option | string;
  options: Array<{ value: string; label: string; icon?: React.ReactNode }>;
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
  className?: string;
  loader?:boolean;
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
  className,
  loader,
}) => {
  const customOptions = options?.map((option) => ({
    ...option,
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* {option.label} */}
        <div>{option.label}</div>
        {option.icon ? (
          <div style={{ display: "block", width: "auto", marginTop: "3px" }}>
            {option.icon}
          </div>
        ) : (
          ""
        )}
      </div>
    ),
  }));

  if (loader) return (
    <div style={{ width: "100%", height: "20px", background: "#f6f7f8", position: "relative", overflow: "hidden" }}>
      <div style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)",
        position: "absolute",
        top: 0,
        left: 0,
        animation: "shimmer 1.5s infinite"
      }} />
      <style>
        {`
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `}
      </style>
    </div>
  )

  return (
    <Dropdown
      options={customOptions}
      onChange={onSelect}
      value={value}
      className={className}
      placeholder={placeholder}
      arrowClosed={arrowClosed}
      arrowOpen={arrowOpen}
      controlClassName={`${controlClassName} add-employee-dropdown`}
      arrowClassName={arrowClassName}
      menuClassName={"MenuClass " + className}
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
