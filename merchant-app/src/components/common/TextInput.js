import React, { Fragment } from "react";

const TextInput = ({
  type,
  placeholder,
  value,
  name,
  refRegister,
  disabled,
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
    />
    </Fragment>
  );
};

export default TextInput;
