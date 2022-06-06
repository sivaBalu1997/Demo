import { combineReducers } from "redux";

import authReducer from "../reducers/authReducer";
import employeeReducer from "./employeeReducers";
import menuReducer from "./menuReducer";
import subscriptionReducer from "./subscriptionReducer";
import paymentReducer from "./paymentReducer";
import productCatalogReducer from "./productCatalogReducers";
import offerReducer from "./offerReducer";

const reducers = {
  auth: authReducer,
  employee: employeeReducer,
  menu: menuReducer,
  subscription: subscriptionReducer,
  payment: paymentReducer,
  productCatalog: productCatalogReducer,
  offer: offerReducer,
};

export const rootReducer = combineReducers(reducers);
