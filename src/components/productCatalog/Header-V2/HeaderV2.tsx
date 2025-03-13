import React from "react";
import "./styles.scss";
import filterIcon from "../../../assets/svg/FilterIcon.svg";
import sync from "../../../assets/svg/syncIcon.svg";
import addItem from "../../../assets/svg/AddItemIcon.svg";
import SearchBar from "../NewSearchbar/SearchBar";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDataRequest,
  scheduleFCM,
  triggerFcm,
} from "redux/productCatalog/productCatalogActions";
import { RootState } from "redux/rootReducer";
import SearchBox from "../SearchBox/SearchBox1";

const HeaderV2 = (props: any) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeDataRequest());
    history.push("/productCatalog/PrimaryDetails");
  };

  const restaurantDetails = useSelector(
    (state: RootState) => state?.auth.restaurantDetails
  );
  const fcMEventloading = useSelector(
    (state: RootState) => state.productCatalog?.fcMEventloading
  );
  const menuData = useSelector(
    (state: RootState) => state.productCatalog?.menuData
  );

  const syncByFcm = () => {
    const cuurentMenuTypes = restaurantDetails?.orderTypes
      ?.filter((type) => {
        return type.typeGroup !== "I";
      })
      .map((type) => {
        return type.typeGroup !== "I" && type.typeName;
      });

    dispatch(
      triggerFcm({
        topic: restaurantDetails?.id,
        eventName: "MENU_UPDATE",
        locationId: restaurantDetails?.id,
        updateMenuType: cuurentMenuTypes,
        sendToDefaultDeviceOnly: false,
      })
    );

    const date = new Date();
    let day = String(date.getDate() + 1);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    day = String(day).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}`;

    dispatch(
      scheduleFCM({
        topic: restaurantDetails?.id,
        eventName: "SCHEDULE_UPDATE",
        locationId: restaurantDetails?.id,
        updateMenuType: cuurentMenuTypes,
        sendToDefaultDeviceOnly: false,
        scheduledTime: `${formattedDate} 11:00:00`,
      })
    );
  };

  const getCombinedItems = (): any => {
    const combinedItems: any = [];
    menuData.forEach((category: any) => {
      category?.itemResponseList?.forEach((item: any) => combinedItems.push(item));
      category?.subCategoryResponseList?.forEach((subCategory: any) => {
        subCategory?.itemResponseList?.forEach((item: any) => combinedItems.push(item));
      });
    });
    return combinedItems || [];
  };

  const combinedItems = getCombinedItems();
  const itemCount = combinedItems?.length || 0;

  return (
    <div className="headerV2">
      <p className="v2-menuCount">Menu - {itemCount}</p>

      <div className="v2-searchBar">
        <SearchBox />
      </div>

      {/* <div className="v2-filterProd">
        <img
          src={filterIcon}
          alt="filter-productCatalogue"
          className="filterProd"
        />
      </div> */}

      <div
        className={
          !fcMEventloading ? "sync-container" : "sync-container-loading"
        }
        onClick={!fcMEventloading ? syncByFcm : undefined}
        style={{ cursor: fcMEventloading ? "not-allowed" : "pointer" }}
      >
        {!fcMEventloading ? (
          <>
            <img src={sync} alt="syncIcon" className="syncIcon" />
            <p>Sync</p>
          </>
        ) : (
          <>
            <img src={sync} alt="syncIcon" className="syncIcon" />
            <p>Syncing...</p>
          </>
        )}
      </div>

      <div className="addItem-header" onClick={() => handleClick()}>
        <img src={addItem} alt="addItem" className="addItemIcon" />
      </div>
    </div>
  );
};

export default HeaderV2;
