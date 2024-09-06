import React, { useEffect, useState } from 'react'
import "./AvailabilitySlider.scss"

import ToggleSliderAvail from "../ToggleSliderAvail/ToggleSliderAvail"


const PricingSlider = ({pen}) => {
    const[onPrem,setOnPrem]=useState(false)
    const[sectionA,setSectionA]=useState(false)
    const[sectionB,setSectionB]=useState(false)
    const[pickup,setPickup]=useState(false)
    const[delivery,setDelivery]=useState(false)
    const[ofPrem,setOfPrem]=useState(false)
    const[zomato,setZomato]=useState(false)
    const[swiggy,setSwiggy]=useState(false)
    const[ubereats,setUberEats]=useState(false)
    const[other1,setOther1]=useState(false)
    const[other2,setOther2]=useState(false)
    useEffect(() => {
      if (!onPrem) {
          setSectionA(false);
          setSectionB(false);
      } else {
          setSectionA(true);
          setSectionB(true);
      }
  }, [onPrem]);
  useEffect(() => {
    if (!ofPrem) {
        setPickup(false);
        setDelivery(false);
        setZomato(false)
        setSwiggy(false);
        setUberEats(false);
        setOther1(false);
        setOther2(false);
    } else {
      setPickup(true);
      setDelivery(true);
      setZomato(true)
      setSwiggy(true);
      setUberEats(true);
      setOther1(true);
      setOther2(true);
    }
}, [ofPrem]);
  return (
    <div className='AvailSlider-Container'>
     <h1 className='AvailSlider-Heading'>Availability</h1>
     <div className='AvailOnprem-Ofprem'>
    <div className='AvailOnToggle'>
     <h1 className='AvailOnprem-Heading'>On-prem</h1>
     <div className='OnpremToggle'><ToggleSliderAvail toggle={onPrem} setToggle={setOnPrem} pen={pen}/></div>
     </div>
     <div className='AvailSectionA'>
      <h1 className='AvailSectionA-Heading'>Section A: </h1>
      <div className="SectionAToggle"><ToggleSliderAvail toggle={sectionA} setToggle={setSectionA} pen={pen} /></div>
      
     </div>
     <div className='AvailSectionB'>
      <h1 className='AvailSectionB-Heading'>Section B: </h1>
      <div className='SectionBToggle'><ToggleSliderAvail toggle={sectionB} setToggle={setSectionB} pen={pen}/></div>
      
     </div>
     <div className='AvailOfToggle'>
     <h1 className='AvailOfprem-Heading'>Of-prem</h1>
     <div className='OfpremToggle'><ToggleSliderAvail toggle={ofPrem} setToggle={setOfPrem} pen={pen}/></div>
     </div>
     <div className='AvailOfPickup'>
      <h1 className='AvailOfPickup-Heading'>Pickup: </h1>
      <div className='PickupToggle'><ToggleSliderAvail toggle={pickup} setToggle={setPickup} pen={pen}/></div>
     </div>
     <div className='AvailOfDelivery'>
      <h1 className='AvailOfDelivery-Heading'>Delivery: </h1>
      <div className='DeliveryToggle'><ToggleSliderAvail toggle={delivery} setToggle={setDelivery} pen={pen}/></div>
      
     </div>
     <div className='AvailOfZomato'>
      <h1 className='AvailOfZomato-Heading'>Zomato: </h1>
      <div className='ZomatoToggle'><ToggleSliderAvail toggle={zomato} setToggle={setZomato} pen={pen}/></div>
      
     </div>
     <div className='AvailOfSwiggy'>
      <h1 className='AvailOfSwiggy-Heading'>Swiggy: </h1>
      <div className='SwiggyToggle'><ToggleSliderAvail toggle={swiggy} setToggle={setSwiggy} pen={pen}/></div>
      
     </div>
     <div className='AvailOfUberEats'>
      <h1 className='AvailOfUberEats-Heading'>UberEats: </h1>
      <div className='UberToggle'><ToggleSliderAvail toggle={ubereats} setToggle={setUberEats} pen={pen}/></div>
      
     </div>
     <div className='AvailOfOther1'>
      <h1 className='AvailOfOther1-Heading'>Other 1: </h1>
      <div className='Other1Toggle'><ToggleSliderAvail toggle={other1} setToggle={setOther1} pen={pen}/></div>
      
     </div>
     <div className='AvailOfOther2'>
      <h1 className='AvailOfOther2-Heading'>Other 2: </h1>
      <div className='Other2Toggle'><ToggleSliderAvail toggle={other2} setToggle={setOther2} pen={pen}/></div>
      
     </div>
     </div>
     </div>
  )
}

export default PricingSlider