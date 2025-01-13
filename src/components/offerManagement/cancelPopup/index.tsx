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
            <div><p className='cancel-text-sp'>Are you sure ? you want to delete the item from the listing</p></div>
  <div className='cancel-and-delete-button'>
    <button className='cancel-button-sp' onClick={()=>onclose()}>Cancel</button>
    <button className='delete-button-sp' onClick={()=>  history.push("/Offers/active")}>Delete</button>
  </div>
            </div>
  
        </div>
    
      )
}

export default Index