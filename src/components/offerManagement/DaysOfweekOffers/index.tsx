import React from 'react';
import './style.scss';

interface DaysSelectorProps {
  highlightedDays: number[]; // Array of indices for days to highlight (e.g., [1, 2, 4])
}

const DaysSelector: React.FC<DaysSelectorProps> = ({ highlightedDays }) => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="days-selector">
      {days?.map((day, index) => (
        <div
          key={index}
          className={`day ${
            highlightedDays?.includes(index==0?7:index) ? 'active' : ''
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default DaysSelector;
