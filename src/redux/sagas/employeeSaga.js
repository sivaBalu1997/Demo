import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import {
  failedAddEmployee,
  failedGetOutlet,
  successAddEmployee,
  successGetOutlet,
  successGetEmployees,
  failedGetEmployees,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  successManageUserAccess,
  failedManageUserAccess,
  updateEmployeePINSuccess,
  updateEmployeePINFailed,
  getEmployeeByIdSuccess,
  getEmployeeByIdFailure,
  getEmployeeRolesSuccess,
  getEmployeeRolesFailure,
  employeeStatusSuccess,
  employeeStatusFailure,
  updateEmployeeFailure,
  updateEmployeeSuccess,
  updateEmployeeRequest,
  getEmployees,
} from "../actions/employeeActions";
import {
  fetchOutlets,
  getEmployeeDetails,
  createEmployee,
  manageUserAccess,
  removeEmployee,
  updatePIN,
  getEmployeeById,
  rolesAndFunctions,
  employeeStatus,
  editEmployee,
  refreshPinApi,
  getEmployeeRoleById,
} from "../api/employeeAPI";

import {
  OUTLET_REQUEST,
  GET_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_REQUEST,
  REMOVE_EMPLOYEE_REQUEST,
  USER_ACCESS_EMPLOYEE_REQUEST,
  EDIT_EMPLOYEE_DATA,
  UPDATE_EMPLOYEE_PIN_REQUEST,
  GET_EMPLOYEE_BY_ID_REQUEST,
  ROLES_REQUEST,
  EMPLOYEE_STATUS_REQUEST,
  UPDATE_EMPLOYEE_REQUEST,
  REFRESH_PIN_REQUEST,
  REFRESH_PIN_SUCCESS,
  REFRESH_PIN_FAILURE,
  GET_EMPLOYEE_ROLE_BY_ID_REQUEST,
  GET_EMPLOYEE_ROLE_BY_ID_FAILURE,
  GET_EMPLOYEE_ROLE_BY_ID_SUCCESS,
} from "../constants/employeeContants";
import { decryptJson } from "../../util/react-ec-utils";
import { showErrorToast, showSuccessToast } from "../../util/toastUtils";

function* getOutletsSaga(action) {
  try {
    const response = yield call(fetchOutlets, action.payload);
    if (response.status === 200) {
      yield put(successGetOutlet(response.data));
    }
  } catch (err) {
    yield put(failedGetOutlet({ message: "Please Try Again" }));
  }
}

//Create Employee
function* addEmployeeSaga(action) {
  try {
    const response = yield call(createEmployee, action.payload);
    if (response.status === 200) {
      yield put(successAddEmployee(response.data));
    }else {
      const errorMessage = response.data?.message != "" ? response.data?.message : 'Please Try Again Later';
      response.status !== 403 && showErrorToast(errorMessage);
      yield put(failedAddEmployee(errorMessage));
    }
  } catch (err) {
    yield put(failedAddEmployee(err.message));
  }
}

// Delete Employee
function* deleteEmployeeSaga(action) {
  try {
    const response = yield call(removeEmployee, action.payload);
    if (response.status === 200) {
      showSuccessToast(response?.data?.message);
      yield put(deleteEmployeeSuccess(action.payload));
    }else {
      const errorMessage = response.data?.message != "" ? response.data?.message : 'Please Try Again Later';
      response.status !== 403 && showErrorToast(errorMessage);
      yield put(deleteEmployeeFailure(errorMessage));
    }
  } catch (err) {
    yield put(
      deleteEmployeeFailure("Error deleting Employee")
    )
  }
}

//Get Employee
function* getEmployeesSaga(action) {
  try {
    const response = yield call(getEmployeeDetails);
    if (response.status === 200) {
      const employeeListData = decryptJson(response.data.data)
      yield put(successGetEmployees(employeeListData));
    }else {
      const errorMessage = response.data?.message != "" ? response.data?.message : 'Please Try Again Later';
      response.status !== 403 && showErrorToast(errorMessage);
      yield put(failedGetEmployees({ message: errorMessage }));
    }
  } catch (err) {
    yield put(failedGetEmployees({ message: "please Try Again" }));
  }
}

//Get Employee By Id
function* getEmployeeByIdSaga(action) {
  const requestData = action.payload  
  try {
    const response = yield call(getEmployeeById, requestData?.staffId)
    if(response.status === 200) {
      const employeeData = decryptJson(response.data.data)

      yield put(getEmployeeByIdSuccess(employeeData));
      if ( requestData?.sagaCallBack != null &&typeof requestData?.sagaCallBack === 'function') {
        requestData.sagaCallBack(employeeData);
      }
    }else {
      const errorMessage = response.data?.message != "" ? response.data?.message : 'Please Try Again Later';
      response.status !== 403 && showErrorToast(errorMessage);
      yield put(getEmployeeByIdFailure({ message : errorMessage }));
    }
  } catch (err) {
    yield put(getEmployeeByIdFailure({ message : 'please Try Again' }));
  }
}

function* getEmployeeRolesByIdSaga(action) {
  const requestData = action.payload  
  try {
    const response = yield call(getEmployeeRoleById, requestData?.staffId)
    if(response.status === 200) {
     // const employeeRoleFunction = decryptJson(response.data.data)
      yield put(yield put({type: GET_EMPLOYEE_ROLE_BY_ID_SUCCESS,payload: response.data}));
    }else {
      const errorMessage = response.data?.message != "" ? response.data?.message : 'Please Try Again Later';
      response.status !== 403 && showErrorToast(errorMessage);
      yield put(yield put({type: GET_EMPLOYEE_ROLE_BY_ID_FAILURE,payload: errorMessage}));
    }
  } catch (err) {
    yield put(yield put({type: GET_EMPLOYEE_ROLE_BY_ID_FAILURE,payload: ''}));
  }
}

function* manageUserAccessSaga(action) {
  try {
    const response = yield call(manageUserAccess, action.payload);
    if (
      response.status === 200 &&
      response.data.metaDataInfo.responseCode == "SUCCESS"
    ) {
      yield put(
        successManageUserAccess(response.data.metaDataInfo.responseMessage)
      );
    } else {
      const errorMessage = response.data?.message != "" ? response.data?.message : 'Please Try Again Later';
      response.status !== 403 && showErrorToast(errorMessage);
      yield put(failedManageUserAccess(errorMessage));
    }
  } catch (err) {
    yield put(
      failedManageUserAccess("Something went wrong. Please try again later")
    );
  }
}

function* updateEmployeePINSaga(action) {
  try {
    const response = yield call(updatePIN, action.payload);
    if (response.status === 200) {
      yield put(updateEmployeePINSuccess("PIN updated Successfully!"));
    }else {
      const errorMessage = response.data?.message != "" ? response.data?.message : 'Please Try Again Later';
      response.status !== 403 && showErrorToast(errorMessage);
      yield put(updateEmployeePINFailed(errorMessage));
    }
  } catch (err) {
    yield put(updateEmployeePINFailed("Pin Already exists!"));
  }
}

//Update Employee
function* updateEmployeeSaga(action) {
  try{
    const response = yield call(editEmployee, action.payload)
    if(response.status === 200){
      yield put(updateEmployeeSuccess(response.data))
      if(action.payload?.successCB && typeof action.payload?.successCB === 'function'){
        action.payload.successCB()
      }
    }else{
      const errorMessage = response.data?.message != "" ? response.data?.message : 'Please Try Again Later';
      response.status !== 403 && showErrorToast(errorMessage);
      yield put(updateEmployeeFailure(errorMessage))
    }
  }catch{
    // const errorMessage = response.data?.message;
    // alert(errorMessage)
    yield put(updateEmployeeFailure("Error Updating Employee"))
  }
}

//Employees Roles
function* getEmployeeRolesSaga(action){
  try{
    const response = yield call(rolesAndFunctions);
    if(response.status === 200 ){
      const employeeRoles = decryptJson(response.data.data)

      yield put(getEmployeeRolesSuccess(employeeRoles))
    }else {
      const errorMessage = response.data?.message != "" ? response.data?.message : 'Please Try Again Later';
      response.status !== 403 && showErrorToast(errorMessage);
      yield put(getEmployeeRolesFailure({ message: errorMessage }));
    }
  }
  catch{
    yield put(getEmployeeRolesFailure({ message: "please Try Again" }))
  }
}

//Employee Status
function* employeeSatusSaga(action){
  try{
    const response = yield call(employeeStatus, action.payload)
    if(response.status === 200){
      showSuccessToast(response?.data?.message);
      yield put(employeeStatusSuccess(action.payload))
    }else{
      const errorMessage = response.data?.message != "" ? response.data?.message : 'Please Try Again Later';
      response.status !== 403 && showErrorToast(errorMessage);
      yield put(employeeStatusFailure({ message: errorMessage }))
    }
  }catch{
    yield put(employeeStatusFailure({ message: "Action Failed" }))
  }
}

//refresh employee pin 
function* refreshPinSaga(action){
  try{
    const response = yield call(refreshPinApi, action.payload)
    if(response.status === 200){
      yield put({type: REFRESH_PIN_SUCCESS, payload: response?.data?.devicePin})
    }else{
      const errorMessage = response.data?.message != "" ? response.data?.message : 'Please Try Again Later';
      response.status !== 403 && showErrorToast(errorMessage);
      yield put({type: REFRESH_PIN_FAILURE,payload: errorMessage})
    }
  }catch{
     yield put({type: REFRESH_PIN_FAILURE, payload: '' })
  }
}

export default function* employeeSaga() {
  yield takeLatest(OUTLET_REQUEST, getOutletsSaga);
  yield takeEvery(ADD_EMPLOYEE_REQUEST, addEmployeeSaga);
  yield takeLatest(GET_EMPLOYEE_REQUEST, getEmployeesSaga);
  yield takeLatest(REMOVE_EMPLOYEE_REQUEST, deleteEmployeeSaga);
  yield takeLatest(USER_ACCESS_EMPLOYEE_REQUEST, manageUserAccessSaga);
  yield takeLatest(UPDATE_EMPLOYEE_PIN_REQUEST, updateEmployeePINSaga);
  yield takeLatest(GET_EMPLOYEE_BY_ID_REQUEST, getEmployeeByIdSaga);
  yield takeLatest(GET_EMPLOYEE_ROLE_BY_ID_REQUEST,getEmployeeRolesByIdSaga)
  yield takeLatest(ROLES_REQUEST, getEmployeeRolesSaga);
  yield takeLatest(EMPLOYEE_STATUS_REQUEST, employeeSatusSaga);
  yield takeLatest(UPDATE_EMPLOYEE_REQUEST, updateEmployeeSaga);
  yield takeLatest(REFRESH_PIN_REQUEST, refreshPinSaga);
}
