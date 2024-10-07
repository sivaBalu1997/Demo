import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Access Redux for initial data
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
  SideBarData?: SideBarData[];
}


const PricingSlider: React.FC<AvailSliderProps> = ({ pen }) => {
  // Access initial data from Redux for mapping
  const dataFromRedux = useSelector((state: any) => state?.selectedMockDataReducer?.data);

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

  // UseState to track toggle states
  const [toggleStates, setToggleStates] = useState<any[]>([]);

  // Map initial Redux values to local state when component mounts
  useEffect(() => {
    const initialToggleStates = data.map((item, index) => {
      if (item.subcategories) {
        return {
          parentToggle: false,
          subcategoryToggles: item.subcategories.map((_, subIndex) => ({
            subParentToggle: false,
            childToggles: Array(3).fill(false).map((_, childIndex) => 
              mapInitialToggleState(index, subIndex, childIndex)
            ), // Assuming 3 child toggles per subcategory
          })),
        };
      } else if (item.types) {
        return {
          parentToggle: false,
          childToggles: item.types.map((_, typeIndex) => 
            mapInitialToggleState(index, 0, typeIndex)
          ),
        };
      }
      return null;
    });

    setToggleStates(initialToggleStates);
  }, [dataFromRedux]); // Make sure to run this when Redux data changes

  // Function to map initial toggle state from Redux values
  const mapInitialToggleState = (parentIndex: number, subcategoryIndex: number, childIndex: number) => {
    if (parentIndex === 0) {
      // Off-prem (Dinein2)
      return dataFromRedux?.[0]?.pricingdetails?.Dinein2?.[childIndex] === 'Enabled';
    } else if (parentIndex === 1 && subcategoryIndex === 0) {
      // Pick up (Pickup2)
      return dataFromRedux?.[0]?.pricingdetails?.Pickup2?.[childIndex] === 'Enabled';
    } else if (parentIndex === 1 && subcategoryIndex === 1) {
      // Delivery (Delivery2)
      return dataFromRedux?.[0]?.pricingdetails?.Delivery2?.[childIndex] === 'Enabled';
    }
    return false;
  };

  // Function to handle toggling at parent level
  // Function to handle toggling at parent level
  // Function to handle toggling at parent level
const handleParentToggle = (parentIndex: number) => {
  const newToggleStates = [...toggleStates];
  const currentParentToggle = newToggleStates[parentIndex].parentToggle;

  // Toggle the parent state
  newToggleStates[parentIndex].parentToggle = !currentParentToggle;

  // Update child toggles based on parent toggle state
  if (newToggleStates[parentIndex].subcategoryToggles) {
      newToggleStates[parentIndex].subcategoryToggles.forEach((subcategory: any) => {
          // Enable/Disable all child toggles based on parent toggle
          subcategory.subParentToggle = !currentParentToggle; // Set the subcategory toggle state

          subcategory.childToggles.forEach((_:any, childIndex: number) => {
              // Enable all child toggles if the parent is enabled
              subcategory.childToggles[childIndex] = !currentParentToggle; // true if parent is true
          });
      });
  } else if (newToggleStates[parentIndex].childToggles) {
      newToggleStates[parentIndex].childToggles.forEach((_:any, childIndex: number) => {
          newToggleStates[parentIndex].childToggles[childIndex] = !currentParentToggle; // true if parent is true
      });
  }

  setToggleStates(newToggleStates);
};


  // Function to handle subcategory toggling
  const handleSubcategoryToggle = (parentIndex: number, subcategoryIndex: number) => {
    const newToggleStates = [...toggleStates];
    newToggleStates[parentIndex].subcategoryToggles[subcategoryIndex].subParentToggle =
      !newToggleStates[parentIndex].subcategoryToggles[subcategoryIndex].subParentToggle;
    setToggleStates(newToggleStates);
  };

  // Function to handle child toggle
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
                toggle={toggleStates[index]?.parentToggle || false}
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
                      toggle={toggleStates[index]?.childToggles?.[typeIndex] || false}
                      setToggle={() => handleChildToggle(index, 0, typeIndex)}
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
                              toggleStates[index]?.subcategoryToggles?.[subIndex]?.childToggles?.[typeIndex] || false
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
