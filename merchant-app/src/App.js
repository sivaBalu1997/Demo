import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

// import Menu from "./components/menu";
import "./styles/app.scss";
// import EmptyMenu from "./components/menuItems/EmtyMenu";
// import MenuItems from "./components/menuItems";
// import MenuDetials from "./components/menuDetails";
// import MenuCustomization from "./components/menuCustomization";
// import AddCustomizationInput from "./components/menuCustomization/AddCustomizationInput";
// import ReviewMenu from "./components/reviewMenu";
import Home from "./components/tableManagement/home";
import FloorPlan from "./components/tableManagement/floorPlan/index";
import AddTableView from "./components/tableManagement/floorPlan/AddTableView";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="main-section">
          <BrowserRouter>
            {/* <Menu />
            <Switch>
              <Route exact path="/" component={EmptyMenu} />
              <Route exact path="/menulist" component={MenuItems} />
              <Route path="/menudetails" component={MenuDetials} />
              <Route path="/menuCustomization" component={MenuCustomization} />
              <Route path="/menuInput" component={AddCustomizationInput} />
              <Route path="/review" component={ReviewMenu} />
            </Switch> */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/floor-plan" component={FloorPlan} />
              <Route path="/add-table" component={AddTableView} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </Provider>
  );
}

export default App;
