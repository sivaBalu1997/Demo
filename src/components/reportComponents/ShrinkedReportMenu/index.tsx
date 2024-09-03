// import React from "react";
// import "./style.scss";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import "./style.scss";

type NavItemType = {
  name: string;
  path: string;
};

const navItems: NavItemType[] = [
  { name: "Live Reports", path: "/live-reports" },
  { name: "Sales Report", path: "/sales" },
  { name: "Product Insights", path: "/product-insights" },
  { name: "Employee Insights", path: "/employee-insights" },
  { name: "Customer Insights", path: "/customer-insights" },
  { name: "Check-In Report", path: "/check-in" },
  { name: "GenAI Report", path: "/gen-ai-reports" },
];

const ShrinkedReportMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (path: string) => {
    history.push(path);
    setIsOpen(false); // Close menu after navigation
  };

  return (
    <div className="r-hamburger-menu">
      <div className="r-hamburger-icon" onClick={toggleMenu}>
        &#9776; {/* Hamburger icon */}
      </div>
      {isOpen && (
        <div className="r-menu">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="r-menu-item"
              onClick={() => handleNavClick(item.path)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShrinkedReportMenu;
