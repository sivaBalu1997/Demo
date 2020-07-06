import React from "react";
import downArrow from "../../assets/images/down-arrow.png";

const Dropdown = ({ color, data, selectValue, handleSelect }) => {
  return (
    <div className="dropdown">
      <select
        style={{ color: color }}
        value={selectValue}
        onChange={handleSelect}
      >
        {data.map((item) => {
          return (
            <option key={item.id} value={item.option}>
              {item.option}
            </option>
          );
        })}
      </select>
      <img src={downArrow} alt="arrow" className="select__arrow" />
    </div>
  );
};

export default Dropdown;
