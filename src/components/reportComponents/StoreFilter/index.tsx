import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { storeMockDataRequest } from 'redux/productCatalog/productCatalogActions';
// import { Contextpagejs } from 'pages/productCatalog/contextpage';
// import { useHistory } from 'react-router-dom';

import './StoreFilter.scss';

interface StoreFilterProps {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    selectedStore: string;
    setSelectedStore: (store: string) => void;
}

const StoreFilter = ({selectedDate, setSelectedDate, selectedStore, setSelectedStore}: StoreFilterProps) => {
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
        <div className="reports-store-filter">
            <div className="store-info">
                <p className="label">Store name</p>
                <h2 className="store-name">A2B, Princeton</h2>
            </div>

            <div className="filters">
                <div className="filter-group">
                    <p className="label">Select date</p>
                    <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                        {/* <option>Today</option> */}
                        <option>Yesterday</option>
                        <option>This week</option>
                        <option>This month</option>
                        <option>This year</option>
                        <option>Custom Date</option>
                    </select>
                </div>

                <div className="filter-group">
                    <p className="label">Select store</p>
                    <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
                        <option>A2B Princeton</option>
                        <option>A2B Store 2</option>
                        <option>A2B Store 3</option>
                        <option>A2B Store 4</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default StoreFilter;
