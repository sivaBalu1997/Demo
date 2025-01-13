import React from "react";
import "./InputComponent.scss";
import { useSelector } from "react-redux";

interface InputFieldInterface {
  name: string;
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: any;
  trigger: any;
  error?: any;
  placeholder?: string;
  subtext?: string;
  height?: string;
  width?: string;
}

const InputComponent: React.FC<InputFieldInterface> = ({
  name,
  type,
  height,
  value = "",
  onChange,
  trigger,
  onBlur,
  onKeyDown,
  error,
  placeholder,
  subtext,
  width,
}) => {

  const handleBlur = () => {
    trigger(name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value: inputValue } = e.target;
    e.target.value = inputValue;

    if (name == "itemName") {
      if (!e.target.value.startsWith(" ")) onChange(e);
      trigger(name);
    } else {
      onChange(e);
      trigger(name);
    }
  };

  const message = useSelector(
    (state: any) => state?.getItemCodeReducer?.itemCode?.data?.message
  );

  return (
    <div className="input-and-spantext">
      <input
        type={type}
        autoComplete="off"
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="spInput-Filed"
        style={{ height: height, width: width }}
      />
        <span className="placeholder">{subtext}</span>
      {name === "itemCode" && message && value && value.length === 4 && (
        <p className="itemCode-Success">{message}</p>
      )}
      {error && <p className="Input-Field-Error-message">{error.message}</p>}
    </div>
  );
};

export default InputComponent;
