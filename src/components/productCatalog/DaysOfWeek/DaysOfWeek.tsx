import React from "react";
import "./DaysOfWeek.scss";

// Define the types for the props
interface DaysOfWeekProps {
  days: any | number;
  setDays: React.Dispatch<React.SetStateAction<number[]>>;
  Marginpresent?:boolean
}

const DaysOfWeek: React.FC<DaysOfWeekProps> = ({ days = [], setDays ,Marginpresent}) => {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const fullDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const daysArray = Array.isArray(days) && days.length > 0 ? days : [];

  // const toggleHighlight = (index: number) => {
  //   if (daysArray.includes(index)) {
  //     setDays((prevState) => prevState.filter((day) => day !== index));
  //   } else {
  //     setDays((prevState) => [...prevState, index]);
  //   }
  // };

  const adjustedDaysArray = Array.isArray(days)
    ? days
        .filter((day) => day !== "All Days")
        .map((day) => fullDays.indexOf(day))
    : [];

  return (
    <ul className="DaysOfWeek" style={{marginLeft:Marginpresent?"21px":"1.8rem"}}>
      {daysOfWeek.map((day, index) => (
        <li
          key={index}
          className={`list ${adjustedDaysArray.includes(index) ? "included" : ""}`}
          // onClick={() => toggleHighlight(index)}
          role="button"
          tabIndex={0}
          //onKeyPress={(e) => { if (e.key === 'Enter') toggleHighlight(index); }}
        >
          {day}
        </li>
      ))}
    </ul>
  );
};

export default DaysOfWeek;
