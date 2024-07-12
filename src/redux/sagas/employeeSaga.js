import { put, call, takeLatest } from "redux-saga/effects";
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
} from "../actions/employeeActions";
import {
  fetchOutlets,
  getEmployeeDetails,
  createEmployee,
  manageUserAccess,
  removeEmployee,
  updatePIN,
  getEmployeeById,
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


function* addEmployeeSaga(action) {
  try {
    const response = yield call(createEmployee, action.payload);
    if (response.status === 200) {
      if (response.data.metaDataInfo.responseCode == "ERROR") {
        yield put(
          failedAddEmployee({
            message: response.data.metaDataInfo.responseMessage,
          })
        )
      } else {
        yield put(successAddEmployee(response.data));
      }
    }
  } catch (err) {
    yield put(failedAddEmployee({ message: "" }));
  }
}

// Delete Employee
function* deleteEmployeeSaga(action) {
  try {
    const response = yield call(removeEmployee, action.payload);
    if (response.status === 200) {
      if (response.data.metaDataInfo.responseCode == "ERROR") {
        yield put(
          deleteEmployeeFailure({
            message: response.data.metaDataInfo.responseMessage,
          })
        );
      } else {
        yield put(deleteEmployeeSuccess(response.data));
      }
    }
  } catch (err) {
    yield put(deleteEmployeeFailure("Delete Employee Failed"));
  }
}

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
  try {
    const response = yield call(getEmployeeById)
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
      yield put(updateEmployeePINFailed(response.data));
    }
  } catch (err) {
    yield put(updateEmployeePINFailed("Pin Already exists!"));
  }
}

export default function* employeeSaga() {
  yield takeLatest(OUTLET_REQUEST, getOutletsSaga);
  yield takeLatest(ADD_EMPLOYEE_REQUEST, addEmployeeSaga);
  yield takeLatest(GET_EMPLOYEE_REQUEST, getEmployeesSaga);
  yield takeLatest(REMOVE_EMPLOYEE_REQUEST, deleteEmployeeSaga);
  yield takeLatest(USER_ACCESS_EMPLOYEE_REQUEST, manageUserAccessSaga);
  yield takeLatest(UPDATE_EMPLOYEE_PIN_REQUEST, updateEmployeePINSaga);
  yield takeLatest(GET_EMPLOYEE_BY_ID_REQUEST, getEmployeeByIdSaga)
}
