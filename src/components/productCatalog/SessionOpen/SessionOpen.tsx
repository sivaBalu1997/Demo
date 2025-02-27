import React, { useContext, useEffect, useState } from "react";
import './SessionOpen.scss'
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { useSelector } from "react-redux";

interface ModelShowProps {
  setshowsession: (value: boolean) => void;
  selectedtypeid: string;
  setshowAvailchanges:any;
  parentToggle:string;
  setTimeToSet:any;

}

const SessionOpen: React.FC<ModelShowProps> = ({
  selectedtypeid,
  setshowsession,
  setshowAvailchanges,
  parentToggle,
  setTimeToSet
  
}) => {

  const { patchedData, setPatchedData } = useContext(Contextpagejs);
  const [filteredsession,setfilteredsession]=useState<any>([]);
  const restaurantDetails = useSelector((state:any) => state.auth.restaurantDetails);
 
  const sessionavailable=[
    {
      weekday:"All",
      openingTime:"12.00",
      closingTime:"11.00"
      

    },
    {
      weekday:"Monday",
      openingTime:"01.00",
      closingTime:"03.00"
      

    },
    {
      weekday:"Friday",
      openingTime:"01.00",
      closingTime:"03.00"
      

    },
    {
      openingTime:"01.00",
      closingTime:"03.00"
      

    }
  ]
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
  useEffect(()=>{
    const todayDay = getTodayDay();
    // const todayDay = "Thursday";

    const todayWorkinghours = restaurantDetails?.workingHours.filter(
      (item:any) => item.weekday === todayDay||item.weekday === "All"
    );
 
    
    setfilteredsession(todayWorkinghours);

  },[restaurantDetails])

  const [selectedSession, setSelectedSession] = useState<string>(filteredsession[0]?.closingTime);
  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [selctedDateSession, setselctedDateSession] = useState(filteredsession[0]?.closingTime);


  const handleChangesession = (session: string) => {
    setSelectedSession(session);
    setselctedDateSession(session);
  };
  const formattedDate = getFormattedDate();

  const handleSessionSave = () => {
   
    // const sessionClosingHours = filterWorkingHoursBySession(selctedDateSession);
    // console.log("sessionClosingHours",sessionClosingHours?.closingTime);
    
// if(parentToggle==="")
// {
//   setPatchedData((prevState:any) => ({
//     ...prevState,
//     itemAvailabilityInfo: prevState.itemAvailabilityInfo.map(
//       (availabilityInfo:any) =>
//         availabilityInfo.orderTypeId === selectedtypeid
//           ? {
//               ...availabilityInfo,
//               unAvailableUntilTime: `${formattedDate}T${selctedDateSession}`,
//             }
//           : availabilityInfo
//     ),
//   }));

// }
// else{


//   setPatchedData((prevState:any) => ({
//     ...prevState,
//     itemAvailabilityInfo: prevState.itemAvailabilityInfo.map(
//       (availabilityInfo:any) =>{
//         return { 
          
//         ...availabilityInfo,
//         unAvailableUntilTime: `${formattedDate}T${selctedDateSession}`,
//       }
//     }
//     ),
//   }));
 

// }


setTimeToSet(`${formattedDate}T${selctedDateSession}`)
    
    setshowsession(false);
    setshowAvailchanges(true)
  };
 
  
const handleSessionCancel=()=>{
  setshowsession(false);
  setselctedDateSession("");
  setshowAvailchanges(true);
  setTimeToSet("")
  

}


useEffect(()=>{
  if (filteredsession && filteredsession.length > 0) {
    setselctedDateSession(filteredsession[0]?.closingTime)


  setTimeToSet(`${formattedDate}T${filteredsession[0]?.closingTime}`)

}

},[])


useEffect(() => {
  if (filteredsession && filteredsession.length > 0) {
    setSelectedSession(filteredsession[0]?.closingTime);
    setselctedDateSession(filteredsession[0]?.closingTime)


  }
}, [filteredsession]);

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
        <h3 className="sessions-head">Available Sessions</h3>
        <div>
        {
          filteredsession && filteredsession.map((item:any)=>(
           <div className="session-name">
              <label htmlFor="morning" className="session-lable">{item?.openingTime} - {item?.closingTime}</label>
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
        <button className="cancel-btn-session" onClick={handleSessionCancel}>Cancel</button>
        <button className="save-btn-session" onClick={handleSessionSave}>Save</button>
        </div>
       
      </div>
    </div>
  );
};

export default SessionOpen;
