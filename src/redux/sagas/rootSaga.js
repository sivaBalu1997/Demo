import { all, fork } from "redux-saga/effects";

// Imports: Redux Sagas
import authSaga from "./authSaga";
import employeeSaga from "./employeeSaga";
import menuSaga from "./manuSaga";
import subscriptionSaga from "./subscriptionSaga";
import paymentSaga from "./paymentSaga";
import productCatalogSaga from "./productCatalogSaga";
import offerSaga from "./offerSaga"

// Redux Saga: Root Saga
export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(employeeSaga),
    fork(menuSaga),
    fork(subscriptionSaga),
    fork(paymentSaga),
    fork(productCatalogSaga),
    fork(offerSaga),
  ]);
}
