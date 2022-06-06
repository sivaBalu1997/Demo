import React from "react";
import downArrow from "../../assets/images/down-arrow.png";

const Dropdown = ({
  color,
  data,
  selectValue,
  handleSelect,
  placeholder,
  name,
}) => {
  return (
    <div className="dropdown">
      <select
        style={{ color: color }}
        value={selectValue}
        onChange={handleSelect}
        name={name}
      >
        {placeholder && <option> {placeholder}</option>}
        {data.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.option ? item.option : item.name}
            </option>
          );
        })}
        {/* <option> */}
        <input type="text" placeholder="Enter Category Name" />
        {/* <span>Add Menu Item</span> */}
        {/* </option> */}
      </select>
      {/* <label style="display:none;">
        Enter your Name
        <input></input>
      </label> */}
      <img src={downArrow} alt="arrow" className="select__arrow" />
    </div>
  );
};

export default Dropdown;
