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
  // Function to handle toggling at parent level, including nested subcategories
const handleParentToggle = (parentIndex: number) => {
  const newToggleStates = [...toggleStates];
  const currentParentToggle = newToggleStates[parentIndex].parentToggle;

  // Toggle the parent state
  newToggleStates[parentIndex].parentToggle = !currentParentToggle;

  // Update child toggles based on parent toggle state
  if (newToggleStates[parentIndex].childToggles) {
    // For Section A or Section B (Off-prem)
    newToggleStates[parentIndex].childToggles.forEach((_: any, childIndex: number) => {
      newToggleStates[parentIndex].childToggles[childIndex] = !currentParentToggle;
    });
  } else if (newToggleStates[parentIndex].subcategoryToggles) {
    // For Pick up / Delivery (On-prem)
    newToggleStates[parentIndex].subcategoryToggles.forEach((subcategory: any, subIndex: number) => {
      // Toggle the subcategory parent
      subcategory.subParentToggle = !currentParentToggle;

      // Toggle all child toggles within the subcategory
      subcategory.childToggles.forEach((_: any, childIndex: number) => {
        subcategory.childToggles[childIndex] = !currentParentToggle;
      });
    });
  }

  setToggleStates(newToggleStates);
};


  // Function to handle subcategory toggling
  const handleSubcategoryToggle = (parentIndex: number, subcategoryIndex: number) => {
    const newToggleStates = [...toggleStates];
    const subcategoryToggle = newToggleStates[parentIndex].subcategoryToggles[subcategoryIndex].subParentToggle;
  
    // Toggle the subcategory parent toggle
    newToggleStates[parentIndex].subcategoryToggles[subcategoryIndex].subParentToggle = !subcategoryToggle;
  
    // If toggling to true, enable all child toggles (In house, Swiggy, Zomato)
    if (!subcategoryToggle) {
      newToggleStates[parentIndex].subcategoryToggles[subcategoryIndex].childToggles.forEach((_:any, childIndex: number) => {
        newToggleStates[parentIndex].subcategoryToggles[subcategoryIndex].childToggles[childIndex] = true;
      });
    } else {
      // If toggling to false, retain the current logic (do not change child toggles automatically)
      newToggleStates[parentIndex].subcategoryToggles[subcategoryIndex].childToggles.forEach((_:any, childIndex: number) => {
        newToggleStates[parentIndex].subcategoryToggles[subcategoryIndex].childToggles[childIndex] = false;
      });
    }
  
    setToggleStates(newToggleStates);
  };
  

  // Function to handle child toggle for Section A and Section B or for Pickup/Delivery
  const handleChildToggle = (parentIndex: number, subcategoryIndex: number, childIndex: number) => {
    const newToggleStates = [...toggleStates];

    if (newToggleStates[parentIndex]?.subcategoryToggles) {
      const childToggles = newToggleStates[parentIndex]?.subcategoryToggles?.[subcategoryIndex]?.childToggles;

      if (childToggles) {
        // Toggle the specific child
        childToggles[childIndex] = !childToggles[childIndex];

        // Check if all child toggles are disabled
        const areAllChildrenDisabled = childToggles.every((toggle: boolean) => !toggle);

        // If all children are disabled, disable the parent toggle
        newToggleStates[parentIndex].subcategoryToggles[subcategoryIndex].subParentToggle = !areAllChildrenDisabled;
      }
    } else {
      // Handle Section A/B
      const childToggles = newToggleStates[parentIndex]?.childToggles;

      if (childToggles) {
        // Toggle the specific child
        childToggles[childIndex] = !childToggles[childIndex];

        // Check if all child toggles are disabled
        const areAllChildrenDisabled = childToggles.every((toggle: boolean) => !toggle);

        // If all children are disabled, disable the parent toggle
        newToggleStates[parentIndex].parentToggle = !areAllChildrenDisabled;
      }
    }

    setToggleStates(newToggleStates);
  };
  useEffect(() => {
    if (toggleStates.length > 0) {
      const newToggleStates = [...toggleStates];
  
      // Existing conditions: Check "Pick up" and "Delivery"
      const isPickupFalse = !newToggleStates[1]?.subcategoryToggles?.[0]?.subParentToggle;
      const isDeliveryFalse = !newToggleStates[1]?.subcategoryToggles?.[1]?.subParentToggle;
      const isPickupTrue = newToggleStates[1]?.subcategoryToggles?.[0]?.subParentToggle;
      const isDeliveryTrue = newToggleStates[1]?.subcategoryToggles?.[1]?.subParentToggle;
  
      // Check child toggles for Pick up (In-house, Swiggy, Zomato)
      const inhousePickup = newToggleStates[1]?.subcategoryToggles?.[0]?.childToggles?.[0] || false;
      const swiggyPickup = newToggleStates[1]?.subcategoryToggles?.[0]?.childToggles?.[1] || false;
      const zomatoPickup = newToggleStates[1]?.subcategoryToggles?.[0]?.childToggles?.[2] || false;
  
      // If any child toggle (In-house, Swiggy, Zomato) is true, set Pickup to true
      if (inhousePickup || swiggyPickup || zomatoPickup) {
        newToggleStates[1].subcategoryToggles[0].subParentToggle = true; // Set Pickup to true
        newToggleStates[1].subcategoryToggles[1].subParentToggle = true;
      }
  
      // If both "Pick up" and "Delivery" are false, turn "On-prem" off
      if (isPickupFalse && isDeliveryFalse) {
        newToggleStates[1].parentToggle = false;
      } else {
        // If either "Pick up" or "Delivery" is true, turn "On-prem" on
        if (isPickupTrue || isDeliveryTrue || inhousePickup || swiggyPickup || zomatoPickup) {
          newToggleStates[1].parentToggle = true;
        }
      }
  
      // New functionality: If both section A and section B are true, turn "Of-prem" onn
      // Check if both Section A and Section B are true
      const isOffPremActive = newToggleStates[0]?.parentToggle || 
                        newToggleStates[0]?.childToggles?.every((toggle:any) => toggle) || 
                        (newToggleStates[0]?.childToggles[0] && newToggleStates[0]?.childToggles[1]);

const isSectionATrue = newToggleStates[0]?.parentToggle; // Check Section A toggle state
const isSectionBTrue = newToggleStates[1]?.parentToggle; // Check Section B toggle state

// If both Section A and Section B are true, turn on "Off-prem"
if (isSectionATrue && isSectionBTrue) {
  newToggleStates[0].parentToggle = true; // Enable Off-prem toggle
} else {
  // Maintain original state for Off-prem based on other conditions if needed
  newToggleStates[0].parentToggle = isOffPremActive;
}

setToggleStates(newToggleStates);
    }
  }, [toggleStates]);
  
  
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
                      setToggle={() => handleChildToggle(index, 0, typeIndex)} // For Section A and B
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
