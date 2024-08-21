import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  Fragment,
} from "react";
import "../../styles/menu.scss";
import {
  NavLink,
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import { SELECTED_BRANCH_DATA } from "../../shared/constants";
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
import { ReactComponent as MagilHub } from "../../assets/svg/magilhubText.svg";
import { ReactComponent as Key } from "../../assets/svg/key.svg";
import { ReactComponent as Stats } from "../../assets/svg/statistics.svg";
import { ReactComponent as Tableware } from "../../assets/svg/tableware.svg";
import { ReactComponent as Uparrow } from "../../assets/svg/up_arrow.svg";
import { ReactComponent as Downarrow } from "../../assets/svg/down_arrow.svg";
import { ReactComponent as BillingIcon } from "../../assets/svg/billing.svg";
import { ReactComponent as Payment } from "../../assets/svg/payment.svg";
import { ReactComponent as Offer } from "../../assets/svg/offer.svg";
import Report from "../report";
import AddEmployee from "../employees/AddEmployee";
import EmptyMenu from "../menuItem/EmptyMenu";
import AddItems from "../menuItem/AddItem";
import Billing from "../billing";
import ChangePlan from "../billing/changePlan";
import CancelSubscription from "../billing/cancelSubscription";
import StickWithUs from "../billing/stickWithUs";
import BillingHistory from "../billing/billingHistory";
import Payments from "../payment";
import ReviewMenu from "../reviewMenu";
//import { useSelector } from "react-redux";

import Offerdetails from "../offers/Offerdetails";
import TemplateOffer from "../offers/TemplateOffer";
import AddOffer from "../offers/AddOffer";
import CreateOffer from "../offers/CreateOffer";
import PreviewOffer from "../offers/PreviewOffer";
import EmployeeDetails from "../employees/EmployeeDetails";
import Employees from "../employees";

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
    title: "Sales - Transaction report",
    id: "4",
    route: "report/5",
  },
  {
    title: "Sales - Daily report",
    id: "4",
    route: "report/4",
  },
];

const Menu = () => {
  // const menuOptions = ["Items", "Categories"];
  const credentials = useSelector((state) => state.auth.credentials);
  const selectedBranch = localStorage.getItem(SELECTED_BRANCH_DATA);
  const branch = selectedBranch && selectedBranch !== "undefined" ? JSON.parse(selectedBranch) : null;  
  const menuOptions = ["Items"];
  const offerMenuOptions = ["Offers"];
  // const getRole = () => {
  //   let neighbourhoodDeliveryRole = [
  //     "Operator-neighbourhood",
  //     "Branch Manager-neighbourhood",
  //     "Regional Manager-neighbourhood",
  //     "Owner-neighbourhood",
  //     "Delivery-neighbourhood",
  //   ];
  //   if (
  //     credentials &&
  //     credentials?.accessToken &&
  //     neighbourhoodDeliveryRole.includes(
  //       jwt_decode(credentials?.accessToken).resource_access["merchant-app"]
  //         .roles[0]
  //     )
  //   )
  //     return true;
  // };
  const history = useHistory();

  useEffect(() => {
    if (window.innerWidth <= 575) {
      history.push(`/management/report/32`);
    }
  }, [history]);

  const location = useLocation();
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState("employees");
  const [showOfferOptions, setShowOfferOptions] = useState("");
  const [routeTo, setRouteTo] = useState({});
  const restaurantDetails = useSelector(
    (state) => state.auth.restaurantDetails
  );
  
  const UserRole = useSelector((state) => state.auth.credentials.role);
  const userBranchName = useSelector((state)=>state.auth.restaurantDetails?.branchName); 

  const locationId = useSelector(
    (state) => state.auth.credentials && state.auth.credentials.locationId
  );

  // const employeeList = useSelector((state) => state.employee.employeeDetails);
  // console.log('Hello from menu',employeeList)

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
      

     if (!selectedBranch && restaurantDetails) {
        const resBranch = restaurantDetails?.branch;
        const defaultBranch =  resBranch?.filter(branch => branch?.id === locationId);

        dispatch(selectBranch(defaultBranch[0]));
        localStorage.setItem(SELECTED_BRANCH_DATA,JSON.stringify(defaultBranch[0]));
      } else {
        dispatch(selectBranch(branch));
      }
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
                disabled={
                  location.pathname?.includes('/management/employees/add') || 
                  restaurantDetails?.branch?.length == 1 ||   
                  (UserRole !== "Restaurant_Owner" && UserRole !== "Regional_Employee" && UserRole !== "Magil_Admin")
                }
                onChange={(e) => {
                  dispatch(selectBranch(JSON.parse(e.target.value)));
                  localStorage.setItem(
                    SELECTED_BRANCH_DATA,
                    JSON.stringify(JSON.parse(e.target.value))
                  );
                }}
                value={selectedBranch}
              >
                {restaurantDetails &&
                  restaurantDetails.branch &&
                  restaurantDetails.branch.map((u, i) => {
                    return (
                      <option
                        value={`${JSON.stringify(u)}`}
                        //selected={userBranchName}
                      >
                        {u.locationName.split(",")[1]}
                      </option>
                    );
                  })}
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
              showOptions === "employees" &&
              location.pathname.includes("employees")
                ? "active"
                : ""
            }
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowOptions("employees");
              history.push("/management/employees");
            }}
          >
            <li style={{ marginBottom: 0 }} />
            <EmployeesIcon className="menu-items-SVG" />
            <span className="menu-items-name">Employees</span>
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
            onClick={() => {
              history.push("/management/menu/Items");
              if (showOptions === "MenuOptions") {
                setShowOptions("");
              } else {
                setShowOptions("MenuOptions");
              }
            }}
          >
            { (
              <div>
                {showOptions === "MenuOptions" &&
                !location.pathname.includes("menu") ? (
                  <li style={{ marginBottom: 0 }} />
                ) : null}
                <Tableware className="menu-items-SVG" />
                <span className="menu-items-name">Menu</span>
              </div>
            )}

            { (
              <Fragment>
                {showOptions === "MenuOptions" ? (
                  <Uparrow className="dropdown-arrow" />
                ) : (
                  <Downarrow className="dropdown-arrow" />
                )}{" "}
              </Fragment>
            )}
          </div>
          {/* <ul className="menu-items-list"> */}
          {showOptions === "MenuOptions"
            ? menuOptions.map((option) => (
                <NavLink
                  to={`/management/menu/${option}`}
                  activeClassName="active"
                  key={option}
                >
                  <li style={{ marginTop: "10px" }}>
                    <span style={{ marginLeft: "40px", marginTop: "10px" }}>
                      {option}
                    </span>
                  </li>
                </NavLink>
              ))
            : null}
          {/* </ul> */}
          {/* <li style={{ marginBottom: "30px" }}>Drafts</li> */}

          <div
            className={
              showOfferOptions === "MenuOptions"
                ? "active drop-down"
                : "drop-down"
            }
            onClick={() =>
              showOfferOptions !== "MenuOptions"
                ? setShowOfferOptions("MenuOptions")
                : setShowOfferOptions("")
            }
          >
            <div style={{ cursor: "pointer" }}>
              <Offer className="menu-items-SVG" />
              <span className="menu-items-name">Offer Management</span>
            </div>
            {showOfferOptions === "MenuOptions" ? (
              <Uparrow
                className="dropdown-arrow"
                style={{ marginLeft: "15px" }}
              />
            ) : (
              <Downarrow
                className="dropdown-arrow"
                style={{ marginLeft: "15px" }}
              />
            )}
          </div>
          <ul className="menu-items-list">
            {showOfferOptions === "MenuOptions"
              ? offerMenuOptions.map((option) => (
                  <NavLink
                    to={`/management/${option}`}
                    activeClassName="active"
                    key={option}
                  >
                    <li>
                      <span
                        className="d-inline-block m-t-20"
                        style={{ marginLeft: "40px" }}
                      >
                        {option}
                      </span>
                    </li>
                  </NavLink>
                ))
              : null}
          </ul>
          <div
            // className={
            //   showOptions === "reportOptions" ? "active drop-down" : "drop-down"
            // }
            className={
              showOptions === "reportOptions" &&
              location.pathname.includes("report")
                ? "active drop-down"
                : "drop-down"
            }
            onClick={() => {
              setShowOptions("reportOptions");

              history.push(`/management/report/32`);
            }}
            style={{ cursor: "pointer" }}
          >
            { (
              <div>
                <li style={{ marginBottom: 0 }} />
                <Stats className="menu-items-SVG" />
                <span className="menu-items-name">Reports & Insights</span>
              </div>
            )}
            {/* {showOptions === "reportOptions" ? (
              <Uparrow className="dropdown-arrow" />
            ) : (
              <Downarrow className="dropdown-arrow" />
            )} */}
          </div>

          <div
            className={
              showOptions === "reportOptions" &&
              location.pathname.includes("payment")
                ? "active drop-down"
                : "drop-down"
            }
            onClick={() => {
              // setShowOptions("reportOptions");
              // history.push(`/management/payment`);
              if (restaurantDetails.paymentProvider === null) {
                setShowOptions("reportOptions");
                history.push(`/management/payment`);
              } else {
                alert("Account already created !!👍🏻");
              }
            }}
          >
            { (
              <div>
                <li style={{ marginBottom: 0 }} />
                <Payment className="menu-items-SVG" />
                <span className="menu-items-name">Payments</span>
              </div>
            )}
          </div>

          {/* <div
            className={
              showOptions === "billing" && location.pathname.includes("billing")
                ? "active drop-down"
                : "drop-down"
            }
            onClick={() => {
              setShowOptions("billing");

              history.push(`/management/billing`);
            }}
            style={{ cursor: "pointer" }}
          >
            {!getRole() && (
              <div>
                <li style={{ marginBottom: 0 }} />
                <BillingIcon className="menu-items-SVG" />
                <span className="menu-items-name">Billings</span>
              </div>
            )}
          </div> */}
        </ul>
        <div>
          <div className="magilhub-bottom-logo">
                <span className="powered-text1">Powered by</span>
                <span className="magilhub-logo1">Maghil</span>
            </div>
          {/* <MagilHub className="magilhub-bottom-logo" /> */}
        </div>
      </div>
      <Switch>
        <Route exact path="/review" component={ReviewMenu} />
        <Route exact path="/management/employees" component={Employees} />
        <Route exact path="/management/Offers" component={Offerdetails} />
        <Route
          exact
          path="/management/Offers/TemplateOffer"
          component={TemplateOffer}
        />
        <Route exact path="/management/Offers/AddOffer" component={AddOffer} />
        <Route
          exact
          path="/management/Offers/CreateOffer"
          component={CreateOffer}
        />
        <Route
          exact
          path="/management/Offers/EditOffer"
          component={CreateOffer}
        />
        <Route
          exact
          path="/management/Offers/PreviewOffer"
          component={PreviewOffer}
        />
        <Route
          exact
          path="/management/report/32"
          component={() => (
            <Report id={"32"} title={"Sales Report"} />
          )}
        />
          <Route
          exact
          path="/management/report/51"
          component={() => (
            <Report id={"51"} title={"Customer Insights"} />
          )}
        />
          <Route
          exact
          path="/management/report/63"
          component={() => (
            <Report id={"63"} title={"Consolidated Report"} />
          )}
        />
          <Route
          exact
          path="/management/report/67"
          component={() => (
            <Report id={"63"} title={"Course management"} />
          )}
        />
          <Route
          exact
          path="/management/report/82"
          component={() => (
            <Report id={"82"} title={"Category report"} />
          )}
        />
         <Route
          exact
          path="/management/report/57"
          component={() => (
            <Report id={"57"} title={"Product Insights"} />
          )}
        />
        <Route
          exact
          path="/management/report/32"
          component={() => <Report id={"32"} title={"Sales report"} />}
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
        />
        Product insights
        <Route
          exact
          path="/management/report/12"
          component={() => <Report id={"12"} title={"Sales insights"} />}

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
          path="/management/employees/add/:id"
          component={() => <AddEmployee />}
        />
        <Route 
          exact 
          path="/management/employees/details/:id"
          component={() => <EmployeeDetails />}  
        />
        <Route exact path="/management/billing" component={() => <Billing />} />
        <Route
          exact
          path="/management/billing/changeplan"
          component={() => <ChangePlan />}
        />
        <Route
          exact
          path="/management/billing/cancelsubscription"
          component={() => <CancelSubscription />}
        />
        <Route
          exact
          path="/management/billing/stickWithUs"
          component={() => <StickWithUs />}
        />
        <Route
          exact
          path="/management/billing/history"
          component={() => <BillingHistory />}
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
        <Route
          exact
          path="/management/menu/Items/update/:itemId"
          component={() => <AddItems />}
        />
        <Route
          exact
          path="/management/payment"
          component={() => <Payments title={"Payment"} />}
        />
      </Switch>
    </>
  );
};

export default Menu;
