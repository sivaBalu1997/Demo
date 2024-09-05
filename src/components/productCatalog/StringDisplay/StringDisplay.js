import React, { useState } from 'react';
import './StringDisplay.scss'; 

const StringDisplay = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className= {`${isHovered  && text.length > 5&& "string-display"}`}  
    >
      {text.length > 5 && !isHovered ? `${text.slice(0, 5)}...` : text}
    </span>
  );
};

export default StringDisplay;
