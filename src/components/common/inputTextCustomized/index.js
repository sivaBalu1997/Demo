import React, { Fragment } from "react";
import "./styles.css";
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
}) => {
  return (
    <Fragment>
      <div style={{ marginBottom: "20px",position: "relative" }}>
        <input
          style={style}
          type={type}
          onKeyDown={onKeyDown}
          // placeholder={placeholder}
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
          class={"inputText"}
          id={name}
        />
        <span
          onClick={() => document.getElementById(name).focus()}
          class={value !== "" ? "value-floating-label " : "floating-label"}
        >
          {placeholder}
        </span>
        <span
          style={{ fontSize: "14px", color: "#FF5554", position: "absolute", left: "0px", bottom: "-25px"}}
        >
          {error}
        </span>
      </div>
    </Fragment>
  );
};

export default TextInput;
