import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./DaysChecking.scss";
import axios from "axios";
import { getAvailabilityRequest } from "redux/productCatalog/productCatalogActions";

// Define the types for the component's props
interface DaysCheckProps {
  checkedItems: number[]; // Use number[] for checked items
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>;
  index?: number;
  id?: string[];
  setId: React.Dispatch<React.SetStateAction<string[]>>;
  setValue?: any;
  valueName?: string;
  getValues?: any;
  register?: any;
  disabledays?: any;
  dateShow?: any;
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
  disabledays,
  dateShow,
}) => {
  const locationid = useSelector(
    (state: State) => state?.auth?.credentials?.locationId
  );
  const tagData = useSelector(
    (state: StateDataTag) => state.productCatalog.availability
  );

  const [data, setData] = useState<DataItem[]>([]);
  const dispatch = useDispatch();
  const Days = [
    "All days",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const dayIndex = parseInt(name, 10);

    setCheckedItems((prevCheckedItems) => {
      let updatedCheckedItems: number[];

      if (dayIndex === 0) {
       const val:any=[]
       val.push(0)
        Days.forEach((_, i) => {
            const isEnabled = dateShow ? disabledays?.includes(i) : true
            if(isEnabled)
            {
              val.push(i)
            }
        }) 
        updatedCheckedItems =checked ?val:[]
        setId(checked ? data.map((item) => item?.id) : []);
      } else {
        if (checked) {
          updatedCheckedItems = [...prevCheckedItems, dayIndex];
          setId((prevId) => [...prevId, data[dayIndex]?.id]);
        } else {
          updatedCheckedItems = prevCheckedItems.filter(
            (item) => item !== dayIndex
          );
          setId((prevId) =>
            prevId.filter((itemId) => itemId !== data[dayIndex]?.id)
          );
        }

        const allDaysSelected = Days.slice(1).every((_, i) =>
          updatedCheckedItems.includes(i + 1)
        );

        if (allDaysSelected) {
          updatedCheckedItems = [
            0,
            ...updatedCheckedItems.filter((item) => item !== 0),
          ];
        } else {
          updatedCheckedItems = updatedCheckedItems.filter(
            (item) => item !== 0
          );
        }
      }

      if (valueName) {
        setValue(valueName, updatedCheckedItems);
      }
      return updatedCheckedItems;
    });
  };

  useEffect(() => {
    getApi();
  }, []);
  useEffect(()=>{
    if(disabledays.length>0&& checkedItems.length>0){
         const data =checkedItems.filter((item)=>disabledays.includes(item))
         setCheckedItems(data)
         console.log("kkkk",data,disabledays)
    }

  },[disabledays])

  const getApi = async () => {
    dispatch(getAvailabilityRequest(locationid));
  };

  return (
    <div>
      <div className="DaysCheckContainer-offer">
        {Days.map((elem, index) => {
          const isChecked = checkedItems?.includes(index);
          const isEnabled = dateShow ? disabledays?.includes(index) : true;
          return (
            <div key={index}>
              <input
                type="checkbox"
                name={index.toString()}
                onChange={handleCheckboxChange}
                {...register(valueName)}
                checked={index==0?isChecked:isChecked&&isEnabled}
                className="days"
                disabled={index==0?false:!isEnabled}
              />
              <label>{elem}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DaysCheck;