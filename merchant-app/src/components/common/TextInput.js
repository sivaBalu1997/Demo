import React, { Fragment } from "react";

const TextInput = ({
  type,
  placeholder,
  value,
  name,
  refRegister,
  disabled,
  maxLength,
  minLength,
  style,
  className
}) => {
  return (
    <Fragment>
      <input
        style={style}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        ref={refRegister}
        disabled={disabled ?? false}
        maxLength={maxLength}
        minLength={minLength}
        className={className}
      />
    </Fragment>
  );
};

export default TextInput;
