import React, { useState } from "react";
import { MdAdd, MdClear } from "react-icons/md";

import table from "../../../assets/images/table.png";
import section from "../../../assets/images/section.png";
import Modal from "../../common/modal";
import AddTable from "./AddTable";
import AddSection from "./AddSection";

const FloorMenu = ({
  openModal,
  setOpenModal,
  setSectionModal,
  openSection,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="table-menu">
      <div
        onClick={() => setShow(!show)}
        className="circle"
        style={{ zIndex: "unset" }}
      >
        {show === false ? <MdAdd /> : <MdClear />}
      </div>
      <MenuModal show={show}>
        <div onClick={() => setOpenModal(true)} className="menu-circle">
          <div className="inner-circle">
            <img src={table} alt="floor plan" />
          </div>
          <p style={{ color: "#000" }}>Add Table</p>
        </div>
        <div
          onClick={() => setSectionModal(true)}
          style={{ right: "97px", bottom: "230px" }}
          className="menu-circle"
        >
          <div className="inner-circle">
            <img src={section} alt="floor plan" />
          </div>
          <p style={{ color: "#000" }}>Add section</p>
        </div>
      </MenuModal>
      <Modal openModal={openModal}>
        <AddTable setOpenModal={setOpenModal} />
      </Modal>
      <Modal openModal={openSection}>
        <AddSection setOpenModal={setSectionModal} />
      </Modal>
    </div>
  );
};

const MenuModal = ({ children, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div style={{ background: "transparent" }} className={showHideClassName}>
      <section className="modal-main">{children}</section>
    </div>
  );
};

export default FloorMenu;
