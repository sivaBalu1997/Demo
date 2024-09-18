import React from 'react';
import "./DaysOfWeek.scss";

// Define the types for the props
interface DaysOfWeekProps {
  days: number[]; // Array of numbers representing the selected days
  setDays: React.Dispatch<React.SetStateAction<number[]>>; // Function to update the selected days
}

const DaysOfWeek: React.FC<DaysOfWeekProps> = ({ days = [], setDays }) => {
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    const toggleHighlight = (index: number) => {
        if (days.includes(index)) {
            setDays(prevState => prevState.filter(day => day !== index));
        } else {
            setDays(prevState => [...prevState, index]);
        }
    };

    return (
        <ul className='DaysOfWeek'>
            {daysOfWeek.map((day, index) => (
                <li 
                    key={index} 
                    className={`list ${days.includes(index) ? "included" : ""}`}
                    // onClick={() => toggleHighlight(index)}
                    role="button"
                    tabIndex={0}
                    // onKeyPress={(e) => { if (e.key === 'Enter') toggleHighlight(index); }}
                >
                    {day}
                </li>
            ))}
        </ul>
    );
}

export default DaysOfWeek;
