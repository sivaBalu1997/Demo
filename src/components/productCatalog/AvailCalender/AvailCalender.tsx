import React, { useContext, useState } from "react";
import "./AvailCalender.scss";
import DatePicker from "react-datepicker";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { useSelector } from "react-redux";

interface modelshow {
  setShowcalender: any;
  showcalender: any;
  selectedtypeid: string;
  ParentToggle:string
 
}

const AvailCalender: React.FC<modelshow> = ({
  selectedtypeid,
  setShowcalender,
  ParentToggle
}) => {

  const [selectedDatee, setSelectedDatee] = useState<Date | null>(null);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<"AM" | "PM">("AM");
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const dataFromRedux = useSelector((state:any) => state?.selectedMockDataReducer?.data );
  const { patchedData, setPatchedData } = useContext(Contextpagejs);


  const handleTimePeriodClick = (period: "AM" | "PM") => {
    setSelectedTimePeriod(period);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDatee(date);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'hours' | 'minutes') => {
    const value = e.target.value;
    if (type === 'hours') {
      setHours(value);
    } else {
      setMinutes(value);
    }
    const formattedHours = String(type === 'hours' ? value : hours).padStart(2, '0')||"00";
    const formattedMinutes = String(type === 'minutes' ? value : minutes).padStart(2, '0')||"00";
    setFormattedTime(`${formattedHours}:${formattedMinutes}`);
  };

  const handleDateChanging = () => {
    if (selectedDatee && selectedTimePeriod && formattedTime) {
      const newAvailabilityInfo = {
        orderTypeId: selectedtypeid,
        unAvailableUntilTime: formatDateTime(selectedDatee, formattedTime, selectedTimePeriod),
      };
console.log("time", formattedTime);

      if(ParentToggle==="")
      {

        const updatedData = {
          ...patchedData,
          itemAvailabilityInfo: [
            ...patchedData.itemAvailabilityInfo.filter(
              (info: any) => info.orderTypeId !== selectedtypeid
            ),
            newAvailabilityInfo,
          ],
        };
        setPatchedData(updatedData);
      }
   

     
      else{
        setPatchedData((prevState:any) => ({
          ...prevState,
          itemAvailabilityInfo: prevState.itemAvailabilityInfo.map(
            (availabilityInfo:any) =>{
              return { 
                
              ...availabilityInfo,
              unAvailableUntilTime: formatDateTime(selectedDatee, formattedTime, selectedTimePeriod),
            }
          }
          ),
        }));
      }
       

     
      setShowcalender(false);
    }
  };

  const formatDateTime = (selectedDatee: Date, formattedTime: string, selectedTimePeriod: string): string => {
    const date = new Date(selectedDatee);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const [hours, minutes] = formattedTime.split(':').map(Number);
    const adjustedHours = selectedTimePeriod === 'PM' && hours < 12
      ? hours + 12
      : selectedTimePeriod === 'AM' && hours === 12
        ? 0
        : hours;
    const formattedDateTime = `${year}-${month}-${day}T${String(adjustedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
    return formattedDateTime;
  };
  const result = selectedDatee && selectedTimePeriod && formatDateTime(selectedDatee, formattedTime, selectedTimePeriod);
  console.log("result", result);



  return (
    <div className="AvailCalenderContainer">
      <div className="AvailCalenderWindow">
        <div className="AvailCalenderForm">
          <h2 className="AvailCalenderHeading">Availability Changes Until</h2>
          <div>
            <DatePicker
              selected={selectedDatee}
              onChange={handleDateChange}
              inline
              minDate={new Date()}
            />
          </div>
          <div className="AvailCalenderInputContainer">
            <div>
              <input
                type="number"
                value={hours}
                onChange={(e) => handleTimeChange(e, 'hours')}
                placeholder="HH"
                className="AvailCalenderInput1" 
                min="0"
                max="12"
              />
            </div>
            <h2>:</h2>
            <div>
              <input
                type="number"
                value={minutes}
                onChange={(e) => handleTimeChange(e, 'minutes')}
                placeholder="MM"
                className="AvailCalenderInput1"
                min="0"
                max="59"
              />
            </div>
            <div
              className={`AvailCalenderAm ${selectedTimePeriod === "AM" ? "Calselected" : ""}`}
              onClick={() => handleTimePeriodClick("AM")}
            >
              <p>Am</p>
            </div>
            <div
              className={`AvailCalenderPm ${selectedTimePeriod === "PM" ? "Calselected" : ""}`}
              onClick={() => handleTimePeriodClick("PM")}
            >
              <p>Pm</p>
            </div>
          </div>
          <div className="AvailCalenderButton">
            <button
              className="AvailCancel"
              onClick={() => setShowcalender(false)}
            >
              Cancel
            </button>
            <button className="AvailChange" onClick={handleDateChanging}>
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailCalender;
