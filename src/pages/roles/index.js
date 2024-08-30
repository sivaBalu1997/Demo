import React, { useState } from "react";
import "../../styles/role.scss";
import Search from "../../components/common/Search";
import Checkbox from "../../components/common/Checkbox";
import Switchbox from "../../components/common/Switchbox";
import SidePanel from "../SidePanel";

const roleList = [
  {
    id: 1,
    txt: "Owner (01)",
    list: ["Business", "Roles& Access", "Employee", "Menu"],
  },
  {
    id: 2,
    txt: "General Manager (02)",
    list: ["Business", "Roles& Access", "Employee", "Menu"],
  },
  {
    id: 3,
    txt: "Restaurant manager (03)",
    list: ["Business", "Roles& Access", "Employee", "Menu"],
  },
  {
    id: 4,
    txt: "Supervisor (03)",
    list: ["Business", "Roles& Access", "Employee", "Menu"],
  },
  {
    id: 5,
    txt: "Cashier (05)",
    list: ["Business", "Roles& Access", "Employee", "Menu"],
  },
];

const RoleAccess = () => {
  return (
    <>
      <SidePanel />
      <div className="menu-items">
        <div className="header-menu">
          <h2>Roles & Access</h2>
          <Search />
        </div>
        <div className="role_sec">
          <div className="role_header">
            <h3>Role(40)</h3>
            <h3>permission</h3>
          </div>
          {roleList.map((listView) => (
            <RoleList
              key={listView.id}
              id={listView.id}
              txt={listView.txt}
              list={listView.list}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const RoleList = ({ id, txt, list }) => {
  const [expand, setExpand] = useState(false);
  return (
    <div className="role_list">
      <div className="role_view" onClick={() => setExpand(!expand)}>
        <div>
          <Checkbox /> <h6>{txt}</h6>{" "}
        </div>
        <p>Edit</p>
      </div>
      {expand ? (
        <div className="expand_list">
          {list.map((select) => (
            <div>
              <h7>{select}</h7>
              <Switchbox />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default RoleAccess;
