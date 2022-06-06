import {
  ADD_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_RESET,
  ADD_EMPLOYEE_SUCCESS,
  OUTLET_FAILURE,
  OUTLET_REQUEST,
  OUTLET_SUCCESS,
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_FAILURE,
  GET_EMPLOYEE_SUCCESS,
  SET_EMPLOYEE_DETAILS_LOADING,
  EDIT_EMPLOYEE_DATA,
  CLEAR_EDIT_EMPLOYEE_DATA,
  REMOVE_EMPLOYEE_FAILURE,
  RESET_REMOVE_EMPLOYEE_DATA,
  USER_ACCESS_EMPLOYEE_REQUEST,
  USER_ACCESS_EMPLOYEE_FAILURE,
  USER_ACCESS_EMPLOYEE_SUCCESS,
  REMOVE_EMPLOYEE_SUCCESS,
  USER_ACCESS_EMPLOYEE_CLEAR,
  REMOVE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_PIN_REQUEST,
  UPDATE_EMPLOYEE_PIN_CLEAR,
  UPDATE_EMPLOYEE_PIN_SUCCESS,
  UPDATE_EMPLOYEE_PIN_FAILED,
} from "../constants/employeeContants";
// Get Outlet
export const getOutlets = (merchantId) => ({
  type: OUTLET_REQUEST,
  payload: merchantId,
});

export const failedGetOutlet = (details) => ({
  // Replace any with Network Data Fail Data format
  type: OUTLET_FAILURE,
  payload: details,
});

export const successGetOutlet = (details) => ({
  type: OUTLET_SUCCESS,
  payload: details,
});

// Add Employee
export const addEmployee = (details) => ({
  type: ADD_EMPLOYEE_REQUEST,
  payload: details,
});

export const failedAddEmployee = (details) => ({
  // Replace any with Network Data Fail Data format
  type: ADD_EMPLOYEE_FAILURE,
  payload: details,
});

export const successAddEmployee = (details) => ({
  type: ADD_EMPLOYEE_SUCCESS,
  payload: details,
});

export const resetAddEmployee = () => ({
  type: ADD_EMPLOYEE_RESET,
});

// Get Employee
export const getEmployees = (merchantId) => ({
  type: GET_EMPLOYEE_REQUEST,
  payload: merchantId,
});

export const failedGetEmployees = (details) => ({
  type: GET_EMPLOYEE_FAILURE,
  payload: details,
});

export const successGetEmployees = (details) => ({
  type: GET_EMPLOYEE_SUCCESS,
  payload: details,
});

export const setEmployeeDetailsLoading = (isLoading) => ({
  type: SET_EMPLOYEE_DETAILS_LOADING,
  payload: isLoading,
});

// Edit Employee Data
export const setEditEmployeeData = (data) => ({
  type: EDIT_EMPLOYEE_DATA,
  payload: data,
});

export const clearEditEmployeeData = () => ({
  type: CLEAR_EDIT_EMPLOYEE_DATA,
});

// Delete Employee Data
export const deleteEmployee = (data) => ({
  type: REMOVE_EMPLOYEE_REQUEST,
  payload: data,
});

export const deleteEmployeeSuccess = (data) => ({
  type: REMOVE_EMPLOYEE_SUCCESS,
  payload: data,
});

export const deleteEmployeeFailure = (data) => ({
  type: REMOVE_EMPLOYEE_FAILURE,
  payload: data,
});

export const clearDeleteEmployeeData = () => ({
  type: REMOVE_EMPLOYEE_SUCCESS,
});

// Manage user access

export const manageUserAccess = (data) => ({
  type: USER_ACCESS_EMPLOYEE_REQUEST,
  payload: data,
});

export const failedManageUserAccess = (details) => ({
  type: USER_ACCESS_EMPLOYEE_FAILURE,
  payload: details,
});

export const successManageUserAccess = (details) => ({
  type: USER_ACCESS_EMPLOYEE_SUCCESS,
  payload: details,
});
export const clearManageUserAccess = () => ({
  type: USER_ACCESS_EMPLOYEE_CLEAR,
});

// Update Employee PIN
export const updateEmployeePIN = (details) => ({
  type: UPDATE_EMPLOYEE_PIN_REQUEST,
  payload: details,
});
export const updateEmployeePINSuccess = (details) => ({
  type: UPDATE_EMPLOYEE_PIN_SUCCESS,
  payload: details,
});
export const updateEmployeePINFailed = (details) => ({
  type: UPDATE_EMPLOYEE_PIN_FAILED,
  payload: details,
});
export const updateEmployeeClear = () => ({
  type: UPDATE_EMPLOYEE_PIN_CLEAR,
});
