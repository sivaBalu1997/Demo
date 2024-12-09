import React, { useContext, useEffect, useRef, useState } from "react";
import "./EyeModal.scss";
import Eye from "../../../assets/images/eye.png";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { useDispatch } from "react-redux";
import { addMockDataHiddenRequest } from "redux/productCatalog/productCatalogActions";
import { useSelector } from "react-redux";
import { ReactComponent as Loader } from "../../../assets/svg/loader.svg";

const EyeModal = ({ onEyeclose, onclose }) => {
  const data1 = useSelector((state) => state?.selectedMockDataReducer?.data);
  const Dinein = data1[0]?.orderTypes?.find(
    (orderType) => orderType.typeName === "DineIn"
  );
  const location = useSelector((state) => state.auth.selectedBranch.id);
  const successMsg = useSelector(
    (state) => state?.addMockDataHiddenReducer?.data
  );

  const [data, setData] = useState([]);
  const [availabilityOrderTypes, setAvailabilityOrderTypes] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const tempOnPremarray = data1[0]?.orderTypes?.filter((data, index) => {
      return data?.typeGroup === "D";
    });
    const tempOffPremarray = data1[0]?.orderTypes?.filter((data, index) => {
      return data?.typeGroup !== "D";
    });
    console.log({ tempOnPremarray });

    const allIsNotHideOnPrem = tempOnPremarray.every(
      (item) => item.isNotHide === 0
    );
    const allIsNotHideOffPrem = tempOnPremarray.every(
      (item) => item.isNotHide === 0
    );

    // const isOnPremEnabledCount =
    //   tempOnPremarray?.filter((data, index) => {
    //     return data?.isNotHide === 1;
    //   }).length == 0;
    // const isOffPremEnabledCount =
    //   tempOffPremarray?.filter((data, index) => {
    //     return data?.isNotHide === 1;
    //   }).length == 0;

    const allChildrenonEnabled = tempOnPremarray?.some(
      (child) => child.isEnabled === 1
    );
    const allChildrenoffEnabled = tempOnPremarray?.some(
      (child) => child.isEnabled === 1
    );

    const tempOrderTypeAvailabilityArray = [
      {
        mainHeading: "On-prem",
        types: tempOnPremarray,
        isEnabled: allChildrenonEnabled,
        isNotHide: allIsNotHideOnPrem,
      },
      {
        mainHeading: "Off-prem",
        types: tempOffPremarray,
        isEnabled: allChildrenoffEnabled,
        isNotHide: allIsNotHideOffPrem,
      },
    ];
    setAvailabilityOrderTypes([...tempOrderTypeAvailabilityArray]);
  }, [data1[0]?.orderTypes]);

  useEffect(() => {
    const updatedData = [
      {
        Heading: "On-prem",

        subItems: [
          {
            name: Dinein.typeName,
            id: Dinein.typeId,
            isChecked: Dinein.isNotHide,
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
            isChecked: elem.isNotHide,
            isEnabled: elem.isEnabled,
          })),
      },
    ];

    setData(updatedData);
  }, [data1, Dinein]);

  const allSelected = data.every((item) => item.isChecked);

  const data3 = {
    itemId: "0ad10dd0-8e60-4431-83e5-eb23927cdf92",
    isEnabled: false,
    itemOrderTypeStatuses: [
      {
        orderTypeId: "0593a8-81c5-40b2-a208-be1c03a93fad",
        isEnabled: true,
      },
      {
        orderTypeId: "28-81c5-40b2-a208-be1c03a93fad12",
        isEnabled: true,
      },
    ],
  };

  const hidePayload = {
    itemId: data1[0].itemId,
    isEnabled: false,
    itemOrderTypeStatuses: availabilityOrderTypes.flatMap((section) =>
      section.types.map((subItem) => ({
        orderTypeId: subItem.typeId,
        isEnabled: subItem.isNotHide,
      }))
    ),
  };

  const uncheckedItems = data.flatMap((section) =>
    section.subItems
      .filter((subItem) => !subItem.isChecked)
      .map((subItem) => ({
        orderTypeId: subItem.id, // Map 'id' from subItems to orderTypeId
        isEnabled: false, // Set to false as these items are unchecked
      }))
  );

  const dispatch = useDispatch();
  const { setApiPayload, ApiPayload } = useContext(Contextpagejs);

  const eyemodalRef = useRef();
  const EyeClose = (e) => {
    if (eyemodalRef.current === e.target) {
      onEyeclose();
    }
  };

  const payload = {
    hidePayload,
    location,
  };

  const handleChange = () => {
    console.log({ hidePayload });

    dispatch(addMockDataHiddenRequest(payload));
    setShowLoader(true);
  };

  useEffect(() => {
    if (successMsg === "Menu item updated visibility successfully") {
      onEyeclose();
      onclose();
    }
  }, [successMsg, onEyeclose, onclose]);

  const parentToggleChange = (index) => {
    const newData = [...data];

    const isChecked = !newData[index].isChecked;
    newData[index].isChecked = isChecked;

    newData[index].subItems = newData[index].subItems.map((subItem) => ({
      ...subItem,
      isChecked: isChecked,
    }));

    setData(newData);
  };

  const [parentOrderTypeArray, setParentOrderTypeArray] = useState([]);

  const handleParentHide = (index) => {
    const updatedOrderTypes = [...availabilityOrderTypes];
  
    // Toggle isNotHide for the parent
    updatedOrderTypes[index].isNotHide = !updatedOrderTypes[index].isNotHide;
  
    const updateNotHide = updatedOrderTypes[index].isNotHide;
  
    // Update isNotHide for child types based on isEnabled
    if (Array.isArray(updatedOrderTypes[index].types)) {
      updatedOrderTypes[index].types = updatedOrderTypes[index].types.map((type) => ({
        ...type,
        isNotHide: type.isEnabled ? !updateNotHide : type.isNotHide, // Only toggle if isEnabled is true
      }));
    }
  
    // Update the state
    setAvailabilityOrderTypes(updatedOrderTypes);
  };
  

  const handleChildHide = (parentIndex, childIndex) => {
    const updatedOrderTypes = [...availabilityOrderTypes];

    // Toggle the isNotHide for the selected child
    updatedOrderTypes[parentIndex].types[childIndex] = {
      ...updatedOrderTypes[parentIndex].types[childIndex],
      isNotHide: !updatedOrderTypes[parentIndex].types[childIndex].isNotHide,
    };

    // Check if all the children have isNotHide set to true
    const allChildrenHidden = updatedOrderTypes[parentIndex].types.every(
      (child) => child.isNotHide === false
    );

    // Set the parent isNotHide to true if all children have isNotHide true
    updatedOrderTypes[parentIndex].isNotHide = allChildrenHidden;

    // Update the state
    setAvailabilityOrderTypes(updatedOrderTypes);
  };

  const [toggleState, setToggleState] = useState(false);

  // Function to handle toggle behavior for all
  const handleToggleAll = () => {
      // Check if all parents and children are `isEnabled`
      const allEnabled = availabilityOrderTypes.every(
        (parent) =>
          parent.isEnabled && parent.types.some((child) => child.isEnabled)
      );
      if (!allEnabled) {
        console.log("Not all items are enabled. Toggle action aborted.");
        return;
      }

    const updatedOrderTypes = availabilityOrderTypes.map((parent) => {
      // Toggle isNotHide based on toggleState
      const updatedParent = {
        ...parent,
        isNotHide: !toggleState,
        types: parent.types.map((child) => ({
          ...child,
          isNotHide: toggleState,
        })),
      };

      return updatedParent;
    });

    // Update the state with the new values
    setAvailabilityOrderTypes(updatedOrderTypes);

    // Toggle the state for the next action
    setToggleState(!toggleState);
  };

  const subItemToggleChange = (parentIndex, subIndex) => {
    const newData = [...data];

    newData[parentIndex].subItems[subIndex].isChecked =
      !newData[parentIndex].subItems[subIndex].isChecked;

    const anyChecked = newData[parentIndex].subItems.some(
      (subItem) => subItem.isChecked
    );

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

  return (
    <div ref={eyemodalRef} onClick={EyeClose} className="EyeModal-Container">
      <div className="EyeModal-Window">
        <div className="EyeModal-Form">
          <div className="HideItemHeading-SelectAll-Container">
            <h1 className="HideItemHeading">Hide/Unhide</h1>
            <p className="Select-all-heading" onClick={handleToggleAll}>
              {toggleState ? "Deselect All" : " Select All"}
            </p>
          </div>

          <div className="Radio-items-container">
            {availabilityOrderTypes.map((elem, parentIndex) => (
              <div key={elem.Heading}>
                <div className="Radio-Items-Flex">
                  <h1 className="Radio-Items-Heading">{elem.mainHeading}</h1>
                  <input
                    className="checkbox-Items"
                    type="checkbox"
                    checked={elem.isNotHide}
                    onChange={() => handleParentHide(parentIndex)}
                    disabled={elem.isEnabled === false}
                  />
                </div>

                {elem.types.map((subItem, subIndex) => (
                  <div key={subItem.name} className="Radio-sub-Items-Flex">
                    <h1 className="Radio-sub-Items-Heading">
                      {subItem.typeName || "s"}:
                    </h1>
                    <input
                      className="checkbox-Items"
                      type="checkbox"
                      checked={!subItem.isNotHide}
                      onChange={() => handleChildHide(parentIndex, subIndex)}
                      disabled={subItem.isEnabled === 0}
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
              {showLoader ? (
                <span>
                  <Loader
                    className="Hide-Loader"
                    height="40px"
                    width="40px"
                    style={{
                      filter: "invert(100%)",
                      height: "40px",
                      width: "40px",
                    }}
                  />
                </span>
              ) : (
                <span>Save</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeModal;
