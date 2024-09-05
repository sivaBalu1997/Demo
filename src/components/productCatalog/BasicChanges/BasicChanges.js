import React from 'react'
import "./BasicChanges.scss"
import ToggleSlider from "../ToggleSlider/ToggleSlider"
import Basic from "../../../assets/images/Basic.png"
import { useState } from 'react'


const BasicChanges = () => {
    const[outlet1,setOutlet1]=useState(false)
const[outlet2,setOutlet2]=useState(false)
const[outlet3,setOutlet3]=useState(false)
  return (
    <>
    <div className={"BasicChangesContainer"}>
        <div className='BasicChanges'>
          <img src={Basic} className='BasicChangesImage'></img>
         <p className='BasicChangesText'>Make basic changes here.Click the edit icon for all options</p>
        </div>
        <div className='BasicChangesDiv'></div>
        <div className='BasicChangescheckbox'>
         <input type='checkbox' className='BasicCheckboxInput'></input>
         <h1 className='BasicChangescheckbox-Heading'>Change across all outlets</h1>
        </div>
        <div className='ToggleBasicChanges'>
         <div className='Toggle1BasicChange'>
          <ToggleSlider toggle={outlet1} setToggle={setOutlet1} />
          <h1 className='Toggle1Basic-Heading'>Outlet 1</h1>
         </div>
         <div className='Toggle1BasicChange'>
          <ToggleSlider toggle={outlet2} setToggle={setOutlet2} />
          <h1 className='Toggle1Basic-Heading'>Outlet 2</h1>
         </div>
         <div className='Toggle1BasicChange'>
          <ToggleSlider toggle={outlet3} setToggle={setOutlet3} />
          <h1 className='Toggle1Basic-Heading'>Outlet 3</h1>
         </div>
        </div>
        <div className='CancelChange'>
         <button className='CancelBtn'>Cancel</button>
         <button className='ChangeBtn'>Change</button>
        </div>
        </div>
    </>
  )
}

export default BasicChanges