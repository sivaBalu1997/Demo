import React, { useContext, useEffect, useState } from 'react';
import './CustomizeSlider.scss';
import ToggleSliderAvail from '../ToggleSliderAvail/ToggleSliderAvail';
import { useSelector, useDispatch } from 'react-redux';
import { Contextpagejs } from 'pages/productCatalog/contextpage';

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
  const datafromRedux = useSelector((state: RootState) => state?.selectedMockDataReducer?.data);
  const {  patchedData,setPatchedData } = useContext(Contextpagejs);






  const [customData, setCustomData] = useState(
    datafromRedux.map((item: any) => ({
      modifierName: item?.modifiers[0]?.modifierName,
      options: item?.modifiers[0]?.options.map((opt: any) => ({
        name: opt.name,
        price: opt.price,
        isEnabled: opt.isEnabled
      })),
      isEnabled: item?.modifiers[0]?.isEnabled
    }))
  );

  
  useEffect(() => {
    if (datafromRedux && customData) {
      setPatchedData((prevState: any) => ({
        ...prevState,  // Spread prevState first to maintain the other structure
        itemId: datafromRedux[0]?.itemId ?? prevState.itemId,  // Safely set itemId from datafromRedux
        modifierInfo: customData.map((item, index) => ({
          modifierId: datafromRedux[0]?.modifiers?.[index]?.id || prevState.modifierInfo[index]?.modifierId || "", // Ensure correct mapping of modifierId
          modifierName: item.modifierName,
          isEnabled: item.isEnabled,
          options: item.options.map((opt:any, optIndex:any) => ({
            modifierOptionId: datafromRedux[0]?.modifiers?.[index]?.options?.[optIndex]?.id || prevState.modifierInfo[index]?.options[optIndex]?.modifierOptionId || "", // Map to correct option
            modifierOptionName: opt.name,
            price: opt.price,  // Ensure price is updated
            isEnabled: opt.isEnabled
          }))
        }))
      }));
    }
  }, [datafromRedux, customData, setPatchedData]);
  

  const [pen, setPen] = useState(true); // Define the pen state

  // Toggle for parent (modifier level)
  const handleParentToggle = (index: number) => {
    const updatedData = [...customData];
    updatedData[index].isEnabled = !updatedData[index].isEnabled;
    setCustomData(updatedData);
    // Optionally, dispatch the update to Redux
    // dispatch({ type: 'UPDATE_MODIFIER_TOGGLE', payload: updatedData });
  };

  // Toggle for child (option level)
  const handleChildToggle = (parentIndex: number, childIndex: number) => {
    const updatedData = [...customData];
    updatedData[parentIndex].options[childIndex].isEnabled = !updatedData[parentIndex].options[childIndex].isEnabled;
    setCustomData(updatedData);
    // Optionally, dispatch the update to Redux
    // dispatch({ type: 'UPDATE_OPTION_TOGGLE', payload: updatedData });
  };

  // Handle input changes for price
  const handlePriceChange = (parentIndex: number, childIndex: number, newPrice: number) => {
    const updatedData = [...customData];
    updatedData[parentIndex].options[childIndex].price = newPrice;
    setCustomData(updatedData);
    // Optionally, dispatch the update to Redux
    // dispatch({ type: 'UPDATE_OPTION_PRICE', payload: updatedData });
  };

  return (
    <div className='customize-container'>
      <h3 className='customize-heading'>Customize</h3>

      <div className='items-container'>
        {customData.map((elem, index) => (
          <div key={index}>
            <div className='item-toggle-container-flex'>
              <div className='item-heading'>{elem.modifierName}</div>
              <div className='toggle-container'>
                <ToggleSliderAvail
                  toggle={elem.isEnabled}
                  setToggle={() => handleParentToggle(index)}
                  pen={pen} // Passing pen as a prop
                />
              </div>
            </div>

            <div>
              {elem.options?.map((subitem:any, subindex:any) => (
                <div className='subitems-toggle-container-flex-direction' key={subindex}>
                  <div className='subitems-toggle-container-flex'>
                    <div className='subitem-heading'>{subitem.name}</div>
                    <div className='subItemToggle'>
                      <ToggleSliderAvail
                        toggle={subitem.isEnabled}
                        setToggle={() => handleChildToggle(index, subindex)}
                        pen={pen} // Passing pen as a prop
                      />
                      <input
                        className='input-subitem'
                        type='number'
                        value={subitem.price}
                        onChange={(e) => handlePriceChange(index, subindex, parseFloat(e.target.value))}
                        placeholder='$100'
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
