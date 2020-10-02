import { OUTLET_FAILURE, OUTLET_REQUEST, OUTLET_SUCCESS, GET_EMPLOYEE_REQUEST, GET_EMPLOYEE_FAILURE, GET_EMPLOYEE_SUCCESS } from "../constants/employeeContants";

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

export const getEmployees = (merchantId) => ({
  type: GET_EMPLOYEE_REQUEST,
  payload: merchantId
});

export const failedGetEmployees = (details) => ({
  type: GET_EMPLOYEE_FAILURE,
  payload: details,
});

export const successGetEmployees = (details) => ({
  type: GET_EMPLOYEE_SUCCESS,
  payload: details,
});