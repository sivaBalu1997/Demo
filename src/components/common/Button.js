import React from "react";
import { IoIosAdd } from "react-icons/io";

const Button = ({
  iconType,
  type,
  value,
  backgroundColor,
  color,
  clickHandler,
  className,
}) => {
  return (
    <div className="button">
      <button
        style={{ background: backgroundColor, color: color }}
        type={type}
        onClick={clickHandler}
        className={className}
      >
        {iconType === "add" ? <IoIosAdd /> : null}
        {value}
      </button>
    </div>
  );
};

export default Button;
