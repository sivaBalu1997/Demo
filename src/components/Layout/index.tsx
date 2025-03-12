import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./Layout.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { STORAGE_BUCKET_URL } from "shared/constants";
import { ReactComponent as MenuIcon } from "../../assets/svg/menuNew.svg";
import { Contextpagejs } from "pages/productCatalog/contextpage";

const Layout = ({ children }: { children: React.ReactNode }) => {
      const restaurantDetails = useSelector((state: RootState) => state.auth?.restaurantDetails);
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
  useEffect(()=>{
    setIsExpanded(false)
  },[])
  // TODO: add roles and access
  return (
    <div className={styles.layout}>
      {/* Sidebar */}

      {/* Mobile view Header */}
      <div className={styles.mainContent}>
      <header className={styles.mobMenuHeader}>
      <MenuIcon className={styles.mainMenuIcon} onClick={()=> setIsExpanded(true)}/>
     <img
              src={getImageURL("LOGO")}
              className={styles.logo}
            />
        <h1 className={styles.restaurantName}>{restaurantDetails &&
              restaurantDetails.branchName &&
              restaurantDetails.branchName.split(",")[0]}</h1>
    </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
