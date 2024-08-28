import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { ThemeContext } from "../../../helpers/context/ThemeContext";

const Topnavbar = () => {
  const [active, setActive] = useState("live-reports");
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const navItems = [
    { name: "Live Reports", path: "/management/live-reports" },
    { name: "Sales Report", path: "/management/sales" },
    { name: "Product Insights", path: "/management/product-insights" },
    { name: "Employee Insights", path: "/management/employee-insights" },
    { name:"Customer Insights", path: "/management/customer-insights"},
    { name: "Check-In Report", path: "/management/check-in" },
    { name: "GenAI Report", path: "/management/gen-ai-reports" },
  ];

  return (
    <nav className={`navbar ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={`nav-item ${active === item.name ? "active" : ""}`}
          onClick={() => setActive(item.name)}
        >
          {item.name}
        </NavLink>
      ))}
      <div className="theme-toggle">
        <label className="switch">
          <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
      </div>
    </nav>
  );
};

export default Topnavbar;
