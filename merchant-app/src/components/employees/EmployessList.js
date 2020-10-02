import React, { useState, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Search from "../common/Search";
import CustomDropdown from "../common/customDropdown";


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

  const onChange = (option) => {
    setValue(option);
  };
  return (
    <div className="menu-items">
      <div className="header-menu">
        <h2>Employees</h2>
        <Search />
      </div>
      <div className="drop-list">
        <CustomDropdown
          placeholder="All"
          options={options}
          value={value}
          onSelect={onChange}
        />
      </div>
      {props.employeeList ? 
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
        </div>: null}
    </div>
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
