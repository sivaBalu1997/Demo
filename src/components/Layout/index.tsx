import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./Layout.module.scss";
import {  useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { STORAGE_BUCKET_URL } from "shared/constants";
import { ReactComponent as MenuIcon } from "../../assets/svg/menuNew.svg";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { useLocation } from "react-router";
// import { getEmployeePermissionsRequest } from "redux/employee/employeeActions";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const restaurantDetails = useSelector((state: RootState) => state.auth?.restaurantDetails);
  const location = useLocation();
  // const dispatch=useDispatch()
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
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
  // const staff:any=localStorage?.getItem("CREDENTIALS")
  //     const staffId=JSON.parse(staff)?.id  
  //   useEffect(() => {
  //     if (staffId) {
  //       dispatch(getEmployeePermissionsRequest({ staffId: staffId }));
  //     }
  //   }, [dispatch, staffId]);
  // TODO: add roles and access
  return (
    <div className={styles.layout}>
      {/* Sidebar */}

      {/* Mobile view Header */}
      <div className={styles.mainContent}>
        {location?.pathname !== "/" ? <header className={styles.mobMenuHeader}>
          <MenuIcon className={styles.mainMenuIcon} onClick={() => setIsExpanded(true)} />
          <img
            src={getImageURL("LOGO")}
            className={styles.logo}
          />
          <h1 className={styles.restaurantName}>{restaurantDetails &&
            restaurantDetails.branchName &&
            restaurantDetails.branchName.split(",")[0]}</h1>
        </header> : null}

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
