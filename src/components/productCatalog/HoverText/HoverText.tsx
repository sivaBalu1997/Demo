import React, { useState } from "react";
import "./HoverText.scss";

// Define the props type
interface StringDisplayProps {
  text: string;
  lengthvale: number;
}

const HoverText: React.FC<StringDisplayProps> = ({ text, lengthvale }) => {
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
      className={`${isHovered  && text?.length > lengthvale && "string-display"}`}
    >
      {text && text.length > lengthvale && !isHovered
        ? `${text.slice(0, lengthvale)}...`
        : text}
    </span>
  );
};

export default HoverText;
