import React from 'react'
import './Overlap.scss'
interface overlap{
    onclose:any

}
const Overlap:React.FC<overlap> = ({onclose}) => {
  return (
    <div className="modal-overlay">
  <div className="modal-content">
    <h2 className="modal-title">Special Price Overlap Detected</h2>
    <p className="modal-subtitle">Overlapping period: <span className="highlight">10:00 AM - 11:00 AM</span></p>
    <p className="modal-description">The following items will have overlapping Special hours:</p>

    <div className="modal-item">
      <h3 className="item-name">Margherita Pizza</h3>
      <ul className="item-details">
        <li>Pizza Hour SP Name: 9:00 AM - 11:00 AM (5% off)</li>
        <li>Pizza Hour SP Name: 10:00 AM - 12:00 PM (10% off)</li>
      </ul>
    </div>

    <p className="warning-message">*Please remove the common items to save the offer</p>

    <button className="okay-button" onClick={()=>onclose()}>Okay</button>
  </div>
</div>

  )
}

export default Overlap