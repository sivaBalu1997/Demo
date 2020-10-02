import { put, call, takeLatest } from "redux-saga/effects";
import {
  failedAddEmployee,
  failedGetOutlet,
  successAddEmployee,
  successGetOutlet,
} from "../actions/employeeActions";
import { createEmployee, fetchOutlets } from "../api/employeeAPI";

import {
  ADD_EMPLOYEE_REQUEST,
  OUTLET_REQUEST,
} from "../constants/employeeContants";

function* getOutletsSaga(action) {
  try {
    const response = yield call(fetchOutlets, action.payload);
    if (response.status === 200) {
      console.log("Outlets :" + response.data);
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
      yield put(successAddEmployee(response.data));
    }
  } catch (err) {
    yield put(failedAddEmployee({ message: "Please Try Again" }));
  }
}

export default function* employeeSaga() {
  yield takeLatest(OUTLET_REQUEST, getOutletsSaga);
  yield takeLatest(ADD_EMPLOYEE_REQUEST, addEmployeeSaga);
}
