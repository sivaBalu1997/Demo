import React, { useState } from 'react'
import { employeeByIdData } from './data'
import './employeeDetails.css'
import menu from '../../assets/svg/menu.svg'
import x from '../../assets/svg/x.svg'
import edit from '../../assets/svg/edit.svg'
import block from '../../assets/svg/blockImg.svg' 
import trash from '../../assets/svg/trash.svg'
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import { setEditEmployeeData } from '../../redux/actions/employeeActions'

const EmployeeDetails = () => {

    const data = employeeByIdData[0]
    const [showDropDown, setShowDropDown] = useState(false)
    const history = useHistory()
    const employee = useSelector((state)=>state.employee.employeeByIdDetails)

    const dispatch = useDispatch()

  return (
    <div className='employeeDetails'>
      <div className='headLine'>
        <h3>Employee Details</h3>
       {!showDropDown ? 
        (<img src={menu} onClick={()=>setShowDropDown(!showDropDown)} />) 
        :
        (<img src={x} className='xImg' style={{width:'30px'}} onClick={()=>setShowDropDown(!showDropDown)} />) 
       }
      </div>
      {showDropDown && <div className='dropDown'>
        <div className='actionTab'
           onClick={() => {
            dispatch(setEditEmployeeData(data))
            history.push("/management/employees/add")
          }}
        >
          <img src={edit} 
            style={{filter: "brightness(0) saturate(100%) invert(45%) sepia(22%) saturate(1556%) hue-rotate(49deg) brightness(94%) contrast(93%)"}}
          />
          <p>Edit</p>
        </div>
        <div className='actionTab'>
          <img src={block} style={{filter: "invert(65%) sepia(100%) saturate(1000%) hue-rotate(-23deg) brightness(102%) contrast(102%)"}} />
          <p>Block</p>
        </div>
        <div className='actionTab'>
          <img src={trash} style={{filter: "invert(21%) sepia(93%) saturate(7248%) hue-rotate(354deg) brightness(103%) contrast(101%)"}}/>
          <p>Delete</p>
        </div>
      </div>}
        <div className='detailContainer'>
            <div>
                <div className='title'><p className='tag'>Full Name</p><p className='value'> : {data.firstName}</p></div>
                <div className='title'><p className='tag'>Assigned Role</p><p className='value'> : {data.assignedRole}</p></div>
                <div className='title'><p className='tag'>Assigned Outlet</p><p className='value'> : {data.locationName}</p></div>
                <div className='title'><p className='tag'>Start Date</p><p className='value'> : {data.startDate}</p></div>
                <div className='title'><p className='tag'>User ID</p><p className='value'> : {data.userId}</p></div>
                <div className='title'><p className='tag'>Pin</p><p className='value'> : {data.pin}</p></div>
            </div>
            <div>
                <div className='title'><p className='tag'>Nick Name</p><p className='value'> : {data.nickName}</p></div>
                <div className='title'><p className='tag'>Email</p><p className='value'> : {data.email}</p></div>
                <div className='title'><p className='tag'>Phone</p><p className='value'> : {data.phone}</p></div>
                <div className='title'><p className='tag'>Address</p><p className='value'> : {data.address}</p></div>
                <div className='title'><p className='tag'>Date of Birth</p><p className='value'> : {data.dateOfBirth}</p></div>
                <div className='title'><p className='tag'>Education</p><p className='value'> : {data.education}</p></div>
            </div>
        </div>
        <div className='rolesContainer'>
        <h4>Roles and Functions</h4>
          <div className='roles'>
            {data.rolesAndFunctions.map((role, roleIndex) => (
              <div className='rolesHeading' key={roleIndex}> 
                <h4>{role.module}</h4>
                {role.functions.map((func, funcIndex) => (
                  <p key={funcIndex}>{func.name}</p>
                ))}
              </div>
            ))}
          
            <div className='rolesHeading'>
              <h4>Menu</h4>
              <p>Edit inventory</p>
              <p>View menu</p>
              <p>Add to special menu</p>
              <p>On/off/edit item cutomize</p>
              <p>On/off/edit item available</p>
            </div>            
            <div className='rolesHeading'>
              <h4>Service</h4>
              <p>Enable/Disable menu</p>
              <p>Enable/Disable delivery</p>
              <p>Enable/Disable pickup</p>
              <p>Enable/Disable checkin</p>
            </div>
            <div className='rolesHeading'>
              <h4>Other Functions</h4>
              <p>Access Reports</p>
              <p>Delivery Management view</p>
              <p>Management KDS</p>
              <p>Printer Setup</p>
              <p>Reassign tables</p>
            </div>

          </div>
        </div>
        <button className='backBtn' onClick={()=>
          history.push("/management/employees")
        }>Back</button>
    </div>
  )
}

export default EmployeeDetails
