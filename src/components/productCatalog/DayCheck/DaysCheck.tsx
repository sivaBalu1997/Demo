import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./DaysCheck.scss";
import axios from "axios";
import { getAvailabilityRequest } from "redux/productCatalog/productCatalogActions";

// Define the types for the component's props
interface DaysCheckProps {
  checkedItems: number[]; // Use number[] for checked items
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>;
  index?: number;
  id: string[];
  setId: React.Dispatch<React.SetStateAction<string[]>>;
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
}) => {
  const locationid = useSelector(
    (state: State) => state.auth.credentials.locationId
  );
  const tagData = useSelector(
    (state: StateDataTag) => state.productCatalog.availability
  );

  const [data, setData] = useState<DataItem[]>([]);
  const dispatch = useDispatch();
  const Days=["All days","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const numericName = parseInt(name, 10); 

    if (checked) {
      // Add the checkbox value to the state if it is checked
      setCheckedItems((prevState) => [...prevState, numericName]);
      // setId((prevState) => [...prevState, ]);
    } else {
      // Remove the checkbox value from the state if it is unchecked
      setCheckedItems((prevState) =>
        prevState.filter((item) => item !== numericName)
      );
      setId((prevState) =>
        prevState.filter((itemId) => itemId !== data[numericName].id)
      );
    }
  };

  useEffect(() => {
    getApi();
    // setData(tagData);
  }, []);

  const getApi = async () => {
    dispatch(getAvailabilityRequest(locationid));
  };

  return (
    <div>
      <div className="DaysCheckContainer1">
        {Days.map((elem, index) => {
          const isChecked = checkedItems.includes(index); 
          return (
            <div key={index}>
              <input
                type="checkbox"
                name={index.toString()} 
                onChange={handleCheckboxChange}
                checked={isChecked}
                className="days"
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
