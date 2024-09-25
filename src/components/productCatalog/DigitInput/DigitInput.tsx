import React, { useState, useRef, useEffect } from 'react';
import './DigitInput.scss'
import { FieldError} from 'react-hook-form';

interface DigitInputProps {
  name:string;
  inputCount: number;
  validation?: any; 
  register: any;
  error?:FieldError;
  setValue: any;
}

const DigitInput: React.FC<DigitInputProps> = ({name,setValue,error,register, validation,inputCount }) => {

  const [inputs, setInputs] = useState<string[]>(Array(inputCount).fill('')); 
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {

    const { value, maxLength } = event.currentTarget;
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);

    if (value.length === maxLength && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    const concatenatedValue = updatedInputs.join('');
    setValue(name, concatenatedValue);
    

  }; 

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const key = event.key;
    const { value } = event.currentTarget;
    if (key === 'Backspace' && value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
 

  return (
    <div className='masterCodeInputContainer'>
      <div className="mastecodeinputs">
      {Array.from({ length: inputCount }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          {...register(name,validation)}
          value={inputs[index]}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          ref={(el) => (inputRefs.current[index] = el!)} 
          onChange={(event) => handleInputChange(event, index)} 
          onKeyUp={(event) => handleKeyUp(event, index)} 
          className='digit-input'
        />
      ))}
      {error && <p className='Input-Field-Error-message'>{error.message}</p>}
    </div>
    </div>
  );
};

export default DigitInput;
