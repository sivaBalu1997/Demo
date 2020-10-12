import { combineReducers } from "redux";

import authReducer from "../reducers/authReducer";
import employeeReducer from "./employeeReducers";

const reducers = {
  auth: authReducer,
  employee: employeeReducer,
};

export const rootReducer = combineReducers(reducers);
