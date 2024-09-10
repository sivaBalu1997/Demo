import { useState, useEffect, useContext } from "react";
import React from "react";
import "./Navigation.scss";
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import {
  useLocation,
  useHistory,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
// import PrimaryPage from "pages/productCatalog/PrimaryPage/PrimaryPage";
// import PricingDetails from "pages/productCatalog/PricingDetalis/PricingDetails";
// import ItemCustomizations from "pages/productCatalog/itemCustomization/ItemCustomizations";
// import PrimaryDetailsReviewpage from "pages/productCatalog/PrimaryDetailsReviewpage/PrimaryDetailsReviewpage";
// import { Menulisting } from "pages/productCatalog/Menulisting/Menulisting";

const Navigationpage = () => {
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);

  const categories = [
    "Primary Details",
    "Pricing and kitchen details",
    "Item customizations",
  ];

  const history = useHistory();
  const location:any = useLocation();    //need to change the type annotation

  const { pagename } = location.state || {};
  const { path } = useRouteMatch();

  const handleCategoryClick = (category:string) => {
    const path = category.replace(/\s+/g, "");
    history.push(`/productCatalog/${path}`, { state: { pagename: category } });
  };

  // useEffect(() => {
  //   if (!pagename) {
  //     history.push(`/productCatalog/PrimaryDetails`, {
  //       state: { pagename: "Primary Details" },
  //     });
  //   }
  // }, [pagename, history]);

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
                  className={`list-text ${category === pagename ? "activetext" : ""}`}
                >
                  {`Step ${index + 1}: ${category}`}
                </h1>
                <div
                  className={`${isExpanded ? "navbar" : "navbarExpanded"} ${category === pagename ? "active" : ""}`}
                ></div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* <Switch>
        <Route path="/productCatalog/PrimaryDetails" component={PrimaryPage} />
        <Route path="/productCatalog/Pricingandkitchendetails" component={PricingDetails} />
        <Route path="/productCatalog/Itemcustomizations" component={ItemCustomizations} />
        <Route path="/productCatalog/Reviewpage" component={PrimaryDetailsReviewpage} />
        <Route path="/productCatalog" component={Menulisting} exact />
      </Switch> */}
    </>
  );
};

export default Navigationpage;
