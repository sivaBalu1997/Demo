
import React, { createContext, useState } from 'react';
import { useSelector } from 'react-redux';

// Create a context
export const Contextpagejs = createContext();

// Create a provider component
export const Contextpage = ({ children }) => {
  const datafromRedux = useSelector((state) => state?.selectedMockDataReducer?.data);

    const pages=['Step 1: Primary Details','Step 2: Pricing and kitchen details','Step 3: Item customizations']
    const menuItems = ['Pricing', 'Availability','Inventory','Customize'];
    const [activeCategory, setActiveCategory] = useState('Step 1: Primary Details');
    const [isExpanded, setIsExpanded]=useState()
    const [saveandnext, setsaveandnext]=useState(false);
    const [active, setActive] = useState('');
    const [pen, setPen] = useState(false);
    const[patchedData,setPatchedData]=useState(
      {
        itemId: datafromRedux[0]?.itemId,
        pricing: [
          {
            orderTypeId: "b1eddc4e-710e-437c-871c-609b84af43cd",
            "price": 3
          }
        ],
        modifierInfo: [
          {
            modifierId: "",
            modifierName: "",
            isEnabled: "",
            options: [
              {
                modifierOptionId: "",
                modifierOptionName: "",
                price: "",
                isEnabled:""
              }
            ]
          }
        ],
        itemAvailabilityInfo: [
          {
            orderTypeId: "6e006c2d-1dd2-4b81-9af1-9e02a8336107",
            unAvailableUntilTime: "2025-03-21T08:04:52"
          }
        ]
      }
    )


  return (
    <Contextpagejs.Provider value={{ 
      pages,
      activeCategory, 
      setActiveCategory,
      isExpanded,
      setIsExpanded,
      saveandnext,
      setsaveandnext,
      menuItems,
      active,
      setActive,
      pen,
      setPen,
      patchedData,
      setPatchedData
    }}>
      {children}
    </Contextpagejs.Provider>
  );
};

