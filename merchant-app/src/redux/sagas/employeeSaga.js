import { put, call, takeLatest } from "redux-saga/effects";
import { failedGetOutlet, successGetOutlet } from "../actions/employeeActions";
import { fetchOutlets } from "../api/employeeAPI";

import { OUTLET_REQUEST } from "../constants/employeeContants";

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

export default function* employeeSaga() {
  yield takeLatest(OUTLET_REQUEST, getOutletsSaga);
}
