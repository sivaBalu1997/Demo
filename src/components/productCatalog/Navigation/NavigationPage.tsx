import { useState, useEffect, useContext } from "react";
import React from "react";
import "./Navigation.scss";
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import { useLocation, useHistory } from "react-router-dom";

interface LocationState {
  pagename: string;
}

const Navigationpage = () => {
  const { isExpanded } = useContext(Contextpagejs);

  const categories = [
    "Primary Details",
    "Pricing and kitchen details",
    "Itemcustomizations",
  ];

  const history = useHistory();
  const location = useLocation<LocationState | undefined>(); 

  const [currentPage, setCurrentPage] = useState<string>("Primary Details");

  useEffect(() => {
    if (location.state?.pagename) {
      setCurrentPage(location.state.pagename);
    }
  }, [location.state?.pagename]);

  const handleCategoryClick = (category: string) => {
    setCurrentPage(category);
    const path = category.replace(/\s+/g, "");
    history.push(`/productCatalog/${path}`, { pagename: category });
  }


  return (
    <>
      <div className={"navigation"}>
        <h1 className="Mainheading">Creating new menu item</h1>
        <nav className="nav">
          <ul className={isExpanded ? "listofnavigationExpanded" : "listofnavigation"}>
            {categories.map((category, index) => (
              <li
                key={category}
                className={isExpanded ? "listsExpanded" : "lists"}
                onClick={() => handleCategoryClick(category)}
              >
                <h1
                  className={`list-text ${category === currentPage ? "activetext" : ""}`}
                >
                  {`Step ${index + 1}: ${category}`}
                </h1>
                <div
                  className={`${isExpanded ? "navbar" : "navbarExpanded"} ${
                    category === currentPage ? "active" : ""
                  }`}
                ></div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigationpage;
