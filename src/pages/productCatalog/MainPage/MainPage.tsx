import React, { useState, useEffect } from "react";
import "./MainPage.scss";
import Sidenav from "../../../components/productCatalog/SideNav/Sidenav";
import { Route, Switch } from "react-router-dom";
import { Menulisting } from "../Menulisting/Menulisting";
import PrimaryDetailsReviewpage from "../PrimaryDetailsReviewpage/PrimaryDetailsReviewpage";
import Navigationpage from "components/productCatalog/Navigation/NavigationPage";
import PrimaryPage from "../PrimaryPage/PrimaryPage";
import PricingDetails from "../PricingDetalis/PricingDetails";
import ItemCustomizations from "../itemCustomization/ItemCustomizations";
import { Contextpage } from "../contextpage";

const MainPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const MIN_WIDTH = 800;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [belowMinWidth, setBelowMinWidth] = useState(
    window.innerWidth <= MIN_WIDTH
  );
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setBelowMinWidth(window.innerWidth <= MIN_WIDTH);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div >
      {belowMinWidth ? (
        <div className="warning-message">
          Your screen width is below the minimum width of {MIN_WIDTH}px. Please
          resize your window.
        </div>
      ) : (
        <>
          <Contextpage>
          <div> <Sidenav /></div> 
            <div>
              <Switch>
                <Route exact path="/productCatalog" component={Menulisting} />
                <Route path="/productCatalog/Reviewpage" component={PrimaryDetailsReviewpage} />
                <Route path="/productCatalog/Navigationpage">
                  <Navigationpage />
                </Route>
                <Route path="/productCatalog/PrimaryDetails" component={PrimaryPage} />
                <Route path="/productCatalog/Pricingandkitchendetails" component={PricingDetails} />
                <Route path="/productCatalog/Itemcustomizations" component={ItemCustomizations} />
              </Switch>
            </div>
          </Contextpage>
        </>
      )}
    </div>
  );
};
export default MainPage;
