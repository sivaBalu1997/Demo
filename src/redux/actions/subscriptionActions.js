import {
  GET_SUBSCRIPTION_PLAN_FAILURE,
  GET_SUBSCRIPTION_PLAN_REQUEST,
  GET_SUBSCRIPTION_PLAN_SUCCESS,
  CREATE_SUBSCRIPTION_FAILURE,
  CREATE_SUBSCRIPTION_REQUEST,
  CREATE_SUBSCRIPTION_SUCCESS,
  CLEAR_SUBSCRIPTION_REQUEST,
  SUBSCRIPTION_BILLING_REQUEST,
  SUBSCRIPTION_BILLING_REQUEST_SUCCESS,

  UPDATE_SUBSCRIPTION_REQUEST,
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAILURE,
  CLEAR_UPDATE_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION_REQUEST,
  SUBSCRIPTION_BILLING_REQUEST_FAILURE
} from "../constants/subscriptionConstants";

// Get subscription plan

export const getSubscriptionPlan = (data) => ({
  type: GET_SUBSCRIPTION_PLAN_REQUEST,
  payload: data,
});

export const getSubscriptionPlanSuccess = (data) => ({
  type: GET_SUBSCRIPTION_PLAN_SUCCESS,
  payload: data,
});

export const getSubscriptionPlanFailed = (data) => ({
  type: GET_SUBSCRIPTION_PLAN_FAILURE,
  payload: data,
});

// Create Subscription

export const createSubscription = (data) => ({
  type: CREATE_SUBSCRIPTION_REQUEST,
  payload: data,
});

export const createSubscriptionSuccess = (data) => ({
  type: CREATE_SUBSCRIPTION_SUCCESS,
  payload: data,
});

export const createSubscriptionFailed = (data) => ({
  type: CREATE_SUBSCRIPTION_FAILURE,
  payload: data,
});

export const clearSubscriptionRequest = (data) => ({
  type: CLEAR_SUBSCRIPTION_REQUEST,
  payload: data,
});

export const getSubscriptionBillingDetails = (data) => ({
  type: SUBSCRIPTION_BILLING_REQUEST,
  payload: data,
});

export const getSubscriptionBillingDetailsSuccess = (data) => ({
  type: SUBSCRIPTION_BILLING_REQUEST_SUCCESS,
  payload: data,
});

export const getSubscriptionBillingDetailFailure = (data) => ({
  type: SUBSCRIPTION_BILLING_REQUEST_FAILURE,
  payload: data,
});

export const updateSubscriptionRequest = (data) => ({
  type: UPDATE_SUBSCRIPTION_REQUEST,
  payload: data,
});

export const updateSubscriptionSuccess = (data) => ({
  type: UPDATE_SUBSCRIPTION_SUCCESS,
  payload: data,
});

export const updateSubscriptionFailed = (data) => ({
  type: UPDATE_SUBSCRIPTION_FAILURE,
  payload: data,
});

export const clearUpdateSubscription = (data) => ({
  type: CLEAR_UPDATE_SUBSCRIPTION,
  payload: data,
});

export const cancelSubscriptionRequest = (data) => ({
  type: CANCEL_SUBSCRIPTION_REQUEST,
  payload: data,
});