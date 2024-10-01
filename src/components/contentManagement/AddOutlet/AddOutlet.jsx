import React from 'react'
import './AddOutlet.scss'
import verticalLine from '../../../assets/svg/Line 7.svg'
import horizontalLine from '../../../assets/svg/Line 8.svg'

const AddOutlet = () => {
  return (
    <div className='addOutletContainer'>
        <img  className="vtline" src={verticalLine} alt="" />
        <img  className="hzLine"src={horizontalLine} alt="" />

    </div>
  )
}

export default AddOutlet