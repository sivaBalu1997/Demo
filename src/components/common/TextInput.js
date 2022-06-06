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
  className,
  min,
  onChange,
  onBlur,
  error,
  onKeyDown,
  containerStyle,
}) => {
  return (
    <Fragment>
      <div style={containerStyle ? containerStyle : { marginBottom: "20px" }}>
        <input
          style={style}
          type={type}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          value={value}
          name={name}
          ref={refRegister}
          disabled={disabled ?? false}
          maxLength={maxLength}
          minLength={minLength}
          className={className}
          min={min}
          onChange={onChange}
          onBlur={onBlur}
        />
        <span
          style={{ fontSize: "14px", color: "#FF5554", paddingLeft: "13px" }}
        >
          {error}
        </span>
      </div>
    </Fragment>
  );
};

export default TextInput;
