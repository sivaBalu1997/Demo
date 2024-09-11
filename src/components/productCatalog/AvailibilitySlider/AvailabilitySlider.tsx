import React, { useState } from 'react';
import './AvailabilitySlider.scss';
import ToggleSliderAvail from '../ToggleSliderAvail/ToggleSliderAvail';

interface AvailSliderProps {
  pen?: true;
}

const PricingSlider: React.FC<AvailSliderProps> = ({ pen }) => {
  const data = [
    {
      mainHeading: 'Off-prem',
      types: ['Section A:', 'Section B:'],
    },
    {
      mainHeading: 'On-prem',
      subcategories: [
        {
          subHeading: 'Pick up',
          types: ['In house:', 'Swiggy:', 'Zomato:'],
        },
        {
          subHeading: 'Delivery',
          types: ['In house:', 'Swiggy:', 'Zomato:'],
        },
      ],
    },
  ];

  const [toggleStates, setToggleStates] = useState(
    data.map((item) => {
      if (item.subcategories) {
        return {
          parentToggle: false,
          subcategoryToggles: item.subcategories.map(() => ({
            subParentToggle: false,
            childToggles: Array(3).fill(false), // Assuming 3 child toggles per subcategory
          })),
        };
      }
      return {
        parentToggle: false,
        childToggles: Array(item.types.length).fill(false),
      };
    })
  );
  

  const handleParentToggle = (index: number) => {
    const newToggleStates = [...toggleStates];
    const newParentToggle = !newToggleStates[index].parentToggle;

    if (data[index].subcategories) {
      newToggleStates[index] = {
        parentToggle: newParentToggle,
        subcategoryToggles: (newToggleStates[index]?.subcategoryToggles ?? []).map((subcategory) => ({
          subParentToggle: newParentToggle,
          childToggles: Array(subcategory.childToggles?.length || 0).fill(newParentToggle),
        })),
      };
    } else {
      newToggleStates[index] = {
        parentToggle: newParentToggle,
        childToggles: Array(data[index].types?.length || 0).fill(newParentToggle),
      };
    }

    setToggleStates(newToggleStates);
  };

  const handleChildToggle = (parentIndex: number, childIndex: number) => {
    const newToggleStates = [...toggleStates];
    const childToggles = newToggleStates[parentIndex].childToggles;

    if (childToggles) {
      childToggles[childIndex] = !childToggles[childIndex];
    }

    setToggleStates(newToggleStates);
  };

  return (
    <div className='AvailSlider-Container'>
      <h3 className='AvailSlider-Heading'>Availability</h3>
      <div className='AvailOnprem-Ofprem'>
        {data.map((elem, index) => (
          <div key={index} className='Avail-SectionAB'>
            <div className='AvailHeading-Section'>
              {elem.mainHeading}
              <ToggleSliderAvail
                toggle={toggleStates[index]?.parentToggle}
                setToggle={() => handleParentToggle(index)}
                pen={pen}
              />
            </div>
            <div className='SectionASectionBSection'>
              {elem.types?.map((type, typeIndex) => (
                <div key={typeIndex} className='TypeHeading'>
                  <h3 className='SectionASectionBSectionHeading'>{type}</h3> 
                  <ToggleSliderAvail
                    toggle={toggleStates[index]?.childToggles?.[typeIndex] || false}
                    setToggle={() => handleChildToggle(index, typeIndex)}
                    pen={pen}
                  />
                </div>
              ))}
            </div>
            <div className='PickupDeliveryAvail'>
              {elem.subcategories?.map((subcategory, subindex) => (
                <div key={subindex} className='subcategorySection' >
                  <h3 className='SectionASectionBSectionHeadingBlack'>{subcategory.subHeading}</h3>
                  <ToggleSliderAvail
                        toggle={""}
                        setToggle={() => handleChildToggle(index, subindex)}
                        pen={pen}
                      />                  <div className='TypesSection'>
                  {subcategory.types.map((type, typeIndex) => (
                    <div key={typeIndex} className='TypeHeading'>
                      <h4 className='SectionASectionBSectionHeading'>{type}</h4>
                      <ToggleSliderAvail
                        toggle={""}
                        setToggle={() => handleChildToggle(index, typeIndex)}
                        pen={pen}
                      />
                    </div>
                  ))}
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

export default PricingSlider;
