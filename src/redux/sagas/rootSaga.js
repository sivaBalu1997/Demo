import { all, fork } from "redux-saga/effects";

// Imports: Redux Sagas
import authSaga from "./authSaga";
import employeeSaga from "./employeeSaga";

// Redux Saga: Root Saga
export default function* rootSaga() {
  yield all([fork(authSaga), fork(employeeSaga)]);
}
