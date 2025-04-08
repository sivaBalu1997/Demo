import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./DaysCheck.scss";
import axios from "axios";
import { getAvailabilityRequest } from "redux/productCatalog/productCatalogActions";

// Define the types for the component's props
interface DaysCheckProps {
  checkedItems: any; // Use number[] for checked items
  setCheckedItems: any;
  index?: number;
  id?: string[];
  setId: React.Dispatch<React.SetStateAction<string[]>>;
  setValue?: any;
  valueName?: string;
  getValues?: any;
  register?: any;
  normalDays?: any;
  defaultDays?: boolean;
  errorarray?: any;
  setErrorArray?: any;
  Errorname?: string;
  disabledays?: any;
  dateShow?: any;
  availabilityDay?:any
}

// Define the type for the data returned by the API
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
  id,
  setId,
  setValue,
  getValues,
  register,
  valueName,
  normalDays,
  defaultDays,
  errorarray,
  setErrorArray,
  Errorname,
  disabledays,
  dateShow,
  availabilityDay
}) => {
  const locationid = useSelector(
    (state: State) => state.auth.credentials?.locationId
  );
  const tagData = useSelector(
    (state: StateDataTag) => state.productCatalog.availability
  );
  const [data, setData] = useState<DataItem[]>([]);
  const Days = [
   ...availabilityDay
  ];

  const handleCheckboxChange = (day: any) => {
  if(checkedItems.includes(day))
  {
     setCheckedItems((prev:any)=>prev.filter((data:any)=>data!=day))
  }
  else{
    setCheckedItems((prev: any) => [...prev, day]);
  }
  
    
  };

  // useEffect(() => {
  //   if (checkedItems && checkedItems.length > 0) {
  //     const validationErrors = { ...errorarray };

  //     delete validationErrors[`${Errorname}`];

  //     setErrorArray?.(validationErrors);
  //   } else {
  //     // const validationErrors = { ...errorarray};
  //     //  validationErrors[`${Errorname}`]="Please enter available days";
  //     //  setErrorArray?.(validationErrors);
  //   }
  // }, [checkedItems]);

  // useEffect(() => {
  //   if (disabledays.length > 0 && checkedItems.length > 0) {
  //     const data = checkedItems.filter((item: any) =>
  //       disabledays.includes(item)
  //     );
  //     setCheckedItems(data);
  //   }
  // }, [disabledays]);

  const AlldaysDisabled = Days.filter((item, index) =>
    disabledays.includes(index)
  );

  return (
    <div className="DaysCheckContainer1">
      {Days.map((elem, index) => {
        const isChecked = checkedItems?.includes(elem);
        const isEnabled = dateShow ? disabledays?.includes(index) : true;
        return (
          <div key={index}>
            <input
              type="checkbox"
              name={index?.toString()}
              onChange={() => handleCheckboxChange(elem)}
              checked={index == 0 ? isChecked : isChecked && isEnabled}
              disabled={
                index == 0
                  ? AlldaysDisabled?.length > 0
                    ? false
                    : true
                  : !isEnabled
              }
              className="days"
            />

            <label>{elem}</label>
          </div>
        );
      })}
    </div>
  );
};

export default DaysCheck;
