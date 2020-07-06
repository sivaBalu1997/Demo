import React from "react";

const TextInput = ({ type, placeholder, value, name }) => {
  return (
    <div className="text-input">
      <input type={type} placeholder={placeholder} value={value} name={name} />
    </div>
  );
};

export default TextInput;
