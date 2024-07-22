import { produce } from "immer";
import {
  OUTLET_REQUEST,
  OUTLET_FAILURE,
  OUTLET_SUCCESS,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_RESET,
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_FAILURE,
  GET_EMPLOYEE_SUCCESS,
  SET_EMPLOYEE_DETAILS_LOADING,
  EDIT_EMPLOYEE_DATA,
  CLEAR_EDIT_EMPLOYEE_DATA,
  REMOVE_EMPLOYEE_FAILURE,
  REMOVE_EMPLOYEE_SUCCESS,
  REMOVE_EMPLOYEE_REQUEST,
  RESET_REMOVE_EMPLOYEE_DATA,
  USER_ACCESS_EMPLOYEE_REQUEST,
  USER_ACCESS_EMPLOYEE_SUCCESS,
  USER_ACCESS_EMPLOYEE_FAILURE,
  USER_ACCESS_EMPLOYEE_CLEAR,
  UPDATE_EMPLOYEE_PIN_CLEAR,
  UPDATE_EMPLOYEE_PIN_FAILED,
  UPDATE_EMPLOYEE_PIN_REQUEST,
  UPDATE_EMPLOYEE_PIN_SUCCESS,
  GET_EMPLOYEE_BY_ID_REQUEST,
  GET_EMPLOYEE_BY_ID_SUCCESS,
  GET_EMPLOYEE_BY_ID_FAILURE,
  ROLES_REQUEST,
  ROLES_SUCCESS,
  ROLES_FAILURE,
  EMPLOYEE_STATUS_REQUEST,
  EMPLOYEE_STATUS_SUCCESS,
  EMPLOYEE_STATUS_FAILURE,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE,
  RESET_EMPLOYEE_ACTION_COMPLETED,
} from "../constants/employeeContants";

const initialEmployeeState = {
  // Outlets
  outlets: [],
  outletsLoading: false,

  // Employee Add
  employeeAdded: false,
  addEmployeeLoading: false,
  addEmployeeFailure: false,
  addEmployeeMessage: "",

  // Get Employee
  employeeDetails: [],
  employeeDetailsLoading: false,
  employeeDetailsFailure: "",
  editEmployeeData: null,

  //Remove Employee
  deleteEmployeeLoading: false,
  employeeDeleted: false,
  deleteEmployeeFailure: false,
  deleteEmployeeData: null,
  deleteEmployeeMessage: "",

  manageAccessLoading: false,
  manageAccessSuccess: false,
  manageAccessFailure: false,
  manageAccessMessage: "",

  // Update Employee PIN
  updateEmployeePINLoading: false,
  updateEmployeePINSuccess: false,
  updateEmployeePINFailed: false,
  updateEmployeePINMessage: "",

  //Update Employee
  updateEmployee: {},
  updateEmployeeFailure: '',
  employeeUpdated: false,
  employeeUpdateLoading: false,

  //Get Employee By ID
  employeeByIdDetails: {},
  employeeByIdDetailsLoading: false,
  employeeByIdDetailsFailure: "",

  //Roles and Function
  employeeRoleAndFunctions:[],
  employeeRoleAndFunctionsLoading: false,
  employeeRoleAndFunctionsFailure: "",

  //Block/Unblock Employee
  employeeStatus:'',
  employeeStatusLoading: false,

  employeeActionCompleted: false

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
        draft.employeeActionCompleted = false;
        draft.addEmployeeFailure = false;
        break;
      case ADD_EMPLOYEE_SUCCESS:
        draft.employeeAdded = true;
        draft.addEmployeeLoading = false;
        draft.addEmployeeMessage = "";
        draft.employeeActionCompleted = true;
        draft.addEmployeeFailure = false;
        break;
      case ADD_EMPLOYEE_FAILURE:
        draft.employeeAdded = false;
        draft.addEmployeeLoading = false;
        draft.addEmployeeMessage = action.payload.message;
        draft.employeeActionCompleted = false;
        draft.addEmployeeFailure = true;
        break;
      case ADD_EMPLOYEE_RESET:
        draft.employeeAdded = false;
        draft.addEmployeeMessage = "";
        draft.employeeActionCompleted = false;
        break;

      // Get Employee
      case GET_EMPLOYEE_REQUEST:
        draft.employeeDetails = [];
        draft.employeeDetailsLoading = true;
        draft.employeeDetailsFailure = "";
        break;
      case GET_EMPLOYEE_FAILURE:
        draft.employeeDetailsLoading = false;
        draft.employeeDetailsFailure = action.payload;
        break;
      case GET_EMPLOYEE_SUCCESS:
        draft.employeeDetailsLoading = false;
        draft.employeeDetailsFailure = "";
        draft.employeeDetails = action.payload;
        break;
      case SET_EMPLOYEE_DETAILS_LOADING:
        draft.employeeDetailsLoading = action.payload;
        break;
      case EDIT_EMPLOYEE_DATA:
        draft.editEmployeeData = action.payload;
        break;
      case CLEAR_EDIT_EMPLOYEE_DATA:
        draft.editEmployeeData = null;
        break;

      // Delete Employee
      case REMOVE_EMPLOYEE_REQUEST:
        draft.deleteEmployeeLoading = true;
        draft.employeeDeleted = false;
        draft.deleteEmployeeFailure = false;
        draft.deleteEmployeeData = action.payload;
        break;
      case REMOVE_EMPLOYEE_SUCCESS:
        draft.deleteEmployeeLoading = false;
        draft.employeeDeleted = true;
        draft.deleteEmployeeFailure = false;
        draft.deleteEmployeeMessage = action.payload;
        break;
      case REMOVE_EMPLOYEE_FAILURE:
        draft.deleteEmployeeLoading = false;
        draft.employeeDeleted = false;
        draft.deleteEmployeeFailure = true;
        draft.deleteEmployeeMessage = action.payload;
        break;
      case RESET_REMOVE_EMPLOYEE_DATA:
        draft.deleteEmployeeLoading = false;
        draft.employeeDeleted = false;
        draft.deleteEmployeeFailure = false;
        draft.deleteEmployeeData = null;
        draft.deleteEmployeeMessage = "";
        break;
        
      // Manage user Access
      case USER_ACCESS_EMPLOYEE_REQUEST:
        draft.manageAccessLoading = true;
        draft.manageAccessSuccess = false;
        draft.manageAccessFailure = false;
        draft.manageAccessMessage = "";
        break;
      case USER_ACCESS_EMPLOYEE_SUCCESS:
        draft.manageAccessLoading = false;
        draft.manageAccessSuccess = true;
        draft.manageAccessFailure = false;
        draft.manageAccessMessage = action.payload;
        break;
      case USER_ACCESS_EMPLOYEE_FAILURE:
        draft.manageAccessLoading = false;
        draft.manageAccessSuccess = false;
        draft.manageAccessFailure = true;
        draft.manageAccessMessage = action.payload;
        break;
      case USER_ACCESS_EMPLOYEE_CLEAR:
        draft.manageAccessMessage = "";
        break;

      //Update Employee
      case UPDATE_EMPLOYEE_REQUEST:
        draft.employeeUpdated = false;
        draft.employeeUpdateLoading = true;
        draft.updateEmployee={};
        draft.updateEmployeeFailure = '';
        draft.employeeActionCompleted = false;
        break
      case UPDATE_EMPLOYEE_SUCCESS:
        draft.employeeUpdated = true;
        draft.employeeUpdateLoading = false;
        draft.updateEmployee = action.payload;
        draft.updateEmployeeFailure = '';
        draft.employeeActionCompleted = true;
        break
      case UPDATE_EMPLOYEE_FAILURE:
        draft.employeeUpdated = false;
        draft.employeeUpdateLoading = false;
        draft.updateEmployee = '';
        draft.updateEmployeeFailure = action.payload;
        draft.employeeActionCompleted = false;
        break

      case RESET_EMPLOYEE_ACTION_COMPLETED:
        draft.employeeActionCompleted = false;
        break;

      //Update Employee PIN
      case UPDATE_EMPLOYEE_PIN_REQUEST:
        draft.updateEmployeePINLoading = true;
        draft.updateEmployeePINSuccess = false;
        draft.updateEmployeePINFailed = false;
        draft.updateEmployeePINMessage = "";
        break;
      case UPDATE_EMPLOYEE_PIN_SUCCESS:
        draft.updateEmployeePINLoading = false;
        draft.updateEmployeePINSuccess = true;
        draft.updateEmployeePINFailed = false;
        draft.updateEmployeePINMessage = action.payload;
        break;
      case UPDATE_EMPLOYEE_PIN_FAILED:
        console.log("Inside Failed :::", action.payload);
        draft.updateEmployeePINLoading = false;
        draft.updateEmployeePINSuccess = false;
        draft.updateEmployeePINFailed = true;
        draft.updateEmployeePINMessage = action.payload;
        break;
      case UPDATE_EMPLOYEE_PIN_CLEAR:
        draft.updateEmployeePINLoading = false;
        draft.updateEmployeePINSuccess = false;
        draft.updateEmployeePINFailed = false;
        draft.updateEmployeePINMessage = "";
        break;

      //Get Employee By ID  
      case GET_EMPLOYEE_BY_ID_REQUEST:
        draft.employeeByIdDetails = {};
        draft.employeeByIdDetailsLoading = true;
        draft.employeeByIdDetailsFailure = ""
        break;
      case GET_EMPLOYEE_BY_ID_FAILURE:
        draft.employeeByIdDetailsFailure = action.payload.message;
        draft.employeeByIdDetailsLoading = false;
        break;
      case GET_EMPLOYEE_BY_ID_SUCCESS:
        draft.employeeByIdDetails = action.payload;
        draft.employeeByIdDetailsLoading = false;
        draft.employeeByIdDetailsFailure = "";
        break;
        
      //RolesAndFunctions
      case ROLES_REQUEST:
        draft.employeeRoleAndFunctions = [];
        draft.employeeRoleAndFunctionsLoading = true;
        draft.employeeRoleAndFunctionsFailure = ""
        break;
      case ROLES_FAILURE:
        draft.employeeRoleAndFunctions = "";
        draft.employeeRoleAndFunctionsLoading = false;
        draft.employeeRoleAndFunctionsFailure = action.payload  
        break;
      case ROLES_SUCCESS:
        draft.employeeRoleAndFunctions = action.payload;
        draft.employeeRoleAndFunctionsLoading = false;
        draft.employeeRoleAndFunctionsFailure = ""
      break

      //Block/Unblock Employee
      case EMPLOYEE_STATUS_REQUEST:
        draft.employeeStatus = '';
        draft.employeeStatusLoading = true;
        break
      case EMPLOYEE_STATUS_SUCCESS:
        draft.employeeStatus = action.payload;
        draft.employeeStatusLoading = false
        break      
      case EMPLOYEE_STATUS_FAILURE:
        draft.employeeStatus = action.payload;
        draft.employeeStatusLoading = false;
        break

      default:
        break;
    }
  })
}
