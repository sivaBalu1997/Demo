import React, { useEffect, useState } from 'react'
import { useHistory , useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import { deleteEmployee, employeeStatusRequest, getEmployeeByIdRequest, setEditEmployeeData } from '../../redux/actions/employeeActions'
import './employeeDetails.css'
import menu from '../../assets/svg/menu.svg'
import x from '../../assets/svg/x.svg'
import edit from '../../assets/svg/edit.svg'
import block from '../../assets/svg/blockImg.svg' 
import unBlockImg from '../../assets/svg/unBlockImg.svg'
import trash from '../../assets/svg/trash.svg'

const EmployeeDetails = () => {
    const [showDropDown, setShowDropDown] = useState(false)
    const [date, setDate] = useState("")
    const [openDeleteModal, setDeleteOpenModal] = useState(false);
    const [openStausModal, setOpenStausModal] = useState(false);
    const [isBlocking, setIsBlocking] = useState(true);
    const [employeeToUpdate, setEmployeeToUpdate] = useState(null);


    const history = useHistory()
    const params = useParams()

    useEffect(() => {
        dispatch(getEmployeeByIdRequest(params.id));
    },[params])

    const employee = useSelector((state) => state.employee.employeeByIdDetails)
    const employeeByIdDetailsLoading = useSelector((state) => state.employee.employeeByIdDetailsLoading)
  
    const dispatch = useDispatch()

    const handleDelete = () => {
      dispatch(deleteEmployee(employee.staffId))
      setTimeout(()=>{
        history.push("/management/employees")
      },1000)
    }

    const formatDate = (dateString) => {
        if (dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        }
        return '';
    }

    const fomatLocation = (location) => {
        const outlet =  location?.split(',')[1]
        return outlet
    }

    const handleBlockClick = (employee, block) => {
        setEmployeeToUpdate(employee);
        setIsBlocking(block);
        setOpenStausModal(prev => !prev);
      };
    
      const handleBtnClick = () => {
        dispatch(employeeStatusRequest(employeeToUpdate.staffId, isBlocking));
        setOpenStausModal(prev => !prev);
        setEmployeeToUpdate(null);
        setIsBlocking(false);  
        setShowDropDown(!showDropDown)
    };
    
    const handleNoClick = () => {
        setOpenStausModal(prev => !prev);
        setEmployeeToUpdate(null);  
        setIsBlocking(false);  
        setShowDropDown(!showDropDown)
    };

      if(employeeByIdDetailsLoading){
        return(
            <p style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "25%",
                marginLeft:'35%'
              }}>
                Loading, Please wait!!
            </p>
        )
      }
   
    return (
        <div className='employeeDetails'>
            <div className='headLine'>
                <h3>Employee Details</h3>
                {!showDropDown ? 
                    (<img src={menu} onClick={() => setShowDropDown(!showDropDown)} />) 
                    :
                    (<img src={x} className='xImg' style={{width:'30px'}} onClick={() => setShowDropDown(!showDropDown)} />) 
                }
            </div>
            {showDropDown && (
                <div className='dropDown'>
                    <div className='actionTab' onClick={() => {
                        dispatch(setEditEmployeeData(employee))
                        history.push("/management/employees/add")
                    }}>
                        <img src={edit} 
                            style={{filter: "brightness(0) saturate(100%) invert(45%) sepia(22%) saturate(1556%) hue-rotate(49deg) brightness(94%) contrast(93%)"}}
                        />
                        <p>Edit</p>
                    </div>

                    <div className='actionTab'
                        onClick={() => {handleBlockClick(employee, employee.isActive)}}
                    >
                        <img src={employee.isActive ? block : unBlockImg} style={{filter: "invert(65%) sepia(100%) saturate(1000%) hue-rotate(-23deg) brightness(102%) contrast(102%)"}} />
                        <p>{employee.isActive ? 'Block' : 'Unblock'}</p>
                    </div>
                    {openStausModal && (
                            <div className="modal">
                                <div className="modalContainer">
                                    <p>{employee.isActive ? 'Do you want to block?' : 'Do you want to unblock?'}</p>
                                    <div className="modalBtn">
                                    <button
                                        className="yesBtn"
                                        onClick={handleBtnClick}
                                    >Yes</button>
                                    <button
                                        className="noBtn"
                                        onClick={handleNoClick}
                                    >No</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    <div className='actionTab' onClick={()=>setDeleteOpenModal(!openDeleteModal)}>
                        <img src={trash} style={{filter: "invert(21%) sepia(93%) saturate(7248%) hue-rotate(354deg) brightness(103%) contrast(101%)"}} />
                        <p>Delete</p>
                        {openDeleteModal && (
                        <div className="modal">
                            <div className="modalContainer">
                                <p>Do you want to delete?</p>
                                <div className="modalBtn">
                                <button
                                    className="yesBtn"
                                    onClick={handleDelete}
                                >Yes</button>
                                <button
                                    className="noBtn"
                                    onClick={() => setDeleteOpenModal(!openDeleteModal)}
                                >No</button>
                                </div>
                            </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className='detailContainer'>
                <div>
                    <div className='title'><p className='tag'>Full Name</p><p className='value'> : {employee?.firstName}</p></div>
                    <div className='title'><p className='tag'>Assigned Role</p><p className='value'> : {employee?.assignedRole}</p></div>
                    <div className='title'><p className='tag'>Assigned Outlet</p><p className='value'> : {fomatLocation(employee?.locationName)}</p></div>
                    <div className='title'><p className='tag'>Start Date</p><p className='value'> : {employee?.startDate}</p></div>
                    <div className='title'><p className='tag'>User ID</p><p className='value'> : {employee?.userId}</p></div>
                    <div className='title'><p className='tag'>Pin</p><p className='value'> : {employee?.pin}</p></div>
                </div>
                <div>
                    <div className='title'><p className='tag'>Nick Name</p><p className='value'> : {employee?.nickName}</p></div>
                    <div className='title'><p className='tag'>Email</p><p className='value'> : {employee?.email}</p></div>
                    <div className='title'><p className='tag'>Phone</p><p className='value'> : {employee?.phone}</p></div>
                    <div className='title'><p className='tag'>Address</p><p className='value'> : {employee?.address}</p></div>
                    <div className='title'><p className='tag'>Date of Birth</p><p className='value'> : {formatDate(employee?.dateOfBirth)}</p></div>
                    <div className='title'><p className='tag'>Education</p><p className='value'> : {employee?.education}</p></div>
                </div>
            </div>
            <div className='rolesContainer'>
                <h4>Roles and Functions</h4>
                <div className='roles'>
                    {employee?.rolesAndFunctions?.map((role, roleIndex) => (
                        <div className='rolesHeading' key={roleIndex}> 
                            <h4>{role?.module}</h4>
                            {role.funtions.map((func, funcIndex) => (
                                <p key={funcIndex}>{func}</p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <button className='backBtn' onClick={() => history.push("/management/employees")}>Back</button>
        </div>
    )
}

export default EmployeeDetails
