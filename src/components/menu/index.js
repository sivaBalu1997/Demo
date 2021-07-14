import React, { useState, useCallback, useRef, useEffect } from "react";
import "../../styles/menu.scss";
import {
  NavLink,
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import magilhub from "../../assets/images/magilhub.png";
// import MenuItems from "../menuItems";
import {
  getRestaurantRequest,
  selectBranch,
} from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { STORAGE_BUCKET_URL } from "../../shared/constants";
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
import EmptyMenu from "../menuItem/EmptyMenu";
import AddItems from "../menuItem/AddItem";
//import { useSelector } from "react-redux";

const Menu = () => {
  const reportOptions = [
    {
      title: "Checkin - Today's report",
      id: "1",
      route: "report/1",
    },
    {
      title: "Checkin - Daily report",
      id: "2",
      route: "report/2",
    },
    {
      title: "Order insights",
      id: "4",
      route: "report/4",
    },
    {
      title: "Sales insights",
      id: "7",
      route: "report/12",
    },
    // {
    //   title: "Product insights",
    //   id: "8",
    //   route: "report/8",
    // },
    {
      title: "Sales - Transaction report",
      id: "5",
      route: "report/5",
    },
  ];

const Menu = () => {
  // const menuOptions = ["Items", "Categories"];
  const menuOptions = ["Items"];

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState("");
  const [routeTo, setRouteTo] = useState({});
  const restaurantDetails = useSelector(
    (state) => state.auth.restaurantDetails
  );

  const locationId = useSelector(
    (state) => state.auth.credentials && state.auth.credentials.locationId
  );

  // locationId && console.log(`restaurantDetails`, locationId);

  // console.log(`restaurantDetails :::::`, data);
  // const signedIn = useSelector((state) => state.auth.signedIn);

  const getImageURL = useCallback(
    (type) => {
      if (
        restaurantDetails &&
        restaurantDetails.media &&
        restaurantDetails.media.length > 0
      ) {
        const logoMedia = restaurantDetails.media.filter(
          (media) => media.entityType == type
        )[0];

        return (
          STORAGE_BUCKET_URL +
          logoMedia.mimeType.split("/")[0] +
          "/" +
          logoMedia.id +
          "." +
          logoMedia.mimeType.split("/")[1]
        );
      } else {
        return "";
      }
    },
    [restaurantDetails]
  );

  useEffect(() => {
    if (locationId) {
      dispatch(getRestaurantRequest(locationId));
    }
  }, [locationId]);

  useEffect(() => {
    if (
      restaurantDetails &&
      restaurantDetails.branch &&
      restaurantDetails.branch.length > 0
    ) {
      // console.log("::: Use Effect Called :::");
      dispatch(selectBranch(restaurantDetails.branch[0]));
    }
  }, [restaurantDetails]);

  return (
    <>
      <div className="menu is-sticky">
        <div className="logo-container">
          <div>
            <img src={getImageURL("LOGO")} className="restaurant-logo" />
          </div>
          <div className="restaurant-name-container">
            <span className="restaurant-name">
              {restaurantDetails &&
                restaurantDetails.branchName &&
                restaurantDetails.branchName.split(",")[0]}
            </span>
            <div>
              <select
                className="branch-dropdown"
                onChange={(e) => {
                  // console.log(":: Method Called ::");
                  dispatch(selectBranch(JSON.parse(e.target.value)));
                }}
              >
                {restaurantDetails &&
                  restaurantDetails.branch &&
                  restaurantDetails.branch.map((u, i) => {
                    return (
                      <option value={`${JSON.stringify(u)}`}>
                        {u.locationName.split(",")[1]}
                      </option>
                    );
                  })}
                {/* <option value="Madurai">Madurai </option>
                <option value="K. K. Nagar">K. K. Nagar</option> */}
              </select>
            </div>
          </div>
        </div>

        <ul>
          {/* <NavLink to="/business" activeClassName="active">
          <li />
          <Dollar className="menu-items-SVG" />
            Business{" "}
        </NavLink> */}
          <div
            className={
              location.pathname === "/management/employees" ? "active" : ""
            }
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/management/employees");
            }}
          >
            <li style={{ marginBottom: 0 }} />
            <EmployeesIcon className="menu-items-SVG" />
            Employees
          </div>
          {/* <NavLink to="/roles" activeClassName="active">
          <li />
          <Key className="menu-items-SVG" />
            Roles & Access
        </NavLink> */}
          <div
            className={
              showOptions === "MenuOptions" ? "active drop-down" : "drop-down"
            }
            onClick={() =>
              showOptions !== "MenuOptions"
                ? setShowOptions("MenuOptions")
                : setShowOptions("")
            }
          >
            <div>
              <Tableware className="menu-items-SVG" />
              Menu
            </div>
            {showOptions === "MenuOptions" ? (
              <Uparrow className="dropdown-arrow" />
            ) : (
              <Downarrow className="dropdown-arrow" />
            )}
          </div>
          <ul className="menu-items-list">
            {showOptions === "MenuOptions"
              ? menuOptions.map((option) => (
                  <NavLink
                    to={`/management/menu/${option}`}
                    activeClassName="active"
                    key={option}
                  >
                    <li>
                      <span style={{ marginLeft: "40px" }}>{option}</span>
                    </li>
                  </NavLink>
                ))
              : null}
          </ul>
          {/* <li style={{ marginBottom: "30px" }}>Drafts</li> */}
          <div
            className={
              showOptions === "reportOptions" ? "active drop-down" : "drop-down"
            }
            onClick={() => {
              showOptions !== "reportOptions"
                ? setShowOptions("reportOptions")
                : setShowOptions("");
              history.push(`/management/report/1`);
            }}
            style={{ cursor: "pointer" }}
          >
            <div>
              <Stats className="menu-items-SVG" />
              Reports & Insights
            </div>
            {/* {showOptions === "reportOptions" ? (
              <Uparrow className="dropdown-arrow" />
            ) : (
              <Downarrow className="dropdown-arrow" />
            )} */}
          </div>
          <ul>
            {/* {showOptions === "reportOptions"
              ? reportOptions.map((option) => (
                  <li
                    key={option.title}
                    style={{ cursor: "pointer" }}
                    // className={
                    //   location.pathname === `/management/${option.route}`
                    //     ? "active"
                    //     : ""
                    // }
                    onClick={() => {
                      history.push(`/management/report/1`);
                    }}
                  >
                    {option.title}
                  </li>
                ))
              : null} */}
          </ul>
        </ul>
      </div>
      <Switch>
        <Route exact path="/management/employees" component={Employees} />
        <Route
          exact
          path="/management/report/1"
          component={() => (
            <Report id={"1"} title={"Checkin - Today's report"} />
          )}
        />
        <Route
          exact
          path="/management/report/2"
          component={() => <Report id={"2"} title={"Checkin - Daily report"} />}
        />
        <Route
          exact
          path="/management/report/4"
          component={() => <Report id={"4"} title={"Order insights"} />}
        />
        <Route
          exact
          path="/management/report/5"
          component={() => (
            <Report id={"5"} title={"Sales - Transaction report"} />
          )}
          
        />Product insights
           <Route
          exact
          path="/management/report/12"
          component={() => (
            <Report id={"12"} title={"Sales insights"} />
          )}
          
        // /> <Route
        // exact
        // path="/management/report/8"
        // component={() => (
        //   <Report id={"8"} title={"Product insights"} />
        // )}
        
      />
        <Route
          exact
          path="/management/employees/add"
          component={() => <AddEmployee />}
        />
        <Route
          exact
          path="/management/menu/Items"
          component={() => <EmptyMenu />}
        />
        <Route
          exact
          path="/management/menu/Items/Add"
          component={() => <AddItems />}
        />
      </Switch>
    </>
  );
};

export default Menu;
