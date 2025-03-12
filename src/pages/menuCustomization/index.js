import React from "react";
import customization from "../../assets/images/customization.png";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import SidePanel from "pages/SidePanel/indexOld";

const MenuCustomization = () => {
  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      <SidePanel />
      <div className="menu-sec">
      <div className="menu-items">
        <h2>Add Customization</h2>
        <div className="header-menu">
          <div className="empty-menu">
            <img src={customization} alt={"menu"} />
            <h3>
              Add Customization If You have Any Or Review The Menu And Save
            </h3>
            <div className="add-custom">
              <Link to="/menuInput">
                <Button
                  iconType={"add"}
                  type=""
                  value={"Add Customization"}
                  backgroundColor={"#2196F3"}
                  color={"#fff"}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="form-cta">
        <Link to="/menudetails">
          <Button value={"Cancel"} backgroundColor={"#fff"} color={"#979797"} />
        </Link>
        <Link to="/review">
          <Button
            type={"submit"}
            value={"Review The menu"}
            backgroundColor={"#FF5554"}
            color={"#fff"}
          />
        </Link>
      </div>
    </div>
    </div>
  );
};

export default MenuCustomization;
