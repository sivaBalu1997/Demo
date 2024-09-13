import React from "react";
import "./InputFieldComponent.scss";
import { FieldError } from "react-hook-form";

interface InputFieldInterface {
  name: string;
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  trigger: any;
  error?: any;
  placeholder?: string;
  subtext?: string;
}

const InputFieldComponent: React.FC<InputFieldInterface> = ({
  name,
  type,
  value,
  onChange,
  trigger,
  onBlur,
  error,
  placeholder,
  subtext,
}) => {
  
  // const handleBlur = () => {
  //   trigger(name); 
  // };

  return (
    <div>
      <div className="input-and-spantext">
        <input
          type={type}
          autoComplete="off"
          name={name}
          value={value}  
          onChange={onChange} 
          // onBlur={handleBlur}
          placeholder={placeholder}
          className="Input-Filed"
        />
        <span className="placeholder">{subtext}</span>
      </div>
      {error && <p className="Input-Field-Error-message">{error.message}</p>}
    </div>
  );
};

export default InputFieldComponent;
