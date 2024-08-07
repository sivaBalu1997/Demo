import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Store from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';

import { persistor } from "./redux/store";

import { Provider, useDispatch, useSelector } from "react-redux";
import { Route, Switch, BrowserRouter, useHistory } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
     <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
