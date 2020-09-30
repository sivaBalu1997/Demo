import API from "./api";

// SignUp
export function signUp(userDetails) {
  return API({
    method: "post",
    url: "",
    headers: {
      Authorization: "",
    },
    data: userDetails,
  });
}

// SignIn
export function signIn(userDetails) {
  return API({
    method: "post",
    url: "/merchants/staff/login",
    headers: {
      Authorization: "",
    },
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
