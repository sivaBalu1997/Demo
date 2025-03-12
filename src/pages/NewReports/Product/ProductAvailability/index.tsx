import React, { useState } from 'react'
import MultiSwitchableBox from 'components/reportComponents/MultiSwitchableBox';
import "./style.scss"
import StoreFilter from 'components/reportComponents/StoreFilter';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation } from 'redux/newReports/newReportsActions';

const ProductAvailability = () => {
  const texts = ["All", "Available", "Unavailable"];
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const dispatch = useDispatch();

  const locations = useSelector((state: any) => state?.newReports?.storeLocationsList)
  const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation)
  

  const handleSwitch = (index: number) => {
    setActiveIndex(index);
  };

  const handleRefreshClick = () => {
    console.log("refreshed")
  }

  return (
    <div className='report-product-insights'>
      <StoreFilter storeOptions={locations}
        selectedStore={selectedLocation}
        setSelectedStore={(store) => dispatch(changeLocation(store))}
        handleRefreshClick={handleRefreshClick}
        showRefresh={true} showDate={false}
      />
      <MultiSwitchableBox texts={texts} activeIndex={activeIndex} onSwitch={handleSwitch} />
    </div>
  )
}

export default ProductAvailability
