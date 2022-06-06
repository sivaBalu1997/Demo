import React from "react";
import {
  MAKE_PAYMENT_FAILED,
  MAKE_PAYMENT_REQUEST,
  MAKE_PAYMENT_SUCCESS,
} from "../constants/paymentConstant";

// Make Account Setup
export const makePayment = (details) => ({
  type: MAKE_PAYMENT_REQUEST,
  payload: details,
});

export const makePaymentSuccess = (details) => ({
  type: MAKE_PAYMENT_SUCCESS,
  payload: details,
});

export const makePaymentFailed = (details) => ({
  type: MAKE_PAYMENT_FAILED,
  payload: details,
});
