import "./styles.css";
import "./employee.css";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { SELECTED_BRANCH_DATA } from "../../shared/constants";
import { signOut } from "../../redux/actions/authActions";
import { clearManageUserAccess,  setEditEmployeeData, clearEditEmployeeData,  deleteEmployee, employeeStatusRequest, } from "../../redux/actions/employeeActions";
import { clearMenuData } from "../../redux/actions/menuAction";
import editImg from '../../assets/svg/edit.svg'
import trashImg from '../../assets/svg/trash.svg'
import blockImg from '../../assets/svg/blockImg.svg'
import previewImg from '../../assets/svg/preview.svg'
import unBlockImg from '../../assets/svg/unBlockImg.svg'
import activeIcon from '../../assets/svg/activeIcon.svg'
import blockIcon from '../../assets/svg/yblockIcon.svg'
import thunder from '../../assets/svg/thunder.svg'
import noResultsfound from "../../assets/images/NoResultsFound.png"
import {selectBranch,} from "../../redux/actions/authActions";
import Modal from "../Modal/Modal";
import { showErrorToast, showInfoToast } from "../../util/toastUtils";
import deleteIcon from '../../assets/svg/trash2.svg'
import bUIcon from '../../assets/svg/x-octagon.svg'

const EmployeeList = (props) => {
  const {loading,employeeListData} = props;
  const dispatch = useDispatch()

  const [searchedData, setSearchedData] = useState([])

  const employeeList = employeeListData;// useSelector((state) => state.employee.employeeDetails);

  const restaurantDetails = useSelector(
    (state) => state.auth.restaurantDetails
  )

  useEffect(() => {
    dispatch(clearEditEmployeeData())
  }, [])

  return (
    <>
      <div>
        
        {loading ? <div className="employeeLoading">
          <span className="employeeLoadingText">Loading, Please wait!!</span>
        </div> :
        employeeList ? (
          <div className=" employeeListTableContainer">
              <table className="employeeListTable">
                <thead className="employeeTableHead">
                  <tr className="employeeTableRow">
                    <th className="employeeTHeading eTWTxt">Name</th>
                    <th className="employeeTHeading eTWTxt">Role</th>
                    <th className="employeeTHeading eTWTxt">Status</th>
                    <th className="employeeTHeading eTWBtn">Edit</th>
                    <th className="employeeTHeading eTWBtn">Un/Block</th>
                    <th className="employeeTHeading eTWBtn">Delete</th>
                    <th className="employeeTHeading eTWBtn"></th>
                  </tr>
                </thead>
            <tbody className="tBody">
             {employeeList.length == 0 && !loading ?
              (
                  <td colSpan="8" >
                    <div className="no-results">
                      <img src={noResultsfound} alt="No results found" />
                      <h2>No Results Found</h2>
                    </div>
                  </td>
                  ) : (
                employeeList?.map((row, index) => {
                 const lastName = row.lastName ? row.lastName : "";
                    return (
                      <EmployeeRow
                        key={row.id}
                        name={row.firstName + " " + lastName}
                        role={row.role}
                        status={row.isActive}
                        data={row}
                      />
                  );
                })
              )}    
              </tbody>
              </table>
          </div>
        ) : null}
      </div>
    </>
  )
}

const EmployeeRow = ({
  key,
  name,
  role,
  data,
  status
}) => {
  const dispatch = useDispatch()
  const ref = useRef()
  const credentials = useSelector((state) => state.auth.credentials)
  const history = useHistory()
  const [show, setShow] = useState(false)
  const [editTriggered, setEditTriggered] = useState(false);
  const [openEditModal, setEditOpenModal] = useState(false);
  const [openDeleteModal, setDeleteOpenModal] = useState(false);
  const [employeeToUpdate, setEmployeeToUpdate] = useState(null);
  const [isBlocking, setIsBlocking] = useState(true);
  const [statusUpdateCompleted, setStatusUpdateCompleted] = useState(false);
  const [employeeDeleteCompleted, setEmployeeDeleteCompleted] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [show])

  const employee = useSelector((state) => state.employee.employeeByIdDetails)
  const employeeStatusLoading = useSelector((state) => state.employee.employeeStatusLoading);

  const handleEdit = (staffId) => {
    // dispatch(getEmployeeByIdRequest(staffId));
    history.push("/management/employees/add/"+staffId)
    // setEditTriggered(true);
  }

  useEffect(() => {
    if (editTriggered && employee && employee.staffId === data.staffId) {
      dispatch(setEditEmployeeData(employee))
      history.push("/management/employees/add")
      setEditTriggered(false);
    }
  }, [employee, editTriggered, data.staffId])

  const handleBlockClick = (employee, block) => {
    setEmployeeToUpdate(employee);
    setIsBlocking(block);
    setEditOpenModal(true);
  };

  const handleYesClick = () => {
    dispatch(employeeStatusRequest(employeeToUpdate.staffId, isBlocking));
    setStatusUpdateCompleted(true);
    setEmployeeToUpdate(null);
  };

  const employeeDeleted = useSelector((state) => state.employee.employeeDeleted)
  const deleteEmployeeLoading = useSelector((state) => state.employee.deleteEmployeeLoading)

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteOpenModal(true);
  }

  const handleEmpDelete = () => {
    dispatch(deleteEmployee(employeeToDelete.staffId));
    setEmployeeDeleteCompleted(true);
   
    setEmployeeToDelete(null);
  }

  const modelApiLoading  = useSelector((state) => state.employee.modelApiLoading)
  const actionApiSuccess  = useSelector((state) => state.employee.actionApiSuccess)

  useEffect(() => {
    // console.log({modelApiLoading, actionApiSuccess});
    if (actionApiSuccess && !modelApiLoading) {
      setDeleteOpenModal(false);
      setEditOpenModal(false);
    }
  }, [modelApiLoading, actionApiSuccess])

  return (
    <>
      <tr onClick={() => {history.push("/management/employees/details/" + data.staffId)}} >
        <td>
          <div  className="employeeValueData">{name}</div>
        </td>

        <td>
            <div className="employeeValueData">{role}&nbsp;&nbsp;{data.defaultFunctionalityAccessUpdated && <img src={thunder} />}</div>
        </td>

        <td>
          <div className="employeeValueData2" style={{color: !data.isActive ?"#FFA800" :"#67833E"}}>
            <img className="statusImg" src={ !data.isActive ? blockIcon :activeIcon} alt="" />
             <div>{!data.isActive ? "Blocked":"Active"}</div>
             </div> 
        </td>

        <td ref={ref} >
          {/* <div className="employeeValueDataAction"> */}

            <div className="img-align" onClick={(e) => { 
               e.stopPropagation(); 
                if(data.isActive){
                  handleEdit(data.staffId)
                }else{
                  showErrorToast('Unblock the employee to perform this action')
                }
               }}>
              <img src={editImg} className="actions" />
            </div>
            </td>

            <td>
            <div className="img-align" onClick={(e) => { e.stopPropagation(); handleBlockClick(data, data.isActive)}}>
              <img src={!data.isActive ? unBlockImg : blockImg} className="actions" />
            </div>
            </td>

          <td>
            <div className="img-align" onClick={(e) => { e.stopPropagation(); handleDeleteClick(data); }}>
              <img src={trashImg} className="actions" />
            </div>
            </td>

          <td>
            <div className="img-align" onClick={(e) => { e.stopPropagation(); history.push("/management/employees/details/" + data.staffId)}} >
              <img src={previewImg} className="actions" />
            </div>
         
          {/* </div> */}
        </td>
      </tr>

      <Modal
        isOpen={openDeleteModal}
        message={credentials?.id == data.staffId ? `You're not allowed to perform this action` : 
          <div>
            <p>Are you sure you want to delete this user?</p>
            <p>This action is irreversible, and all data will be permanently removed.</p>
        </div>
        }
        onConfirm={handleEmpDelete}
        onCancel={() => setDeleteOpenModal(false)}
        type={credentials?.id == data.staffId ? "alert" : "confirmation"}
        isLoading={modelApiLoading}
        logo={deleteIcon}
        propType={'deleteEmp'}
      />

      <Modal
        isOpen={openEditModal}
        message={credentials?.id == data.staffId ? `You're not allowed to perform this action`:data.isActive ?  
          <div>
            <p>Are you sure you want to block this user?</p>
            <p>This action will restrict their access until unblocked.</p>
          </div> : 
          'Are you sure you want to unblock this user?'
        }
        onConfirm={handleYesClick}
        onCancel={() => {setEditOpenModal(false)}}
        type={credentials?.id == data.staffId ? "alert" : "confirmation"}
        isLoading={modelApiLoading}
        logo={data.isActive ? bUIcon : activeIcon}
        propType={data.isActive ? "Block"  :'Unblock'}
      />
    </>
  )
}


export default React.memo(EmployeeList);  

