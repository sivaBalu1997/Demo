import { put, call, takeLatest } from "redux-saga/effects";
import {
  failedAddEmployee,
  failedGetOutlet,
  successAddEmployee,
  successGetOutlet,
  successGetEmployees,
  failedGetEmployees,
} from "../actions/employeeActions";
import {
  fetchOutlets,
  getEmployeeDetails,
  createEmployee,
} from "../api/employeeAPI";
import {
  OUTLET_REQUEST,
  GET_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_REQUEST,
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
        );
      } else {
        yield put(successAddEmployee(response.data));
      }
    }
  } catch (err) {
    yield put(failedAddEmployee({ message: "" }));
  }
}

function* getEmployeesSaga(action) {
  try {
    const response = yield call(getEmployeeDetails, action.payload);
    //console.log(response, "employees");
    if (response.status === 200) {
      //console.log("Employees :" + response.data);
      yield put(successGetEmployees(response.data));
    } else {
      yield put(failedGetEmployees({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(failedGetEmployees({ message: "please Try Again" }));
  }
}

export default function* employeeSaga() {
  yield takeLatest(OUTLET_REQUEST, getOutletsSaga);
  yield takeLatest(ADD_EMPLOYEE_REQUEST, addEmployeeSaga);
  yield takeLatest(GET_EMPLOYEE_REQUEST, getEmployeesSaga);
}
