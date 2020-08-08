import React from "react";
import { FaRegBell } from "react-icons/fa";

import "../../../styles/table-mangagement/header.scss";

const Header = () => {
  return (
    <div className="header">
      <h2>Dashboard</h2>
      <div>
        <span>3</span>
        <FaRegBell />
      </div>
    </div>
  );
};

export default Header;
