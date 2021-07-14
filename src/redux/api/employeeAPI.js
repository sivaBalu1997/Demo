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

export function getEmployeeDetails(merchantId) {
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "get",
    url: "/merchants/" + merchantId + "/staff",
    headers: {
      Authorization: "bearer " + token,
    },
  });
}
