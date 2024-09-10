import React, { useEffect } from 'react'
import './InputFieldComponent.scss'
import { FieldError} from 'react-hook-form';


interface Inputfieldinterface
{
    name:string;
    type?: string;
    register: any;
    required?: boolean;
    validation?: any; 
    error?: FieldError; 
    trigger:any;
    placeholder?:string
    subtext?:string
}

const InputFieldComponent:React.FC<Inputfieldinterface> = ({name,type='text',register,required = false,validation,
  error,trigger,placeholder,subtext}) => {

    // useEffect(()=>{
    //   trigger(name);

    // },[name])
     
    const handleBlur=()=>{
      trigger(name);
  
    }
  return (
    <div>
      <div className='input-and-spantext'>
        <input 
          {...register(name,validation)}
          type={type} 
          autoComplete='off' 
          name={name} 
          onBlur={handleBlur}
          placeholder={placeholder}
          className='Input-Filed'
        />
        <span className='placeholder'>{subtext}</span>
         </div>
        {error && <p className='Input-Field-Error-message'>{error.message}</p>}
    </div>
  )
}

export default InputFieldComponent