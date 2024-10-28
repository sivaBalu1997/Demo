import React, { useContext, useEffect, useRef, useState } from "react";
import "./EyeModal.scss";
import Eye from "../../../assets/images/eye.png";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { useDispatch } from "react-redux";
import { addMockDataHiddenRequest } from "redux/productCatalog/productCatalogActions";
import { useSelector } from "react-redux";

const EyeModal = ({ onEyeclose,onclose }) => {
  const data1=useSelector((state)=>state?.selectedMockDataReducer?.data)
  const Dinein =data1[0]?.orderTypes?.find((orderType) => orderType.typeName === "DineIn")
  const location = useSelector((state) => state.auth.selectedBranch.id);
  const successMsg=useSelector((state)=>state?.addMockDataHiddenReducer?.data)

  const [data, setData] = useState([]); 
  

  useEffect(() => {
    const updatedData = [
      {
        Heading: "On-prem",
        subItems: [
          {
            name: Dinein.typeName,
            id: Dinein.typeId,
            isChecked: Dinein.isHidden,
            isEnabled: Dinein.isEnabled,
          },
        ],
      },
      {
        Heading: "Off-prem",
        subItems: data1[0].orderTypes
          .filter((elem) => elem.typeName !== "DineIn") 
          .map((elem) => ({
            name: elem.typeName,
            id: elem.typeId,
            isChecked: elem.isHidden,
            isEnabled: elem.isEnabled,
          })),
      },
    ];
  
    setData(updatedData);
  }, [data1, Dinein]);
  

    console.log("w",data1)
    const data3={
    itemId: "0ad10dd0-8e60-4431-83e5-eb23927cdf92",
    isEnabled: false,
    itemOrderTypeStatuses: [
        {
            orderTypeId: "0593a8-81c5-40b2-a208-be1c03a93fad",
            isEnabled: true
        },
        {
            orderTypeId: "28-81c5-40b2-a208-be1c03a93fad12",
            isEnabled: true
        }
    ]
}




const hidePayload = {
  itemId: data1[0].itemId,
  isEnabled: false,
  itemOrderTypeStatuses: data
    .flatMap((section) => 
      section.subItems
        .filter((subItem) => subItem.isChecked) // Filter items where isChecked is true
        .map((subItem) => ({
          orderTypeId: subItem.id, // Map 'id' from subItems to orderTypeId
          isEnabled: subItem.isChecked // Use isChecked from subItems (it will be true here)
        }))
    )
};

const uncheckedItems = data
  .flatMap((section) => 
    section.subItems.filter((subItem) => !subItem.isChecked).map((subItem) => ({
      orderTypeId: subItem.id, // Map 'id' from subItems to orderTypeId
      isEnabled: false // Set to false as these items are unchecked
    }))
  );

 
  console.log("dddd",uncheckedItems)


    console.log("Hide",hidePayload)

  const dispatch = useDispatch();
  const { setApiPayload, ApiPayload } = useContext(Contextpagejs);

  const eyemodalRef = useRef();
  const EyeClose = (e) => {
    if (eyemodalRef.current === e.target) {
      onEyeclose();
    }
  };

  const payload={
    hidePayload,location

  }

  const handleChange = () => {
    dispatch(addMockDataHiddenRequest(payload));
   

  
  };

  useEffect(() => {
    if (successMsg === "Menu item updated visibility successfully") {
      onEyeclose();
      onclose()
     
    }
  }, [successMsg, onEyeclose, onclose]);

  
  const parentToggleChange = (index) => {
    const newData = [...data];
   
    const isChecked = !newData[index].isChecked;
    newData[index].isChecked = isChecked;

    
    newData[index].subItems = newData[index].subItems.map(subItem => ({
      ...subItem,
      isChecked: isChecked
    }));

    setData(newData);
  };
  console.log(successMsg)

 
  const subItemToggleChange = (parentIndex, subIndex) => {
    const newData = [...data];
  
    newData[parentIndex].subItems[subIndex].isChecked = !newData[parentIndex].subItems[subIndex].isChecked;
  
   
    const anyChecked = newData[parentIndex].subItems.some((subItem) => subItem.isChecked);
    
   
    newData[parentIndex].isChecked = anyChecked;
  
    
    setData(newData);
  };

  const handleSelectAll = () => {
    const allSelected = data.every((item) => item.isChecked); 
    const newData = data.map((item) => ({
      ...item,
      isChecked: !allSelected, 
      subItems: item.subItems.map((subItem) => ({
        ...subItem,
        isChecked: !allSelected, 
      })),
    }));
    setData(newData);
  };

  console.log("jj",data1)

  return (
    <div ref={eyemodalRef} onClick={EyeClose} className="EyeModal-Container">
      <div className="EyeModal-Window">
        <div className="EyeModal-Form">
          <div className="HideItemHeading-SelectAll-Container">
            <h1 className="HideItemHeading">Hide Item in</h1>
            <p className="Select-all-heading" onClick={handleSelectAll}>Select all</p>
          </div>

          <div className="Radio-items-container">
            {data.map((elem, parentIndex) => (
              <div key={elem.Heading}>
                <div className="Radio-Items-Flex">
                  <h1 className="Radio-Items-Heading">{elem.Heading}</h1>
                  <input
                    className="checkbox-Items"
                    type="checkbox"
                    checked={elem.isChecked} 
                    onChange={() => parentToggleChange(parentIndex)} 
                  />
                </div>

                {elem.subItems.map((subItem, subIndex) => (
                  <div key={subItem.name} className="Radio-sub-Items-Flex">
                    <h1 className="Radio-sub-Items-Heading">{subItem.name||"s"}</h1>
                    <input
                      className="checkbox-Items"
                      type="checkbox"
                      checked={subItem.isChecked} 
                      onChange={() => subItemToggleChange(parentIndex, subIndex)}
                      disabled={ subItem.isEnabled===0}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="saveCancelContainer">
            <button className="cancelbtnEye" onClick={() => onEyeclose()}>
              Cancel
            </button>
            <button className="SavebtnEye" onClick={handleChange}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeModal;