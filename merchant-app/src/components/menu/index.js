import React, { useState, useCallback } from "react";
import "../../styles/menu.scss";
import { NavLink } from "react-router-dom";
import magilhub from "../../assets/images/magilhub.png";
// import MenuItems from "../menuItems";

//SVG
import { ReactComponent as Dollar } from "../../assets/svg/dollar.svg";
import { ReactComponent as Employees } from "../../assets/svg/employees.svg";
import { ReactComponent as Key } from "../../assets/svg/key.svg";
import { ReactComponent as Stats } from "../../assets/svg/statistics.svg";
import { ReactComponent as Tableware } from "../../assets/svg/tableware.svg";
import { ReactComponent as Uparrow } from "../../assets/svg/up_arrow.svg";
import { ReactComponent as Downarrow } from "../../assets/svg/down_arrow.svg";

const Menu = () => {
  const reportOptions = [{
    title: "Daily report",
    route: "/report"
  },
  {
    title: "Profit report",
    route: "/notFound"
  },
  {
    title: "Order report",
    route: "/notFound"
  },
  {
    title: "Employee report",
    route: "/notFound"
  }];

  const menuOptions = [];

  const [showOptions, setShowOptions] = useState("");

  return (
    <div className="menu is-sticky">
      <img src={magilhub} />
      <ul>
        <NavLink to="/business" activeClassName="active">
          <li />
          <Dollar className="menu-items-SVG" />
            Business{" "}
        </NavLink>
        <NavLink to="/employees" activeClassName="active">
          <li />
          <Employees className="menu-items-SVG" />
            Employees
        </NavLink>
        <NavLink to="/roles" activeClassName="active">
          <li />
          <Key className="menu-items-SVG" />
            Roles & Access
        </NavLink>
        <div
          className={
            showOptions === "MenuOptions" ? "active drop-down" : "drop-down"}
          onClick={() =>
            showOptions !== "MenuOptions" ?
              setShowOptions("MenuOptions") : setShowOptions("")}>
          <div>
            <Tableware className="menu-items-SVG" />
            Menu
          </div>
          {showOptions === "MenuOptions" ?
            <Uparrow className="dropdown-arrow" /> :
            <Downarrow className="dropdown-arrow" />
          }
        </div>
        <ul>
          {showOptions === "menuOptions" ?
            menuOptions.map((option) => (
              <NavLink to={option} activeClassName="active" key={option}>
                <li>
                  {option}
                </li>
              </NavLink>
            ))
            : null}
        </ul>
        {/* <li style={{ marginBottom: "30px" }}>Drafts</li> */}
        <div
          className={
            showOptions === "reportOptions" ? "active drop-down" : "drop-down"}
          onClick={() =>
            showOptions !== "reportOptions" ?
              setShowOptions("reportOptions") : setShowOptions("")}>
          <div>
            <Stats className="menu-items-SVG" />
            Reports & Insights
          </div>
          {showOptions === "reportOptions" ?
            <Uparrow className="dropdown-arrow" /> :
            <Downarrow className="dropdown-arrow" />
          }
        </div>
        <ul>
          {showOptions === "reportOptions" ?
            reportOptions.map((option) => (
              <NavLink to={option.route} activeClassName="active" key={option.title}>
                <li>
                  {option.title}
                </li>
              </NavLink>
            ))
            : null}
        </ul>
      </ul>
    </div>
  );
};

export default Menu;
