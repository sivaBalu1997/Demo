import React, { useContext, useState, useEffect } from "react";
import "./AvailabilityChangesUntil.scss";
import AvailCalender from "../AvailCalender/AvailCalender";
import { useDispatch, useSelector } from "react-redux";
import { partialUpdateMenuRequest } from "redux/productCatalog/productCatalogActions";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import SessionOpen from "../SessionOpen/SessionOpen";

const AvailabilityChangesUntil = ({ setSelectPeriod, selectedtypeid ,parentToggle,ParentToggles}) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAvailCalender, setShowAvailCalender] = useState(false);
  const [showAvailchanges, setshowAvailchanges] = useState(true);

  const [showsession, setshowsession] = useState(false);
  const [selctedDateSession, setselctedDateSession] = useState("");
  const restaurantDetails = useSelector((state) => state.auth.restaurantDetails);
  const { patchedData, setPatchedData } = useContext(Contextpagejs);

  const workingHours = [
    // Your working hours data as shown in your original code...
  ];
  
  const Text = [
    "End of Today",
    "End of Sessions",
    "Until(DD/MM/YYYY HH:MM AM/PM)",
    "Until manually enabled",
  ];

  const getTodayDay = () => {
    const daysOfWeek = [
      "Sunday", "Monday", "Tuesday", "Wednesday", 
      "Thursday", "Friday", "Saturday",
    ];
    const today = new Date();
    return daysOfWeek[today.getDay()];
  };

  const filterWorkingHoursBySession = (session) => {
    const todayDay = getTodayDay();
    const todayWorkinghours = restaurantDetails?.workingHours.filter(
      (item) => item.weekday === todayDay
    );
    console.log("session",session);
    
console.log("todayWorkinghours",todayWorkinghours);

    if (session === "morning") {
      console.log("oiuyg",todayWorkinghours.find(item => item.closingTime <= "11:59:59"));
      
      return todayWorkinghours.find(item => item.closingTime <= "11:59:59");
    }
    else if (session === "evening") {
      return todayWorkinghours.find(item => item.openingTime >= "12:00:00");
    }
    return null;
  };

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleRadioChange = (index, elem) => {
    setSelectedOption(index);

    if (index === 2) {
      setShowAvailCalender(true);
    } else {
      setShowAvailCalender(false);
    }

    if (elem === "End of Today") {
      const todayDay = getTodayDay();
      const formattedDate = getFormattedDate();
      // console.log("todayWorkinghours",todayWorkinghours);
      const todayWorkinghours = restaurantDetails?.workingHours.filter(
        (item) => item.weekday === todayDay
      );

      if(parentToggle==="")
      {
        console.log("selectedtypeid",selectedtypeid);
        
        setPatchedData((prevState) => ({
          ...prevState,
          itemAvailabilityInfo: prevState.itemAvailabilityInfo.map(
            (availabilityInfo) =>
              availabilityInfo.orderTypeId === selectedtypeid
                ? {
                    ...availabilityInfo,
                    unAvailableUntilTime: `${formattedDate}T${todayWorkinghours[todayWorkinghours.length-1]?.closingTime}`,
                  }
                : availabilityInfo
          ),
        }));
      }
      else{
        setPatchedData((prevState) => ({
          ...prevState,
          itemAvailabilityInfo: prevState.itemAvailabilityInfo.map((availabilityInfo) => {
            // Check if the orderTypeId exists in the ParentToggles array
            const matchingType = ParentToggles.find(
              (toggle) => toggle.typeId === availabilityInfo.orderTypeId
            );
        
            // If a match is found, update unAvailableUntilTime; otherwise, return as is
            return matchingType
              ? {
                  ...availabilityInfo,
                  unAvailableUntilTime: `${formattedDate}T${todayWorkinghours[todayWorkinghours.length - 1]?.closingTime}`,
                }
              : availabilityInfo;
          }),
        }));
        
      }
      
     
    } else if (elem === "End of Sessions") {
      setshowsession(true);
      setshowAvailchanges(false)
      const formattedDate = getFormattedDate();
      const sessionClosingHours = filterWorkingHoursBySession(selctedDateSession);
      console.log("sessionClosingHours",sessionClosingHours);
      



      
      if(parentToggle==="")
        {
          setPatchedData((prevState) => ({
            ...prevState,
            itemAvailabilityInfo: prevState.itemAvailabilityInfo.map(
              (availabilityInfo) =>
                availabilityInfo.orderTypeId === selectedtypeid
                  ? {
                      ...availabilityInfo,
                      unAvailableUntilTime: `${formattedDate}T${sessionClosingHours?.closingTime}`,
                    }
                  : availabilityInfo
            ),
          }));
        }
        else{
          setPatchedData((prevState) => ({
            ...prevState,
            itemAvailabilityInfo: prevState.itemAvailabilityInfo.map(
              (availabilityInfo) =>{
                return { 
                  
                ...availabilityInfo,
                unAvailableUntilTime: `${formattedDate}T${sessionClosingHours?.closingTime}`,
              }
            }
            ),
          }));
        }
     
    }
  };


  return (

    <div className="AvailabilityChangesUntilContainer" >
      {
          showAvailchanges &&   <div className="Availability_Changes_Until_SubContainer" style={{marginLeft:showsession?"75%":""}}>
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
              <a className="Avail-btn1-Save" onClick={() => setSelectPeriod(false)}>
                Save
              </a>
            </div>
          </div>
        </div>
          
      }
    

      {showAvailCalender && (
        <AvailCalender
          selectedtypeid={selectedtypeid}
          setShowcalender={setShowAvailCalender}
          parentToggle={parentToggle}
        />
      )}

      {showsession && (
        <SessionOpen
          selectedtypeid={selectedtypeid}
          setshowsession={setshowsession}
          setshowAvailchanges={setshowAvailchanges}
          parentToggle={parentToggle}
        
        />
      )}
    </div>
  );
};

export default AvailabilityChangesUntil;
