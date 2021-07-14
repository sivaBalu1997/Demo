import React, { useState, Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/menus.scss";
import { useDispatch, useSelector } from "react-redux";
import { getMenus } from "../../redux/actions/menuAction";
import { ReactComponent as EmptyIcon } from "../../assets/svg/emptymenu.svg";
import { ReactComponent as AddIcon } from "../../assets/svg/add.svg";
import { ReactComponent as UploadIcon } from "../../assets/svg/upload.svg";
import { ReactComponent as SortByIcon } from "../../assets/svg/sort.svg";
import { ReactComponent as FilterIcon } from "../../assets/svg/filter.svg";
import { ReactComponent as ExportIcon } from "../../assets/svg/export.svg";
import { ReactComponent as SearchIcon } from "../../assets/svg/search.svg";
import { ReactComponent as TickIcon } from "../../assets/svg/tickIcon.svg";
import { ReactComponent as PlusIcon } from "../../assets/svg/plus.svg";
import { ReactComponent as Loader } from "../../assets/svg/loader.svg";
import MenuItem from "./MenuItem";
const EmptyMenu = () => {
  const dispatch = useDispatch();
  const menuList = useSelector((state) => state.menu.menu.menu);
  const menuLoading = useSelector(
    (state) => state && state.menu && state.menu.getMenuLoading
  );
  const branchDetails = useSelector((state) => state.auth.selectedBranch);
  useEffect(() => {
    if (branchDetails && branchDetails.id) {
      dispatch(getMenus({ locationId: branchDetails.id, type: "DineIn" }));
    }
  }, [branchDetails]);

  useEffect(() => {
    if (menuList) {
      setmenuItemLength(menuList.length);
    }
  }, [menuList]);
  const history = useHistory();
  const [menuItemLength, setmenuItemLength] = useState();
  return (
    <>
      <Fragment>
        <div className="container">
          <div>
            <div className="header">
              <span>Items({menuItemLength})</span>
              <div className="header-right-container">
                {/* <div className="search-box-container">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                  />
                  <SearchIcon />
                </div> */}
                {/* <div
                  className="addItem-button-container"
                  onClick={() => history.push("/management/menu/Items/Add")}
                >
                  <PlusIcon className="plus-icon" />

                  <span className="addItem-text"> Add Menu Item</span>
                </div> */}
              </div>
            </div>
          </div>
          {/* {menuItemLength >= 0 && ( */}
          <Fragment>
            <div className="row2">
              <div>
                <span className="select-item-text">
                  Please select items to see the actions.
                </span>
              </div>
              {/* <div className="action-container">
                <div className="action-icon-container">
                  <ExportIcon />
                  <span className="action-text">Export</span>
                </div>
                <div className="action-icon-container">
                  <SortByIcon />
                  <span className="action-text">Sort by</span>
                </div>
                <div className="action-icon-container">
                  <FilterIcon />
                  <span className="action-text">Filter</span>
                </div>
              </div> */}
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    {/* <td>
                      <input
                        name="isGoing"
                        type="checkbox"
                        // checked={this.state.isGoing}
                        // onChange={this.handleInputChange}
                      />
                    </td> */}
                    {/* <td scope="col">Image</td> */}
                    <td scope="col">Item Name</td>
                    {/* <td scope="col">Code</td> */}
                    <td scope="col">Price</td>
                    {/* <td scope="col">Available at</td> */}
                    <td scope="col">Status </td>
                  </tr>
                  {/* </div> */}

                  <tr>
                    {/* <td scope="col" className="empty"></td> */}
                    {/* <td scope="col" className="empty"></td> */}
                    <td scope="col" className="empty"></td>
                    {/* <td scope="col" className="empty"></td> */}
                    <td scope="col" className="empty"></td>
                    {/* <td scope="col" className="empty"></td> */}
                    <td className="sub-category-container">
                      <div className="sub-category-inner-container">
                        <span className="sub-category">Availability </span>
                        {/* <span className="sub-category">Pickup</span> */}
                        {/* <span className="sub-category">Delivery</span> */}
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody style={{ marginTop: "5px" }}>
                  {menuList &&
                    menuList.map((u, i) => {
                      return <MenuItem key={u.itemId} data={u} />;
                    })}
                  {/* <MenuItem /> */}
                </tbody>
                {/* <tbody style={{ marginTop: "5px" }}> </tbody> */}
              </table>
              {menuLoading && (
                <div className="loader-container">
                  <Loader height="100px" width="100px" />
                </div>
              )}
            </div>
          </Fragment>
          {/* )} */}
          {menuItemLength === 0 && (
            <Fragment>
              <div className="svgContainer">
                <EmptyIcon />
              </div>
              <div className="bottomContainer">
                <div className="buttonContainer">
                  <div
                    className="button"
                    onClick={() => history.push("/management/menu/Items/Add")}
                  >
                    <AddIcon height="20px" /> Add Item
                  </div>
                </div>
                <span className="secondaryText">
                  Start adding Menu items by clicking the Add button
                </span>

                <span className="secondaryText">or</span>
                <div className="buttonContainer">
                  <div className="button">
                    <UploadIcon height="20px" /> Upload
                  </div>
                </div>
                <span className="secondaryText">
                  You can upload menu groups/items from excel files
                </span>
              </div>
            </Fragment>
          )}
        </div>
      </Fragment>
      {/* )} */}
    </>
  );
};

export default EmptyMenu;
