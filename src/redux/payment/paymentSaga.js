import { put, call, takeLatest } from "redux-saga/effects";
import {
  makePaymentFailed,
  makePaymentSuccess,
} from "./paymentAction";
import { makePayment } from "../payment/paymentAPI";
import { MAKE_PAYMENT_REQUEST } from "./paymentConstant";

function* makePaymentSaga(action) {
  try {
    const response = yield call(makePayment, action.payload);
    if (response.status === 200) {
      yield put(makePaymentSuccess(response.data));
    } else {
    }
  } catch (err) {
    let data = JSON.parse(err.response.data.message.slice(17));

    yield put(makePaymentFailed(data[0].error.description));
  }
}

export default function* employeeSaga() {
  yield takeLatest(MAKE_PAYMENT_REQUEST, makePaymentSaga);
}
