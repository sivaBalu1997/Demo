import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

import Menu from "./components/menu";
import "./styles/app.scss";
import EmptyMenu from "./components/menuItems/EmtyMenu";
import MenuItems from "./components/menuItems";
import MenuDetials from "./components/menuDetails";
import MenuCustomization from "./components/menuCustomization";
import AddCustomizationInput from "./components/menuCustomization/AddCustomizationInput";
import ReviewMenu from "./components/reviewMenu";
import Auth from "./components/Auth";
// import Home from "./components/tableManagement/home";
// import FloorPlan from "./components/tableManagement/floorPlan/index";
// import AddTableView from "./components/tableManagement/floorPlan/AddTableView";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="main-section">
          <BrowserRouter>
            {/* <Menu /> */}
            <Switch>
              <Route exact path="/" component={Auth} />
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
