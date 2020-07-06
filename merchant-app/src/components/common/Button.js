import React from "react";

const Button = ({ type, value, backgroundColor, color }) => {
  return (
    <div className="button">
      <button style={{ background: backgroundColor, color: color }} type={type}>
        {value}
      </button>
    </div>
  );
};

export default Button;
