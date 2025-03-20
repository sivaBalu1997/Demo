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
  UPDATE_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_SUCCESS,
  RESET_EMPLOYEE_ACTION_COMPLETED,
  REFRESH_PIN_REQUEST,
  GET_EMPLOYEE_ROLE_BY_ID_REQUEST,
  GET_EMPLOYEE_PERMISSIONS_BY_ID_REQUEST,
  GET_EMPLOYEE_PERMISSIONS_BY_ID_SUCCESS,
  GET_EMPLOYEE_PERMISSIONS_BY_ID_FAILURE,
} from "./employeeContants";

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
export const getEmployees = (locationId) => ({
  type: GET_EMPLOYEE_REQUEST,
  payload: locationId,
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
export const updateEmployeeRequest = (data) => ({
  type: UPDATE_EMPLOYEE_REQUEST,
  payload: data
})

export const updateEmployeeSuccess = (data) => ({
  type: UPDATE_EMPLOYEE_SUCCESS,
  payload: data
})

export const updateEmployeeFailure = (data) => ({
  type: UPDATE_EMPLOYEE_FAILURE,
  payload: data
})

export const setEditEmployeeData = (data) => ({
  type: EDIT_EMPLOYEE_DATA,
  payload: data,
});

export const clearEditEmployeeData = () => ({
  type: CLEAR_EDIT_EMPLOYEE_DATA,
});

export const resetEmployeeActionCompleted = () => ({
  type: RESET_EMPLOYEE_ACTION_COMPLETED,
});

// Delete Employee Data
export const deleteEmployee = (staffId) => ({
  type: REMOVE_EMPLOYEE_REQUEST,
  payload: staffId,
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

//Get Employee By Id
export const getEmployeeByIdRequest = (requestData) => ({
  type: GET_EMPLOYEE_BY_ID_REQUEST,
  payload: requestData
});

export const getEmployeeRoleByIdRequest = (requestData) => ({
  type: GET_EMPLOYEE_ROLE_BY_ID_REQUEST,
  payload: requestData
});

export const getEmployeeByIdSuccess = (details) => ({
  type: GET_EMPLOYEE_BY_ID_SUCCESS,
  payload: details
});

export const getEmployeeByIdFailure = (details) => ({
  type: GET_EMPLOYEE_BY_ID_FAILURE,
  payload: details
});

export const getEmployeePermissionsRequest = (requestData) => ({
  type: GET_EMPLOYEE_PERMISSIONS_BY_ID_REQUEST,
  payload: requestData
});

export const getEmployeePermissionsSuccess = (details) => ({
  type: GET_EMPLOYEE_PERMISSIONS_BY_ID_SUCCESS,
  payload: details
});

export const getEmployeePermissionsFailure = (details) => ({
  type: GET_EMPLOYEE_PERMISSIONS_BY_ID_FAILURE,
  payload: details
});


//Roles and Functions
export const getEmployeeRoles = () => ({
  type: ROLES_REQUEST,
})

export const getEmployeeRolesSuccess = (details) => ({
  type: ROLES_SUCCESS,
  payload: details
})

export const getEmployeeRolesFailure = (details) => ({
  type: ROLES_FAILURE,
  payload: details
})

//Block/Unblock Employee
export const employeeStatusRequest = (staffId, isToBlock) => ({
  type: EMPLOYEE_STATUS_REQUEST,
  payload: {staffId, isToBlock}
})

export const employeeStatusSuccess = (details) => ({
  type: EMPLOYEE_STATUS_SUCCESS,
  payload: details
})

export const employeeStatusFailure = (details) => ({
  type: EMPLOYEE_STATUS_FAILURE,
  payload: details
})

export const refreshPin = (merchantId) => ({
  type: REFRESH_PIN_REQUEST,
  payload: merchantId
})