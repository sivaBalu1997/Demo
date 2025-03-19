import { API } from "redux/api";
import Store from "../store";

// SignUp
export function signUp(userDetails) {
  return API({
    method: "post",
    url: "",
    data: userDetails,
  });
}

export function resetPassword(authDetails) {
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "post",
    url: "/merchants/resetPassword",
    headers: {
      Authorization: "bearer " + token,
    },
    data: authDetails,
  });
}

// SignIn
export function signIn(userDetails) {
  return API({
    method: "post",
    url: "/merchants/staff/login",
    data: userDetails,
  });
}

// OTP
export function verifyOTP(details) {
  return API({
    method: "post",
    url: "",
    data: details,
  });
}

// Get Restaurant Details
export function getRestaurantDetails(id) {
  console.log("id from getRestaurantDetails", {id})
  return API({
    method: "get",
    url: "/merchants/location/" + id + "/details",
  });
}
