import "./styles.css";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import logout from "../../assets/images/logout.png";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { SELECTED_BRANCH_DATA } from "../../shared/constants";
import { signOut } from "../../redux/actions/authActions";
import { ReactComponent as Employees } from "../../assets/svg/employees.svg";
import { ReactComponent as Add } from "../../assets/svg/add.svg";
import { ReactComponent as UserBlocker } from "../../assets/svg/userBlocked.svg";
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
import { ReactComponent as Block } from "../../assets/svg/block.svg";
import { ReactComponent as UnBlock } from "../../assets/svg/unblock.svg";
import { employeeData } from "./data";


const EmployeeList = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const credentials = useSelector((state) => state.auth.credentials)
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
    dispatch(clearEditEmployeeData());
  }, []);

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
  }, [manageAccessSuccess]);


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
            <input type="text"  className="searchBar" placeholder="Search"/>
            <img src={searchImg} alt="" />
          </div>
          <input type="submit" value='Add New' className="addBtn"  
            onClick={() => {
              history.push("/management/employees/add")
            }}/>
        </div>
        {props.employeeList ? (
          <div
            className="menu-list"
            style={{
              paddingBottom: "3%",
            }}
          >
            <table width="100%" style={{ height: "50%" }}>
              <thead>
                <tr>
                  {/* <th>S.No</th> */}
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  {/* <th>Outlet </th> */}
                  {/* <th>Contact</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((row, index) => {
                  return (
                    <EmployeeRow
                      key={row.id}
                      serialNumber={index + 1}
                      name={row.name}
                      role={row.role}
                      status = {row.status}
                      outlet={row.outlet}
                      contact={row.contact}
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
  );
};
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
    if (!data) return 0.5;
    else return 1;
  };
  
  return (
    <tr
      onClick={() => {
        if (show) {
          setShow(!show);
        }
      }}
    >
      {/* <td>{serialNumber}</td> */}

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
          {data.extraFunction && <img src={thunder} />}
        </div>
      </td>
      <td className="statusBox">
        {data.isEnabled ? 
          <img className="statusImg" src={activeIcon} alt="" /> 
          : 
          <img className="statusImg" src={blockIcon} alt="" />
        }
        <p>{status}</p>
      </td>
      {/* <td>{outlet}</td> */}
      {/* <td> {contact}</td> */}
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
              {data.isEnabled ? (
                <img src={blockImg} className="actions"/> 
              ) : (
                <img src={unBlockImg} className="actions"/> 
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
          onClick={() => 
            history.push("/management/employees/details")
          }
        />
      </td>
    </tr>
  )
}

export default EmployeeList;
