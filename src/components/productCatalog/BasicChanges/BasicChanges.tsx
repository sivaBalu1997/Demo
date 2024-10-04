import React, { useState } from 'react';
import './BasicChanges.scss';
import ToggleSlider from '../ToggleSlider/ToggleSlider';
import Basic from '../../../assets/images/Basic.png';
import { useSelector } from 'react-redux';
import AvailCalender from '../AvailCalender/AvailCalender';
import AvailabilityChangesUntil from './AvailableChangesUntil';

interface BasiChangesProps {
  onclose: any;
}

const BasicChanges: React.FC<BasiChangesProps> = ({ onclose }) => {
  const [showAvailCalender, setShowAvailCalender] = useState(false);
  const[showModalAvailable,setShowModalAvailable]=useState(false)

  const handleChangeButton = () => {
    onclose();
  };

  const handleAvailCalender = () => {
    
    setShowModalAvailable(true)

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
          <button className="CancelBtn" onClick={handleChangeButton}>
            Cancel
          </button>
          <button className="ChangeBtn" onClick={handleAvailCalender}>
            Change
          </button>
        </div>
      </div>
      {showModalAvailable && <AvailabilityChangesUntil onclose={onclose} setShowModalAvailable={setShowModalAvailable}/>}
    </>
  );
};

export default BasicChanges;
