import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { storeMockDataRequest } from 'redux/productCatalog/productCatalogActions';
// import { Contextpagejs } from 'pages/productCatalog/contextpage';
// import { useHistory } from 'react-router-dom';

import './StoreFilter.scss';
import CustomDropdown from 'components/common/customDropdown';
import ReportsRefreshButton from '../ReportsRefreshButton';

interface StoreFilterProps {
  selectedDate?: StoreOption;
  setSelectedDate?: (date: StoreOption) => void;
  selectedStore?: StoreOption;
  setSelectedStore?: (store: StoreOption) => void;
  showDate?: boolean;
  showStore?: boolean;
  showRefresh?: boolean;
  handleRefreshClick?: () => void;
}
interface StoreOption {
  label: string;
  value: string;
}

const dateOptions: StoreOption[] = [
  { label: "Yesterday", value: "Yesterday" },
  { label: "This week", value: "This week" },
  { label: "This month", value: "This month" },
  { label: "This year", value: "This year" },
  { label: "Custom Date", value: "Custom Date" },
];


const storeOptions: StoreOption[] = [
  { label: "A2B Princeton", value: "A2B Princeton" },
  { label: "A2B Store 2", value: "A2B Store 2" },
  { label: "A2B Store 3", value: "A2B Store 3" },
  { label: "A2B Store 4", value: "A2B Store 4" },
];
const StoreFilter = ({ selectedDate, setSelectedDate = () => { }, selectedStore, setSelectedStore = () => { }, handleRefreshClick = () => { }, showDate = true, showStore = true, showRefresh = false }: StoreFilterProps) => {
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
    <div className="reports-filters-section">
      <div className="category-store-name">
        <span>Store name</span>
        <h1>{selectedStore?.label || ""}</h1>
      </div>
      <div className="category-dropdown-container">
        {showDate ?
          <div className="category-dropdown-sub-container">
            <span className="category-dropdown-text">Select date</span>
            <CustomDropdown
              onSelect={(option: StoreOption) => setSelectedDate(option)}
              options={dateOptions}
              value={selectedDate}
              className="category-dropdown"
            />
            {/* <Dropdown data={[{id:"1",name:"Princeton",option:"Princeton"}]} className={"category-dropdown"}/> */}
          </div>
          : null}
        {showStore ?
          <div className="category-dropdown-sub-container">
            <span className="category-dropdown-text">Select store</span>
            <CustomDropdown
              onSelect={(option: StoreOption) => setSelectedStore(option)}
              options={storeOptions}
              value={selectedStore}
              className="category-dropdown"
            />
          </div>
          : null}

        {showRefresh ?
          <div className="category-dropdown-sub-container">
            <span className="category-dropdown-text"> &nbsp;</span>
            <ReportsRefreshButton loader={false} onRefreshClick={handleRefreshClick} />
          </div>
          : null}

      </div>
    </div>
  );
};

export default StoreFilter;
