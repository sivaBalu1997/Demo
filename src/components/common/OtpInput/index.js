// src/OtpInput.js
import React, { useState } from 'react';
import './OtpInput.css';

import { ReactComponent as OpenEyeIcon } from  "../../../assets/svg/opened_eye.svg";
import { ReactComponent as ClosedEyeIcon } from "../../../assets/svg/closed_eye.svg";

const OtpInput = ({ length, onChange,borderColor }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const [showPin, setShowPin] = useState(false);


  const handleChange = (element, index) => {
    const value = element.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join(''));
      if (value !== '' && element.nextSibling) {
        element.nextSibling.focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && otp[index] === '') {
      if (event.target.previousSibling) {
        event.target.previousSibling.focus();
      }
    }
  };

  const toggleShowPin = () => {
    setShowPin(!showPin);
  };

  return (
    <div className='rootOTP'>
      {otp.map((_, index) => (
        <input
          key={index}
          className='otp-tinput'
          style={{borderColor:borderColor}}
          type={showPin ? 'text' : 'password'}
          maxLength="1"
          value={otp[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={(e) => e.target.select()}
        />
      ))}
       <div>
        {showPin ? (
        <OpenEyeIcon
            onClick={toggleShowPin}
            style={{
            position: "relative",
            left: 20, 
            cursor: 'pointer'
            }}
            className={'openedEyeIcon'}
        />
        ) : (
        <ClosedEyeIcon
            onClick={toggleShowPin}
            style={{
            position: "relative",
            left: 20, 
            cursor: 'pointer'
            }}
            className={'closedEyeIcon'}
        />
        )}
    </div>
    </div>
  );
};

export default OtpInput;
