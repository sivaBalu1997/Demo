import {
  ADD_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_RESET,
  ADD_EMPLOYEE_SUCCESS,
  OUTLET_FAILURE,
  OUTLET_REQUEST,
  OUTLET_SUCCESS,
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
