import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

import empty from "../../../assets/images/empty_case.png";
import "../../../styles/table-mangagement/floorPlan.scss";
import { Link } from "react-router-dom";
import FloorMenu from "../floorMenu";

const FloorPlan = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSection, setSectionModal] = useState(false);

  return (
    <div className="floor-sec">
      <div className="floor-header">
        <Link to="/">
          <MdKeyboardArrowLeft />
        </Link>
        <h2>Floor Plan</h2>
      </div>
      <div className="floor-landing">
        <div className="empty-case">
          <img src={empty} alt="empty-case" />
          <div>
            <h3>Start creating your floor plan</h3>
            <p>
              Use our layout tools to customize your tables
              <br /> and add section
            </p>
          </div>
        </div>
      </div>
      <FloorMenu
        openModal={openModal}
        setOpenModal={setOpenModal}
        openSection={openSection}
        setSectionModal={setSectionModal}
      />
    </div>
  );
};

export default FloorPlan;
