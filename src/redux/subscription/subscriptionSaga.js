import { put, call, takeLatest } from "redux-saga/effects";
import {
  createSubscriptionSuccess,
  getSubscriptionPlanFailed,
  getSubscriptionPlanSuccess,
  createSubscriptionFailed,
  getSubscriptionBillingDetailsSuccess,
  getSubscriptionBillingDetailFailure,
  updateSubscriptionSuccess,
  updateSubscriptionFailed,
} from "./subscriptionActions";

import {
  getSubscriptionPlan,
  createSubscription,
  getBillingDetailsAPI,
  updateSubscription,
  cancelSubscription,
} from "../subscription/subscriptionAPI";
import {
  GET_SUBSCRIPTION_PLAN_REQUEST,
  CREATE_SUBSCRIPTION_REQUEST,
  SUBSCRIPTION_BILLING_REQUEST,
  UPDATE_SUBSCRIPTION_REQUEST,
  CANCEL_SUBSCRIPTION_REQUEST,
} from "./subscriptionConstants";

function* getSubscriptionPlanSaga(action) {
  try {
    const response = yield call(getSubscriptionPlan, action.payload);
    if (response.status === 200) {
      yield put(getSubscriptionPlanSuccess(response.data.plans));
    }
  } catch (err) {
    yield put(getSubscriptionPlanFailed("Please try Again"));
  }
}

// For Create Subscription
function* createSubscriptionSaga(action) {
  try {
    const response = yield call(createSubscription, action.payload);
    if (
      response.status === 200 &&
      response.data.subscriptionStatus == "SUB_1"
    ) {
      yield put(createSubscriptionSuccess(response.data.shortUrl));
    }
  } catch (err) {
    yield put(createSubscriptionFailed());
    console.log("Error to create Subscription::", err);
  }
}

// For Update Subscription
function* updateSubscriptionSaga(action) {
  try {
    const response = yield call(updateSubscription, action.payload);
    if (response.status === 200) {
      yield put(updateSubscriptionSuccess());
    } else {
      yield put(updateSubscriptionFailed());
    }
  } catch (err) {
    console.log("Error to update Subscription::", err);
  }
}

// For Cancel Subscription
function* cancelSubscriptionSaga(action) {
  try {
    const response = yield call(cancelSubscription, action.payload);
    if (response.status === 200) {
      yield put(updateSubscriptionSuccess());
    } else {
      yield put(updateSubscriptionFailed());
    }
  } catch (err) {
    console.log("Error to cancel Subscription::", err);
  }
}

// For Get Billing Details
function* getBillingDetails(action) {
  try {
    const response = yield call(getBillingDetailsAPI, action.payload);
    if (response.status === 200) {
      yield put(
        getSubscriptionBillingDetailsSuccess({
          subscriptionDetails: response.data.subscriptionDetails
            ? response.data.subscriptionDetails
            : null,
          invoiceDetails: response.data.invoiceDetails
            ? response.data.invoiceDetails
            : null,
        })
      );
    }else{
      yield put(getSubscriptionBillingDetailFailure())
    }
  } catch (err) {
    console.log("Error in Biliing details GET ::", err);
  }
}

export default function* subscriptionSaga() {
  yield takeLatest(GET_SUBSCRIPTION_PLAN_REQUEST, getSubscriptionPlanSaga);
  yield takeLatest(CREATE_SUBSCRIPTION_REQUEST, createSubscriptionSaga);
  yield takeLatest(UPDATE_SUBSCRIPTION_REQUEST, updateSubscriptionSaga);
  yield takeLatest(CANCEL_SUBSCRIPTION_REQUEST, cancelSubscriptionSaga);
  yield takeLatest(SUBSCRIPTION_BILLING_REQUEST, getBillingDetails);
}
