import React, { useState } from 'react'
import ToggleSliderInventory from "../ToggleSliderInventory/ToggleSliderInventory"
import "./Inventory.scss"

interface SideBarData {
  id: number;
  itemName: string;
  code: string;
  type: string;
  mealType: string;
  dietary: string;
  cusine: string;
  pricingdetails: {
    Dinein1: string[];
    Pickup1: string[];
    Delivery1: string[];
    Dinein2: string[];
    Pickup2: string[];
    Delivery2: string[];
    Inventory1: string[];
    Customize1: string[];
  };
}

interface InventoryProp {
  SideBarData: SideBarData[];
}

const Inventory: React.FC<InventoryProp> = ({ SideBarData }) => {
  const [invent, setInvent] = useState(true);
  const [pen, setPen] = useState(true);

  // State for the input fields
  const [inventoryData, setInventoryData] = useState({
    maxServingsPerDay: SideBarData?.[0]?.pricingdetails?.Inventory1?.[0] || "",
    threshold: SideBarData?.[0]?.pricingdetails?.Inventory1?.[1] || "",
    resetInventory: false,
    showNextAvailableTime: false,
  });

  // Handle change for input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInventoryData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,  // Handle checkbox and text input differently
    }));
  };

  return (
    <div className='InventorySlider-Container'>
      <div className='InventorySlider-Form'>
        <div className='InventorySlider'>
          <h1 className='InventorySlider-Heading'>Inventory</h1>
          <ToggleSliderInventory toggle={invent} setToggle={setInvent} pen={pen}></ToggleSliderInventory>
        </div>

        {invent ? (
          <div className='InventForm'>
            <div className='InventFlex'>
              <div className='InventSection'>
                <h1 className='Invent-Heading'>Max No. of servings per day*</h1>
                <input
                  type="text"
                  name="maxServingsPerDay"
                  className='InventInputSlider'
                  value={inventoryData.maxServingsPerDay}
                  onChange={handleInputChange} // Handle input change
                />
              </div>
              <div className='ThresholdSliderSection'>
                <h1 className='ThresholdSlider-Heading'>Threshold*</h1>
                <input
                  type="text"
                  name="threshold"
                  className='ThresholdInputSlider'
                  value={inventoryData.threshold}
                  onChange={handleInputChange} // Handle input change
                />
              </div>
              <div className='CheckboxSlider'>
                <div className='CheckboxSlider-Section1'>
                  <input
                    type="checkbox"
                    name="resetInventory"
                    className='CheckboxSlider-Input'
                    checked={inventoryData.resetInventory}
                    onChange={handleInputChange} // Handle checkbox change
                  />
                  <h1 className='CheckboxSlider-heading'>Reset inventory everyday</h1>
                </div>
                <div className='CheckboxSlider-Section2'>
                  <input
                    type="checkbox"
                    name="showNextAvailableTime"
                    className='CheckboxSlider-Input2'
                    checked={inventoryData.showNextAvailableTime}
                    onChange={handleInputChange} // Handle checkbox change
                  />
                  <h1 className='CheckboxSlider-heading2'>
                    Show next available time when maximum count is reached
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Inventory;
