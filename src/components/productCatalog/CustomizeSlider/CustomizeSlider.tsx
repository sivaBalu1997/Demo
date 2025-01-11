import React, { useContext, useEffect, useState } from "react";
import "./CustomizeSlider.scss";
import ToggleSliderAvail from "../ToggleSliderAvail/ToggleSliderAvail";
import { useSelector, useDispatch } from "react-redux";
import { Contextpagejs } from "pages/productCatalog/contextpage";

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
  const dispatch = useDispatch();
  const datafromRedux = useSelector(
    (state: RootState) => state?.selectedMockDataReducer?.data
  );
  const { patchedData, setPatchedData ,setPartialData} = useContext(Contextpagejs);

  const [customData, setCustomData] = useState<any>([]);

 
  
  useEffect(() => {
    const updatedCustomData = datafromRedux.flatMap((item: any) =>
      item?.modifiers.map((modifier: any) => ({
       modifierId:modifier.id,
        modifierName: modifier.modifierName,
        isEnabled: modifier.isEnabled===1?true:false,
        options: modifier.options.map((opt: any) => ({
          id:opt.optionId,
          name: opt.name,
          price: Number(opt.price).toFixed(2),
          isEnabled: opt.isEnabled,
        })),
      }))
    );

    setCustomData(updatedCustomData);
  }, [datafromRedux]);

  useEffect(() => {
    if (datafromRedux && customData) {




      setPatchedData((prevState: any) => ({
        ...prevState, 
        itemId: datafromRedux[0]?.itemId ?? prevState.itemId, 
        modifierInfo: customData.map((item:any, index:number) => ({
          modifierId:
            datafromRedux[0]?.modifiers?.[index]?.id ||
            prevState.modifierInfo[index]?.optionId ||
            "", 
          modifierName: item.modifierName,
          isEnabled: item.isEnabled,
          options: item?.options?.map((opt: any, optIndex: any) => ({
            modifierOptionId:
              datafromRedux[0]?.modifiers?.[index]?.options?.[optIndex]
                ?.optionId ||
              prevState.modifierInfo[index]?.options?.[optIndex]
                ?.modifierOptionId ||
              "", 
            modifierOptionName: opt.name,
            price: Number(opt.price).toFixed(2), 
            isEnabled: opt.isEnabled,
          })),
        })),
      }));
    }
  }, [datafromRedux, customData, setPatchedData]);
  const [pen, setPen] = useState(true); 

  const handleParentToggle = (index: number) => {
    const updatedData = [...customData];
    const modifierParent=customData[index];
    const parentEnable = !modifierParent.isEnabled;
    modifierParent.isEnabled = parentEnable;
    modifierParent.options = modifierParent.options.map((option: any) => ({
      ...option,
      isEnabled: parentEnable,
      modifierOptionId:option.id,
      modifierOptionName: option.name,
      price:option.price
    }));


    setCustomData(updatedData);
    setPartialData((prev: any) => {
      const existingModifierInfo = prev.modifierInfo || []; 
      const existingIndex = existingModifierInfo.findIndex(
        (item: any) => item.modifierId === customData[index].modifierId
      );
     
    
      const updatedModifierInfo =
        existingIndex > -1
          ? existingModifierInfo.map((item: any, index: number) =>
              index === existingIndex
                ? {
                    ...item,
                    modifierName: item.modifierName,
                    isEnabled: parentEnable,
                    options: item.options.map((opt: any) => ({
                      modifierOptionId:opt.id,
                      modifierOptionName: opt.name,
                      price: opt.price,
                      isEnabled: parentEnable,
                      
                    })),
                  }
                : item
            )
          : [...existingModifierInfo, modifierParent];
    
      return {
        ...prev,
        itemId: datafromRedux[0].itemId,
        modifierInfo: updatedModifierInfo,
      };
    });
    
 
  };
  

  const handleChildToggle = (parentIndex: number, childIndex: number) => {
    const updatedData = [...customData];
  
    updatedData[parentIndex].options[childIndex].isEnabled =
      !updatedData[parentIndex].options[childIndex].isEnabled;
  
    
    const allOptionsDisabled = updatedData[parentIndex].options.every(
      (opt: any) => !opt.isEnabled
    );
  
 
    updatedData[parentIndex].isEnabled = !allOptionsDisabled;
  
    setCustomData(updatedData);

    const modifiedData = updatedData[parentIndex];
  
    setPartialData((prev: any) => {
      const existingModifierInfo = prev.modifierInfo || [];
      const existingIndex = existingModifierInfo.findIndex(
        (item: any) => item.modifierId === modifiedData.modifierId
      );
  
      const updatedModifierInfo =
        existingIndex > -1
          ? existingModifierInfo.map((item: any, index: number) =>
              index === existingIndex
                ? {
                    ...item,
                    modifierName: modifiedData.modifierName,
                    isEnabled: !allOptionsDisabled,
                    options: modifiedData.options.map((opt: any) => ({
                      modifierOptionId: opt.id,
                      modifierOptionName: opt.name,
                      price: opt.price,
                      isEnabled: opt.isEnabled,
                    })),
                  }
                : item
            )
          : [
              ...existingModifierInfo,
              {
                modifierId: modifiedData.modifierId,
                modifierName: modifiedData.modifierName,
                isEnabled: !allOptionsDisabled,
                options: modifiedData.options.map((opt: any) => ({
                  modifierOptionId: opt.id,
                  modifierOptionName: opt.name,
                  price: opt.price,
                  isEnabled: opt.isEnabled,
                })),
              },
            ];
  
      return {
        ...prev,
        itemId: datafromRedux[0].itemId,
        modifierInfo: updatedModifierInfo,
      };
    });
  };
  


 const handlePriceChange = (
  parentIndex: number,
  childIndex: number,
  newPrice: any, // Accept `null` for cleared input
  Enabled: boolean,
  name: string,
  Enable: number,
  options: any,
  modifierIdhead: string,
  optionId: string
) => {
  if (Enabled ) { // Only update if `newPrice` is not `null`
    setPartialData((prev: any) => {
      const existingModifierInfo = prev.modifierInfo || [];
      const existingIndex = existingModifierInfo.findIndex(
        (item: any) => item.modifierId === modifierIdhead
      );

      const modifierupdate = {
        modifierId: modifierIdhead,
        modifierName: name,
        isEnabled: Enable,
        options: options.map((opt: any) => ({
          modifierOptionId: opt.id,
          modifierOptionName: opt.name,
          price: opt.id === optionId ? newPrice : opt.price,
          isEnabled: Enabled,
        })),
      };

      const updatedModifierInfo =
        existingIndex > -1
          ? existingModifierInfo.map((item: any, index: number) =>
              index === existingIndex
                ? {
                    ...item,
                    modifierName: name,
                    isEnabled: Enable,
                    options: options.map((opt: any) => ({
                      modifierOptionId: opt.id,
                      modifierOptionName: opt.name,
                      price: opt.id === optionId ? newPrice : opt.price,
                      isEnabled: Enabled,
                    })),
                  }
                : item
            )
          : [...existingModifierInfo, modifierupdate];

      return {
        ...prev,
        itemId: datafromRedux[0]?.itemId,
        modifierInfo: updatedModifierInfo,
      };
    });

    // Update `customData` safely
    const updatedData = [...customData];
    updatedData[parentIndex].options[childIndex].price = newPrice;
    setCustomData(updatedData);
  }
};

  const restaurantDetails = useSelector(
    (state: any) => state?.auth.restaurantDetails
  );
  const Pricesymbol = `${
    restaurantDetails?.country === "US" ? "$" : "Rs."
  }`;

  return (
    <div className="customize-container">
      <h3 className="customize-heading">Customize</h3>

      <div className="items-container">

        {   customData.length>0? customData.map((elem:any, index:number) => (
          <div key={index}>
            <div className="item-toggle-container-flex">
              <div className="item-heading" style={{color:"black",opacity:elem.isEnabled?"100%":"50%",cursor:elem.isEnabled?"pointer":""}}>{elem.modifierName}</div>
              <div className="toggle-container">
                <ToggleSliderAvail
                  toggle={elem.isEnabled}
                  setToggle={() => handleParentToggle(index)}
                  Enable={true}
                  pen={pen} 
                />
              </div>
            </div>

            <div>
              {elem?.options?.map((subitem: any, subindex: any) => (
                
                <div
                  className="subitems-toggle-container-flex-direction"
                  key={subindex}
                >
                  <div className="subitems-toggle-container-flex">
                    <div className="subitem-heading"  style={{color:"black",opacity:subitem.isEnabled?"100%":"50%",cursor:subitem.isEnabled?"pointer":"",width:"70px"}}>{subitem.name}</div>
                    <div className="subItemToggle">
                      <ToggleSliderAvail
                        toggle={subitem.isEnabled}
                        setToggle={() => handleChildToggle(index, subindex)}
                        pen={pen} 
                        Enable={true}
                      />


<div
                     className="input-subitem"
                      
                     style={{color:"black",opacity:subitem.isEnabled?"100%":"50%",border:subitem.isEnabled?"1px solid black":"1px solid #5F5F5F"}}

                    >
                      {subitem.price !== 0 && subitem.price !== undefined&& (
                        <span className="priceSymbol-customize">{Pricesymbol}</span>
                      )}

<input
  className="input-subitem-field"
  type="text"
  value={subitem.price || ''} // Display an empty string if the value is null/undefined
  disabled={!subitem.isEnabled}
  onChange={(e) => {
    const input = e.target.value;

    // Regex to allow up to 4 digits before the decimal and up to 2 digits after the decimal
    const regex = /^\d{0,4}(\.\d{0,2})?$/;

    // Allow empty string or valid regex match
    if ( regex.test(input)) {
      handlePriceChange(
        index,
        subindex,
        input, // Convert input to number or 0 for empty input
        subitem.isEnabled,
        elem.modifierName,
        elem.isEnabled,
        elem.options,
        elem.modifierId,
        subitem.id
      );
    }
  }}
  placeholder="$0.00"
/>







                    </div>




                      {/* <input
                        className="input-subitem"
                        type="number"
                        value={subitem.price}
                        disabled={!subitem.isEnabled}
                        style={{color:"black",opacity:subitem.isEnabled?"100%":"50%",border:subitem.isEnabled?"1px solid black":"1px solid #5F5F5F"}}
                        onChange={(e) =>
                          handlePriceChange(
                            index,
                            subindex,
                            parseFloat(e.target.value),
                            subitem.isEnabled,
                            elem.modifierName,
                            
                            elem.isEnabled,
                            elem.options,
                            elem.modifierId,
                            subitem.id,



                          )
                        }
                        placeholder="$0.00"
                      /> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )):<><span>No Data Found</span></>}
      </div>
    </div>
  );
};

export default CustomizeSlider;
