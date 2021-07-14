import { combineReducers } from "redux";

import authReducer from "../reducers/authReducer";
import employeeReducer from "./employeeReducers";
import menuReducer from "./menuReducer";

const reducers = {
  auth: authReducer,
  employee: employeeReducer,
  menu: menuReducer,
};

export const rootReducer = combineReducers(reducers);
