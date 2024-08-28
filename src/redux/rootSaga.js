import { all, fork } from "redux-saga/effects";
import authSaga from "../redux/auth/authSaga";
import employeeSaga from "../redux/employee/employeeSaga";
import menuSaga from "../redux/menu/manuSaga";
import subscriptionSaga from "../redux/subscription/subscriptionSaga";
import paymentSaga from "../redux/payment/paymentSaga";
import productCatalogSaga from "../redux/productCatalog/productCatalogSaga";
import offerSaga from "../redux/offer/offerSaga"

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
