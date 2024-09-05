import Billing from "./pages/billing";
import BillingHistory from "pages/billing/billingHistory";
import CancelSubscription from "pages/billing/cancelSubscription";
import ChangePlan from "pages/billing/changePlan";
import Employees from "pages/employee";
import AddEmployee from "pages/employee/addEmployee";
import EmployeeDetails from "pages/employee/employeeDetails";
import AddItem from "pages/menuItem/AddItem";
import EmptyMenu from "pages/menuItems/EmtyMenu";
import AddOffer from "pages/offers/AddOffer";
import CreateOffer from "pages/offers/CreateOffer";
import Offerdetails from "pages/offers/Offerdetails";
import PreviewOffer from "pages/offers/PreviewOffer";
import TemplateOffer from "pages/offers/TemplateOffer";
import Payment from "pages/payment";
import ReviewMenu from "pages/reviewMenu";
import StickWithUs from "./pages/billing/stickWithUs";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CustomerInsights from "pages/reports/CustomerInsights";
import Sales from "pages/reports/Sales";
import ProductInsights from "pages/reports/ProductInsights";
import GenAiReports from "pages/reports/GenAi";
import CheckIn from "pages/reports/CheckIn";
import EmployeeInsights from "pages/reports/EmployeeInsights";
import { ThemeProvider } from "helpers/context/ThemeContext";
import CustIns from "pages/reports/CustomerInsi";
import Auth from "pages/auth";
import ResetPassword from "pages/auth/ResetPassword";
import BasicDetails from "pages/auth/BasicDetails";
import Business from "pages/business";
import RoleAccess from "pages/roles";
import MenuItems from "pages/menuItems";
import MenuDetials from "pages/menuDetails";
import MenuCustomization from "pages/menuCustomization";
import AddCustomizationInput from "pages/menuCustomization/AddCustomizationInput";
import NotFound from "pages/notFound";
import SidePanel from "pages/SidePanel";
import { Menulisting } from "pages/productCatalog/Menulisting/Menulisting";
import PrimaryDetailsReviewpage from "pages/productCatalog/PrimaryDetailsReviewpage/PrimaryDetailsReviewpage";
import Navigationpage from "components/productCatalog/Navigation/NavigationPage";
import PrimaryPage from "pages/productCatalog/PrimaryPage/PrimaryPage";
import PricingDetails from "pages/productCatalog/PricingDetalis/PricingDetails";
import ItemCustomizations from "pages/productCatalog/itemCustomization/ItemCustomizations";
import MainPage from "pages/productCatalog/MainPage/MainPage";
import { Contextpage } from "pages/productCatalog/contextpage";

const Routers = () => {
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
    <div>
      <Switch>
        <Contextpage>
          <ThemeProvider>
            <Route exact path="/review" component={ReviewMenu} />
            <Route exact path="/Offers" component={Offerdetails} />
            <Route
              exact
              path="/management/Offers/TemplateOffer"
              component={TemplateOffer}
            />
            <Route
              exact
              path="/management/Offers/AddOffer"
              component={AddOffer}
            />
            <Route exact path="/Offers/CreateOffer" component={CreateOffer} />
            <Route exact path="/Offers/EditOffer" component={CreateOffer} />
            <Route
              exact
              path="/management/Offers/PreviewOffer"
              component={PreviewOffer}
            />

            <Route exact path="/employees/add" component={AddEmployee} />
            <Route exact path="/employees/add/:id" component={AddEmployee} />
            <Route
              exact
              path="/employees/details/:id"
              component={EmployeeDetails}
            />

            <Route exact path="/management/billing" component={Billing} />
            <Route
              exact
              path="/management/billing/changeplan"
              component={ChangePlan}
            />
            <Route
              exact
              path="/management/billing/cancelsubscription"
              component={CancelSubscription}
            />
            <Route
              exact
              path="/management/billing/stickWithUs"
              component={StickWithUs}
            />
            <Route
              exact
              path="/management/billing/history"
              component={BillingHistory}
            />
            <Route exact path="/management/payment" component={Payment} />

            <Route exact path="/" component={Auth} />
            <Route path="/reset" component={ResetPassword} />
            <Route path="/basic-details" component={BasicDetails} />
            <Route path="/business" component={Business} />
            <Route path="/roles" component={RoleAccess} />

            <Route path="/menu" component={EmptyMenu} />
            <Route path="/menulist" component={MenuItems} />
            <Route path="/menudetails" component={MenuDetials} />
            <Route path="/menuCustomization" component={MenuCustomization} />
            <Route path="/menuInput" component={AddCustomizationInput} />
            <Route path="/review" component={ReviewMenu} />
            <Route path="/notFound" component={NotFound} />
            <Route path="/management" component={SidePanel} />
            <Route exact path="/employees" component={Employees} />
            <Route exact path="/menu/Items" component={EmptyMenu} />
            <Route exact path="/menu/Items/Add" component={AddItem} />
            <Route
              exact
              path="/menu/Items/update/:itemId"
              component={AddItem}
            />

            <div
              style={{ width: "100%", display: "flex" }}
              className="landingpage"
            >
              {belowMinWidth ? (
                <div className="warning-message">
                  Your screen width is below the minimum width of {MIN_WIDTH}px.
                  Please resize your window.
                </div>
              ) : (
                <>
                  <div>
                    <Switch>
                      <Route
                        exact
                        path="/menuListing"
                        component={Menulisting}
                      />
                      <Route
                        path="/productCatalog/Reviewpage"
                        component={PrimaryDetailsReviewpage}
                      />
                      <Route path="/productCatalog/Navigationpage">
                        <Navigationpage />
                      </Route>
                      <Route
                        path="/productCatalog/PrimaryDetails"
                        component={PrimaryPage}
                      />
                      <Route
                        path="/productCatalog/Pricingandkitchendetails"
                        component={PricingDetails}
                      />
                      <Route
                        path="/productCatalog/Itemcustomizations"
                        component={ItemCustomizations}
                      />
                    </Switch>
                  </div>
                </>
              )}
            </div>

            <Route exact path="/sales" component={Sales} />
            <Route exact path="/live-reports" component={CustomerInsights} />
            <Route
              exact
              path="/employee-insights"
              component={EmployeeInsights}
            />
            <Route exact path="/product-insights" component={ProductInsights} />
            <Route exact path="/check-in" component={CheckIn} />
            <Route exact path="/gen-ai-reports" component={GenAiReports} />
            <Route exact path="/customer-insights" component={CustIns} />
          </ThemeProvider>
        </Contextpage>
      </Switch>
    </div>
  );
};

export default Routers;
