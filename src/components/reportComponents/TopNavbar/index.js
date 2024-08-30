import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { ThemeContext } from "../../../helpers/context/ThemeContext";

const Topnavbar = () => {
  const [active, setActive] = useState("live-reports");
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const navItems = [
    { name: "Live Reports", path: "/live-reports" },
    { name: "Sales Report", path: "/sales" },
    { name: "Product Insights", path: "/product-insights" },
    { name: "Employee Insights", path: "/employee-insights" },
    { name:"Customer Insights", path: "/customer-insights"},
    { name: "Check-In Report", path: "/check-in" },
    { name: "GenAI Report", path: "/gen-ai-reports" },
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
