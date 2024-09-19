import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Access Redux
import './AvailabilitySlider.scss';
import ToggleSliderAvail from '../ToggleSliderAvail/ToggleSliderAvail';

// Define interfaces
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

interface AvailSliderProps {
  pen?: true;
  SideBarData: SideBarData[];
}

const PricingSlider: React.FC<AvailSliderProps> = ({ pen, SideBarData }) => {
  // Accessing SideBarData from Redux store
  
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

  // Function to map Pickup2 values from Redux to toggle states
  const mapPickup2ToToggles = (childIndex: number) => {
    const pickup2Data = SideBarData[0]?.pricingdetails?.Pickup2?.[childIndex];
    return pickup2Data === 'Enabled';
  };

  const mapDelivery2ToToggles = (childIndex: number) => {
    const delivery2Data = SideBarData[0]?.pricingdetails?.Delivery2?.[childIndex];
    return delivery2Data === 'Enabled';
  };

  const mapSection2ToToggles = (childIndex: number) => {
    const section2Data = SideBarData[0]?.pricingdetails?.Dinein2?.[childIndex];
    return section2Data === 'Enabled';
  };

  const handleParentToggle = (index: number) => {
    const newToggleStates = [...toggleStates];
    const newParentToggle = !newToggleStates[index].parentToggle;

    if (data[index].subcategories) {
      newToggleStates[index] = {
        parentToggle: newParentToggle,
        subcategoryToggles: newToggleStates[index].subcategoryToggles?.map((subcategory) => ({
          subParentToggle: newParentToggle,
          childToggles: Array(subcategory?.childToggles?.length || 0).fill(newParentToggle),
        })) ?? [],
      };
    } else if (data[index].types) {
      newToggleStates[index] = {
        parentToggle: newParentToggle,
        childToggles: Array(data[index].types?.length || 0).fill(newParentToggle),
      };
    }

    setToggleStates(newToggleStates);
  };

  const handleSubcategoryToggle = (parentIndex: number, subcategoryIndex: number) => {
    const newToggleStates = [...toggleStates];
    const subcategoryToggle = newToggleStates[parentIndex]?.subcategoryToggles?.[subcategoryIndex];

    if (subcategoryToggle) {
      const newSubParentToggle = !subcategoryToggle.subParentToggle;
      subcategoryToggle.subParentToggle = newSubParentToggle;
      subcategoryToggle.childToggles = subcategoryToggle.childToggles.map(() => newSubParentToggle);
    }

    setToggleStates(newToggleStates);
  };

  const handleChildToggle = (parentIndex: number, subcategoryIndex: number, childIndex: number) => {
    const newToggleStates = [...toggleStates];
    const childToggles = newToggleStates[parentIndex]?.subcategoryToggles?.[subcategoryIndex]?.childToggles;

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
            {elem.types && (
              <div className='SectionASectionBSection'>
                {elem.types.map((type, typeIndex) => (
                  <div key={typeIndex} className='TypeHeading'>
                    <h3 className='SectionASectionBSectionHeading'>{type}</h3>
                    <ToggleSliderAvail
                      toggle={
                        type.includes('Section A') || type.includes('Section B')
                          ? mapSection2ToToggles(typeIndex) // Map Section2 data here from Redux
                          : toggleStates[index]?.childToggles?.[typeIndex] || false
                      }
                      setToggle={() => handleChildToggle(index, 0, typeIndex)} // Assuming no subcategories for Off-prem
                      pen={pen}
                    />
                  </div>
                ))}
              </div>
            )}
            {elem.subcategories && (
              <div className='PickupDeliveryAvail'>
                {elem.subcategories.map((subcategory, subIndex) => (
                  <div key={subIndex} className='subcategorySection'>
                    <h3 className='SectionASectionBSectionHeadingBlack'>{subcategory.subHeading}</h3>
                    <ToggleSliderAvail
                      toggle={toggleStates[index]?.subcategoryToggles?.[subIndex]?.subParentToggle || false}
                      setToggle={() => handleSubcategoryToggle(index, subIndex)}
                      pen={pen}
                    />
                    <div className='TypesSection'>
                      {subcategory.types.map((type, typeIndex) => (
                        <div key={typeIndex} className='TypeHeading'>
                          <h4 className='SectionASectionBSectionHeading'>{type}</h4>
                          <ToggleSliderAvail
                            toggle={
                              subcategory.subHeading === 'Pick up'
                                ? mapPickup2ToToggles(typeIndex) // Map Pickup2 data here from Redux
                                : subcategory.subHeading === 'Delivery'
                                  ? mapDelivery2ToToggles(typeIndex) // Map Delivery2 data here from Redux
                                  : toggleStates[index]?.subcategoryToggles?.[subIndex]?.childToggles?.[typeIndex] || false
                            }
                            setToggle={() => handleChildToggle(index, subIndex, typeIndex)}
                            pen={pen}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSlider;
