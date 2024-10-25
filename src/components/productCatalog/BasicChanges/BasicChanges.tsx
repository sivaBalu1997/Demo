import React, { useContext, useState } from 'react';
import './BasicChanges.scss';
import ToggleSlider from '../ToggleSlider/ToggleSlider';
import Basic from '../../../assets/images/Basic.png';
import { useDispatch, useSelector } from 'react-redux';
import AvailCalender from '../AvailCalender/AvailCalender';
import AvailabilityChangesUntil from './AvailableChangesUntil';
import { partialUpdateMenuRequest, removeDataRequest } from 'redux/productCatalog/productCatalogActions';
import { Contextpagejs } from 'pages/productCatalog/contextpage';

interface BasiChangesProps {
  onclose: any;
}

const BasicChanges: React.FC<BasiChangesProps> = ({ onclose }) => {

  const[showModalAvailable,setShowModalAvailable]=useState(false)
  const { patchedData, setPatchedData } = useContext(Contextpagejs);
  const partaldatasending= useSelector((state : any) => state.productCatalog.partialDataSendingLoading)
 
  

  const dispatch = useDispatch()

  const handleChangeButton = () => {
    dispatch(removeDataRequest())
    onclose();
  };

  const handledispatchforpartilChange= () => {
    setShowModalAvailable(true)
    dispatch(partialUpdateMenuRequest(patchedData));
    console.log("partaldatasending",partaldatasending);
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
          <button className="ChangeBtn" onClick={handledispatchforpartilChange}>
            Change
          </button>
        </div>
      </div>
      {/* {showModalAvailable && <AvailabilityChangesUntil  />} */}
    </>
  );
};

export default BasicChanges;
