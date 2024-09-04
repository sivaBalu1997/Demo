import React, { useEffect } from 'react';
import "./Toggle.css";

interface ToggleProps {
  toggle: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  togglevalue?: number;
}

const Toggle: React.FC<ToggleProps> = ({ toggle, setToggle, togglevalue }) => {
 

  return (
    <div>
      <button
        type="button"  // This prevents the form submission
        className={`toggleBtn${toggle ? " Toggled" : ""}`}
        onClick={() => {
          if (setToggle) {
            setToggle(prev => !prev);
          }
        }}
      >
        <div className='thumb'></div>
      </button>
    </div>
  );
};

export default Toggle;
