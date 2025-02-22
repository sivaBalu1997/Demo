import React, {
  useState,
  useCallback,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "../../styles/menu.scss";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import {
  SELECTED_BRANCH_DATA,
  STORAGE_BUCKET_URL,
} from "../../shared/constants";
import { clearMenuData } from "../../redux/menu/menuAction";
import { signOut } from "../../redux/auth/authActions";

// import MenuItems from "../menuItems";
import {
  getRestaurantRequest,
  selectBranch,
} from "../../redux/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
// import { STORAGE_BUCKET_URL } from "";
//SVG
import { ReactComponent as EmployeesIcon } from "../../assets/svg/employees.svg";
import { ReactComponent as Stats } from "../../assets/svg/statistics.svg";
import { ReactComponent as Tableware } from "../../assets/svg/tableware.svg";
import { ReactComponent as Uparrow } from "../../assets/svg/up_arrow.svg";
import { ReactComponent as Downarrow } from "../../assets/svg/down_arrow.svg";
import { ReactComponent as Payment } from "../../assets/svg/payment.svg";
import { ReactComponent as Offer } from "../../assets/svg/offer.svg";
import logout from "../../assets/svg/LogoutIcon.svg";
import btnnav from "../../assets/svg/btnnav.svg";
import { RootState } from "redux/rootReducer";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { ReactComponent as CMS } from "../../assets/svg/CMS.svg";
import { removeDataRequest } from "redux/productCatalog/productCatalogActions";
import exp from "constants";

const SidePanel = () => {
  const credentials = useSelector((state: RootState) => state.auth.credentials);
  const selectedBranch: string =
    localStorage.getItem(SELECTED_BRANCH_DATA) || "";
  const branch =
    selectedBranch && selectedBranch !== "undefined"
      ? JSON.parse(selectedBranch)
      : null;
  const menuOptions = ["Items", "Product Catalog"];
  const reportInsightsOptions = ["Reports & Insights", "Chart JS", "Sales", "Product", "Staff", "Check-in", "Customer", "Event"];
  const offerMenuOptions = ["Special Price"];

  const history = useHistory();

  // useEffect(() => {
  //   if (window.innerWidth <= 575) {
  //     history.push(`/report/32`);
  //   }
  // }, [history]);

  const location = useLocation();
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState("employees");
  const [showOfferOptions, setShowOfferOptions] = useState("");
  const [showReportsOptions, setShowReportsOptions] = useState(false);
  const [showOfferListNav, setShowOfferListNav] = useState(false);
  const [routeTo, setRouteTo] = useState({});
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
  const [isExpand, setIsExpand] = useState(true);
  const [SelectSub, setSelectedSub] = useState("");
  const [SelectSubForReport, setSelectSubForReport] = useState("");

  useEffect(() => {
    if (location?.pathname?.includes("/productCatalog")) {
      setShowOptions("Product Catalog");
      // history.push("/productCatalog/menuListing");
    } else if (location?.pathname?.includes("/old-reports")) {
      setSelectSubForReport("Reports & Insights");
      setShowOptions("reportOptions");
    } else if (location?.pathname?.includes("report/32")) {
      setSelectSubForReport("Reports & Insights");
      setShowOptions("reportOptions");
    } else if (location?.pathname?.includes("/live-reports")) {
      setSelectSubForReport("Chart JS");
      setShowOptions("reportOptions");
    }
    else if (location?.pathname?.includes("/live-reports")) {
      setSelectSubForReport("Chart JS");
      setShowOptions("reportOptions");
    }
    else if (location?.pathname?.includes("/sales-reports")) {
      setSelectSubForReport("Sales");
      setShowOptions("reportOptions");
    }
    // else if (location?.pathname?.includes("/category-1")) {
    //   setSelectSubForReport("Product");
    //   setShowOptions("reportOptions");
    // }
    // else if (location?.pathname?.includes("/category-1")) {
    //   setSelectSubForReport("Product");
    //   setShowOptions("reportOptions");
    // }
    else if (
      location?.pathname?.includes("Offers/active") ||
      location?.pathname?.includes("offer/special") ||
      location?.pathname?.includes("Offers/completed")
    ) {
      setShowOfferOptions("MenuOptions");
      setSelectedSub("Special Price");
    } else if (location?.pathname?.includes("/Offer")) {
      setShowOfferOptions("MenuOptions");
      setSelectedSub("Offers");
    }
  }, [location?.pathname]);

  const restaurantDetails = useSelector(
    (state: RootState) => state.auth?.restaurantDetails
  );

  const UserRole = useSelector(
    (state: RootState) => state.auth.credentials?.role
  );

  const locationId = useSelector(
    (state: RootState) =>
      state.auth.credentials && state.auth?.credentials?.locationId
  );

  const branchDetails = useSelector(
    (state: RootState) => state.auth?.selectedBranch
  );

  const getImageURL = useCallback(
    (type: any) => {
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
    if (locationId && !restaurantDetails) {
      dispatch(getRestaurantRequest(locationId));
    }
  }, []);

  useEffect(() => {
    if (
      restaurantDetails &&
      restaurantDetails.branch &&
      restaurantDetails.branch.length > 0
    ) {
      if (!selectedBranch && restaurantDetails) {
        const resBranch = restaurantDetails?.branch;
        const defaultBranch = resBranch?.filter(
          (branch) => branch?.id === locationId
        );
        if (branchDetails?.id !== defaultBranch[0]?.id) {
          dispatch(selectBranch(defaultBranch[0]));
        }
        localStorage.setItem(
          SELECTED_BRANCH_DATA,
          JSON.stringify(defaultBranch[0])
        );
      } else {
        if (branchDetails?.id !== branch?.id) {
          dispatch(selectBranch(branch));
        }
      }
    }
  }, [restaurantDetails]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const logoutUser = () => {
    dispatch(clearMenuData());
    localStorage.clear();
    dispatch(signOut());
    history.replace("/");
  };

  return (
    <>
      <div className={`menu is-sticky ${isExpanded ? "expanded" : ""}`}>
        <div className="logo-container">
          <div>
            <img src={getImageURL("LOGO")} className="restaurant-logo" />
          </div>
          <div className="restaurant-name-container">
            {isExpanded && (
              <span className="restaurant-name">
                {restaurantDetails &&
                  restaurantDetails.branchName &&
                  restaurantDetails.branchName.split(",")[0]}
              </span>
            )}
            {isExpanded && (
              <div>
                <select
                  className="branch-dropdown"
                  disabled={
                    location.pathname?.includes("/employees/add") ||
                    restaurantDetails?.branch?.length == 1 ||
                    (UserRole !== "Restaurant_Owner" &&
                      UserRole !== "Regional_Employee" &&
                      UserRole !== "Magil_Admin")
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
            )}
          </div>
        </div>
        <ul className="menu-items-sidebar">
          <div
            className={
              showOptions === "employees" &&
                location.pathname.includes("employees")
                ? "activePath"
                : "not-active"
            }
            onClick={() => {
              setShowOptions("employees");
              history.push("/employees");
            }}
          >
            <EmployeesIcon className="menu-items-icon" />
            {isExpanded && <span className="menu-items-name">Employees</span>}
          </div>

          <div
            className={
              showOptions === "Product Catalog" ? "activePath" : "not-active"
            }
            onClick={() => {
              dispatch(removeDataRequest());
              if (showOptions !== "Product Catalog") {
                setShowOptions("Product Catalog");
              }
              if (!location.pathname.includes("/productCatalog/menuListing")) {
                history.push("/productCatalog/menuListing");
              }
            }}
          >
            <Tableware
              className="menu-items-icon"
              style={{ width: "24px", height: "24px" }}
            />
            {isExpanded && (
              <span className="menu-items-name">Product Catalog</span>
            )}
          </div>

          <div
            className={
              showOfferOptions === "MenuOptions" ? "activePath" : "not-active"
            }
            onClick={() => {
              showOfferOptions !== "MenuOptions"
                ? setShowOfferOptions("MenuOptions")
                : setShowOfferOptions("");

              // setShowOfferListNav(!showOfferListNav);
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft:
                  !isExpanded && showOfferOptions === "MenuOptions"
                    ? "0rem"
                    : "0px",
              }}
            >
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <div
                  className={
                    showOptions === "MenuOptions" ? "activePath" : "not-active"
                  }
                >
                  <Offer className="menu-items-icon" />
                  {isExpanded && (
                    <span className="menu-items-name">Offer Management</span>
                  )}
                </div>

                <div style={{ cursor: "pointer" }}>
                  {showOfferOptions === "MenuOptions" ? (
                    <Uparrow
                    // className="dropdown-arrow"
                    // style={{ marginLeft: "15px" }}
                    />
                  ) : (
                    <Downarrow
                    // className="dropdown-arrow"
                    // style={{ marginLeft: "15px" }}
                    />
                  )}
                </div>
              </div>
              <div
                className={"offers-nav-list"}
                style={{
                  padding: "0",
                  margin: "0",
                  left:
                    !isExpanded && showOfferOptions === "MenuOptions"
                      ? "-0.4rem"
                      : "4rem",
                }}
              >
                {showOfferOptions === "MenuOptions" && (
                  <ul
                    className="menu-items-list"
                    style={{
                      padding: "0",
                      margin: "0",
                      marginTop:
                        !isExpanded && showOfferOptions === "MenuOptions"
                          ? "1rem"
                          : "",
                    }}
                  >
                    {showOfferOptions === "MenuOptions"
                      ? offerMenuOptions.map((option) => (
                        <li
                          className="menuList-offers-sub-category"
                          style={{ width: !isExpanded ? "4rem" : "100%" }}
                        >
                          <span
                            style={{
                              color:
                                SelectSub == option ? "#E52333" : "#000000",
                            }}
                            onClick={() => {
                              option === "Offers"
                                ? history.push("/Offer")
                                : history.push("/Offers/active");
                              setSelectedSub(option);
                            }}
                          >
                            {option}
                          </span>
                        </li>
                      ))
                      : null}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop:
                showOfferOptions === "MenuOptions" &&
                  offerMenuOptions.length > 0
                  ? "-1.2rem"
                  : "0",
            }}
            className={
              showOptions === "reportOptions" ? "activePath" : "not-active"
            }
            onClick={() => {
              setShowOptions((prevState) =>
                prevState === "reportOptions" ? "" : "reportOptions"
              );

              // setShowReportsOptions(!showReportsOptions);
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft:
                  !isExpanded && showOptions === "reportOptions"
                    ? "-0.3rem"
                    : "0px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: !isExpanded ? "1.5rem" : "2rem",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <div
                  className={
                    showOptions === "reportOptions"
                      ? "activePath"
                      : "not-active"
                  }
                >
                  <Stats className="menu-items-icon" />
                  {isExpanded && (
                    <span className="menu-items-name">Reports & Insights</span>
                  )}
                </div>

                <div style={{ cursor: "pointer" }}>
                  {showOptions === "reportOptions" ? (
                    <Uparrow
                    // className="dropdown-arrow"
                    // style={{ marginLeft: "15px" }}
                    />
                  ) : (
                    <Downarrow
                    // className="dropdown-arrow"
                    // style={{ marginLeft: "15px" }}
                    />
                  )}
                </div>
              </div>
              <div
                className={"offers-nav-list"}
                style={{
                  padding: "0",
                  margin: "0",
                  left:
                    !isExpanded && showOptions === "reportOptions"
                      ? "-0.45rem"
                      : "4rem",
                }}
              >
                {showOptions === "reportOptions" && (
                  <ul
                    className="menu-items-list"
                    style={{
                      padding: "0",
                      margin: "0",
                      marginLeft:
                        !isExpanded && showOptions === "reportOptions"
                          ? "0.4rem"
                          : "0px",
                      marginTop:
                        !isExpanded && showOptions === "reportOptions"
                          ? "1rem"
                          : "",
                    }}
                  >
                    {showOptions === "reportOptions"
                      ? reportInsightsOptions.map((option) => (
                        <li
                          className="menuList-offers-sub-category"
                          style={{ width: !isExpanded ? "4rem" : "100%" }}
                        >
                          <span
                            style={{
                              color:
                                SelectSubForReport == option
                                  ? "#E52333"
                                  : "#000000",
                            }}
                            onClick={() => {
                              if (option === "Reports & Insights") {
                                history.push(`/old-reports`);
                                // history.push("/live-reports");
                              } else if (option === "Chart JS") {
                                history.push("/live-reports");
                              } else if (option === "Sales") {
                                history.push("/category-1");
                              }
                              else if (option === "Sales") {
                                history.push("/sales-reports");
                              }
                              
                            }}
                          >
                            {option}
                          </span>
                        </li>
                      ))
                      : null}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* <div
            style={{ display: "flex", flexDirection: "column" }}
            onClick={() => {
              // if (showOptions === "reportOptions") {
              //   setShowOptions("");
              // } else {
              //   setShowOptions("reportOptions");
              // }

              //setShowOptions("reportOptions");

              //history.push(`/live-reports`);

              setShowOptions((prevState) =>
                prevState === "reportOptions" ? "" : "reportOptions"
              );
            }}
          >
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div
                className={
                  showOptions === "reportOptions" ? "activePath" : "not-active"
                }
              >
                {showOptions === "reportOptions" &&
                !location.pathname.includes("report") ? (
                  <li />
                ) : null}
                <Stats className="menu-items-icon" />
                {isExpanded && (
                  <span className="menu-items-name">Reports & Insights</span>
                )}
              </div>
              <div>
                <Fragment>
                  {showOptions === "reportOptions" ? (
                    <Uparrow

                    // className="dropdown-arrow"   style={{ }}
                    />
                  ) : (
                    <Downarrow
                    // className="dropdown-arrow" style={{ }}
                    />
                  )}{" "}
                </Fragment>
              </div>
            </div>
            <div>
              {showOptions === "reportOptions" && (
                <ul className="reports-categories">
                  {reportInsightsOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        if (option === "Reports & Insights") {
                          history.push(`/old-reports`);
                          // history.push("/live-reports");
                        } else if (option === "Chart JS") {
                          history.push("/live-reports");
                        }
                      }}
                    >
                      <span className="">{option}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div> */}

          {/* <div
           style={{marginTop:showOptions === "reportOptions"&&reportInsightsOptions.length>0?"-1.2rem":"0" }}
            className="not-active"
            // className={
            //   showOptions === "reportOptions" &&
            //     location.pathname.includes("payment")
            //     ? "activePath"
            //     : "not-active"
            // }
            onClick={() => {
              if (restaurantDetails?.paymentProvider === null) {
                setShowOptions("reportOptions");
                history.push(`/management/payment`);
              } else {
                alert("Account already created !!👍🏻");
              }
            }}
          >
            {
              <>
                <Payment className="menu-items-icon" />
                {isExpanded && (
                  <span className="menu-items-name">Payments</span>
                )}
              </>
            }
          </div> */}

          <div
            //  style={{marginTop:showOptions === "reportOptions"&&reportInsightsOptions.length>0?"-1.2rem":"0" }}
            className="not-active"
            // className={
            //   showOptions === "reportOptions" &&
            //     location.pathname.includes("payment")
            //     ? "activePath"
            //     : "not-active"
            // }
            onClick={() => { }}
          >
            {
              <>
                <div className="logOutBtn" onClick={logoutUser}>
                  <img src={logout} alt="" />
                  {isExpanded && (
                    <span className="menu-items-name">Log Out</span>
                  )}
                </div>
              </>
            }
          </div>

          {/* <div
            className={
              showOptions === "employees" &&
                location.pathname.includes("employees")
                ? "active"
                : "down"
            }
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowOptions("employees");
              history.push("/employees");
            }}
          >
            
            <EmployeesIcon className="menu-items-SVG" style={{ width: '24px' }} />
            {isExpanded && <span className="menu-items-name" style={{ fontSize: '16px' }}>Employees</span>}
          </div> */}

          {/* CMS ==================*/}
          {/* <div
            className={
              // showOptions === "/management/cms/" &&
              location.pathname.startsWith("/cms/") 
                ? "active"
                : ""
            }
            style={{ 
              cursor: "pointer", 
              marginLeft:'-6px',
              marginTop:'20px',
              marginBottom:'-1px' 
            }}
            onClick={() => {
              setShowOptions("/cms/template");
              history.push("/cms/template");
            }}
          >
            <li/>
            <CMS className="menu-items-SVG" />
            {isExpanded && <span className="menu-items-name" style={{fontSize:"15px"}}>Content Management</span>}
          </div> */}

          {/* MENU ==========================================================*/}

          {/* <div
            className={
              showOptions === "MenuOptions" ? "active drop-down" : "drop-down"
            }
            onClick={() => {
              if (showOptions === "MenuOptions") {
                setShowOptions("");
              } else {
                setShowOptions("MenuOptions");
              }
            }}
          >
            <div>
              {showOptions === "MenuOptions" &&
              !location.pathname.includes("menu") ? (
                <li style={{ marginBottom: 0 }} />
              ) : null}
              <Tableware className="menu-items-SVG" />
              {isExpanded && <span className="menu-items-name">Menu</span>}
            </div>

            <Fragment>
              {showOptions === "MenuOptions" ? (
                <Uparrow className="dropdown-arrow" />
              ) : (
                <Downarrow className="dropdown-arrow" />
              )}{" "}
            </Fragment>
          </div>
          
          {showOptions === "MenuOptions" && (
            <ul>
              {menuOptions.map((option) => (
                <li
                  key={option}
                  style={{ marginTop: "10px"}}
                  onClick={() => {
                    if (option === "Items") {
                      history.push(`/menu/${option}`);
                    } else if (option === "Product Catalog") {
                      dispatch(removeDataRequest());
                      history.push("/menuListing");
                    }
                  }}
                >
                  <span className="menuList">
                    {option}
                  </span>
                </li>
              ))}
            </ul>
          )}
           */}

          {/* <div
            className={
              showOptions === "Product Catalog"
                ? "active"
                : "down"
            }
            style={{
              cursor: "pointer",
              marginTop: "28px",
            }}
            onClick={() => {
              dispatch(removeDataRequest());
              if (showOptions !== "Product Catalog") {
                setShowOptions("Product Catalog");
              }
              if (!location.pathname.includes("/productCatalog/menuListing")) {
                history.push("/productCatalog/menuListing");
              }
            }}
          >
            <li style={{ marginBottom: 0 }} />
            <Tableware className="menu-items-SVG" style={{
              width: '24px',
              height: '24px'
            }} />
            {isExpanded &&
              <span
                className="menu-items-name"
                style={{
                  fontSize: '16px'
                }}
              >
                Product Catalog
              </span>}
          </div> */}

          {/* <div
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
              {isExpanded && (
                <span className="menu-items-name">Offer Management</span>
              )}
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
          </div> */}

          {/* <div
            className={
              showOptions === "Offer" &&
                location.pathname.includes("/Offers")
                ? "active"
                : "down"
            }
            style={{
              cursor: "pointer",
              marginTop: '28px',
            }}
            onClick={() => {
              if (showOptions !== "Offer") {
                setShowOptions("Offer");
              }
              if (!location.pathname.includes("/Offers")) {
                history.push("/Offers");
              }
            }}
          >
            <li style={{ marginBottom: 0 }} />
            <Offer className="menu-items-SVG" style={{ fontSize: '24px' }} />
            {isExpanded &&
              <span
                className="menu-items-name"
                style={{
                  fontSize: '16px'
                }}
              >
                Offer Management
              </span>}
          </div>

          {/* <ul className="menu-items-list">
            {showOfferOptions === "MenuOptions"
              ? offerMenuOptions.map((option) => (
                <NavLink
                  to={`/${option}`}
                  activeClassName="active"
                  key={option}
                >
                  <li>
                    <span
                      className="menuList"
                    >
                      {option}
                    </span>
                  </li>
                </NavLink>
              ))
              : null}

          </ul> */}

          {/* <ul className="menu-items-list">
            {showOfferOptions === "MenuOptions"
              ? offerMenuOptions.map((option) => (
                <li>
                  <span
                    className="d-inline-block m-t-20"
                    style={{ color: SelectSub == option ? "#E52333" : '#000000' }}
                    onClick={() => {
                      option === 'Offers' ? history.push('/Offer') : history.push('/Offers/active')
                      setSelectedSub(option)
                    }}
                  >
                    {option}
                  </span>
                </li>
              ))
              : null}
          </ul> */}
          {/* Report ==================================================================== */}
          {/* <div
            className={
              showOptions === "reportOptions" &&
                location.pathname.includes("report")
                ? "active drop-down"
                : "drop-down"
            }
            onClick={() => {
              setShowOptions("reportOptions");

              history.push(`/live-reports`);
            }}
            style={{ cursor: "pointer" }}
          >
            {
              <div>
                <li style={{ marginBottom: 0 }} />
                <Stats className="menu-items-" />
                {isExpanded && <span className="menu-items-name">Reports & Insights</span>}
              </div>
            }
          </div> */}
          {/* Report ==================================================================== */}

          {/* <div
            className={
              showOptions === "reportOptions" ? "active drop-down" : "drop-down"
            }
            onClick={() => {
              // if (showOptions === "reportOptions") {
              //   setShowOptions("");
              // } else {
              //   setShowOptions("reportOptions");
              // }

              //setShowOptions("reportOptions");

              //history.push(`/live-reports`);

              setShowOptions((prevState) => (prevState === "reportOptions" ? "" : "reportOptions"));
            }}
          >
            <div>
              {showOptions === "reportOptions" &&
                !location.pathname.includes("report") ? (
                <li style={{ marginBottom: 0 }} />
              ) : null}
              <Stats className="menu-items-SVG" />
              {isExpanded && <span className="menu-items-name">Reports & Insights</span>}
            </div>

            <Fragment>
              {showOptions === "reportOptions" ? (
                <Uparrow className="dropdown-arrow"   style={{ }}/>
              ) : (
                <Downarrow className="dropdown-arrow" style={{ }}/>
              )}{" "}
            </Fragment>
          </div> */}

          {/* {showOptions === "reportOptions" && (
            <ul>
              {reportInsightsOptions.map((option) => (
                <li
                  key={option}
                  style={{ marginTop: "10px" }}
                  onClick={() => {
                    if (option === "Reports & Insights") {
                      history.push(`/old-reports`);
                      // history.push("/live-reports");
                    }
                    else if (option === "Chart JS") {
                      history.push("/live-reports");
                    }
                  }}
                >
                  <span className="menuList">
                    {option}
                  </span>
                </li>
              ))}
            </ul>
          )} */}

          {/* <div
            className={
              showOptions === "Offer" &&
              location.pathname.includes("/old-reports")
                ? "active"
                : "down"
            }
            style={{
              cursor: "pointer",
              marginTop: "28px",
            }}
            onClick={() => {
              if (showOptions !== "report") {
                setShowOptions("report");
              }
              if (!location.pathname.includes("/old-reports")) {
                history.push("/old-reports");
              }
            }}
          >
            <li style={{ marginBottom: 0 }} />
            <Stats className="menu-items-SVG" style={{width:'24px'}}/>
            {isExpanded && 
            <span 
              className="menu-items-name"
              style={{
                fontSize:'16px'
              }}
            >
              Reports & Insights
            </span>}
          </div> */}

          {/* <div
            className={
              showOptions === "reportOptions" &&
                location.pathname.includes("payment")
                ? "active drop-down"
                : "drop-down"
            }
            onClick={() => {
              if (restaurantDetails?.paymentProvider === null) {
                setShowOptions("reportOptions");
                history.push(`/management/payment`);
              } else {
                alert("Account already created !!👍🏻");
              }
            }}
          >
            {
              <div>
                <li style={{ marginBottom: '15px' }} />
                <Payment className="menu-items-SVG" style={{ width: '24px' }} />
                {isExpanded && <span className="menu-items-name" style={{ fontSize: '16px' }}>Payments</span>}
              </div>
            }
          </div> */}
        </ul>
        <div>
          {isExpanded && (
            <div className="magilhub-bottom-logo">
              <span className="powered-text1">Powered by</span>
              <span className="magilhub-logo1">Maghil</span>
            </div>
          )}
        </div>
      </div>
      <div>
        <img
          onClick={toggleExpand}
          className={isExpanded ? "btn-nav1" : "btn-nav"}
          src={btnnav}
          alt=""
          style={{ zIndex: 9 }}
        />
      </div>
    </>
  );
};

export default React.memo(SidePanel);
