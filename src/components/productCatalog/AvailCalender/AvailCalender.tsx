import React, { useState } from 'react'
import "./AvailCalender.scss"
import DatePicker from 'react-datepicker';


const AvailCalender = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());  
    const [selectedTimePeriod, setSelectedTimePeriod] = useState<'AM' | 'PM' | null>("AM");
    const handleTimePeriodClick = (period: 'AM' | 'PM') => {
        setSelectedTimePeriod(period);
      };
    
    return (
    <div className='AvailCalenderContainer'>
        <div className='AvailCalenderWindow'>
          <div className='AvailCalenderForm'>
          <h2 className='AvailCalenderHeading'>Availability Changes Until</h2>
          <div>
       <DatePicker
        selected={selectedDate}
        inline
      />
      </div>
      <div className='AvailCalenderInputContainer'>
       <div>
        <input type="text" className='AvailCalenderInput1'></input>
       </div>
       <h2>:</h2>
       <div>
        <input type="text" className='AvailCalenderInput1'></input>
       </div>
       <div  className={`AvailCalenderAm ${
                selectedTimePeriod === 'AM' ? 'Calselected' : ''
              }`}
              onClick={() => handleTimePeriodClick('AM')}
>
        <p>Am</p>
       </div>
       <div className={`AvailCalenderPm ${
                selectedTimePeriod === 'PM' ? 'Calselected' : ''
              }`}
              onClick={() => handleTimePeriodClick('PM')}>
        <p>Pm</p>
       </div>
      </div>
    <div className='AvailCalenderButton'>
<button className='AvailCancel'>Cancel </button>
<button className='AvailChange'>Change</button>
    </div>
        </div>  
        </div>
    </div>
  )
}

export default AvailCalender