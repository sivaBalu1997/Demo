import React, { Fragment } from "react";

const TextInput = ({
  type,
  placeholder,
  value,
  name,
  refRegister,
  disabled,
  maxLength, 
  minLength
}) => {
  return (
    <Fragment>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      ref={refRegister}
      disabled={disabled ?? false}
      maxLength={maxLength}
      minLength={minLength}
    />
    </Fragment>
  );
};

export default TextInput;
