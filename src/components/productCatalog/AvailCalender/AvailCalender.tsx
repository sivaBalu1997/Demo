import React, { useContext, useState } from "react";
import "./AvailCalender.scss";
import DatePicker from "react-datepicker";
import { Contextpagejs } from "pages/productCatalog/contextpage";

interface modelshow {
  setShowcalender: any;
  showcalender: any;
  selectedtypeid: string;
}

const AvailCalender: React.FC<modelshow> = ({
  selectedtypeid,
  setShowcalender,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<
    "AM" | "PM" | null
  >("AM");

  const { patchedData, setPatchedData } = useContext(Contextpagejs);

  const handleTimePeriodClick = (period: "AM" | "PM") => {
    setSelectedTimePeriod(period);
  };

  const formatDateToISO = (date: Date) => {
    const offsetTime = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return offsetTime.toISOString().slice(0, 19);
  };

  const { selectedDateOption } = useContext(Contextpagejs);
  const formattedDate = formatDateToISO(selectedDate);
  console.log(formattedDate);

  const [selectedDatee, setSelectedDatee] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDatee(date);
  };

  const handleDateChanging = () => {
    if (selectedDatee) {
      const newAvailabilityInfo = {
        orderTypeId: selectedtypeid,
        unAvailableUntilTime: formatDateToISO(selectedDatee),
      };
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

      setShowcalender(false);
    }
  };
  console.log("patchedDaaaaaaa", patchedData);

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
            />
          </div>
          <div className="AvailCalenderInputContainer">
            <div>
              <input type="text" className="AvailCalenderInput1" />
            </div>
            <h2>:</h2>
            <div>
              <input type="text" className="AvailCalenderInput1" />
            </div>
            <div
              className={`AvailCalenderAm ${
                selectedTimePeriod === "AM" ? "Calselected" : ""
              }`}
              onClick={() => handleTimePeriodClick("AM")}
            >
              <p>Am</p>
            </div>
            <div
              className={`AvailCalenderPm ${
                selectedTimePeriod === "PM" ? "Calselected" : ""
              }`}
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


 
 
 
  