import React, { useEffect, useState } from "react";
import "./DaysCheckDinein.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAvailabilityRequest } from "redux/productCatalog/productCatalogActions";

interface DaysCheckProps {
  checkedItems: number[][];
  setCheckedItems: (items: number[][]) => void;
  index: number;
  getDisabledDays?: any;
}

interface DataItem {
  id: string;
  name: string;
}

interface State {
  auth: {
    credentials: {
      locationId: string;
    };
  };
}

interface StateDataTag {
  productCatalog: {
    availability: [];
  };
}

const DaysCheck: React.FC<DaysCheckProps> = ({
  checkedItems,
  setCheckedItems,
  index,
  getDisabledDays,
}) => {
  const data = [
    "All days",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const disabledDays = getDisabledDays(index); 
  console.log({checkedItems}) 

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, checked } = event.target;
    const dayIndex = parseInt(name, 10);
    const newCheckedItems = [...checkedItems];
  
    if (dayIndex === 0) {
      newCheckedItems[index] = checked ? data.map((_, i) => i) : [];
    } else {
      if (checked) {
        newCheckedItems[index] = [...(newCheckedItems[index] || []), dayIndex];
      } else {
        newCheckedItems[index] = (newCheckedItems[index] || []).filter(
          (item) => item !== dayIndex
        );
      }  
      const allDaysSelected = data.slice(1).every((_, i) =>
        newCheckedItems[index].includes(i + 1)
      );  
      if (allDaysSelected) {
        newCheckedItems[index] = [0, ...newCheckedItems[index].filter((item) => item !== 0)];
      } else {
        newCheckedItems[index] = newCheckedItems[index].filter((item) => item !== 0);
      }
    }
    setCheckedItems(newCheckedItems);
  };
  
  const checkedItemsForIndex = Array?.isArray(checkedItems[index])
    ? checkedItems[index]
    : [];

  return (
    <div className="container-daycheck">
      {data.map((elem, idx) => {
        const isChecked = checkedItemsForIndex.includes(idx);
        const isDisabled = disabledDays.includes(idx); 
        return (
          <div className="DaysCheckContainer-dinein" key={idx}>
            <input
              type="checkbox"
              name={idx.toString()}
              onChange={handleCheckboxChange}
              className="aa"
              checked={isChecked}
              disabled={isDisabled} 
            />
            <label>{elem}</label>
          </div>
        );
      })}
    </div>
  );
};


export default DaysCheck;
