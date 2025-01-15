import React from 'react'
import './style.scss'
import { useHistory } from "react-router-dom";
interface cancelpopup{
    onclose:any

}
const Index:React.FC<cancelpopup> = ({onclose}) => {

     const history = useHistory();
    return (
        <div className='cancelpopup-special-offer'>
            <div className='cancel-popup-containe-sp'>
            <div><p className='cancel-text-sp'>Unsaved changes will be lost. Do you want to continue?</p></div>
  <div className='cancel-and-delete-button'>
    <button className='cancel-button-sp' onClick={()=>onclose()}>Back</button>
    <button className='proceed-button-sp' onClick={()=>  history.push("/Offers/active")}>Proceed</button>
  </div>
            </div>
  
        </div>
    
      )
}

export default Index