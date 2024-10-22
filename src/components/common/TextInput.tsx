import React, { Fragment } from "react";
import { FieldValues } from "react-hook-form";

interface TextInputType {
  type: string;
  placeholder?: string;
  value?: string | number;
  name: string;
  formRegister?: any; // Accept any object, not just ref function
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
  style?: React.CSSProperties;
  className: string;
  min?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | null;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  containerStyle?: React.CSSProperties;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  pattern?: string;
  autoComplete?: string;
}

const TextInput: React.FC<TextInputType> = ({
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
  pattern,
}) => {
  return (
    <Fragment>
      <div style={containerStyle ? containerStyle : { marginBottom: "20px" }}>
        <input
          {...formRegister} // Spread formRegister to apply all its properties including ref
          style={style}
          type={type}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          value={value}
          name={name}
          disabled={disabled ?? false}
          onKeyPress={onKeyPress}
          maxLength={maxLength}
          minLength={minLength}
          className={className}
          min={min}
          onChange={onChange}
          onBlur={onBlur}
          pattern={pattern}
          autoComplete="new-password"
          readOnly
          onFocus={(e) => e.target.removeAttribute("readOnly")}
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
