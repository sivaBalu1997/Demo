import { produce } from "immer";
import {
  OUTLET_REQUEST,
  OUTLET_FAILURE,
  OUTLET_SUCCESS,
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_FAILURE,
  GET_EMPLOYEE_SUCCESS,
} from "../constants/employeeContants";

const initialEmployeeState = {
  // Outlets
  outlets: [],
  outletsLoading: false,
  employeeDetails: [],
  employeeDetailsLoading: false,
  employeeDetailsFailure: ""
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
      case GET_EMPLOYEE_REQUEST:
        draft.employeeDetails = [];
        draft.employeeDetailsLoading = true;
        draft.employeeDetailsFailure = '';
        break;
      case GET_EMPLOYEE_FAILURE:
        draft.employeeDetailsLoading = false;
        draft.employeeDetailsFailure = action.payload;
        break;
      case GET_EMPLOYEE_SUCCESS:
        draft.employeeDetailsLoading = false;
        draft.employeeDetailsFailure = '';
        draft.employeeDetails = action.payload;
        break;
      default:
        break;
    }
  });
}
