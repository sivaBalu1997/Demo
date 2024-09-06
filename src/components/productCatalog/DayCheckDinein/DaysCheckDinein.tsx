import React, { useEffect, useState } from 'react';
import "./DaysCheckDinein.scss";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailabilityRequest } from 'redux/productCatalog/productCatalogActions';

interface DaysCheckProps {
  checkedItems: number[][];
  setCheckedItems: (items: number[][]) => void;
  index: number;
}

interface DataItem {
  id: string;
  name: string;
}

interface State {
  auth: {
    credentials:{
      locationId:string

    }
    
  };
}

interface StateDataTag {
 
  productCatalog:{
    availability:[]

    }
    
  
}

const DaysCheck: React.FC<DaysCheckProps> = ({ checkedItems, setCheckedItems, index }) => {
  const locationid=useSelector((state:State)=>state.auth.credentials.locationId)
  const tagData=useSelector((state:StateDataTag)=>state.productCatalog.availability)


  const dispatch=useDispatch()
  const [data, setData] = useState<DataItem[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;
    const newCheckedItems = [...checkedItems];

    if (checked) {
      const newName = parseInt(name, 10); // Convert the name to an integer
      newCheckedItems[index] = [...(newCheckedItems[index] || []), newName];
    } else {
      newCheckedItems[index] = (newCheckedItems[index] || []).filter((item) => item !== parseInt(name, 10));
    }

    setCheckedItems(newCheckedItems);
  };

  const checkedItemsForIndex = Array.isArray(checkedItems[index]) ? checkedItems[index] : [];

  useEffect(() => {
    getApi();
    setData(tagData)

  }, []);

  const getApi = async (): Promise<void> => {
    dispatch(getAvailabilityRequest(locationid))

  };

  return (
    <div className='container-daycheck'>
      {data.map((elem, idx) => {
        const isChecked = checkedItemsForIndex.includes(idx);
        return (
          <div className='DaysCheckContainer1' key={idx}>
            <input
              type="checkbox"
              name={idx.toString()}
              onChange={handleCheckboxChange}
              className='aa'
              checked={isChecked}
            />
            <label>{elem.name}</label>
          </div>
        );
      })}
    </div>
  );
};

export default DaysCheck;
