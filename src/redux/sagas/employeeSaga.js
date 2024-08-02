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
} from "../constants/employeeContants";

function* getOutletsSaga(action) {
  try {
    const response = yield call(fetchOutlets, action.payload);
    if (response.status === 200) {
      //console.log("Outlets :" + response.data);
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
    } else if(response.status !== 200) {
      const errorMessage = response.data?.message;
      alert(errorMessage);
      yield put(failedAddEmployee(errorMessage));
    }
  } catch (err) {
    if (err.response && err.response.status === 409) {
      const errorMessage = err.response.data?.message;
      alert(errorMessage);
      yield put(failedAddEmployee(errorMessage));
    } else {
      alert(err.message);
      yield put(failedAddEmployee(err.message));
    }
  }
}

// Delete Employee
function* deleteEmployeeSaga(action) {
  try {
    const response = yield call(removeEmployee, action.payload);
    if (response.status === 200) {
      yield put(deleteEmployeeSuccess(action.payload));
    }
    else {
      if (response.data.metaDataInfo.responseCode == "ERROR") {
        //we have to populate api response here
        yield put(deleteEmployeeFailure("Delete Employee Failed"));
      } 
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
      yield put(successGetEmployees(response.data));
    } else {
      yield put(failedGetEmployees({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(failedGetEmployees({ message: "please Try Again" }));
  }
}

//Get Employee By Id
function* getEmployeeByIdSaga(action) {
  const staffId = action.payload  
  try {
    const response = yield call(getEmployeeById, staffId)
    if(response.status === 200) {
      yield put(getEmployeeByIdSuccess(response.data));
    } else {
      yield put(getEmployeeByIdFailure({ message : 'please Try Again' }));
    }
  } catch (err) {
    yield put(getEmployeeByIdFailure({ message : 'please Try Again' }));
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
      yield put(
        failedManageUserAccess(response.data.metaDataInfo.responseMessage)
      );
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
    } else {
      yield put(updateEmployeePINFailed("Pin Already exists!"));
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
      yield put(updateEmployeeFailure(response.data.metaDataInfo.responseMessage))
    }
  }catch{
    yield put(updateEmployeeFailure("Error Updating Employee"))
  }
}

//Employees Roles
function* getEmployeeRolesSaga(action){
  try{
    const response = yield call(rolesAndFunctions);
    if(response.status === 200 ){
      yield put(getEmployeeRolesSuccess(response.data))
    }else {
      yield put(getEmployeeRolesFailure({ message: "please Try Again" }));
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
      yield put(employeeStatusSuccess(action.payload))
    }else{
      yield put(employeeStatusFailure({ message: "Action Failed" }))
    }
  }catch{
    yield put(employeeStatusFailure({ message: "Action Failed" }))
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
  yield takeLatest(ROLES_REQUEST, getEmployeeRolesSaga);
  yield takeLatest(EMPLOYEE_STATUS_REQUEST, employeeSatusSaga);
  yield takeLatest(UPDATE_EMPLOYEE_REQUEST, updateEmployeeSaga);
}
