import React from "react";
import "./InputFieldComponent.scss";
import { useSelector,useDispatch } from "react-redux";
import {getItemCodeRequest} from "redux/productCatalog/productCatalogActions";
import { REMOVE_CODE_REQUEST } from "redux/productCatalog/productCatalogConstants";

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
  oldValue?:any;
  maxLength?:number
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
  oldValue,
  maxLength
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
    if (name === "itemName" && inputValue.length > 128) {
      return;
    }
    if (name === "coloriePoint" && inputValue.length >4 ) {
      return;
    }
    if (name === "portionSize" && inputValue.length > 4) {
      return;
    }
   
   
    
    e.target.value = inputValue;
   
  if (name === "itemCode") {
    if(Number(inputValue)>=0 ||inputValue=='' ){
   
    if (inputValue.length <= 3 || inputValue !== oldValue) {
      dispatch({ type: REMOVE_CODE_REQUEST });
    }

    
    if (inputValue.length > 3 && inputValue !== oldValue) {
      dispatch(getItemCodeRequest(locationid, inputValue));
    }
  }
  else{
    return ;
  }
  }
  if (name === "itemName") {
   
    if (inputValue.startsWith(" ")) return;

    
    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

    onChange({
      ...e,
      target: { ...e.target, value: inputValue },
    });

    trigger(name);
  } else {
    onChange(e);
    trigger(name);
  }
  
    
  
  
  };
  const handleWheel = (event: any) => {
    event.target.blur(); // Removes focus to prevent unintended changes
    event.preventDefault();
  };
  

  const message = useSelector(
    (state: any) => state?.getItemCodeReducer?.errormsg
  );

  return (
    <div>
      <div className="input-and-spantext">
        <input
          type={type}
          autoComplete="off"
          name={name}
          onWheel={handleWheel}
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
        <p className="itemCode-Success-validation">{message}</p>
      )}
      { !message && error && <p className="Input-Field-Error-message">{error.message}</p>}
    </div>
  );
};

export default InputFieldComponent;
