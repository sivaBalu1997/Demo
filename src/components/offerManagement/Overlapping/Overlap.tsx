import React from 'react'
import './Overlap.scss'
import { useSelector } from 'react-redux';
interface overlap{
    onclose:any

}
const Overlap:React.FC<overlap> = ({onclose}) => {
    const  createSpecialOfferOverlap= useSelector((state: any) => state.offer.createSpecialOfferOverlapData);
    const convertTo12HourFormat = (time24: string): string => {
      if (!time24) {
        return ''; 
      }
    
      const timeParts = time24.split(':');
      
      if (timeParts.length < 2) {
        return ''; 
      }
    
      const hours = parseInt(timeParts[0], 10);
      const minutes = timeParts[1];
    
      if (isNaN(hours)) {
        return ''; 
      }
    
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12; 
    
      return `${hours12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    };
    
  
  return (
    <div className="modal-overlay">
  <div className="modal-content">
    <h2 className="modal-title">Special Price Overlap Detected</h2>
    {/* <p className="modal-subtitle">Overlapping period: <span className="highlight">{createSpecialOfferOverlap && convertTo12HourFormat(createSpecialOfferOverlap[0]?.currentOfferStartTime)} - {createSpecialOfferOverlap&& convertTo12HourFormat(createSpecialOfferOverlap[0]?.currentOfferEndTime) }
    </span></p> */}
    <p className="modal-description">The following items will have overlapping Special hours:</p>

    <div className="modal-item">
      <h3 className="item-name">{createSpecialOfferOverlap[0].itemName}</h3>
      <ul className="item-details">
        <li>{createSpecialOfferOverlap[0].offerName}:{convertTo12HourFormat(createSpecialOfferOverlap[0].offerStartTime)} -{convertTo12HourFormat(createSpecialOfferOverlap[0].offerEndTime)} (5% off)</li>
        <li>{createSpecialOfferOverlap[0].currentOfferName}:{convertTo12HourFormat(createSpecialOfferOverlap[0].currentOfferStartTime)} -{convertTo12HourFormat(createSpecialOfferOverlap[0].currentOfferEndTime)} (5% off)</li>

        {/* <li>Pizza Hour SP Name: 10:00 AM - 12:00 PM (10% off)</li> */}
      </ul>
    </div>

    <p className="warning-message">*Please remove the common items to save the offer</p>

    <button className="okay-button" onClick={()=>onclose()}>Okay</button>
  </div>
</div>

  )
}

export default Overlap