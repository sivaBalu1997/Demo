import React, { useContext, useRef, useState } from "react";
import "./EyeModal.scss";
import Eye from "../../../assets/images/eye.png";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { useDispatch } from "react-redux";
import { addMockDataHiddenRequest } from "redux/productCatalog/productCatalogActions";
import { useSelector } from "react-redux";

const EyeModal = ({ onEyeclose }) => {
  const data1=useSelector((state)=>state?.selectedMockDataReducer?.data)
  const Dinein =data1[0]?.orderTypes?.find((orderType) => orderType.typeName === "DineIn")
 


    const [data, setData] = useState([
      {
        Heading: "On-prem",
        subItems: [
          { name:Dinein.typeName,
            id:Dinein.typeId,     
            isChecked: false
          }],
        isChecked: false, 
      },
      {
        Heading: "Of-prem",
        // ordedrTypeId:data1[0]?.orderTypes?.length > 0
        // ? data1[0]?.orderTypes.map((elem) => ({
        //     id: elem.typeId, // Ensure each subItem is an object
        //   }))
        // : [],
        subItems: data1[0]?.orderTypes?.length > 0
          ? data1[0]?.orderTypes.map((elem) => ({
              name: elem.typeName,
              id:elem.typeId, // Ensure each subItem is an object
              isChecked: false // Initialize the checked status
            }))
          : [],
        isChecked: false, 
      },
    ]);
    console.log("w",data1)

    
  
  const dataa2={
    itemId: "9be15fd4-43fe-497a-b857-42d89bffb8be",
    isEnabled: false,
    itemOrderTypeStatuses: [
      {orderTypeId: "df8eb2dc-6789-4b2a-bdc9-46df7c19add9", isEnabled: true},
      {orderTypeId: "1b53fad0-ce9c-4736-8710-85377d19d938", isEnabled: false},
      {orderTypeId: "b1eddc4e-710e-437c-871c-609b84af43c1", isEnabled: false}
       
    ]
}




    const hidePayload = {
      itemId: data1[0].itemId,
      isEnabled: false,
      itemOrderTypeStatuses: data
        .map((section) =>
          section.subItems.map((subItem) => ({
             orderTypeId: subItem.id, 
            isEnabled: subItem.isChecked 
          }))
        )
        .flat() 
    }

    console.log("Hide",hidePayload)

  const dispatch = useDispatch();
  const { setApiPayload, ApiPayload } = useContext(Contextpagejs);

  const eyemodalRef = useRef();
  const EyeClose = (e) => {
    if (eyemodalRef.current === e.target) {
      onEyeclose();
    }
  };

  const handleChange = () => {
    dispatch(addMockDataHiddenRequest(dataa2));
    onEyeclose();
  };

  
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

  console.log(data)

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
                    onChange={() => parentToggleChange(parentIndex)} // Toggle parent and subitems
                  />
                </div>

                {elem.subItems.map((subItem, subIndex) => (
                  <div key={subItem.name} className="Radio-sub-Items-Flex">
                    <h1 className="Radio-sub-Items-Heading">{subItem.name||"s"}</h1>
                    <input
                      className="checkbox-Items"
                      type="checkbox"
                      checked={subItem.isChecked} // Controlled input for subitem checkbox
                      onChange={() => subItemToggleChange(parentIndex, subIndex)} // Toggle individual subitem
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