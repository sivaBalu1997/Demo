import React, { useState, useEffect, Fragment } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Search from "../common/Search";
import CustomDropdown from "../common/customDropdown";
import Add from "../../assets/images/add.png";
import logout from "../../assets/images/logout.png";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signOut } from "../../redux/actions/authActions";

const EmployeeList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutUser = () => {
    localStorage.clear();
    dispatch(signOut());
    history.replace("/");
  };

  return (
    <Fragment>
      <div
        style={{
          position: "absolute",
          right: "90px",
          bottom: "90px",
          backgroundColor: "#67833E",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={() => {
          console.log(props);
          props.setAddEmployee(true);
        }}
      >
        <img src={Add} height={25} width={25} alt="Add" />
      </div>

      <div className="menu-items">
        <div className="header-menu">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h2>Employees</h2>
            {/* <Search /> */}
            <p
              onClick={logoutUser}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {" "}
              <img src={logout} alt="Logout" height="20" /> &nbsp; Logout
            </p>
          </div>
        </div>
        <div className="drop-list">
          {/* <CustomDropdown
          placeholder="All"
          options={options}
          value={value}
          onSelect={onChange}
        /> */}
        </div>
        {props.employeeList ? (
          <div className="menu-list">
            <table width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Outlet </th>
                  <th>Contact</th>
                  <th>User ID</th>
                  <th></th>
                </tr>
              </thead>
              {props.employeeList.map((row) => {
                return (
                  <EmployeeRow
                    key={row.id}
                    name={row.name}
                    outlet={row.locationName}
                    contact={row.mobileNumber}
                    userId={row.userId}
                  />
                );
              })}
            </table>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

const EmployeeRow = ({ name, role, outlet, contact, userId }) => {
  const [show, setShow] = useState(false);
  return (
    <tr>
      <td>{name}</td>
      <td>{outlet}</td>
      <td> {contact}</td>
      <td>{userId.split("@")[0]}</td>
      {/* <td>
        <BiDotsVerticalRounded onClick={() => setShow(!show)} />
        {show ? (
          <ul>
            <li>Edit</li>
            <li>Delete</li>
          </ul>
        ) : null}
      </td> */}
    </tr>
  );
};

export default EmployeeList;
