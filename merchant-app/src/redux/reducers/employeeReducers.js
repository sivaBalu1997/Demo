import { produce } from "immer";
import {
  OUTLET_REQUEST,
  OUTLET_FAILURE,
  OUTLET_SUCCESS,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_RESET,
} from "../constants/employeeContants";

const initialEmployeeState = {
  // Outlets
  outlets: [],
  outletsLoading: false,

  // Employee Add
  employeeAdded: false,
  addEmployeeLoading: false,
  addEmployeeMessage: "",
};

export default function employeeReducer(state = initialEmployeeState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      // SignUp Reducers
      case OUTLET_REQUEST:
        draft.outlets = [];
        draft.outletsLoading = true;
        break;
      case OUTLET_SUCCESS:
        draft.outlets = action.payload;
        draft.outletsLoading = false;
        break;
      case OUTLET_FAILURE:
        draft.outletsLoading = false;
        break;
      // Employee ADD Reducers
      case ADD_EMPLOYEE_REQUEST:
        draft.employeeAdded = false;
        draft.addEmployeeLoading = true;
        draft.addEmployeeMessage = "";
        break;
      case ADD_EMPLOYEE_SUCCESS:
        draft.employeeAdded = true;
        draft.addEmployeeLoading = false;
        draft.addEmployeeMessage = "";
        break;
      case ADD_EMPLOYEE_FAILURE:
        draft.employeeAdded = false;
        draft.addEmployeeLoading = false;
        draft.addEmployeeMessage = action.payload.message;
        break;
      case ADD_EMPLOYEE_RESET:
        draft.employeeAdded = false;
        draft.addEmployeeMessage = "";
        break;
      default:
        break;
    }
  });
}
