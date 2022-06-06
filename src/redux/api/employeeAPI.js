import Store from "../store";
import API from "./api";

export function fetchOutlets(merchantId) {
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "post",
    url: "/merchants/deviceRegister",
    data: {
      merchantId: merchantId,
      locationId: "",
      deviceIdentifier: "",
      deviceType: "",
    },
    headers: {
      Authorization: "bearer " + token,
    },
  });
}

export function createEmployee(details) {
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "post",
    url: "/merchants/staff/onBoard",
    data: details,
    headers: {
      Authorization: "bearer " + token,
    },
  });
}

export function getEmployeeDetails() {
  const token = Store.getState().auth.credentials.accessToken;
  const merchantId = Store.getState().auth.credentials.merchantId;
  return API({
    method: "get",
    url: "/merchants/" + merchantId + "/staff",
    headers: {
      Authorization: "bearer " + token,
    },
  });
}

export function removeEmployee(details) {
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "post",
    url: "/merchants/staff/delete",
    data: details,
    headers: {
      Authorization: "bearer " + token,
    },
  });
}
export function manageUserAccess(details) {
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "put",
    url: "/merchants/manage/userAccess",
    data: details,
    headers: {
      Authorization: "bearer " + token,
    },
  });
}

export function updatePIN(details) {
  console.log("Calling from API :::::");
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "put",
    url: `/staff?id=${details.id}&devicePin=${details.pin}`,
    headers: {
      Authorization: "bearer " + token,
    },
  });
}
