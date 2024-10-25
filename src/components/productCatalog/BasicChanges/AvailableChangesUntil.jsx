import React, { useContext, useState } from 'react';
import './AvailabilityChangesUntil.scss';
import AvailCalender from '../AvailCalender/AvailCalender';
import { useDispatch, useSelector } from 'react-redux';
import { partialUpdateMenuRequest } from 'redux/productCatalog/productCatalogActions';
import { Contextpagejs } from 'pages/productCatalog/contextpage';

const AvailabilityChangesUntil = ({ setShowModalAvailable, onclose }) => {
  const dispatch=useDispatch()
  const [selectedOption, setSelectedOption] = useState(null); // Track the selected radio button
  const [showAvailCalender, setShowAvailCalender] = useState(false);
  const menuData = useSelector((state) => state.productCatalog?.menuData)
  const {  patchedData,setPatchedData } = useContext(Contextpagejs);



  const Text = [
    'End of Today',
    'End of Today',
    'Until(DD/MM/YYYY HH:MM AM/PM)', // Third radio button
    'Until manually enabled'
  ];

  const handleSaveBtn = () => {
    setShowModalAvailable();
    dispatch(partialUpdateMenuRequest(patchedData))

    onclose();
  };

  const handleRadioChange = (index) => {
    setSelectedOption(index);
    if (index === 2) {
      setShowAvailCalender(true); // Show calendar when the third option is selected
    } else {
      setShowAvailCalender(false); // Hide calendar for other options

      

    }
  };

  return (
    <div className='AvailabilityChangesUntilContainer'>
      <div className="Availability_Changes_Until_SubContainer">
        <div className='Avail_Changes_Form'>
          <h4 className='Avail_Changes_Heading'>Availability Changes Until</h4>

          {Text.map((elem, index) => (
            <div key={index} className='Avail_Changes_Radio_container'>
              <div className='Avail_Changes_Radio_container_Justify'>
                <h4 className='Avail_Changes_Radio_Text'>{elem}</h4>
                <input
                  className="AvaiilRadio"
                  type="radio"
                  name='avail-radio'
                  checked={selectedOption === index} 
                  onChange={() => handleRadioChange(index)} 
                />
              </div>
            </div>
          ))}

          <div className='Avail_Button_Flex'>
            <a className='Avail-btn1-Cancel' onClick={handleSaveBtn}>Cancel</a>
            <a className='Avail-btn1-Save' onClick={handleSaveBtn}>Save</a>
          </div>
        </div>
      </div>

      {showAvailCalender && <AvailCalender setShowModalAvailable={setShowModalAvailable}/>} 
    </div>
  );
};

export default AvailabilityChangesUntil;
