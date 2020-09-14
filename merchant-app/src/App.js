import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

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

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="main-section">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Auth} />
              <Route path="/basic-details" component={BasicDetails} />
              <Route path="/business" component={Business} />
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
