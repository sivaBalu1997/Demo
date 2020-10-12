import React, { useState } from "react";
import { MdPersonOutline, MdAdd, MdClear } from "react-icons/md";

import floor from "../../../assets/images/floor_plan.png";
import { Link } from "react-router-dom";

const TableMenu = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="table-menu">
      <div onClick={() => setShow(!show)} className="circle">
        {show === false ? <MdAdd /> : <MdClear />}
      </div>
      <MenuModal show={show}>
        <div className="menu-circle">
          <Link to="/floor-plan">
            <div className="inner-circle">
              <img src={floor} alt="floor plan" />
            </div>
            <p>floor plan</p>
          </Link>
        </div>
        <div style={{ right: "97px", bottom: "230px" }} className="menu-circle">
          <div className="inner-circle">
            <MdPersonOutline />
          </div>
          <p>Employees</p>
        </div>
      </MenuModal>
    </div>
  );
};

const MenuModal = ({ children, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">{children}</section>
    </div>
  );
};

export default TableMenu;
