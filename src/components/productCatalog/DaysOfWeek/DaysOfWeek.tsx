import React from 'react';
import "./DaysOfWeek.scss";

// Define the types for the props
interface DaysOfWeekProps {
  days: number[] | number;
  setDays: React.Dispatch<React.SetStateAction<number[]>>; 
}

const DaysOfWeek: React.FC<DaysOfWeekProps> = ({ days = [], setDays }) => {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  
  const daysArray = Array.isArray(days) && days.length > 0 ? days : [0, 1, 2, 3, 4, 5, 6]; 

  const toggleHighlight = (index: number) => {
    if (daysArray.includes(index)) {
      setDays(prevState => prevState.filter(day => day !== index));
    } else {
      setDays(prevState => [...prevState, index]);
    }
  };

  return (
    <ul className="DaysOfWeek">
      {daysOfWeek.map((day, index) => (
        <li
          key={index}
          className={`list ${daysArray.includes(index) ? "included" : ""}`}
          onClick={() => toggleHighlight(index)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => { if (e.key === 'Enter') toggleHighlight(index); }}
        >
          {day}
        </li>
      ))}
    </ul>
  );
}

export default DaysOfWeek;
