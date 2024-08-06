import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter, useHistory } from "react-router-dom";
import store from "./redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";

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
import ResetPassword from "./components/Auth/ResetPassword";
import { CREDENTIALS } from "./shared/constants";
import { ClearSignIn, signOut, storeCredentials } from "./redux/actions/authActions";
import NotFound from "./components/notFound";
import Menu from "./components/menu";
import { clearMenuData } from "./redux/actions/menuAction";

const Loader = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const credentails = JSON.parse(localStorage.getItem(CREDENTIALS));
    //console.log("Credentials:", credentails);
    if (credentails) {
      dispatch(storeCredentials(credentails));
    }
  }, []);
  return <span></span>;
};

const App = () => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--wHeight",
      window.innerHeight + "px"
    );

    document.documentElement.style.setProperty(
      "--wWidth",
      window.innerWidth + "px"
    );
    //console.log(window.innerHeight, window.innerWidth);
  }, []);

  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();



  useEffect(async() => {
    const credentails = JSON.parse(await localStorage.getItem(CREDENTIALS));
    if (!credentails?.accessToken) {
    //  console.log('60');
    //     history.push("/management/employees");
    //   }else{ 
        dispatch(clearMenuData());
        localStorage.clear();
        dispatch(signOut());
        history.replace('/')
      }
  }, [authState?.credentials]);

  return (
   <>
      <Loader />
      <div className="app">
        <div className="main-section">
          
            <Switch>
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
              <Route path="/management" component={Menu} />
            </Switch>
        </div>
      </div>
    </>
  );
}

export default App;

// Restaurant_Owner, Restaurant_Manager, System_Admin, Owner, Cashier,Supervisor, Waiter, Host, Employee
