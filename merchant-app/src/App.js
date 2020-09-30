import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter, useHistory } from "react-router-dom";
import store from "./redux/store";
import { Provider, useDispatch } from "react-redux";

import "./styles/app.scss";
import EmptyMenu from "./components/menuItems/EmtyMenu";
import MenuItems from "./components/menuItems";
import MenuDetials from "./components/menuDetails";
import MenuCustomization from "./components/menuCustomization";
import AddCustomizationInput from "./components/menuCustomization/AddCustomizationInput";
import ReviewMenu from "./components/reviewMenu";
import Auth from "./components/Auth";
import BasicDetails from "./components/Auth/BasicDetails";
import Business from "./components/business";
import Employees from "./components/employees";
import RoleAccess from "./components/roles";
import ForgotPsd from "./components/Auth/ForgotPsd";
import { CREDENTIALS } from "./shared/constants";
import { storeCredentials } from "./redux/actions/authActions";

const Loader = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const credentails = JSON.parse(localStorage.getItem(CREDENTIALS));
    // console.log("Credentials:", credentails);
    if (credentails) {
      dispatch(storeCredentials(credentails));
    }
  }, []);
  return <span></span>;
};

function App() {
  return (
    <Provider store={store}>
      <Loader />
      <div className="app">
        <div className="main-section">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Auth} />
              <Route path="/reset" component={ForgotPsd} />
              <Route path="/basic-details" component={BasicDetails} />
              <Route path="/business" component={Business} />
              <Route path="/employees" component={Employees} />
              <Route path="/roles" component={RoleAccess} />
              <Route path="/menu" component={EmptyMenu} />
              <Route path="/menulist" component={MenuItems} />
              <Route path="/menudetails" component={MenuDetials} />
              <Route path="/menuCustomization" component={MenuCustomization} />
              <Route path="/menuInput" component={AddCustomizationInput} />
              <Route path="/review" component={ReviewMenu} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </Provider>
  );
}

export default App;

// Restaurant_Owner, Restaurant_Manager, System_Admin, Owner, Cashier,Supervisor, Waiter, Host, Employee
