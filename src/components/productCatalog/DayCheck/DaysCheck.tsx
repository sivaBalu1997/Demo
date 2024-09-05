import React, { useState, useEffect } from 'react';
import "./DaysCheck.scss";
import axios from 'axios';

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

const DaysCheck: React.FC<DaysCheckProps> = ({ checkedItems, setCheckedItems, index, id, setId }) => {
  const [data, setData] = useState<DataItem[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const numericName = parseInt(name, 10); // Convert name to number

    if (checked) {
      // Add the checkbox value to the state if it is checked
      setCheckedItems(prevState => [...prevState, numericName]);
      setId(prevState => [...prevState, data[numericName].id]);      
    } else {
      // Remove the checkbox value from the state if it is unchecked
      setCheckedItems(prevState => prevState.filter(item => item !== numericName));
      setId(prevState => prevState.filter(itemId => itemId !== data[numericName].id));
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const getApi = async () => {
    try {
      const response = await axios.get<DataItem[]>(
        "https://api.magilhub.com/magilhub-data-services/merchants/itemAttributes?locationId=9c485244-afd4-11eb-b6c7-42010a010026&id=&option=Availability"
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(checkedItems);

  return (
    <div>
      <div className="DaysCheckContainer1">
        {data.map((elem, index) => {
          const isChecked = checkedItems.includes(index); // Check if index is included in checkedItems
          return (
            <div key={elem.id}>
              <input
                type="checkbox"
                name={index.toString()} // Convert index to string for name
                onChange={handleCheckboxChange}
                checked={isChecked}
                className="aa"
              />
              <label>{elem.name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DaysCheck;
