import React, { useState } from 'react';
import './StringDisplay.scss'; 

// Define the props type
interface StringDisplayProps {
  text: string;
  length: number;
}

const StringDisplay: React.FC<StringDisplayProps> = ({ text, length }) => {
  // Define the type of state using TypeScript
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Mouse event handlers
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
      {text.length > length && !isHovered ? `${text.slice(0, length)}...` : text}
    </span>
  );
};

export default StringDisplay;
