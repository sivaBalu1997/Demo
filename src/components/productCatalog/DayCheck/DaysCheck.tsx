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
  AvailableDatsvaliadtion?: any
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
  availabilityDay,
  AvailableDatsvaliadtion
}) => {
  const locationid = useSelector(
    (state: State) => state.auth.credentials?.locationId
  );
  const tagData = useSelector(
    (state: StateDataTag) => state.productCatalog.availability
  );
  const availabilityDays=availabilityDay.length>0 ? availabilityDay?.filter((data:any)=>data!="All") :[]
  const [data, setData] = useState<DataItem[]>([]);
  const Days = [
    "All Days",
   ...availabilityDays
  ];

  const handleCheckboxChange = (day: any) => {
    let days:any=[]
    if(dateShow)
    {
      days.push("All Days")
    Days.forEach((data:any,index:any)=>{
      if(disabledays.includes(index)){
         days.push(data)
      }
    })
  }
  else{
    days=[...Days]
  }
    if (day === 'All Days') {
      if (checkedItems.length === days.length) {
        setCheckedItems([]);
      } else {
        setCheckedItems([...days]);
      }
    }
  else if(checkedItems.includes(day))
  {
     setCheckedItems((prev:any)=>prev.filter((data:any)=>data!=day))
  }
  else{
    setCheckedItems((prev: any) => [...prev, day]);
  }
  };

  useEffect(() => {
    if(checkedItems?.length > 0){
      AvailableDatsvaliadtion()
    }
  },[checkedItems])

  useEffect(() => {
    const daysToCompare = dateShow
      ? ["All Days", ...Days?.filter((_, index) => disabledays?.includes(index))]
      : Days;
  
    const allOtherDays = daysToCompare?.filter((day) => day !== "All Days");
  
    const areAllDaysChecked = allOtherDays?.every((day) =>
      checkedItems?.includes(day)
    );
  
    const isAllDaysAlreadyChecked = checkedItems?.includes("All Days");
  
    if (areAllDaysChecked && !isAllDaysAlreadyChecked) {
      setCheckedItems((prev: any) => [...prev, "All Days"]);
    }
  
    if (!areAllDaysChecked && isAllDaysAlreadyChecked) {
      setCheckedItems((prev: any) => prev?.filter((item: any) => item !== "All Days"));
    }
  }, [checkedItems, Days, dateShow, disabledays]);
  

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
        const isEnabled = dateShow ? index==0?true : disabledays?.includes(index) : true;
        return (
          <div key={index}>
            <input
              type="checkbox"
              name={index?.toString()}
              onChange={() => handleCheckboxChange(elem)}
              checked={index == 0 ? isChecked : isChecked && isEnabled}
              disabled={
                 !isEnabled
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
