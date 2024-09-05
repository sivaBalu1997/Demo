import React, { useState } from 'react';
import './CustomizeSlider.scss';
import ToggleSliderAvail from '../ToggleSliderAvail/ToggleSliderAvail';

const CustomizeSlider = () => {
  const data = [
    {
      mainHeading: 'Topping',
      types: ['Tomato:', 'Spice:'],
    },
    {
      mainHeading: 'Sauce',
      types: ['Veggies:', 'Cheese:'],
    },
    {
      mainHeading: 'Crust',
      types: ['Thin:', 'Medium:', 'Crispy:'],
    },
    {
        mainHeading: 'Crust',
        types: ['Thin:', 'Medium:', 'Crispy:'],
      },
  ];

  const [toggleStates, setToggleStates] = useState(
    data.map((item) => ({
      parentToggle: false,
      childToggles: Array(item.types.length).fill(false),
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
    if (newToggleStates[parentIndex].childToggles.every((toggle) => toggle === false)) {
        newToggleStates[parentIndex].parentToggle = false;
      }

       if (newToggleStates[parentIndex].childToggles.every((toggle) => toggle === true)) {
        newToggleStates[parentIndex].parentToggle = true;
      }
    setToggleStates(newToggleStates);
  };
console.log(toggleStates)
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
                  toggle={toggleStates[index]?.parentToggle}
                  setToggle={() => handleParentToggle(index)}
                  pen={pen}
                />
              </div>
            </div>

            <div>
              {elem.types.map((subitem, subindex) => (
                <div className='subitems-toggle-container-flex-direction' key={subindex}>
                  <div className='subitems-toggle-container-flex'>
                    <div className='subitem-heading'>{subitem}</div>
                    <div className='subItemToggle'>
                      <ToggleSliderAvail
                        toggle={toggleStates[index].childToggles[subindex]}
                        setToggle={() => handleChildToggle(index, subindex)}
                        pen={pen}
                      />
                      <input className='input-subitem' type='text' placeholder='$100' />
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
