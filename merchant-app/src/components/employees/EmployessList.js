import React, { useState, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Search from "../common/Search";
import CustomDropdown from "../common/customDropdown";
import MerchantLogo from "../../assets/images/thalappakatti.png";
import user from "../../assets/images/user_one.png";
import { ReactComponent as Employees } from "../../assets/svg/employees.svg";
import { ReactComponent as Add } from "../../assets/svg/add.svg";
import AddEmployee from "./AddEmployee";

const rows = [
  {
    id: 1,
    name: "Daenaerys Targaryan",
    role: "Owner",
    outlet: "Westeros",
    contact: "999404288",
    userId: "dany256",
  },
  {
    id: 2,
    name: "Daenaerys Targaryan",
    role: "Owner",
    outlet: "Westeros",
    contact: "999404288",
    userId: "dany256",
  },
  {
    id: 3,
    name: "Daenaerys Targaryan",
    role: "Owner",
    outlet: "Westeros",
    contact: "999404288",
    userId: "dany256",
  },
  {
    id: 4,
    name: "Daenaerys Targaryan",
    role: "Owner",
    outlet: "Westeros",
    contact: "999404288",
    userId: "dany256",
  },
  {
    id: 5,
    name: "Daenaerys Targaryan",
    role: "Owner",
    outlet: "Westeros",
    contact: "999404288",
    userId: "dany256",
  },
  {
    id: 6,
    name: "Daenaerys Targaryan",
    role: "Owner",
    outlet: "Westeros",
    contact: "999404288",
    userId: "dany256",
  },
  {
    id: 7,
    name: "Daenaerys Targaryan",
    role: "Owner",
    outlet: "Westeros",
    contact: "999404288",
    userId: "dany256",
  },
  {
    id: 8,
    name: "Daenaerys Targaryan",
    role: "Owner",
    outlet: "Westeros",
    contact: "999404288",
    userId: "dany256",
  },
  {
    id: 9,
    name: "Daenaerys Targaryan",
    role: "Owner",
    outlet: "Westeros",
    contact: "999404288",
    userId: "dany256",
  },
];

const options = ["chef", "restaurant"];

const EmployeeList = (props) => {
  const [value, setValue] = useState("");

  const [addEmployee, setAddEmployee] = useState(false);

  const [headerDetails, setHeaderDetails] = useState({
    merchantName: "Thalapakatti Biriyani",
    merchantAddress: "Aarapalayam",
    merchantLogo: MerchantLogo,
    UserProfileImage: user
  });

  const onChange = (option) => {
    setValue(option);
  };
  return (
    <>
      {!addEmployee ?
        (<div className="menu-items">
          <div className="header">
            <img src={headerDetails.merchantLogo} />
            <div>
              <p>{headerDetails.merchantName}</p>
              <p>{headerDetails.merchantAddress}</p>
            </div>
            <img
              src={headerDetails.UserProfileImage}
              className="user-profile"
              alt="loading" />
          </div>
          <div className="header-menu">
            <div>
              <Employees className="menu-items-SVG"
                style={{
                  marginBottom: 5
                }} />
              <h2>Employees setup</h2>
            </div>
            <Search />
          </div>
          {props.employeeList ?
            <div className="menu-list">
              <table width="100%" style={{ height: '50%' }}>
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
                <button
                  onClick={() => setAddEmployee(true)}
                  type={"button"}
                  className="add-button"
                >
                  <Add />
                </button>
              </table>
            </div> : null}
        </div>) : (
          <AddEmployee setAddEmployee={setAddEmployee} />
        )}
    </>
  );
};

const EmployeeRow = ({ name, role, outlet, contact, userId }) => {
  const [show, setShow] = useState(false);
  return (
    <tr>
      <td>{name}</td>
      <td>{outlet}</td>
      <td> {contact}</td>
      <td>{userId}</td>
      <td>
        <BiDotsVerticalRounded onClick={() => setShow(!show)} />
        {show ? (
          <ul>
            <li>Edit</li>
            <li>Delete</li>
          </ul>
        ) : null}
      </td>
    </tr>
  );
};

export default EmployeeList;
