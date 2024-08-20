import React, { Fragment } from "react";

const TextInput = ({
  type,
  placeholder,
  value,
  name,
  formRegister,
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
  onKeyPress,
  pattern
}) => {

  return (
    <Fragment>
      <div style={containerStyle ? containerStyle : { marginBottom: "20px" }}>
        <input
          style={style}
          type={type}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          value={value || null}
          name={name}
          ref={formRegister ?? null}
          disabled={disabled ?? false}
          onKeyPress={onKeyPress}
          maxLength={maxLength}
          minLength={minLength}
          className={className}
          min={min}
          onChange={onChange}
          onBlur={onBlur}
          pattern={pattern}
          // autoComplete="off"
          autoComplete="new-password" // or "off"
          readOnly
  onFocus={(e) => e.target.removeAttribute('readOnly')}
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
