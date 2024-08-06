import "./styles.css";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import logout from "../../assets/images/logout.png";
import { useHistory } from "react-router";
import { SELECTED_BRANCH_DATA } from "../../shared/constants";
import { signOut } from "../../redux/actions/authActions";
import { ReactComponent as Employees } from "../../assets/svg/employees.svg";
import {
  getEmployees,
  clearManageUserAccess,
  setEditEmployeeData,
  clearEditEmployeeData,
  getEmployeeByIdRequest,
  deleteEmployee,
  employeeStatusRequest,
} from "../../redux/actions/employeeActions";
import { clearMenuData } from "../../redux/actions/menuAction";
import editImg from '../../assets/svg/edit.svg'
import trashImg from '../../assets/svg/trash.svg'
import blockImg from '../../assets/svg/blockImg.svg'
import previewImg from '../../assets/svg/preview.svg'
import searchImg from '../../assets/svg/searchImg.svg'
import unBlockImg from '../../assets/svg/unBlockImg.svg'
import activeIcon from '../../assets/svg/activeIcon.svg'
import blockIcon from '../../assets/svg/yblockIcon.svg'
import thunder from '../../assets/svg/thunder.svg'
import close from '../../assets/images/close.png'
import noResultsfound from "../../assets/images/NoResultsFound.png"
import {
  selectBranch,
} from "../../redux/actions/authActions";
import Modal from "../Modal/Modal";

const EmployeeList = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const credentials = useSelector((state) => state.auth.credentials)
  // console.log({credentials});
  const [searchedData, setSearchedData] = useState([])
  const [searchInput, setSearchInput] = useState('')

  const employeeList = useSelector((state) => state.employee.employeeDetails);
  const [employeeListData, setEmployeeListdata] = useState(employeeList)

  const logoutUser = () => {
    dispatch(clearMenuData())
    localStorage.clear()
    dispatch(signOut())
    history.replace("/")
  }
  const manageAccessMessage = useSelector(
    (state) => state.employee.manageAccessMessage
  )
  const manageAccessSuccess = useSelector(
    (state) => state.employee.manageAccessSuccess
  )
  const manageAccessLoading = useSelector(
    (state) => state.employee.manageAccessLoading
  )
  const restaurantDetails = useSelector(
    (state) => state.auth.restaurantDetails
  )

  useEffect(() => {
    dispatch(clearEditEmployeeData())
  }, [])

  useEffect(() => {
    if (
      restaurantDetails &&
      restaurantDetails.branch &&
      restaurantDetails.branch.length > 0
    ) {
      dispatch(selectBranch(restaurantDetails.branch[0]));
      localStorage.setItem(
        SELECTED_BRANCH_DATA,
        JSON.stringify(restaurantDetails.branch[0])
      )
    }
  }, [restaurantDetails]);

  useEffect(() => {
    if (manageAccessMessage) {
      alert(manageAccessMessage); // replace with proper UX experience
      dispatch(clearManageUserAccess());
    }
  }, [manageAccessSuccess])


  useEffect(() => {
    if (searchInput === '') {
      setSearchedData(employeeList);
    } else {
      const filteredData = employeeList.filter(item => (
        item.firstName.toLowerCase().includes(searchInput.toLowerCase()) || 
        item.role.toLowerCase().includes(searchInput.toLowerCase())
      ));
      setSearchedData(filteredData);
    }
  }, [searchInput, employeeList]);

  const handleSearch = () => {
    if (searchInput !== '') {
      const filteredData = employeeList.filter(item => (
        item.firstName.toLowerCase().includes(searchInput.toLowerCase()) || 
        item.role.toLowerCase().includes(searchInput.toLowerCase())
      ));
      setSearchedData(filteredData);
    } else {
      setSearchedData(employeeList);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
    if(!/^[A-Za-z]*$/.test(event.key)){
      event.preventDefault();
    }
  };

  const handleCloseSearch = () => {
    setSearchInput('')
  }

  const handlekeydown = (event) => {
    if(event.key === ' '){
      event.preventDefault()
    }
  }

  return (
    <>
      <div className="menu-items employee-pad">
        <div className="header-menu">
          <div style={{
            display:"flex",
            justifyContent:'space-between',
            width:'100%'
          }}>
            {/* <Employees
              className="menu-items-SVG"
              style={{
                marginBottom: 5,
              }}
            /> */}
            <h2 style={{color:"black"}}>Employees Management</h2>

            <div className="header">
          <p
            onClick={logoutUser}
            style={{
              marginLeft: "88%",
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              cursor: "pointer",
              // marginTop:"-30px",
            }}
          >
            <img src={logout} alt="Logout" height="20" />
            &nbsp; Log Out
          </p>
          <br />
          <br />
        </div>
          </div>
        </div>
        <div className="searchContainer">
          <div className="searchBox">
            <input 
              type="text"  
              className="searchBar" 
              placeholder="Search"
              value={searchInput}  
              onChange={(e)=>setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              onKeyDown={handlekeydown}
            />
            {!searchInput ? 
              <img src={searchImg} alt="" onClick={handleSearch} style={{width:"25px", height:"25px", marginTop:"6px", marginRight:"5px"}} /> :
              <img src={close} alt="" onClick={handleCloseSearch} style={{width:"20px", height:"20px", marginTop:"10px", marginRight:"5px"}} />
            } 
          </div>
          <input type="submit" value='Add New' className="addBtn"  
            onClick={() => {
              dispatch(clearEditEmployeeData())
              history.push("/management/employees/add")
            }}/>
        </div>
        {employeeList ? (
          <div
            className="menu-list"
            style={{
              paddingBottom: "3%",
            }}
          >
            <div className="tableContainer">
              <table className="employeeTable">
                <thead className="employeeTableHead">
                  <tr className="employeeTableRow">
                    <th className="tHeading">Name</th>
                    <th className="tHeading">Role</th>
                    <th className="tHeading">Status</th>
                    <th className="tHeading">Actions</th>
                    <th className=""></th>
                  </tr>
                </thead>
            <tbody className="tBody">
             {searchInput?.length > 0 && searchedData?.length === 0 ? (
                <td colSpan="4" >
                  <div className="no-results">
                    <img src={noResultsfound} alt="No results found" />
                    <h2>No Results Found</h2>
                  </div>
                </td>
                ) : (
                (searchInput?.length === 0 ? employeeList : searchedData)?.map((row, index) => {
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
          </div>
        ) : null}
      </div>
    </>
  )
}

const EmployeeRow = ({
  serialNumber,
  name,
  role,
  outlet,
  contact,
  userId,
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
      <tr
        onClick={() => {
          if (show) {
            setShow(!show)
          }
        }}
      >
        <td
          style={{
            display: "flex",
            justifyContent: "start",
            width:'200px'
          }}
        >
          <div>{name}</div>
        </td>
        <td >
          <div className="rolesBox" >
            <p>{role}</p>
            {data.defaultFunctionalityAccessUpdated && <img src={thunder} />}
          </div>
        </td>
        <td className="statusBox">
          {!data.isActive ?
            <>
              <img className="statusImg" src={blockIcon} alt="" />
              <p style={{color:'#FFA800'}}>Blocked</p>
            </>
            :
            <>
              <img className="statusImg" src={activeIcon} alt="" />
              <p style={{color:'#67833E'}}>Active</p>
            </>
          }
        </td>

        <td ref={ref}>
          <ul className="popupContainer">
            <li
              className="containerList"
              onClick={() => { handleEdit(data.staffId) }}
            >
              <img src={editImg} className="actions" />
            </li>
            <li
              className="containerList"
              onClick={() => {
                handleBlockClick(data, data.isActive)
              }}
            >
              {!data.isActive ? (
                <img src={unBlockImg}
                  className="actions"
                />
              ) : (
                <img src={blockImg}
                  className="actions"
                />
              )}
            </li>

            <li
              className="containerList"
              onClick={() => {
                handleDeleteClick(data);
              }}
            >
              <img src={trashImg} className="actions" />
            </li>
          </ul>
        </td>

        <td>
          <img src={previewImg} className="previewActions"
            onClick={() => {
              let staffId = data.staffId
              // dispatch(getEmployeeByIdRequest(staffId));
              history.push("/management/employees/details/" + data.staffId)
            }}
          />
        </td>
      </tr>

      <Modal
        isOpen={openDeleteModal}
        message={credentials?.id == data.staffId ? 'You`re not allowed to perform this action' :"Do you want to delete?"}
        onConfirm={handleEmpDelete}
        onCancel={() => setDeleteOpenModal(false)}
        type={credentials?.id == data.staffId ? "alert" : "confirmation"}
        isLoading={modelApiLoading}
      />

      <Modal
        isOpen={openEditModal}
        message={credentials?.id == data.staffId ? 'You`re not allowed to perform this action' :data.isActive ? 'Do you want to block?' : 'Do you want to unblock?'}
        onConfirm={handleYesClick}
        onCancel={() => {setEditOpenModal(false)}}
        type={credentials?.id == data.staffId ? "alert" : "confirmation"}
        isLoading={modelApiLoading}
      />

      {/* {openDeleteModal && (
        <div className="modal">
          <div className="modalContainer">
            <p>Do you want to delete?</p>
            <div className="modalBtn">
              <button
                className="yesBtn"
                onClick={handleEmpDelete}
              >Yes</button>
              <button
                className="noBtn"
                onClick={() => setDeleteOpenModal(!openDeleteModal)}
              >No</button>
            </div>
          </div>
        </div>
      )} */}

      {/* {openEditModal && (
        <div className="modal">
          <div className="modalContainer">
            <p>{data.isActive ? 'Do you want to block?' : 'Do you want to unblock?'}</p>
            <div className="modalBtn">
              <button
                className="yesBtn"
                onClick={handleYesClick}
              >Yes</button>
              <button
                className="noBtn"
                onClick={() => setEditOpenModal(false)}
              >No</button>
            </div>
          </div>
        </div>
      )} */}
    </>
  )
}


export default React.memo(EmployeeList);  
