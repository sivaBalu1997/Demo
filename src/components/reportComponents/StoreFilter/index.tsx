import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { storeMockDataRequest } from 'redux/productCatalog/productCatalogActions';
// import { Contextpagejs } from 'pages/productCatalog/contextpage';
// import { useHistory } from 'react-router-dom';

import './StoreFilter.scss';
import CustomDropdown from 'components/common/customDropdown';

interface StoreFilterProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedStore: string;
  setSelectedStore: (store: string) => void;
}

const StoreFilter = ({ selectedDate, setSelectedDate, selectedStore, setSelectedStore }: StoreFilterProps) => {
  // const dispatch = useDispatch();
  // const history = useHistory();
  // const { storeList } = useContext(Contextpagejs);

  // const [selectedStore, setSelectedStore] = useState(null);

  // const onSelectStore = (store) => {
  //     setSelectedStore(store);
  //     dispatch(storeMockDataRequest(store.storeId));
  //     history.push(`/product-catalog?storeId=${store.storeId}`);
  // };

  return (
    <>
      <div className="reports-filters-section">
        <div className="category-store-name">
          <span>Store name</span>
          <h1>A2B, Princeton</h1>
        </div>
        <div className="category-dropdown-container">
          <div className="category-dropdown-sub-container">
            <span className="category-dropdown-text">Select date</span>
            <CustomDropdown
              onSelect={() => console.log(1)}
              options={[
                { value: "Sales", label: "Sales" },
                { value: "Product", label: "Product" },
              ]}
              value={"Sales"}
              className="category-dropdown"
            />
            {/* <Dropdown data={[{id:"1",name:"Princeton",option:"Princeton"}]} className={"category-dropdown"}/> */}
          </div>
          <div className="category-dropdown-sub-container">
            <span className="category-dropdown-text">Select store</span>
            <CustomDropdown
              onSelect={() => console.log(1)}
              options={[{ value: "Sales", label: "Sales" }]}
              value={"Sales"}
              className="category-dropdown"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreFilter;
