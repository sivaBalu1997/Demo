import React, { useEffect, useState } from 'react'
import { useHistory , useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import { deleteEmployee, employeeStatusRequest, getEmployeeByIdRequest, getEmployeeRoleByIdRequest, setEditEmployeeData } from '../../redux/actions/employeeActions'
import './employeeDetails.css'
import menu from '../../assets/svg/menu.svg'
import x from '../../assets/svg/x.svg'
import edit from '../../assets/svg/edit.svg'
import block from '../../assets/svg/blockED.svg' 
import unBlockImg from '../../assets/svg/unBlockED.svg'
import trash from '../../assets/svg/trash.svg'
import { ReactComponent as OpenEyeIcon } from "../../assets/svg/opened_eye.svg";
import { ReactComponent as ClosedEyeIcon } from "../../assets/svg/closed_eye.svg";
import Modal from '../Modal/Modal';
import thunder from '../../assets/svg/thunder.svg'
import { IoIosArrowBack } from "react-icons/io";

const EmployeeDetails = () => {
    const [showDropDown, setShowDropDown] = useState(false)
    const [date, setDate] = useState("")
    const [openDeleteModal, setDeleteOpenModal] = useState(false)
    const [openStausModal, setOpenStausModal] = useState(false)
    const [isBlocking, setIsBlocking] = useState(true)
    const [employeeToUpdate, setEmployeeToUpdate] = useState(null)
    const [isPinVisible, setIsPinVisible] = useState(false)
    const credentials = useSelector((state) => state.auth.credentials)


    const history = useHistory()
    const params = useParams()

    useEffect(() => {
        params?.id && dispatch(getEmployeeByIdRequest({staffId:params.id,sagaCallBack:invokePermission}));
    },[params?.id])

    const invokePermission =(employeeData)=>{
        employeeData?.isActive &&  dispatch(getEmployeeRoleByIdRequest({staffId:employeeData.staffId}));
    }

    const employee = useSelector((state) => state.employee.employeeByIdDetails)
    const employeeByIdDetailsLoading = useSelector((state) => state.employee.employeeByIdDetailsLoading)

    const roleFunctionFetching = useSelector((state) => state.employee.roleFunctionFetching)
    const rolesAndFunctions = useSelector((state) => state.employee.rolesAndFunctions)

  
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

    const isEmptyOrSpaces = (str) => {
        return str === null || str.match(/^ *$/) !== null;
    };

    const handleBlockClick = (employee, block) => {
        setEmployeeToUpdate(employee);
        setIsBlocking(block);
        setOpenStausModal(prev => !prev);
      };
    
      const handleBtnClick = () => {
        dispatch(employeeStatusRequest(employee?.staffId, employee?.isActive));
        //setOpenStausModal(prev => !prev);
        setEmployeeToUpdate(null);
        // setIsBlocking(false);  
        setShowDropDown(!showDropDown)    
    };

    const modelApiLoading  = useSelector((state) => state.employee.modelApiLoading)
    const actionApiSuccess  = useSelector((state) => state.employee.actionApiSuccess)
    const employeeStatusLoading = useSelector((state) => state.employee.employeeStatusLoading)
  
    useEffect(() => {
      // console.log({modelApiLoading, actionApiSuccess});
      if (actionApiSuccess && !modelApiLoading) {
        setDeleteOpenModal(false);
      }
      if(!employeeStatusLoading && actionApiSuccess && !modelApiLoading){
        setOpenStausModal(false);
        dispatch(getEmployeeByIdRequest({staffId:params.id,sagaCallBack:invokePermission}));
      }
    }, [modelApiLoading, actionApiSuccess,employeeStatusLoading])
    
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
            <div className='headLine' 
                style={{
                 position: 'fixed',
                 marginTop: '10px', 
                 marginBottom:'40px', 
                 width: '70%', 
                 zIndex: '1000', 
                 backgroundColor: '#fff', 
                 height:'100px',
                }}>
                <h3 style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    padding: '10px',
                }}
                onClick={() => history.replace("/management/employees")}
                >
                    <IoIosArrowBack />{" "}
                    Employee Details
                </h3>
                {!showDropDown ? 
                    (<img src={menu} onClick={() => setShowDropDown(!showDropDown)} />) 
                    :
                    (<img src={x} className='xImg' style={{width:'30px'}} onClick={() => setShowDropDown(!showDropDown)} />) 
                }
            </div>
            <Modal
                isOpen={openDeleteModal}
                message={credentials?.id == employee?.staffId ? 'You`re not allowed to perform this action' :"Do you want to delete?"}
                onConfirm={handleDelete}
                onCancel={() => setDeleteOpenModal(false)}
                type={credentials?.id == employee?.staffId ? "alert" : "confirmation"}
                isLoading={modelApiLoading}
            />

            <Modal
                isOpen={openStausModal}
                message={credentials?.id == employee?.staffId ? 'You`re not allowed to perform this action' :employee?.isActive ? 'Do you want to block?' : 'Do you want to unblock?'}
                onConfirm={handleBtnClick}
                onCancel={() => {setOpenStausModal(false)}}
                type={credentials?.id == employee?.staffId ? "alert" : "confirmation"}
                isLoading={modelApiLoading}
            />

            {showDropDown && (
                <div className='dropDown' style={{zIndex: '999999', marginTop:'20px' }}>
                    <div className='actionTab' onClick={() => {
                        dispatch(setEditEmployeeData(employee))
                        history.push("/management/employees/add/"+employee.staffId)
                    }}>
                        <img src={edit} 
                            style={{filter: "brightness(0) saturate(100%) invert(45%) sepia(22%) saturate(1556%) hue-rotate(49deg) brightness(94%) contrast(93%)"}}
                        />
                        <p>Edit</p>
                    </div>

                    <div className='actionTab'
                        onClick={() => {
                            setOpenStausModal(true)
                            //handleBlockClick(employee, employee.isActive)
                        }}
                    >
                        <img src={employee?.isActive ? block : unBlockImg}  />
                        <p>{employee?.isActive ? 'Block' : 'Unblock'}</p>
                    </div>
                    {/* {openStausModal && (
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
                        )} */}
                    <div className='actionTab' onClick={()=>setDeleteOpenModal(!openDeleteModal)}>
                        <img src={trash} style={{filter: "invert(21%) sepia(93%) saturate(7248%) hue-rotate(354deg) brightness(103%) contrast(101%)"}} />
                        <p>Delete</p>
                        {/* {openDeleteModal && (
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
                        )} */}
                    </div>
                </div>
            )}
            <div className='detailContainer' style={{marginTop:'100px'}}>
                <div>
                    <div className='title'><p className='tag'>Full Name</p><p className='value'> : {employee?.firstName} {employee?.lastName}</p></div>
                    <div className='title'>
                        <p className='tag'>Assigned Role</p>
                        <p className='value' style={{display:'flex',gap:'10px'}}> : {employee?.assignedRole} {employee?.defaultFunctionalityAccessUpdated  && <img src={thunder} />}</p>
                    </div>
                    <div className='title'><p className='tag'>Assigned Outlet</p><p className='value'> : {fomatLocation(employee?.locationName)}</p></div>
                    <div className='title'><p className='tag'>User ID</p><p className='value'> : {employee?.userId}</p></div>                   
                    <div className='title'><p className='tag'>Date of Birth</p><p className='value'> : {formatDate(employee?.dateOfBirth) ? formatDate(employee?.dateOfBirth) : '-'}</p></div>
                </div>
                <div>
                    <div className='title'><p className='tag'>Nick Name</p><p className='value'> : {employee?.nickName?.trim() ? employee?.nickName?.trim() : '-'}</p></div>
                    <div className='title'><p className='tag'>Email</p><p className='value' style={{width:'300px'}}> : {employee?.email?.trim() ? employee?.email?.trim() : '-'}</p></div>
                    <div className='title'><p className='tag'>Phone</p><p className='value'> : {employee?.phone?.trim() ? employee?.phone?.trim() : '-'}</p></div>
                    <div className='title'><p className='tag'>Address</p><p className='value'> : {employee?.address && !isEmptyOrSpaces(employee.address) ? employee.address : '-'}</p></div>
                    <div className='title'><p className='tag'>Education</p><p className='value'> : {employee?.education ? employee?.education : '-'}</p></div>
                </div>
            </div>
            <div className='rolesContainer'>
                <h4>Roles and Functions</h4>
                {employee?.isActive ? <div className='roles'>
                    {rolesAndFunctions?.map((role, roleIndex) => (
                        <div className='rolesHeading' key={roleIndex}> 
                            <h4>{role?.module}</h4>
                            {role.funtions.map((func, funcIndex) => (
                                <p key={funcIndex}>{func}</p>
                            ))}
                        </div>
                    ))}
                </div> : 
                <p style={{color:'gray'}}>Unblock the user to view the Roles and Functions</p>
                }
            </div>
            <div style={{
                marginTop:'20px',
                display:'flex',
                position:'sticky',
                bottom:'0px',
            }}>
                <button 
                    className='backBtn' 
                    onClick={() => history.push("/management/employees")}>
                        Back
                </button>
            </div>
        </div>
    )
}

export default EmployeeDetails
