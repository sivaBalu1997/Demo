import React from "react";
import "../../../styles/table-mangagement/common.scss";

const Input = ({ type, placeholder, name }) => {
  return (
    <input
      className="table-input"
      type={type}
      placeholder={placeholder}
      name={name}
    />
  );
};

export default Input;
