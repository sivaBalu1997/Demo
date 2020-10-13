import React, { useState, useCallback, useRef, useEffect } from "react";
import "../../styles/menu.scss";
import { NavLink, Link, Route, Switch, useHistory, useLocation } from "react-router-dom";
import magilhub from "../../assets/images/magilhub.png";
// import MenuItems from "../menuItems";

//SVG
import { ReactComponent as Dollar } from "../../assets/svg/dollar.svg";
import { ReactComponent as EmployeesIcon } from "../../assets/svg/employees.svg";
import { ReactComponent as Key } from "../../assets/svg/key.svg";
import { ReactComponent as Stats } from "../../assets/svg/statistics.svg";
import { ReactComponent as Tableware } from "../../assets/svg/tableware.svg";
import { ReactComponent as Uparrow } from "../../assets/svg/up_arrow.svg";
import { ReactComponent as Downarrow } from "../../assets/svg/down_arrow.svg";
import Report from "../report";
import Employees from "../employees";
import AddEmployee from "../employees/AddEmployee";
//import { useSelector } from "react-redux";

const Menu = () => {

  const reportOptions = [{
    title: "Today's report",
    id: "1",
    route: "report/1"
  },
  {
    title: "Daily report",
    id: "2",
    route: "report/2"
  }];

  const menuOptions = [];

  const history = useHistory();
  const location = useLocation();

  const [showOptions, setShowOptions] = useState("");
  const [routeTo, setRouteTo] = useState({});
  // const signedIn = useSelector((state) => state.auth.signedIn);

  // useEffect(() => {
  //   if (!signedIn) {
  //     localStorage.clear();
  //     history.replace("/");
  //   }
  // }, [signedIn]);

  return (
    <>
      <div className="menu is-sticky">
        <img src={magilhub} className="magilhub"/>
        <ul>
          {/* <NavLink to="/business" activeClassName="active">
          <li />
          <Dollar className="menu-items-SVG" />
            Business{" "}
        </NavLink> */}
          <div className={location.pathname === "/management/employees" ? "active" : ""} onClick={() => {
            history.push("/management/employees");
          }}>
            <li style={{ marginBottom: 0 }} />
            <EmployeesIcon className="menu-items-SVG" />
            Employees
        </div>
          {/* <NavLink to="/roles" activeClassName="active">
          <li />
          <Key className="menu-items-SVG" />
            Roles & Access
        </NavLink> */}
          {/* <div
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
        </div> */}
          {/* <ul>
          {showOptions === "menuOptions" ?
            menuOptions.map((option) => (
              <NavLink to={option} activeClassName="active" key={option}>
                <li>
                  {option}
                </li>
              </NavLink>
            ))
            : null}
        </ul> */}
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
                <li key={option.title} className={location.pathname === `/management/${option.route}` ? "active" : ""} onClick={() => {
                  history.push(`/management/${option.route}`);
                }}>
                  {option.title}
                </li>
              ))
              : null}
          </ul>
        </ul>
      </div>
      <Switch>
        <Route exact path="/management/employees" component={Employees} />
        <Route exact path="/management/report/1" component={() => <Report id={"1"} title={"Today's report"} />} />
        <Route exact path="/management/report/2" component={() => <Report id={"2"} title={"Daily report"} />} />
        <Route exact path="/management/employees/add" component={() => <AddEmployee />} />
      </Switch>
    </>
  );
};

export default Menu;
