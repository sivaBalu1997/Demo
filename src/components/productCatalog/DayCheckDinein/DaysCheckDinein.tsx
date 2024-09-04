import React, { useEffect, useState } from 'react';
import "./DaysCheckDinein.scss";
import axios from 'axios';

interface DaysCheckProps {
  checkedItems: number[][];
  setCheckedItems: (items: number[][]) => void;
  index: number;
}

interface DataItem {
  id: string;
  name: string;
}

const DaysCheck: React.FC<DaysCheckProps> = ({ checkedItems, setCheckedItems, index }) => {
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
  }, []);

  const getApi = async (): Promise<void> => {
    try {
      const response = await axios.get<DataItem[]>("https://api.magilhub.com/magilhub-data-services/merchants/itemAttributes?locationId=9c485244-afd4-11eb-b6c7-42010a010026&id=&option=Availability");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
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
