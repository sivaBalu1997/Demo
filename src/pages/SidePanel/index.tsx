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
import btnnav from "../../assets/svg/btnnav.svg";
import { RootState } from "redux/rootReducer";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { ReactComponent as CMS } from "../../assets/svg/CMS.svg";
import { removeDataRequest } from "redux/productCatalog/productCatalogActions";

const SidePanel = () => {
  const credentials = useSelector((state: RootState) => state.auth.credentials);
  const selectedBranch: string =
    localStorage.getItem(SELECTED_BRANCH_DATA) || "";
  const branch =
    selectedBranch && selectedBranch !== "undefined"
      ? JSON.parse(selectedBranch)
      : null;
  const menuOptions = ["Items", "Product Catalog"];
  const offerMenuOptions = ["Offers", "Special Price"];
  const reportInsightsOptions = ["Reports & Insights"];

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
  const [routeTo, setRouteTo] = useState({});
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
  const [isExpand, setIsExpand] = useState(true);

  useEffect(() => {
    if (
      showOptions !== "Product Catalog" &&
      location?.pathname?.includes("/productCatalog")
    ) {
      setShowOptions("Product Catalog");
      // history.push("/productCatalog/menuListing");
    } else if (location?.pathname?.includes("/old-reports")) {
      setShowOptions("report");
    }
  }, [showOptions, location?.pathname, history]);

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
    if (locationId) {
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
        <ul>
          <div
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
            <li style={{ marginBottom: 0 }} />
            <EmployeesIcon
              className="menu-items-SVG"
              style={{ width: "24px" }}
            />
            {isExpanded && (
              <span className="menu-items-name" style={{ fontSize: "16px" }}>
                Employees
              </span>
            )}
          </div>

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

          <div
            className={
              showOptions === "Product Catalog" &&
              location.pathname.includes("/menu/Items")
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
              if (!location.pathname.includes("/menu/Items")) {
                history.push("/menu/Items");
              }
            }}
          >
            <li style={{ marginBottom: 0 }} />
            <Tableware
              className="menu-items-SVG"
              style={{
                width: "24px",
                height: "24px",
              }}
            />
            {isExpanded && (
              <span
                className="menu-items-name"
                style={{
                  fontSize: "16px",
                }}
              >
                Menu
              </span>
            )}
          </div>

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
          </div>

          {/* <div
            className={
              showOptions === "Offer" &&
              location.pathname.includes("/Offers")
                ? "active"
                : "down"
            }
            style={{ 
              cursor: "pointer",
              marginTop:'28px',
            }}
            onClick={() => {
              if (showOptions !== "Offer") {
                setShowOptions("Offer"); 
              }
              if (!location.pathname.includes("/Offers")) {
                history.push("/Offers/active"); 
              }
            }}
          >
            <li style={{ marginBottom: 0 }} />
            <Offer className="menu-items-SVG" style={{fontSize:'24px'}}/>
            {isExpanded && 
            <span 
              className="menu-items-name"
              style={{
                fontSize:'16px'
              }}
            >
              Offer Management
            </span>}
          </div> */}

          {/* <ul className="menu-items-list">
            {showOfferOptions === "MenuOptions"
              ? offerMenuOptions.map((option) => {
                console.log({option})
                return(
                  <NavLink
                    to={option === '/Offer' ? `/${option}` : `/Offers/active`}
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
                )})
              : null}

          </ul> */}

          <ul className="menu-items-list">
            {showOfferOptions === "MenuOptions"
              ? offerMenuOptions.map((option) => (
                    <li>
                      <span
                        className="d-inline-block m-t-20"
                        onClick={() => {
                          option === 'Offers' ? history.push('/Offer') : history.push('/Offers/active')
                        }}
                      >
                        {option}
                      </span>
                    </li>
                ))
              : null}
          </ul>
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
                <Stats className="menu-items-SVG" />
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
              if (showOptions === "reportOptions") {
                setShowOptions("");
              } else {
                setShowOptions("reportOptions");
              }
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
                <Uparrow className="dropdown-arrow" />
              ) : (
                <Downarrow className="dropdown-arrow" />
              )}{" "}
            </Fragment>
          </div>
          
          {showOptions === "reportOptions" && (
            <ul>
              {reportInsightsOptions.map((option) => (
                <li
                  key={option}
                  style={{ marginTop: "10px"}}
                  onClick={() => {
                    if (option === "Reports & Insights") {
                      history.push(`/old-reports`);
                    } 
                    // else if (option === "New") {
                    //   history.push("/live-reports");
                    // }
                  }}
                >
                  <span className="menuList">
                    {option}
                  </span>
                </li>
              ))}
            </ul>
          )} */}

          <div
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
            <Stats className="menu-items-SVG" style={{ width: "24px" }} />
            {isExpanded && (
              <span
                className="menu-items-name"
                style={{
                  fontSize: "16px",
                }}
              >
                Reports & Insights
              </span>
            )}
          </div>

          <div
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
                <li style={{ marginBottom: "15px" }} />
                <Payment className="menu-items-SVG" style={{ width: "24px" }} />
                {isExpanded && (
                  <span
                    className="menu-items-name"
                    style={{ fontSize: "16px" }}
                  >
                    Payments
                  </span>
                )}
              </div>
            }
          </div>
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
