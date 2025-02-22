import StoreFilter from 'components/reportComponents/StoreFilter';
import React, { useState } from 'react';

const Employees: React.FC = () => {
      const [selectedDate, setSelectedDate] = useState( { label: "Yesterday", value: "Yesterday" });
      const [selectedStore, setSelectedStore] = useState({ label: "A2B Princeton", value: "A2B Princeton" });
    return (
        <>
        <StoreFilter selectedDate={selectedDate} selectedStore={selectedStore} setSelectedDate={setSelectedDate} setSelectedStore={setSelectedStore}/>
        </>
    );
};

export default Employees;