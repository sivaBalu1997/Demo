import "./styles.css";
import React, { useState, useEffect, Fragment, useRef } from "react";
import logout from "../../assets/images/logout.png";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { SELECTED_BRANCH_DATA } from "../../shared/constants";
import { signOut } from "../../redux/actions/authActions";
import { ReactComponent as Employees } from "../../assets/svg/employees.svg";
import {
  manageUserAccess,
  getEmployees,
  clearManageUserAccess,
  setEditEmployeeData,
  clearEditEmployeeData,
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
import {
  getRestaurantRequest,
  selectBranch,
} from "../../redux/actions/authActions";
import { employeeData } from "./data";


const EmployeeList = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const credentials = useSelector((state) => state.auth.credentials)
  const [employeeListData, setEmployeeListdata] = useState(employeeData)
  const [searchInput, setSearchInput] = useState()

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
  // const manage = useSelector((state) => console.log(state.employee, "State"));
  // useEffect(() => {
  //   if (manageAccessLoading) {
  //     console.log("Inside IFfff::::::");
  //     dispatch(getEmployees(credentials?.id));
  //   }
  // }, [manageAccessSuccess, manageAccessLoading]);

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
      );
    }
  }, [restaurantDetails]);

  useEffect(() => {
    if (manageAccessMessage) {
      alert(manageAccessMessage); // replace with proper UX experience
      dispatch(clearManageUserAccess());
    }
  }, [manageAccessSuccess])

  const handleSearch = () => {
    const filteredData = employeeData.filter(item => (
      item.firstName.toLowerCase().includes(searchInput.toLowerCase()) || 
      item.role.toLowerCase().includes(searchInput.toLowerCase())
    ))
    setEmployeeListdata(filteredData)
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleSearch()
    }
  }

  useEffect(()=>{
    if(searchInput === ''){
      setEmployeeListdata(employeeData)
    }
  },[searchInput])

  console.log(props.employeeList)

  return (
    <>
      <div className="menu-items">
      {/* <div className="header">
          <p
            onClick={logoutUser}
            style={{
              marginLeft: "88%",
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
          >
            <img src={logout} alt="Logout" height="20" />
            &nbsp; Log Out
          </p>
        </div> */}
        <div className="header-menu">
          <div>
            <Employees
              className="menu-items-SVG"
              style={{
                marginBottom: 5,
              }}
            />
            <h2>Employees Management</h2>
            <br />
            <br />
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
            />
            <img src={searchImg} alt="" 
              onClick={handleSearch}
            />
          </div>
          <input type="submit" value='Add New' className="addBtn"  
            onClick={() => {
              history.push("/management/employees/add")
            }}/>
        </div>
        {/* employeeListData */}
        { props.employeeList ? (
          <div
            className="menu-list"
            style={{
              paddingBottom: "3%",
            }}
          >
            <table className="employeeTable" width="100%" >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody style={{}}>
                {/* employeeListData  */}
                {props.employeeList.map((row, index) => {
                  return (
                    <EmployeeRow
                      key={row.id}
                      name={row.firstName}
                      role={row.role}
                      status = {row.isBlocked}
                      data={row}
                      // key={row.id}
                      // serialNumber={index + 1}
                      // name={row.name}                      
                      // role={row.role}
                      // status = {row.status}
                      // outlet={String(row.locationName).split(",")[1]}
                      // contact={row.mobileNumber}
                      // data={row}
                    />
                  )
                })}
              </tbody>
            </table>
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

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [show])

  const getOpacity = (data) => {
    if (!data) return 0.5
    else return 1
  }
  
  return (
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
          justifyContent: "center",
        }}
      >
        <div>{name}</div>
      </td>
      <td >
        <div className="rolesBox" >
          <p>{role}</p>
          {data.isDefaultActionsUpdated && <img src={thunder} />}
        </div>
      </td>
      <td className="statusBox">
        {data.isBlocked ? 
          <>
            <img className="statusImg" src={blockIcon} alt="" /> 
            <p>Blocked</p>
          </>
          : 
          <>
            <img className="statusImg" src={activeIcon} alt="" />
            <p>Active</p>
          </>
        }
      </td>
      <td ref={ref}>
        {/* <BiDotsVerticalRounded onClick={() => setShow(!show)} /> */}
          <ul className="popupContainer">
          <li
              className="containerList"
              onClick={() => {
                dispatch(setEditEmployeeData(data))
                history.push("/management/employees/add")
              }}
            >
                <img src={editImg} className="actions"/> 
            </li>
            <li
              className="containerList"
              onClick={() => {
                let requestBody = {
                  id: data.id,
                  blockUser: data.isEnabled,
                };
                dispatch(manageUserAccess(requestBody))

                setTimeout(() => {
                  dispatch(getEmployees(credentials?.id))
                }, 1000)
                //    dispatch(getEmployees(credentials?.merchantId));
              }}
            >
              {data.isBlocked ? (
                <img src={ unBlockImg} className="actions"/> 
              ) : (
                <img src={ blockImg } className="actions"/> 
              )}
            </li>
            
            <li
              className="containerList"
              onClick={() => {
                console.log("Delete Clicked :::", data);
                // dispatch(
                //   deleteEmployee({
                //     businessName: businessName,
                //     userId: data.id,
                //   })
                // );
              }}
            >
              <img src={trashImg} className="actions"/>
            </li>
          </ul>
      </td>
      
      <td>
        <img src={previewImg} className="previewActions" 
          onClick={() => {
            // console.log("From preview data",data)
            // dispatch(getEmployeeById(data))
            history.push("/management/employees/details")
          }}
        />
      </td>
    </tr>
  )
}

export default EmployeeList;
