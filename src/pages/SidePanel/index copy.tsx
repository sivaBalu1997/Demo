import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import "../../styles/menu.scss";
import { useHistory, useLocation } from "react-router-dom";
import {
  SELECTED_BRANCH_DATA,
  STORAGE_BUCKET_URL,
} from "../../shared/constants";
import { clearMenuData } from "../../redux/menu/menuAction";
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
import { ReactComponent as Offer } from "../../assets/svg/offer.svg";
import logoutIcon from "../../assets/svg/LogoutIcon.svg";
import btnnav from "../../assets/svg/btnnav.svg";
import { RootState } from "redux/rootReducer";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { removeDataRequest } from "redux/productCatalog/productCatalogActions";


//TODO: Use this format
const menuOptions = [
  {
    name: "Employees",
    path: "/employees",
    icon: <EmployeesIcon />,
  },
  {
    name: "Product Catalog",
    path: "/productCatalog/menuListing",
    icon: <Tableware />,
    onClick: (dispatch: any) => dispatch(removeDataRequest()),
  },
  {
    name: "Offer Management",
    icon: <Offer />,
    submenu: [{ name: "Special Price", path: "/Offers/active" }],
  },
  {
    name: "Reports & Insights",
    icon: <Stats />,
    submenu: [
      { name: "Old Reports", path: "/old-reports" },
      { name: "Chart JS", path: "/live-reports" },
      { name: "Sales Reports", path: "/sales-reports" },
      { name: "Check-in Reports", path: "/check-in-reports" },
    ],
  },
];

const SidePanel = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const restaurantDetails = useSelector((state: RootState) => state.auth?.restaurantDetails);
  const locationId = useSelector((state: RootState) => state.auth.credentials?.locationId);
  const branchDetails = useSelector((state: RootState) => state.auth?.selectedBranch);
  const UserRole = useSelector((state: RootState) => state.auth.credentials?.role);
  const credentials = useSelector((state: RootState) => state.auth.credentials);

  useEffect(() => {
    if (locationId && !restaurantDetails) {
      dispatch(getRestaurantRequest(locationId));
    }
  }, [locationId, restaurantDetails, dispatch]);

  useEffect(() => {
    if (restaurantDetails?.branch && restaurantDetails.branch.length > 0) {
      const defaultBranch = restaurantDetails.branch.find((branch) => branch.id === locationId);
      if (defaultBranch && branchDetails?.id !== defaultBranch.id) {
        dispatch(selectBranch(defaultBranch));
      }
      localStorage.setItem(SELECTED_BRANCH_DATA, JSON.stringify(defaultBranch));
    }
  }, [restaurantDetails, locationId, branchDetails, dispatch]);

  
  const getImageURL = useCallback(
    (type: string) => {
      const logoMedia = restaurantDetails?.media?.find((media) => media.entityType === type);
      return logoMedia ? (
        STORAGE_BUCKET_URL +
        (logoMedia.mimeType.split("/")[0] || "img") +
        "/" +
        logoMedia.id +
        "." +
        logoMedia.mimeType.split("/")[1]
      ) : "";
    },
    [restaurantDetails]
  );

  const   handleMenuClick = (option: any) => {
    if (option.path) {
      history.push(option.path);
    }
    if (option.onClick) {
      option.onClick(dispatch);
    }
    setActiveMenu(option.name === activeMenu ? null : option.name);
  };

  const logoutUser = () => {
    dispatch(clearMenuData());
    localStorage.clear();
    dispatch(signOut());
    history.replace("/");
  };


  // const [showOfferOptions, setShowOfferOptions] = useState("");
  // const [showReportsOptions, setShowReportsOptions] = useState(false);
  // const [showOfferListNav, setShowOfferListNav] = useState(false);
  // const [routeTo, setRouteTo] = useState({});
  // const [isExpand, setIsExpand] = useState(true);
  // const [SelectSub, setSelectedSub] = useState("");
  // const [SelectSubForReport, setSelectSubForReport] = useState("");

  // useEffect(() => {
  //   setIsExpanded(true);
  //   if (location?.pathname?.includes("/productCatalog")) {
  //     setShowOptions("Product Catalog");
  //     // history.push("/productCatalog/menuListing");
  //   } else if (location?.pathname?.includes("/old-reports")) {
  //     setSelectSubForReport("Reports & Insights");
  //     setShowOptions("reportOptions");
  //   } else if (location?.pathname?.includes("report/32")) {
  //     setSelectSubForReport("Reports & Insights");
  //     setShowOptions("reportOptions");
  //   } else if (location?.pathname?.includes("/live-reports")) {
  //     setSelectSubForReport("Chart JS");
  //     setShowOptions("reportOptions");
  //   } else if (location?.pathname?.includes("/sales-reports")) {
  //     setSelectSubForReport("Sales");
  //     setShowOptions("reportOptions");
  //   } else if (
  //     location?.pathname?.includes("Offers/active") ||
  //     location?.pathname?.includes("offer/special") ||
  //     location?.pathname?.includes("Offers/completed")
  //   ) {
  //     setShowOfferOptions("MenuOptions");
  //     setSelectedSub("Special Price");
  //   } else if (location?.pathname?.includes("/Offer")) {
  //     setShowOfferOptions("MenuOptions");
  //     setSelectedSub("Offers");
  //   }
  // }, [location?.pathname]);











  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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
              (
                <img
                  src={getImageURL("LOGO")}
                  className="restaurant-logo restaurant-logo-rebranded-min"
                />
              )
            )}
          </div>
          <div className="restaurant-name-container restaurant-name-container-rebranded">
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
          </div>
        </div>

        

      <ul className="menu-items-sidebar menu-items-sidebar-rebranded">
        {menuOptions.map((option) => (
          <li key={option.name} className={activeMenu === option.name ? "activePath" : "not-active menu-items-name-rebranded"} onClick={() => handleMenuClick(option)}>
            <div className="menu-item">
              {option.icon}
              {isExpanded && <span>{option.name}</span>}
              {option.submenu && isExpanded && (
                <span className="dropdown-icon">{activeMenu === option.name ? <Uparrow /> : <Downarrow />}</span>
              )}
            </div>
            {option.submenu && activeMenu === option.name && (
              <ul className="submenu">
                {option.submenu.map((sub) => (
                  <li key={sub.name} onClick={() => history.push(sub.path)}>
                    {sub.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}

        <li className="logout-btn" onClick={logoutUser}>
          <img src={logoutIcon} alt="Logout" />
          {isExpanded && <span>Log Out</span>}
        </li>
      </ul>



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
