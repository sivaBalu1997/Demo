import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useMemo,
} from "react";
import "../../styles/menu.scss";
import { useHistory, useLocation } from "react-router-dom";
import {
  SELECTED_BRANCH_DATA,
  STORAGE_BUCKET_URL,
} from "../../shared/constants";
import { clearMenuData, getMenus } from "../../redux/menu/menuAction";
import { signOut } from "../../redux/auth/authActions";

import {
  getRestaurantRequest,
  selectBranch,
} from "../../redux/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
//SVG
import { ReactComponent as EmployeesIcon } from "../../assets/svg/employees.svg";
import { ReactComponent as Stats } from "../../assets/svg/statistics.svg";
import { ReactComponent as Tableware } from "../../assets/svg/tableware.svg";
import { ReactComponent as Uparrow } from "../../assets/svg/up_arrow.svg";
import { ReactComponent as Downarrow } from "../../assets/svg/down_arrow.svg";
// import { ReactComponent as Offer } from "../../assets/svg/offer.svg";
import logout from "../../assets/svg/LogoutIcon.svg";
import btnnav from "../../assets/svg/btnnav.svg";
import { RootState } from "redux/rootReducer";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { removeDataRequest } from "redux/productCatalog/productCatalogActions";
import SidePanelMob from "components/reportComponents/SiePanelMob";
import { showErrorToast } from "util/toastUtils";
import { clearPermissionsData, getEmployeePermissionsRequest } from "redux/employee/employeeActions";
// import exp from "constants";
import { ReactComponent as NewMaghilLogo } from "../../assets/svg/maghil-logo-new.svg";
import { ReactComponent as MaghilText } from "../../assets/svg/maghil-text-new.svg"
import { clearReportData } from "redux/newReports/newReportsActions";
import SidePanelHoverViewForReports from "components/reportComponents/SidePanelHoverViewForReports";

const SidePanel = () => {
  const dispatch = useDispatch();

  const permissions = useSelector((state: any) => state.employee.permissions);
  const isReportAccessible = useMemo(
    () =>
      permissions?.find(
        (item: any) =>
          item?.module === "REPORTS" &&
          item?.funtions?.includes("Access Report")
      ),
    [permissions]
  );
  // console.log({ isReportAccessible,permissions });

  useEffect(() => {
    // console.log("isReportAccessible", isReportAccessible);

    if (!permissions?.length) {
      const staff: any = localStorage?.getItem("CREDENTIALS");
      const staffId = JSON.parse(staff)?.id;
      dispatch(getEmployeePermissionsRequest({ staffId: staffId }));
    }
  }, [permissions?.length]);

  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
  const location = useLocation();
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 575px)").matches;
    if (isMobile) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }, [location.pathname]);
  return (
    <>
      <SidePanelDeskTop roles={{ reports: isReportAccessible }} />
      {isExpanded ? (
        <SidePanelMob
          roles={{ reports: isReportAccessible }}
          handleClose={() => setIsExpanded(false)}
        />
      ) : null}
    </>
  );
};
interface SidePanelInterface {
  roles: {
    reports: boolean;
  };
}
const SidePanelDeskTop = ({ roles }: SidePanelInterface) => {
  // const credentials = useSelector((state: RootState) => state.auth.credentials);
  const selectedBranch: string =
    localStorage.getItem(SELECTED_BRANCH_DATA) || "";
  const branch =
    selectedBranch && selectedBranch !== "undefined"
      ? JSON.parse(selectedBranch)
      : null;
  // const menuOptions = ["Items", "Product Catalog"];

  const reportInsightsOptions = [
    // {
    //   name: "Chart JS",
    //   path: "/live-reports"
    // },
    {
      name: "Sales",
      path: "/sales-reports",
    },
    {
      name: "Product",
      path: "/product-reports",
    },
    // {
    //   name:"Staff",
    //   path:""
    // },
    {
      name: "Check-in",
      path: "/check-in-reports",
    },
    {
      name: "Customer",
      path: "/customer-reports",
    },
    // {
    //   name:"Event",
    //   path:""
    // },
    {
      name: "Reports & Insights",
      path: "/old-reports",
    }
  ];
  const offerMenuOptions = ["Special Price"];
  const selectedBranchDispatch = useSelector((state: RootState) => state.auth.selectedBranch);

  const history = useHistory();

  const location = useLocation();
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState("employees");
  const [showOfferOptions, setShowOfferOptions] = useState("");
  // const [showReportsOptions, setShowReportsOptions] = useState(false);
  // const [showOfferListNav, setShowOfferListNav] = useState(false);
  // const [routeTo, setRouteTo] = useState({});
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
  const [SelectSub, setSelectedSub] = useState("");
  const [SelectSubForReport, setSelectSubForReport] = useState("");
  const [showHoverView, setShowHoverView] = useState(false);

  useEffect(() => {
    setIsExpanded(true);
    if (location?.pathname?.includes("/productCatalog")) {
      setShowOptions("Product Catalog");
      // history.push("/productCatalog/menuListing");
    } else if (location?.pathname?.includes("/old-reports")) {
      setSelectSubForReport("Reports & Insights");
      setShowOptions("reportOptions");
    } else if (location?.pathname?.includes("report/32")) {
      setSelectSubForReport("Reports & Insights");
      setShowOptions("reportOptions");
    }
    // else if (location?.pathname?.includes("/live-reports")) {
    //   setSelectSubForReport("Chart JS");
    //   setShowOptions("reportOptions");
    // }
    else if (location?.pathname?.includes("/sales-reports")) {
      setSelectSubForReport("Sales");
      setShowOptions("reportOptions");
    } else if (location?.pathname?.includes("/check-in-reports")) {
      setSelectSubForReport("Check-in");
      setShowOptions("reportOptions");
    } else if (location?.pathname?.includes("/product-reports")) {
      setSelectSubForReport("Product");
      setShowOptions("reportOptions");
    } else if (location?.pathname?.includes("/customer-reports")) {
      setSelectSubForReport("Customer");
      setShowOptions("reportOptions");
    } else if (
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
          (logoMedia.mimeType.split("/")[0] || "img") +
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
      if (!selectedBranchDispatch && restaurantDetails) {
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
  }, [restaurantDetails, selectedBranchDispatch]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const logoutUser = () => {
    dispatch(clearPermissionsData());
    dispatch(clearMenuData());
    dispatch(clearReportData())
    localStorage.clear();
    dispatch(signOut());
    history.replace("/");
  };

  const handlePathChange = (path: string) => {
    history.push(path);
  };

  return (
    <>
      <div
        className={`menu menu-rebranded is-sticky ${isExpanded ? "expanded" : ""
          }`}
      >
        <div className="logo-container logo-container-rebranded">
          <div>
            {isExpanded ? (
              <img
                src={getImageURL("LOGO")}
                className="restaurant-logo restaurant-logo-rebranded"
              />
            ) : (
              <img
                src={getImageURL("LOGO")}
                className="restaurant-logo restaurant-logo-rebranded-min"
              />
            )}
          </div>

          <div className="restaurant-name-container  restaurant-name-container-rebranded">
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
                          key={i}
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
          {/* <div className="restaurant-name-container restaurant-name-container-rebranded">
            {isExpanded ? (
              <span className="restaurant-name restaurant-name-rebranded ">
                {restaurantDetails &&
                  restaurantDetails.branchName &&
                  restaurantDetails.branchName.split(",")[0]}
              </span>
            ) : (
              <span className="restaurant-name restaurant-name-rebranded-min ">
              </span>
            )}
            {isExpanded ? (
              <div>
                <span className="branch-name">
                  {restaurantDetails &&
                    restaurantDetails.branchName &&
                    restaurantDetails.branchName.split(",")[1]}
                </span>
              </div>
            ) : (
              <div>
                <span className="branch-name-min">
                </span>
              </div>
            )}
          </div> */}
        </div>
        <ul className="menu-items-sidebar menu-items-sidebar-rebranded">
          <div
            className={
              showOptions === "employees" &&
                location.pathname.includes("employees")
                ? "activePath"
                : "not-active  menu-items-name-rebranded"
            }
            onClick={() => {
              setShowOptions("employees");
              history.push("/employees");
            }}
          >
            <EmployeesIcon className="menu-items-icon menu-items-icons-resize" />
            {isExpanded && (
              <span className="menu-items-name menu-items-name-rebranded">
                Employees
              </span>
            )}
          </div>

          <div
            className={
              showOptions === "Product Catalog"
                ? "activePath"
                : "not-active  menu-items-name-rebranded"
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
            <Tableware className="menu-items-icon  menu-items-icons-resize" />
            {isExpanded && (
              <span className="menu-items-name  menu-items-name-rebranded">
                Product Catalog
              </span>
            )}
          </div>

          {/* <div
            className={
              showOfferOptions === "MenuOptions"
                ? "activePath"
                : "not-active  menu-items-name-rebranded"
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
                backgroundColor:
                  showOfferOptions === "MenuOptions" ? "#FAFAFA" : "",
                // paddingLeft: showOfferOptions === "MenuOptions" ? "10px" : "",
                paddingRight: showOfferOptions === "MenuOptions" ? "10px" : "",
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
                    showOptions === "MenuOptions"
                      ? "activePath"
                      : "not-active  menu-items-name-rebranded"
                  }
                >
                  <Offer className="menu-items-icon menu-items-icons-resize" />
                  {isExpanded && (
                    <span className="menu-items-name  menu-items-name-rebranded">
                      Offer Management
                    </span>
                  )}
                </div>

                <div style={{ cursor: "pointer" }}>
                  {isExpanded &&
                    (showOfferOptions === "MenuOptions" ? (
                      <Uparrow
                      // className="dropdown-arrow"
                      // style={{ marginLeft: "15px" }}
                      />
                    ) : (
                      <Downarrow
                      // className="dropdown-arrow"
                      // style={{ marginLeft: "15px" }}
                      />
                    ))}
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
                      : "1.5rem",
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
          </div> */}

          <div
            style={{
              marginTop:
                showOfferOptions === "MenuOptions" &&
                  offerMenuOptions.length > 0
                  ? "-1.2rem"
                  : "0",
            }}
            className={
              showOptions === "reportOptions"
                ? "activePath"
                : "not-active  menu-items-name-rebranded"
            }
          >
            <div
              style={{
                backgroundColor:
                  showOptions === "reportOptions" ? "#FAFAFA" : "",
                // paddingLeft: showOptions === "reportOptions" ? "10px" : "",
                paddingRight: showOptions === "reportOptions" ? "10px" : "",
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
                onClick={(e: any) => {
                  if (roles?.reports) {
                    setShowOptions((prevState) =>
                      prevState === "reportOptions" ? "" : "reportOptions"
                    );
                  } else {
                    e.preventDefault();
                    e.stopPropagation();
                    showErrorToast("You don't have permission");
                  }

                  // setShowReportsOptions(!showReportsOptions);
                }}
              >
                <div
                  style={{ position: "relative" }}
                  className={
                    showOptions === "reportOptions"
                      ? "activePath"
                      : "not-active"
                  }
                >
                  <Stats
                    className="menu-items-icon menu-items-icons-resize"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowHoverView(!showHoverView);
                    }}
                  />
                  {!isExpanded && showHoverView && (
                    <div className="hover-view-container">
                      <SidePanelHoverViewForReports onClose={() => setShowHoverView(false)} />
                    </div>
                  )}
                  {isExpanded && (
                    <span className="menu-items-name  menu-items-name-rebranded">
                      Reports & Insights
                    </span>
                  )}
                </div>

                <div style={{ cursor: "pointer" }}>
                  {isExpanded &&
                    (showOptions === "reportOptions" ? (
                      <Uparrow
                        className="arrow-dimensions"
                      // className="dropdown-arrow"
                      // style={{ marginLeft: "15px" }}
                      // style={{color: showOptions === "reportOptions" ? "orange" : "pink"}}
                      />
                    ) : (
                      <Downarrow
                      // className="dropdown-arrow"
                      // style={{ marginLeft: "15px" }}
                      />
                    ))}
                </div>
              </div>
              <div
                className={"offers-nav-list"}
                style={{
                  // backgroundColor: showOptions === "reportOptions" ? "orange" : "pink",
                  padding: "0",
                  margin: "0",
                  left:
                    !isExpanded && showOptions === "reportOptions"
                      ? "-0.45rem"
                      : "1.5rem",
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
                    {isExpanded && showOptions === "reportOptions"
                      ? reportInsightsOptions.map((option) => (
                        <li
                          key={option?.path}
                          className="menuList-offers-sub-category"
                          style={{ width: !isExpanded ? "4rem" : "100%" }}
                        >
                          <div
                            style={{
                              color:
                                SelectSubForReport == option?.name
                                  ? "#E52333"
                                  : "#000000",
                            }}
                            onClick={() => handlePathChange(option?.path)}
                          >
                            {option?.name}
                          </div>
                        </li>
                      ))
                      : null}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div
            //  style={{marginTop:showOptions === "reportOptions"&&reportInsightsOptions.length>0?"-1.2rem":"0" }}
            className="not-active  menu-items-name-rebranded"
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
                <div className="logOutBtn logout-resize" onClick={logoutUser}>
                  <img src={logout} alt="" />
                  {isExpanded && (
                    <span className="menu-items-name  menu-items-name-rebranded">
                      Log Out
                    </span>
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
              {/* <span className="magilhub-logo1">Maghil</span>  */}
              <NewMaghilLogo className="new-maghil-logo" />
              <MaghilText className="new-maghil-text" />
              {/* insert the logo here */}
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
