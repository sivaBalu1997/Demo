import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Menu from "./components/menu";
import "./styles/app.scss";
import EmptyMenu from "./components/menuItems/EmtyMenu";
import MenuItems from "./components/menuItems";
import MenuDetials from "./components/menuDetails";

function App() {
  return (
    <div className="app">
      <div className="main-section">
        <BrowserRouter>
          <Menu />
          <Switch>
            <Route exact path="/" component={EmptyMenu} />
            <Route exact path="/menulist" component={MenuItems} />
            <Route path="/menudetails" component={MenuDetials} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
