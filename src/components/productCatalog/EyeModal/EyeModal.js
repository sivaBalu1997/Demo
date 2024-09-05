import React, { useRef } from 'react'
import "./EyeModal.scss"
import Eye  from "../../../assets/images/eye.png"

const EyeModal = ({onEyeclose}) => {
    const eyemodalRef=useRef()
    const EyeClose=(e)=>{
        if(eyemodalRef.current===e.target){
            onEyeclose();
        }
    }
    const closeModal=()=>{
        onEyeclose();
    }
  return (
    <div ref={eyemodalRef} onClick={EyeClose} className='EyeModal-Container'>
      <div className='EyeModal-Window'>
        <div className='EyeModal-Form'>
       
         <div className='EyeImage'>
        <img src={Eye}></img>
         </div>
         <div className='EyeMessage'>
        <h1 className='Eye-Heading'>Are you sure you want to hide the </h1>
        <h1 className='Eye-Heading'>  item from the listing?</h1>
         </div>
         <div className='Eye-Button'>
          <button className='EyeButton1' onClick={closeModal} >Cancel</button>
          <button className='EyeButton2'>Change</button>
         </div>
        </div>
        </div>
    
    </div>
  )
}

export default EyeModal