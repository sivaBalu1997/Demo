import React, { useContext, useRef } from 'react'
import "./EyeModal.scss"
import Eye  from "../../../assets/images/eye.png"
import { Contextpagejs } from 'pages/productCatalog/contextpage';
import { useDispatch } from 'react-redux';
import { addMockDataHiddenRequest } from 'redux/productCatalog/productCatalogActions';

const EyeModal = ({onEyeclose}) => {
  const dispatch=useDispatch();
  const {   setApiPayload,ApiPayload } = useContext(Contextpagejs);

    const eyemodalRef=useRef()
    const EyeClose=(e)=>{
        if(eyemodalRef.current===e.target){
            onEyeclose();
        }
    }
    const closeModal=()=>{
        onEyeclose();
    }

    const handleChange=()=>{
      dispatch(addMockDataHiddenRequest(ApiPayload))
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
          <button className='EyeButton2' onClick={handleChange}>Change</button>
         </div>
        </div>
        </div>
    
    </div>
  )
}

export default EyeModal