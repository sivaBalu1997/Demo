import React, { useState } from "react";
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

const EmployeeList = () => {
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

      <div className="menu-list">
        <table width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role </th>
              <th>Outlet </th>
              <th>Contact</th>
              <th>User ID</th>
              <th></th>
            </tr>
          </thead>
          {rows.map((row) => {
            return (
              <EmployeeRow
                key={row.id}
                name={row.name}
                role={row.role}
                outlet={row.outlet}
                contact={row.contact}
                userId={row.userId}
              />
            );
          })}
        </table>
      </div>
    </div>
  );
};

const EmployeeRow = ({ name, role, outlet, contact, userId }) => {
  const [show, setShow] = useState(false);
  return (
    <tr>
      <td>{name}</td>
      <td>{role}</td>
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
