import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../../helpers/context/ThemeContext";
import "./style.scss";

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
    <nav
      className={`t-navbar ${isDarkTheme ? "t-dark-theme" : "t-light-theme"}`}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={`t-nav-item ${active === item.name ? "t-active" : ""}`}
          onClick={() => setActive(item.name)}
        >
          {item.name}
        </NavLink>
      ))}
      <div className="t-theme-toggle">
        <label className="t-switch">
          <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
          <span className="t-slider t-round"></span>
        </label>
      </div>
    </nav>
  );
};

export default Topnavbar;
