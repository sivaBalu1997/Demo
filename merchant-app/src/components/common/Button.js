import React from "react";
import { IoIosAdd } from "react-icons/io";

const Button = ({ iconType, type, value, backgroundColor, color, onClick }) => {
  return (
    <div className="button">
      <button
        style={{ background: backgroundColor, color: color }}
        type={type}
        onClick={onClick}
      >
        {iconType === "add" ? <IoIosAdd /> : null}
        {value}
      </button>
    </div>
  );
};

export default Button;
