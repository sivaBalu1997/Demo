import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/authSaga";
import employeeSaga from "./employee/employeeSaga";
import menuSaga from "./menu/manuSaga";
import subscriptionSaga from "./subscription/subscriptionSaga";
import paymentSaga from "./payment/paymentSaga";
import productCatalogSaga from "./productCatalog/productCatalogSaga";
import offerSaga from "./offer/offerSaga"
import newReportsSagas from "./newReports/newReportsSagas";
import checkInReportsSaga  from "./checkInReports/checkInReportsSagas";
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
    fork(newReportsSagas),
    fork(checkInReportsSaga)
  ]);
}
