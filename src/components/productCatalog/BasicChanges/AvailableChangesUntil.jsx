import React, { useContext, useState, useEffect } from "react";
import "./AvailabilityChangesUntil.scss";
import AvailCalender from "../AvailCalender/AvailCalender";
import { useDispatch, useSelector } from "react-redux";
import { partialUpdateMenuRequest } from "redux/productCatalog/productCatalogActions";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import SessionOpen from "../SessionOpen/SessionOpen";

const AvailabilityChangesUntil = ({
  handleOrderCategoryAvailability,
  setSelectPeriod,
  selectedtypeid,
  parentToggle,
  ParentToggles,
  setcanceledChanges,
  handleOrderTypesAvail,
  selectedTypeGroup
}) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(0);
  const [showAvailCalender, setShowAvailCalender] = useState(false);
  const [showAvailchanges, setshowAvailchanges] = useState(true);
  const [showsession, setshowsession] = useState(false);
  const [selctedDateSession, setselctedDateSession] = useState("");
  const restaurantDetails = useSelector(
    (state) => state.auth.restaurantDetails
  );
  const { patchedData, setPatchedData, partialData, setPartialData } =
    useContext(Contextpagejs);

  const workingHours = [
    // Your working hours data as shown in your original code...
  ];
  const [timeToSet, setTimeToSet] = useState("");

  const [untillTime, setUntillTime] = useState("(DD/MM/YYYY HH:MM AM/PM)");

  const dataFromRedux = useSelector(
    (state) => state?.selectedMockDataReducer?.data
  );
  useEffect(() => {
    const tempOnPremarray = dataFromRedux[0]?.orderTypes?.filter(
      (data, index) => {
        return data?.typeGroup === "D";
      }
    );
    const tempOffPremarray = dataFromRedux[0]?.orderTypes?.filter(
      (data, index) => {
        return data?.typeGroup !== "D";
      }
    );

    const combinedArray = [...tempOnPremarray, ...tempOffPremarray];

    const PartialArrayPrice = combinedArray.map((data, index) => ({
      orderTypeId: data.typeId,
      price: data.price,
    }));
    const PartialArrayAvailbility = combinedArray.map((data, index) => ({
      orderTypeId: data.typeId,
      unAvailableUntilTime: "",
    }));
  }, [dataFromRedux[0].orderTypes]);

  const Text = [
    "End of Today",
    "End of Sessions",
    `Until${untillTime}`,
    "Until manually enabled",
  ];
  const sessionavailable=[
    {
      openingTime:"12.00",
      closingTime:"11.00"
      

    },
    {
      openingTime:"01.00",
      closingTime:"03.00"
      

    },
    {
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
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    return daysOfWeek[today.getDay()];
  };
  const [filteredsession, setfilteredsession] = useState([]);
  useEffect(() => {
    // const todayDay = getTodayDay();
    const todayDay = "Sunday"; 
    const todayWorkinghours = restaurantDetails?.workingHours.filter(
      (item) => item.weekday === todayDay || item.weekday === "All"
    );
   
    
    setfilteredsession(todayWorkinghours);
  }, [restaurantDetails]);


 

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
      // const todayDay = "Sunday"; 
      const formattedDate = getFormattedDate();
      // console.log("todayWorkinghours",todayWorkinghours);
      const todayWorkinghours = restaurantDetails?.workingHours.filter(
        (item) => item.weekday === todayDay || item.weekday === "All"
      );

      const Time = `${formattedDate}T${
        todayWorkinghours?.length
          ? todayWorkinghours[todayWorkinghours.length - 1]?.closingTime ?? "23:59:00"
          : "23:59:00"
      }`;

      // const Time = `${formattedDate}T${
      //   todayWorkinghours? todayWorkinghours[todayWorkinghours.length - 1]?.closingTime:"23:59:00"
      // }`;
      setTimeToSet(Time);
    } else if (elem === "End of Sessions") {
      const formattedDate = getFormattedDate();
     
      
      const SessionTime = `${formattedDate}T${
        filteredsession && filteredsession.length > 0
          ? filteredsession[filteredsession.length - 1].closingTime ?? "23:59:00"
          : "23:59:00"
      }`;    
      // const SessionTime = `${formattedDate}T${filteredsession&& filteredsession[filteredsession?.length-1]?.closingTime}`;

      
      if (filteredsession?.length ===1||filteredsession?.length ===0) {
        setTimeToSet(SessionTime);
       
        // setshowAvailchanges(false)
        // setshowsession(true);

        
      } else {
        setshowsession(true);
        setshowAvailchanges(false);
      }

      // setshowAvailchanges(false)
      // const formattedDate = getFormattedDate();
      // const sessionClosingHours = filterWorkingHoursBySession(selctedDateSession);
      // console.log("sessionClosingHours",sessionClosingHours);

      // const Time=`${formattedDate}T${sessionClosingHours?.closingTime}`;
      // setTimeToSet(Time);
    } else if (elem === "Until manually enabled") {
      setTimeToSet("9999-01-01T00:00:00");
    }
  };

  const [matchedChildArray, setMatchedChildArray] = useState([]);

  const handleTimeChange = () => {
    if (selectedOption !== -1) {
      if (parentToggle === "") {
        
        const datamatched = patchedData?.itemAvailabilityInfo.filter(
          (data) => data.orderTypeId === selectedtypeid
        );

        const pushData = {
          orderTypeId: selectedtypeid,
          unAvailableUntilTime: timeToSet,
        };

        setPartialData((prev) => {
          const existingInfo = prev.itemAvailabilityInfo || [];
          const existingIndex = existingInfo.findIndex(
            (item) => item.orderTypeId === selectedtypeid
          );

          const updatedInfo =
            existingIndex > -1
              ? existingInfo.map((item, index) =>
                  index === existingIndex
                    ? { ...item, unAvailableUntilTime: timeToSet }
                    : item
                )
              : [...existingInfo, pushData];

          return {
            ...prev,
            itemId: dataFromRedux[0].itemId,
            itemAvailabilityInfo: updatedInfo,
          };
        });

        setPatchedData((prevState) => ({
          ...prevState,
          itemAvailabilityInfo: prevState.itemAvailabilityInfo.map(
            (availabilityInfo) =>
              availabilityInfo.orderTypeId === selectedtypeid && {
                orderTypeId: availabilityInfo.orderTypeId,
                unAvailableUntilTime: timeToSet,
              }
          ),
        }));
      } else {
       

        setPartialData((prev) => {
          const existedArray=prev.itemAvailabilityInfo||[]

          
          const dataToAdd=[];
          ParentToggles.map((item,index)=>{
           
              const existeingindex=existedArray.findIndex((id)=>id.orderTypeId===item.typeId)
              if(existeingindex>-1)
              {
               existedArray[existeingindex].unAvailableUntilTime=timeToSet
                
              }
              else{
                dataToAdd.push({
                  orderTypeId: item.typeId,
                unAvailableUntilTime: timeToSet,

                })
              }

            })


          // })



        //   const dataToAdd = ParentToggles.filter(
        //     (item) => item.isEnabled === 1
        //   ).map((item) => {
            
            
        //     const existingIndex=existedArray.findIndex((item1)=>item1.orderTypeId===item.typeId)
        //     if(existingIndex>-1)
        //     {
        //       return{
        //         orderTypeId: item.typeId,
        //         unAvailableUntilTime: timeToSet,

        //       }
           
        //   }
        //   // else{
        //   //   return existedArray
        //   // }
        
        // });

          return {
            ...prev,
            itemId: dataFromRedux[0].itemId,
            itemAvailabilityInfo: [...existedArray,...dataToAdd],
          };
        });
      }
      setSelectPeriod(false);
    }
  };

 
  
  useEffect(()=>{
    const todayDay = getTodayDay();
    // const todayDay = "Sunday"; 
    const formattedDate = getFormattedDate();
    // console.log("todayWorkinghours",todayWorkinghours);
    const todayWorkinghours = restaurantDetails?.workingHours.filter(
      (item) => item.weekday === todayDay || item.weekday === "All"
    );
    const Time = `${formattedDate}T${
      todayWorkinghours?.length
        ? todayWorkinghours[todayWorkinghours.length - 1]?.closingTime ?? "23:59:00"
        : "23:59:00"
    }`;
 
    // const Time = `${formattedDate}T${
    //   todayWorkinghours&& todayWorkinghours[todayWorkinghours.length - 1]?.closingTime
    // }`;
    setTimeToSet(Time);
 
  },[])

  const handleTimeChangeCancel = () => {
    if (parentToggle === "") {
      handleOrderTypesAvail(selectedtypeid);
      // setPatchedData((prevState) => ({
      //   ...prevState,
      //   itemAvailabilityInfo: prevState.itemAvailabilityInfo.map(
      //     (availabilityInfo) =>
      //       availabilityInfo.orderTypeId === selectedtypeid
      //         ? {
      //             ...availabilityInfo,
      //             unAvailableUntilTime: "",
      //           }
      //         : availabilityInfo
      //   ),
      // }));
    } else {
      handleOrderCategoryAvailability(parentToggle);
      // setPatchedData((prevState) => ({
      //   ...prevState,
      //   itemAvailabilityInfo: prevState.itemAvailabilityInfo.map(
      //     (availabilityInfo) => {
      //       const matchingType = ParentToggles.find(
      //         (toggle) => toggle.typeId === availabilityInfo.orderTypeId
      //       );

      //       return matchingType
      //         ? {
      //             ...availabilityInfo,
      //             unAvailableUntilTime: "",
      //           }
      //         : availabilityInfo;
      //     }
      //   ),
      // }));
    }
    setcanceledChanges(true);
  };
  return (
    <div className="AvailabilityChangesUntilContainer">
      {showAvailchanges && (
        <div
          className="Availability_Changes_Until_SubContainer"
          style={{ marginLeft: showsession ? "75%" : "" }}
        >
          <div className="Avail_Changes_Form">
            <h4 className="Avail_Changes_Heading">
              Availability Changes Until
            </h4>

            {Text.map((elem, index) => {
              if(!(elem==="Until manually enabled" &&selectedTypeGroup==="T") )
              {
                return(
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
                )
               
              }

             
})}

            <div className="Avail_Button_Flex">
              <a
                className="Avail-btn1-Cancel"
                onClick={() => {
                  setSelectPeriod(false);
                  handleTimeChangeCancel();
                }}
              >
                Cancel
              </a>
              <a
                className="Avail-btn1-Save"
                onClick={() => {
                  handleTimeChange();
                }}
              >
                Save
              </a>
            </div>
          </div>
        </div>
      )}

      {showAvailCalender && (
        <AvailCalender
          selectedtypeid={selectedtypeid}
          setShowcalender={setShowAvailCalender}
          parentToggle={parentToggle}
          setUntillTime={setUntillTime}
          setTimeToSet={setTimeToSet}
        />
      )}

      {showsession && (
        <SessionOpen
          selectedtypeid={selectedtypeid}
          setshowsession={setshowsession}
          setshowAvailchanges={setshowAvailchanges}
          parentToggle={parentToggle}
          setTimeToSet={setTimeToSet}
        />
      )}
    </div>
  );
};

export default AvailabilityChangesUntil;
