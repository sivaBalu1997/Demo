import React, { useState } from 'react';
import './BasicChanges.scss';
import ToggleSlider from '../ToggleSlider/ToggleSlider';
import Basic from '../../../assets/images/Basic.png';
import { useSelector } from 'react-redux';

const BasicChanges = () => {
  const outlets = useSelector((state) => state.auth.restaurantDetails.branch);
  const [outletToggles, setOutletToggles] = useState(
    outlets.map(() => false) // Initialize toggle state for each outlet
  );

  // Function to handle toggle change for each outlet
  const handleToggleChange = (index) => {
    const updatedToggles = [...outletToggles];
    updatedToggles[index] = !updatedToggles[index]; // Toggle the specific outlet
    setOutletToggles(updatedToggles);
  };
const handleInputChange=(e)=>{
  const isChecked = e.target.checked;

  const updatedToggles = outlets.map(() => isChecked); 
  setOutletToggles(updatedToggles);

  if(isChecked===false){
    
  const updatedToggles = outlets.map(() => false); 
  setOutletToggles(updatedToggles);

  }

}
  return (
    <>
      <div className="BasicChangesContainer">
        <div className="BasicChanges">
          <img src={Basic} className="BasicChangesImage" alt="Basic" />
          <p className="BasicChangesText">
            Make basic changes here. Click the edit icon for all options
          </p>
        </div>
        <div className="BasicChangesDiv"></div>
        <div className="BasicChangescheckbox">
          <input type="checkbox" className="BasicCheckboxInput" onChange={handleInputChange}/>
          <h1 className="BasicChangescheckbox-Heading">Change across all outlets</h1>
        </div>
        <div className="ToggleBasicChanges">
          {outlets.map((elem, index) => (
            <div className="Toggle1BasicChange" key={index}>
              <ToggleSlider
                toggle={outletToggles[index]}
                setToggle={() => handleToggleChange(index)} // Pass the index to handle toggle
              />
              <h1 className="Toggle1Basic-Heading">{elem.locationName}</h1>
            </div>
          ))}
        </div>
        <div className="CancelChange">
          <button className="CancelBtn">Cancel</button>
          <button className="ChangeBtn">Change</button>
        </div>
      </div>
    </>
  );
};

export default BasicChanges;
