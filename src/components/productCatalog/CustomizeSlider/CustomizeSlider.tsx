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
          price: opt.price,
          isEnabled: opt.isEnabled,
        })),
      }))
    );

    setCustomData(updatedCustomData);
  }, [datafromRedux]);

  useEffect(() => {
    if (datafromRedux && customData) {




      setPatchedData((prevState: any) => ({
        ...prevState, // Spread prevState first to maintain the other structure
        itemId: datafromRedux[0]?.itemId ?? prevState.itemId, // Safely set itemId from datafromRedux
        modifierInfo: customData.map((item:any, index:number) => ({
          modifierId:
            datafromRedux[0]?.modifiers?.[index]?.id ||
            prevState.modifierInfo[index]?.optionId ||
            "", // Ensure correct mapping of modifierId
          modifierName: item.modifierName,
          isEnabled: item.isEnabled,
          options: item?.options?.map((opt: any, optIndex: any) => ({
            modifierOptionId:
              datafromRedux[0]?.modifiers?.[index]?.options?.[optIndex]
                ?.optionId ||
              prevState.modifierInfo[index]?.options?.[optIndex]
                ?.modifierOptionId ||
              "", // Use correct index

            modifierOptionName: opt.name,
            price: opt.price, // Ensure price is updated,
            isEnabled: opt.isEnabled,
          })),
        })),
      }));
    }
  }, [datafromRedux, customData, setPatchedData]);
  const [pen, setPen] = useState(true); // Define the pen state

  const handleParentToggle = (index: number) => {
    const updatedData = [...customData];
    // const parentEnabled = !updatedData[index].isEnabled;
    // updatedData[index].isEnabled = parentEnabled;
    // updatedData[index].options = updatedData[index].options.map((option: any) => ({
    //   ...option,
    //   isEnabled: parentEnabled,
    // }));
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
  
  // Toggle for child (option level)
  const handleChildToggle = (parentIndex: number, childIndex: number) => {
    const updatedData = [...customData];
    // updatedData[parentIndex].options[childIndex].isEnabled =
    //   !updatedData[parentIndex].options[childIndex].isEnabled;
    setCustomData(updatedData);
const modifieddata=customData[parentIndex]
modifieddata.options[childIndex].isEnabled =!modifieddata.options[childIndex].isEnabled
    console.log("3456",modifieddata);
    
    setPartialData((prev: any) => {
      const existingModifierInfo = prev.modifierInfo || []; 
      const existingIndex = existingModifierInfo.findIndex(
        (item: any) => item.modifierId === customData[parentIndex].modifierId
      );
     
    
      const updatedModifierInfo =
        existingIndex > -1
          ? existingModifierInfo.map((item: any, index: number) =>
              index === existingIndex
                ? {
                    ...item,
                    modifierName: item.modifierName,
                    isEnabled: !item.isEnabled,
                    options: item.options.map((opt: any) => ({
                      modifierOptionId:opt.id,
                      modifierOptionName: opt.name,
                      price: opt.price,
                      isEnabled: !opt.isEnabled,
                      
                    })),
                  }
                : item
            )
          : [...existingModifierInfo, modifieddata];
    
      return {
        ...prev,
        itemId: datafromRedux[0].itemId,
        modifierInfo: updatedModifierInfo,
      };
    });
    

   
  };

  // Handle input changes for price
  const handlePriceChange = (
    parentIndex: number,
    childIndex: number,
    newPrice: number,
    Enabled:boolean,
    name:string,
    Enable:number,
    options:any,
    modifierIdhead:string


  ) => {

    console.log("options",options);
    

    if(Enabled)
   {
   
    setPartialData((prev: any) => {
      const existingModifierInfo = prev.modifierInfo || []; // Ensure 'modifierInfo' is initialized
      const existingIndex = existingModifierInfo.findIndex(
        (item: any) => item.modifierId === modifierIdhead
      );
      const modifierupdate={
        modifierId:modifierIdhead,
        modifierName:name,
        isEnabled:Enable,
        options:options.map((opt: any) => ({
          modifierOptionId:opt.id,
          modifierOptionName: opt.name,
          price: newPrice,
          isEnabled: Enabled,
        }))
 
      }
    
      const updatedModifierInfo =
        existingIndex > -1
          ? existingModifierInfo.map((item: any, index: number) =>
              index === existingIndex
                ? {
                    ...item,
                    modifierName: name,
                    isEnabled: Enable,
                    options: options.map((opt: any) => ({
                      modifierOptionId:opt.id,
                      modifierOptionName: opt.name,
                      price: newPrice,
                      isEnabled: Enabled,
                      
                    })),
                  }
                : item
            )
          : [...existingModifierInfo, modifierupdate];
    
      return {
        ...prev,
        itemId: datafromRedux[0].itemId,
        modifierInfo: updatedModifierInfo,
      };
    });
    

    const updatedData = [...customData];
    updatedData[parentIndex].options[childIndex].price = newPrice;




    setCustomData(updatedData);
   }
    // Optionally, dispatch the update to Redux
    // dispatch({ type: 'UPDATE_OPTION_PRICE', payload: updatedData });
  };

  return (
    <div className="customize-container">
      <h3 className="customize-heading">Customize</h3>

      <div className="items-container">
        {customData.map((elem:any, index:number) => (
          <div key={index}>
            <div className="item-toggle-container-flex">
              <div className="item-heading">{elem.modifierName}</div>
              <div className="toggle-container">
                <ToggleSliderAvail
                  toggle={elem.isEnabled}
                  setToggle={() => handleParentToggle(index)}
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
                    <div className="subitem-heading"  style={{color:"black",opacity:subitem.isEnabled?"100%":"50%"}}>{subitem.name}</div>
                    <div className="subItemToggle">
                      <ToggleSliderAvail
                        toggle={subitem.isEnabled}
                        setToggle={() => handleChildToggle(index, subindex)}
                        pen={pen} 
                      />
                      <input
                        className="input-subitem"
                        type="number"
                        value={subitem.price}
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
                            elem.modifierId



                          )
                        }
                        placeholder="$100"
                      />
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
