import React from 'react'
import "./style.scss"
interface DaysOfWeekProps {
  highlightedDays: string[]; // Array of strings representing highlighted days
}
const index :React.FC<DaysOfWeekProps> =({highlightedDays}) => {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    
        <div className='OfferWeekDaysContainer'>
          <ul className='DaysOfWeekOffers'>
          {
            daysOfWeek.map((days,index)=>{
              return(
                <>
                  <li
              key={index}
              className={`OfferDaysOfWeekHeading ${
                highlightedDays.includes(days) ? "highlight" : ""
              }`}
            >{days}</li>
                </>
              )
            })
          }
          </ul>
        </div>
      
  )
}

export default index
