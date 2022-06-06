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

import {
  getRestaurantRequest,
  selectBranch,
} from "../../redux/actions/authActions";
import { ReactComponent as Block } from "../../assets/svg/block.svg";
import { ReactComponent as UnBlock } from "../../assets/svg/unblock.svg";
const EmployeeList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.auth.credentials);
  const logoutUser = () => {
    dispatch(clearMenuData());
    localStorage.clear();
    dispatch(signOut());
    history.replace("/");
  };
  const manageAccessMessage = useSelector(
    (state) => state.employee.manageAccessMessage
  );
  const manageAccessSuccess = useSelector(
    (state) => state.employee.manageAccessSuccess
  );
  const manageAccessLoading = useSelector(
    (state) => state.employee.manageAccessLoading
  );
  const restaurantDetails = useSelector(
    (state) => state.auth.restaurantDetails
  );
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
        <div className="header">
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
        </div>
        <div className="header-menu">
          <div>
            <Employees
              className="menu-items-SVG"
              style={{
                marginBottom: 5,
              }}
            />
            <h2>Employees setup</h2>
            <br />
            <br />
          </div>
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
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Outlet </th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {props.employeeList.map((row, index) => {
                  return (
                    <EmployeeRow
                      key={row.id}
                      serialNumber={index + 1}
                      name={row.name}
                      outlet={String(row.locationName).split(",")[1]}
                      contact={row.mobileNumber}
                      data={row}
                    />
                  );
                })}
              </tbody>
            </table>
            <button
              onClick={() => history.push("/management/employees/add")}
              type={"button"}
              className="add-button"
            >
              <Add height={30} width={30} />
            </button>
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
}) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const credentials = useSelector((state) => state.auth.credentials);
  const history = useHistory();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [show]);

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
      <td style={{ opacity: getOpacity(data.isEnabled) }}>{serialNumber}</td>

      <td
        style={{
          display: "flex",
          justifyContent: "flex-start",
          opacity: getOpacity(data.isEnabled),
        }}
      >
        <div>{name}</div>
        <div>
          {!data.isEnabled ? (
            <UserBlocker style={{ position: "relative", left: 10, top: 2 }} />
          ) : (
            ""
          )}
        </div>
      </td>
      <td style={{ opacity: getOpacity(data.isEnabled) }}>{outlet}</td>
      <td style={{ opacity: getOpacity(data.isEnabled) }}> {contact}</td>
      <td ref={ref}>
        <BiDotsVerticalRounded onClick={() => setShow(!show)} />
        {show ? (
          <ul className="employeePopupContainer">
            <li
              onClick={() => {
                let requestBody = {
                  id: data.id,
                  blockUser: data.isEnabled,
                };
                dispatch(manageUserAccess(requestBody));

                setTimeout(() => {
                  dispatch(getEmployees(credentials?.id));
                }, 1000);
                //    dispatch(getEmployees(credentials?.merchantId));
              }}
            >
              {data.isEnabled ? (
                <Fragment>
                  <div className="popupInnerItem">
                    <Block />
                  </div>
                  <div>&nbsp; &nbsp; Block</div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="popupInnerItem">
                    <UnBlock />
                  </div>
                  &nbsp; <div> &nbsp; &nbsp;Unblock</div>
                </Fragment>
              )}
            </li>
            <li
              onClick={() => {
                dispatch(setEditEmployeeData(data));
                history.push("/management/employees/add");
              }}
            >
              <Fragment>
                <div className="popupInnerItem">
                  <UnBlock />
                </div>
                &nbsp; <div> &nbsp; &nbsp;Edit</div>
              </Fragment>
            </li>
            {/* <li
              onClick={() => {
                console.log("Delete Clicked :::", data);
                dispatch(
                  deleteEmployee({
                    businessName: businessName,
                    userId: data.id,
                  })
                );
              }}
            >
              Delete
            </li> */}
          </ul>
        ) : null}
      </td>
    </tr>
  );
};

export default EmployeeList;
