import React, { useContext, useRef, useState } from "react";
import "./EyeModal.scss";
import Eye from "../../../assets/images/eye.png";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { useDispatch } from "react-redux";
import { addMockDataHiddenRequest } from "redux/productCatalog/productCatalogActions";
import { useSelector } from "react-redux";

const EyeModal = ({ onEyeclose,onclose }) => {
  const data1=useSelector((state)=>state?.selectedMockDataReducer?.data)


  const [data, setData] = useState([
    {
      Heading: "On-prem",
      subItems: [
        { name: "SectionA", isChecked: false },
        { name: "SectionB", isChecked: false }
      ],
      isChecked: false, 
    },
    {
      Heading: "Of-prem",
      subItems: data1[0]?.orderTypes?.length > 0
        ? data1[0]?.orderTypes.map((elem) => ({
            name: elem.typeName, // Ensure each subItem is an object
            isChecked: false // Initialize the checked status
          }))
        : [],
      isChecked: false, 
    },
  ]);

  const dispatch = useDispatch();
  const { setApiPayload, ApiPayload } = useContext(Contextpagejs);
  const locationid = useSelector(
    (state) => state.auth.credentials.locationId
  );

  const eyemodalRef = useRef();
  const EyeClose = (e) => {
    if (eyemodalRef.current === e.target) {
      onEyeclose();
    }
  };
  const payLoad={"itemId":data1[0].itemId, locationid:locationid

  }

  const handleChange = () => {
    dispatch(addMockDataHiddenRequest(payLoad));
    onEyeclose();
    onclose();
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
                    checked={elem.isChecked} // Controlled input for parent checkbox
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
