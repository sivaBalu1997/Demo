import React from "react";

const TextInput = ({ type, placeholder, value, name, ref, maxLength, minLength }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      ref={ref}
      maxLength={maxLength}
      minLength={minLength}
    />
  );
};

export default TextInput;
