import { OUTLET_FAILURE, OUTLET_REQUEST, OUTLET_SUCCESS } from "../constants/employeeContants";

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
