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
  
  const[showAvailabilityChangesUntilModal,setShowAvailabilityChangesUntilModal]=useState(false)
 

 

  // Handle input change for the "Change across all outlets" checkbox

  // Function to handle the "Change" button click
  const handleChangeButton = () => {
    setShowAvailabilityChangesUntilModal(true)
  };

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
          <button className="CancelBtn" onClick={handleChangeButton}>Cancel</button>
          <button className="ChangeBtn" onClick={handleChangeButton} >Change </button>

          {showAvailabilityChangesUntilModal&&
          <AvailabilityChangesUntil onclose={onclose} setShowAvailabilityChangesUntilModal={setShowAvailabilityChangesUntilModal}  />}
        </div>
      </div>
    </>
  );
};

export default BasicChanges;
