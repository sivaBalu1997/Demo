import React from "react";
import "./InputFieldComponent.scss";
import { useSelector,useDispatch } from "react-redux";
import {getItemCodeRequest} from "redux/productCatalog/productCatalogActions";

interface InputFieldInterface {
  name: string;
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?:any
  trigger: any;
  error?: any;
  placeholder?: string;
  subtext?: string;
  oldValue?:any
}

const InputFieldComponent: React.FC<InputFieldInterface> = ({
  name,
  type,
  value = "",
  onChange,
  trigger,
  onBlur,
  onKeyDown,
  error,
  placeholder,
  subtext,
  oldValue
}) => {
  const handleBlur = () => {
    trigger(name);
  };
  const dispatch = useDispatch();
  const locationid = useSelector(
    (state: any) => state.auth.credentials?.locationId
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value: inputValue } = e.target;
  
  
    if (name === "itemCode") {
      inputValue = inputValue.replace(/e/gi, ""); 
    }
  
   
    if (name === "itemCode" && inputValue.length > 4) {
      return;
    }
    if (name === "itemName" && inputValue.length > 40) {
      return;
    }
    if (name === "coloriePoint" && inputValue.length >7 ) {
      return;
    }
    if (name === "portionSize" && inputValue.length > 7) {
      return;
    }
   
   
    
    e.target.value = inputValue;
    if (name === "itemCode") {
      if (inputValue?.length > 3) {
        if (oldValue != inputValue) {
          dispatch(
            getItemCodeRequest(locationid, inputValue)
          );
        }
      }
    }
    if (name== 'itemName') {
      if(!e.target.value.startsWith(" "))
        onChange(e); 
      trigger(name);
    }
    else{
      onChange(e); 
      trigger(name);
    }
  
    
  
  };
  

  const message = useSelector(
    (state: any) => state?.getItemCodeReducer?.itemCode?.data?.message
  );

  return (
    <div>
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
          className="Input-Filed"
        />
        <span className="placeholder">{subtext}</span>
      </div>
      {name === "itemCode" && message && value && value.length === 4 && (
        <p className="itemCode-Success">{message}</p>
      )}
      {error && <p className="Input-Field-Error-message">{error.message}</p>}
    </div>
  );
};

export default InputFieldComponent;
