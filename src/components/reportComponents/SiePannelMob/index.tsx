import React, { useCallback, useEffect, useState } from "react";
import { ReactComponent as EmployeesIcon } from "../../../assets/svg/employees.svg";
import { ReactComponent as Stats } from "../../../assets/svg/statistics.svg";
import { ReactComponent as Tableware } from "../../../assets/svg/tableware.svg";
import { ReactComponent as Uparrow } from "../../../assets/svg/up_arrow.svg";
import { ReactComponent as Downarrow } from "../../../assets/svg/down_arrow.svg";
import { ReactComponent as Offer } from "../../../assets/svg/offer.svg";
import { ReactComponent as CloseIcon } from "../../../assets/svg/close.svg";
import  {ReactComponent as LogoutIcon } from "../../../assets/svg/LogoutIcon.svg";
import { removeDataRequest } from "redux/productCatalog/productCatalogActions";

import styles from "./SidePannelMob.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { STORAGE_BUCKET_URL } from "shared/constants";
import { RootState } from "redux/rootReducer";
import { getRestaurantRequest, signOut } from "redux/auth/authActions";
import { useHistory, useLocation } from "react-router";
import { clearMenuData } from "redux/menu/menuAction";
import path from "path";

interface SidePannelMobProps {
  handleClose: () => void;
}

const menuOptions = [
  {
    name: "Employees",
    path: "/employees",
    icon: <EmployeesIcon  className={styles.menuIcon}/>,
  },
  {
    name: "Product Catalog",
    path: "/productCatalog/menuListing",
    icon: <Tableware  className={styles.menuIcon} />,
    onClick: (dispatch: any) => dispatch(removeDataRequest()),
  },
  {
    name: "Offer Management",
    icon: <Offer  className={styles.menuIcon}/>,
    submenu: [{ name: "Special Price", path: "/Offers/active" }],
  },
  {
    name: "Reports & Insights",
    icon: <Stats className={styles.menuIcon} />,
    submenu: [
      { name: "Old Reports", path: "/old-reports" },
      // { name: "Chart JS", path: "/live-reports" },
      { name: "Sales Reports", path: "/sales-reports" },
      { name: "Check-in Reports", path: "/check-in-reports" },
    ],
  },
];

const parentPaths:Record<string, string[]>={
  "Employees":["/employees"],
  "Product Catalog":["/productCatalog/menuListing"],
  "Offer Management":["/Offers/active"],
  "Reports & Insights":["/old-reports","/live-reports","/sales-reports","/check-in-reports"]
}


const SidePannelMob = ({ handleClose }: SidePannelMobProps) => {
  const menuOptions = [
    {
      name: "Employees",
      path: "/employees",
      icon: <EmployeesIcon  className={styles.menuIcon}/>,
    },
    {
      name: "Product Catalog",
      path: "/productCatalog/menuListing",
      icon: <Tableware  className={styles.menuIcon} />,
      // onClick: (dispatch: any) => dispatch(removeDataRequest()),
    },
    {
      name: "Offer Management",
      icon: <Offer  className={styles.menuIcon}/>,
      submenu: [{ name: "Special Price", path: "/Offers/active" }],
    },
    {
      name: "Reports & Insights",
      icon: <Stats className={styles.menuIcon} />,
      submenu: [
        { name: "Old Reports", path: "/old-reports" },
        { name: "Chart JS", path: "/live-reports" },
        { name: "Sales Reports", path: "/sales-reports" },
        // { name: "Check-in Reports", path: "/check-in-reports" },
      ],
    },
    {
      name:"Log Out",
      icon:<LogoutIcon className={styles.menuIcon} />,
      path:"",
      onClick: () =>logoutUser(),
    }
  ];


  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const restaurantDetails = useSelector((state: RootState) => state.auth?.restaurantDetails);
  const locationId = useSelector((state: RootState) => state.auth.credentials?.locationId);
  const dispatch = useDispatch()
    const history = useHistory();//TODO : replae History with useNavigate
      const location = useLocation();

  useEffect(() => {
    if (locationId && !restaurantDetails) {
      dispatch(getRestaurantRequest(locationId));
    }
  }, [locationId, restaurantDetails, dispatch]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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

  const handlePathChange = (path: string) => {
    if(path){
      history.push(path);
      handleClose() 
    }
  }
  
    const logoutUser = () => {
      console.log(111);      
      dispatch(clearMenuData());
      localStorage.clear();
      dispatch(signOut());
      history.replace("/");
    };
  
  return (
    <div className={styles.sidebarContainer}>

      <div className={styles.sidebar}>
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <img
              src={getImageURL("LOGO")}
              className="restaurant-logo restaurant-logo-rebranded"
            />
            <CloseIcon className={styles.closeIcon} onClick={handleClose} />
          </div>
          <div>

            <h2>{restaurantDetails &&
              restaurantDetails.branchName &&
              restaurantDetails.branchName.split(",")[0]}
            </h2>

            <span>

              {restaurantDetails &&
                restaurantDetails.branchName &&
                restaurantDetails.branchName.split(",")[1]}
            </span>
          </div>
        </div>
        <nav className={styles.nav}>
          <ul>
            {menuOptions.map((menu) => (
              <>
                <li className={`${styles.navItem} ${parentPaths?.[`${menu?.name}`]?.includes(location?.pathname)?styles.activeParemt:""}`} onClick={() => menu.submenu ? toggleSection(menu.name):menu?.onClick?menu?.onClick():handlePathChange(menu.path)}>
                  {menu.icon} {menu.name} {menu.submenu && (openSections[menu.name] ? <Uparrow /> : <Downarrow />)}
                </li>
                {menu.submenu && openSections[menu.name] && (
                  <ul className={styles.submenu}>
                    {menu.submenu.map((sub) => (
                      <li key={sub.path}  className={location.pathname===sub.path?styles?.activeItem:""} onClick={() => handlePathChange(sub?.path)}>{sub.name}</li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidePannelMob;
