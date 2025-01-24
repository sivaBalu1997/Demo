
import React, { createContext, useState } from 'react';
import { useSelector } from 'react-redux';

// Create a context
export const Contextpagejs = createContext();

// Create a provider component
export const Contextpage = ({ children }) => {
  const datafromRedux = useSelector((state) => state?.selectedMockDataReducer?.data);

    const pages=['Step 1: Primary Details','Step 2: Pricing and kitchen details','Step 3: Item customizations']
    const menuItems = ['Pricing','Availability','Customize'];
    const [activeCategory, setActiveCategory] = useState('Step 1: Primary Details');
    const [isExpanded, setIsExpanded]=useState()
    const [valiadtePriceFields, setValiadtePriceFields]=useState(false)
    const [saveandnext, setsaveandnext]=useState(false);
    const [active, setActive] = useState('');
    const [pen, setPen] = useState(false);

    const [categoryIdStore,setCategoryIdStore]=useState();

    const [duplicateOffer,setDuplicateOffer]=useState(false);
    let storedFunction= null;

    const setStoredFunction = (fn) => {
      storedFunction = fn;
    };
  
    const[ApiPayload,setApiPayload]=useState({
      itemId:"",
      isEnabled: false,
      itemOrderTypeStatuses: [
          {
              ordedrTypeId: "0593a8-81c5-40b2-a208-be1c03a93fad",
              isEnabled: true
          },
          {
              orderTypeId: "28-81c5-40b2-a208-be1c03a93fad12",
              isEnabled: true
          }
      ]
    })
    const[partialData,setPartialData]=useState({
      itemId: datafromRedux[0]?.itemId,
      pricing:[],
      modifierInfo:[],
      itemAvailabilityInfo:[]


    })

  
    
    const[patchedData,setPatchedData]=useState(
      {
        itemId: datafromRedux[0]?.itemId,
        pricing: [
          {
            orderTypeId: "b1eddc4e-710e-437c-871c-609b84af43cd",
            price: 3
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
 let selectedDateOption="";

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
      setPatchedData,
      setApiPayload,
      ApiPayload,
      selectedDateOption,
      partialData,
      setPartialData,
      duplicateOffer,
      setDuplicateOffer,
      valiadtePriceFields,
      setValiadtePriceFields,
      storedFunction,
      setStoredFunction,
      setCategoryIdStore,
      categoryIdStore
    }}>
      {children}
    </Contextpagejs.Provider>
  );
};

