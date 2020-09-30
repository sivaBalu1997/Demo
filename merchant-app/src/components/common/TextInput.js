import React from "react";

const TextInput = ({ type, placeholder, value, name, ref }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      ref={ref}
    />
  );
};

export default TextInput;
