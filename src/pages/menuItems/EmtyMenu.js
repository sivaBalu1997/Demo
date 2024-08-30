import React from "react";
import menuIcon from "../../assets/images/emptyMenu.png";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import SidePanel from "pages/SidePanel";

const Menu = () => {
  return (
    <div className="EmptyMenuContainer" style={{display:'flex', flexDirection:'row', width:'85%'}}>
      <SidePanel />
      <div className="menu-items">
      <h2>Menu Items</h2>
      <div className="header-menu">
        <div className="empty-menu">
          <img src={menuIcon} alt={"menu"} />
          <h3>Start Adding Your Menu By Clicking The Button</h3>
          <div className="create-menu">
            <Link to="/menudetails">
              <button>
                <IoIosAdd />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Menu;
