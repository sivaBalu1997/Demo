import Store from "../store";
import { API } from "redux/api";

// For Get All the Subscription plans
export function getSubscriptionPlan(data) {
  const token = Store.getState().auth.credentials.accessToken;

  return API({
    method: "get",
    url: "/subscription/plans",
    params: data,
  });
}

// For create Subscription
export function createSubscription(data) {
  return API({
    method: "post",
    url: "/subscription/create",
    data: data,
  });
}

// For Update Subscription
export function updateSubscription(data) {
  return API({
    method: "post",
    url: "/subscription/update",
    data: data,
  });
}

export function cancelSubscription(data) {
  return API({
    method: "post",
    url: "/subscription/cancel",
    params: data,
  });
}

export function getBillingDetailsAPI(data) {
  return API({
    method: "get",
    url: "/subscription/details",
    params: data,
  });
}