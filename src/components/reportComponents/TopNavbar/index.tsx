import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import "./style.scss";
import ShrinkedReportMenu from "../ShrinkedReportMenu";
import { Contextpagejs } from "pages/productCatalog/contextpage";

interface NavItemType {
  name: string;
  path: string;
}

interface NavItemType {
  name: string;
  path: string;
}

const Topnavbar = () => {
  const [active, setActive] = useState("live-reports");
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);

  const navItems: NavItemType[] = [
    { name: "Sales Report", path: "/sales" },
    { name: "Live Reports", path: "/live-reports" },
    { name: "Employee Insights", path: "/employee-insights" },
    { name: "Product Insights", path: "/product-insights" },
    { name: "Customer Insights", path: "/customer-insights" },
    { name: "Check-In Report", path: "/check-in" },
    { name: "GenAI Report", path: "/gen-ai-reports" },
  ];

  const location = useLocation();

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  console.log("tp", isExpanded);

  return (
    <nav
      className={`t-navbar ${isDarkTheme ? "t-dark-theme" : "t-light-theme"} ${
        isExpanded ? "t-expanded-topnavbar" : ""
      }`}
    >
      <ShrinkedReportMenu />
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={`t-nav-item ${active === item.path ? "t-active" : ""}`}
        >
          {item.name}
          {active === item.path ? <hr className="topNavbarLine" /> : ""}
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
