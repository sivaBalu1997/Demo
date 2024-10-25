import React, { useContext, useState, useEffect } from "react";
import "./AvailabilityChangesUntil.scss";
import AvailCalender from "../AvailCalender/AvailCalender";
import { useDispatch, useSelector } from "react-redux";
import { partialUpdateMenuRequest } from "redux/productCatalog/productCatalogActions";
import { Contextpagejs } from "pages/productCatalog/contextpage";

const AvailabilityChangesUntil = ({ setSelectPeriod, selectedtypeid }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null); 
  const [showAvailCalender, setShowAvailCalender] = useState(false);
  const [selctedDateOption, setselctedDateOption] = useState("");

  const menuData = useSelector((state) => state.productCatalog?.menuData);
  const { patchedData, setPatchedData } = useContext(Contextpagejs);
  let { selectedDateOption } = useContext(Contextpagejs);
  const dataFromRedux = useSelector(
    (state) => state?.selectedMockDataReducer?.data
  );

  const [showcalender, setShowcalender] = useState(false);

  const Text = [
    "End of Today",
    "End of Sessions",
    "Until(DD/MM/YYYY HH:MM AM/PM)",
    "Until manually enabled",
  ];

  const handleSaveBtn = () => {
    // setShowModalAvailable();
    setSelectPeriod(false);
    // dispatch(partialUpdateMenuRequest(patchedData));
    // onclose();
  };

  const handleRadioChange = (index, elem) => {
    setSelectedOption(index);
  
    if (index === 2) {
      setShowAvailCalender(true);
      setShowcalender(true);
    } else {
      setShowAvailCalender(false);
    }
  
    if (elem === "End of Today") {
      const date = new Date();
      const formattedDate = date.toISOString().slice(0, 19); 
      setselctedDateOption(formattedDate);
  
      
      setPatchedData((prevState) => ({
        ...prevState,
        itemAvailabilityInfo: prevState.itemAvailabilityInfo.map((availabilityInfo) =>
          availabilityInfo.orderTypeId === selectedtypeid
            ? {
                ...availabilityInfo,
                unAvailableUntilTime: formattedDate, 
              }
            : availabilityInfo 
        ),
      }));
    }
  };
  

  console.log("patchedData", patchedData);

  return (
    <div className="AvailabilityChangesUntilContainer">
      <div className="Availability_Changes_Until_SubContainer">
        <div className="Avail_Changes_Form">
          <h4 className="Avail_Changes_Heading">Availability Changes Until</h4>

          {Text.map((elem, index) => (
            <div key={index} className="Avail_Changes_Radio_container">
              <div className="Avail_Changes_Radio_container_Justify">
                <h4 className="Avail_Changes_Radio_Text">{elem}</h4>
                <input
                  className="AvaiilRadio"
                  type="radio"
                  name="avail-radio"
                  checked={selectedOption === index}
                  onChange={() => handleRadioChange(index, elem)}
                />
              </div>
            </div>
          ))}

          <div className="Avail_Button_Flex">
            <a
              className="Avail-btn1-Cancel"
              onClick={() => setSelectPeriod(false)}
            >
              Cancel
            </a>
            <a className="Avail-btn1-Save" onClick={handleSaveBtn}>
              Save
            </a>
          </div>
        </div>
      </div>

      {showcalender && showAvailCalender && (
        <AvailCalender
          selectedtypeid={selectedtypeid}
          setShowcalender={setShowcalender}
        />
      )}
    </div>
  );
};

export default AvailabilityChangesUntil;
