import React, { useState } from 'react';
import './StringDisplay.scss'; 


interface StringDisplayProps {
  text: string;
  lengthvale: number;
}

const StringDisplay: React.FC<StringDisplayProps> = ({ text, lengthvale }) => {

  const [isHovered, setIsHovered] = useState<boolean>(false);

  
  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${isHovered && text.length > 5 && "string-display"}`}
    >
      {text.length > lengthvale && !isHovered ? `${text.slice(0, lengthvale)}...` : text}
    </span>
  );
};

export default StringDisplay;
