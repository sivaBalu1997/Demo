import React from "react";

const TextInput = ({ type, placeholder, value, name }) => {
  return (
    <input type={type} placeholder={placeholder} value={value} name={name} />
  );
};

export default TextInput;
