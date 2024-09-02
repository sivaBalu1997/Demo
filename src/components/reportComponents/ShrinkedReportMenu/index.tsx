// import React from "react";
// import "./style.scss";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavItemClick = (path: string) => {
    history.push(path);
    setIsOpen(false); // Close the menu after navigation
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-menu__button" onClick={toggleMenu}>
        <span className="hamburger-menu__icon"></span>
        <span className="hamburger-menu__icon"></span>
        <span className="hamburger-menu__icon"></span>
      </button>
      <div className={`hamburger-menu__overlay ${isOpen ? "open" : ""}`}>
        <ul className="hamburger-menu__list">
          {navItems.map((item) => (
            <li key={item.path} className="hamburger-menu__item">
              <button
                onClick={() => handleNavItemClick(item.path)}
                className="hamburger-menu__link"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShrinkedReportMenu;
