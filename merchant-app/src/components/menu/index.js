import React from "react";
import "../../styles/menu.scss";
import { NavLink } from "react-router-dom";
// import MenuItems from "../menuItems";

const Menu = () => {
  return (
    <div className="menu is-sticky">
      <h2>Setup</h2>
      <ul>
        <li>
          <NavLink to="/business" activeClassName="active">
            Bussiness{" "}
          </NavLink>
        </li>
        <NavLink to="/employees" activeClassName="active">
          <li>Employees</li>
        </NavLink>
        <NavLink to="/roles" activeClassName="active">
          <li>Roles & Access</li>
        </NavLink>
        <li style={{ marginBottom: "30px" }}>Menu</li>
        <li>Drafts</li>
      </ul>
    </div>
  );
};

export default Menu;
