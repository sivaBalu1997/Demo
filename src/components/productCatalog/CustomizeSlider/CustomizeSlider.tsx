import React, { useState } from 'react';
import './CustomizeSlider.scss';
import ToggleSliderAvail from '../ToggleSliderAvail/ToggleSliderAvail';
import { useSelector } from 'react-redux';

interface Option {
  item: string;
  price: number;
}

interface ItemCustomization {
  modifierName: string;
  selectionType: string;
  minSelection?: number;
  maxSelection?: number;
  options?: Option[];
  freeCustomization?: string;
  selectedValue?: string[];
  serviceStreams?: string[];
}
interface RootState {
  selectedMockDataReducer: {
    data: any[];
  };
}



const CustomizeSlider = () => {
  const datafromRedux = useSelector((state:RootState) => state?.selectedMockDataReducer?.data);

  const data = [
    {
      mainHeading: datafromRedux[0]?.modifiers[0]?.modifierName,
      types: datafromRedux[0]?.modifiers[0]?.options.map((elem:any)=>elem.name)
    },
   
    
  ];

  const [toggleStates, setToggleStates] = useState(
    data.map((item) => ({
      parentToggle: false,
      childToggles: Array(item.types?.length).fill(false),
    }))
  );
  const [pen, setPen] = useState(true);

  const handleParentToggle = (index:any) => {
    const newToggleStates = [...toggleStates];
    const newParentToggle = !newToggleStates[index].parentToggle;

    newToggleStates[index] = {
      parentToggle: newParentToggle,
      childToggles: Array(newToggleStates[index].childToggles.length).fill(newParentToggle),
    };
    
    setToggleStates(newToggleStates);
  };

  const handleChildToggle = (parentIndex:any, childIndex:any) => {
    const newToggleStates = [...toggleStates];
    newToggleStates[parentIndex].childToggles[childIndex] = !newToggleStates[parentIndex].childToggles[childIndex];
    if (newToggleStates[parentIndex].childToggles.some((toggle) => toggle === false)) {
      newToggleStates[parentIndex].parentToggle = false;
    }

       if (newToggleStates[parentIndex].childToggles.every((toggle) => toggle === true)) {
        newToggleStates[parentIndex].parentToggle = true;
      }
    setToggleStates(newToggleStates);
  };
// console.log(toggleStates)
  return (
    <div className='customize-container'>
      <h3 className='customize-heading'>Customize</h3>

      <div className='items-container'>
        {data.map((elem, index) => (
          <div key={index}>
            <div className='item-toggle-container-flex'>
              <div className='item-heading'>{elem.mainHeading}</div>
              <div className='toggle-container'>
                <ToggleSliderAvail
                  toggle={datafromRedux[0]?.modifiers[0]?.isEnabled}
                  setToggle={() => handleParentToggle(index)}
                  pen={pen}
                />
              </div>
            </div>

            <div>
              {elem?.types?.map((subitem:any, subindex:any) => (
                <div className='subitems-toggle-container-flex-direction' key={subindex}>
                  <div className='subitems-toggle-container-flex'>
                    <div className='subitem-heading'>{subitem}</div>
                    <div className='subItemToggle'>
                      <ToggleSliderAvail
                        toggle={datafromRedux[0]?.modifiers[0]?.options.map((elem:any)=>elem.isEnabled)}
                        setToggle={() => handleChildToggle(index, subindex)}
                        pen={pen}
                      />
                      <input className='input-subitem' type='text' value={datafromRedux[0]?.modifiers[0]?.options.map((elem:any)=>elem.price)} placeholder='$100' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomizeSlider;
