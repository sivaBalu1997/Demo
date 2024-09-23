import React, { useState } from 'react';
import './BasicChanges.scss';
import ToggleSlider from '../ToggleSlider/ToggleSlider';
import Basic from '../../../assets/images/Basic.png';
import { useSelector } from 'react-redux';
import AvailabilityChangesUntil from './AvailabilityChangesUntil';

interface BasiChangesProps{
  onclose:any
}
const BasicChanges:React.FC<BasiChangesProps> = ({ onclose }) => {
  
 

 

  // Handle input change for the "Change across all outlets" checkbox

  // Function to handle the "Change" button click
  const [showModalAvailable,setShowModalAvailable]=useState<boolean>(false)
  const handleChangeButton = () => {
    setShowModalAvailable(true)
  };
  const handleCancelBtn=()=>{
    onclose();
  }
 

  return (
    <>
      <div className="BasicChangesContainer">
        <div className="BasicChanges">
          <img src={Basic} className="BasicChangesImage" alt="Basic" />
          <p className="BasicChangesText">
            Make basic changes here. Click the edit icon for all options.
          </p>
        </div>
          <div className="CancelChange">

          <button className="CancelBtn" onClick={handleCancelBtn}>Cancel</button>
          <button className="ChangeBtn" onClick={handleChangeButton} >Change </button>

        </div>
        {showModalAvailable&&   <AvailabilityChangesUntil setShowModalAvailable={()=>setShowModalAvailable(false)}  onclose={onclose} /> }
      
      </div>
    </>
  );
};

export default BasicChanges;
