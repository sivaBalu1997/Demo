import React, { useContext, useEffect, useState } from "react";
import './SessionOpen.scss'
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { useSelector } from "react-redux";

interface ModelShowProps {
  setshowsession: (value: boolean) => void;
  selectedtypeid: string;

}

const SessionOpen: React.FC<ModelShowProps> = ({
  selectedtypeid,
  setshowsession,
  
}) => {
  const [selectedSession, setSelectedSession] = useState<string>("");
  const { patchedData, setPatchedData } = useContext(Contextpagejs);
  const [selctedDateSession, setselctedDateSession] = useState("");
  const [filteredsession,setfilteredsession]=useState([]);
  const restaurantDetails = useSelector((state:any) => state.auth.restaurantDetails);
 
  const getTodayDay = () => {
    const daysOfWeek = [
      "Sunday", "Monday", "Tuesday", "Wednesday", 
      "Thursday", "Friday", "Saturday",
    ];
    const today = new Date();
    return daysOfWeek[today.getDay()];
  };
  // const filterWorkingHoursBySession = (session:any) => {
  //   const todayDay = getTodayDay();
  //   const todayWorkinghours = restaurantDetails?.workingHours.filter(
  //     (item:any) => item.weekday === todayDay
  //   );

  //   if (session === "Morning") {
  //     return todayWorkinghours.find((item:any) => item.closingTime <= "11:59:59");
  //   }
  //   else if (session === "Evening") {
  //     return todayWorkinghours.find((item:any) => item.openingTime >= "12:00:00");
  //   }
  //   return null;
  // };

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  const handleChangesession = (session: string) => {
    setSelectedSession(session);
    setselctedDateSession(session);
  };

  const handleSessionSave = () => {
    const formattedDate = getFormattedDate();
    // const sessionClosingHours = filterWorkingHoursBySession(selctedDateSession);
    // console.log("sessionClosingHours",sessionClosingHours?.closingTime);
    

    setPatchedData((prevState:any) => ({
      ...prevState,
      itemAvailabilityInfo: prevState.itemAvailabilityInfo.map(
        (availabilityInfo:any) =>
          availabilityInfo.orderTypeId === selectedtypeid
            ? {
                ...availabilityInfo,
                unAvailableUntilTime: `${formattedDate}T${selctedDateSession}`,
              }
            : availabilityInfo
      ),
    }));
    setshowsession(false);
  };
  useEffect(()=>{
    const todayDay = "Monday";
    const todayWorkinghours = restaurantDetails?.workingHours.filter(
      (item:any) => item.weekday === todayDay
    );
    setfilteredsession(todayWorkinghours);

  },[restaurantDetails])
  console.log("filteredsession",filteredsession);
  

  return (
    <div className="session-container">
      <div className="session-window">
        {/* <div className="session-name">
          <label htmlFor="morning">Morning</label>
          <input
            type="radio"
            id="morning"
            name="session"
            checked={selectedSession === "Morning"}
            onChange={() => handleChangesession("Morning")}
          />
        </div>
        <div className="session-name">
          <label htmlFor="evening">Evening</label>
          <input
            type="radio"
            id="evening"
            name="session"
            checked={selectedSession === "Evening"}
            onChange={() => handleChangesession("Evening")}
          />
        </div> */}
        <h3 className="sessions-head">Sessions Available</h3>
        <div>
        {
          filteredsession && filteredsession.map((item:any)=>(
           <div className="session-name">
              <label htmlFor="morning">{item?.openingTime} - {item?.closingTime}</label>
          <input
            type="radio"
            id="morning"
            name="session"
            checked={selectedSession ===item?.closingTime}
            onChange={() => handleChangesession(item?.closingTime)}
          />
           </div>


          ))
        }

        </div>
        <div className="session-save-cancel">
        <button className="cancel-btn-session" onClick={handleSessionSave}>Cancel</button>
        <button className="save-btn-session" onClick={handleSessionSave}>Save</button>
        </div>
       
      </div>
    </div>
  );
};

export default SessionOpen;
