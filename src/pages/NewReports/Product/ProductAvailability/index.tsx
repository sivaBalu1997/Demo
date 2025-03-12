import React, { useState } from 'react'
import MultiSwitchableBox from 'components/reportComponents/MultiSwitchableBox';
import "./style.scss"

const ProductAvailability = () => {
  const texts = ["All", "Available", "Unavailable"];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  const handleSwitch = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div className='report-product-insights'>
      <MultiSwitchableBox texts={texts} activeIndex={activeIndex} onSwitch={handleSwitch} />
    </div>
  )
}

export default ProductAvailability
