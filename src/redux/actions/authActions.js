import {
  SIGNIN_REQUEST,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNUP_RESET,
  OTP_VERIFICATION_REQUEST,
  OTP_VERIFICATION_FAILURE,
  OTP_VERIFICATION_SUCCESS,
  OTP_STATE_CLEAR,
  CREDENTIALS_STORE,
  SIGNOUT,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
  RESTAURANT_DETAIL_FAILURE,
  RESTAURANT_DETAIL_REQUEST,
  RESTAURANT_DETAIL_SUCCESS,
  SELECTED_BRANCH,
} from "../constants/authConstants";

// Credential Store
export const storeCredentials = (details) => ({
  type: CREDENTIALS_STORE,
  payload: details,
});

// SignUp
export const signUp = (details) => ({
  type: SIGNUP_REQUEST,
  payload: details,
});

export const failedSignUp = (details) => ({
  // Replace any with Network Data Fail Data format
  type: SIGNUP_FAILURE,
  payload: details,
});

export const successSignUp = (details) => ({
  type: SIGNUP_SUCCESS,
  payload: details,
});

export const signUpReset = () => ({
  type: SIGNUP_RESET,
});

// SignIn
export const signIn = (details) => ({
  type: SIGNIN_REQUEST,
  payload: details,
});

export const failedSignIn = (details) => ({
  // Replace any with Network Data Fail Data format
  type: SIGNIN_FAILURE,
  payload: details,
});

export const successSignIn = (details) => ({
  type: SIGNIN_SUCCESS,
  payload: details,
});

export const signOut = (details) => ({
  type: SIGNOUT,
});

// OTP
export const verifyOTP = (details) => ({
  type: OTP_VERIFICATION_REQUEST,
  payload: details,
});

export const failedVerifyOTP = (details) => ({
  // Replace any with Network Data Fail Data format
  type: OTP_VERIFICATION_FAILURE,
  payload: details,
});

export const successVerifyOTP = (details) => ({
  type: OTP_VERIFICATION_SUCCESS,
  payload: details,
});

// clear OTP
export const clearOTPState = () => ({
  type: OTP_STATE_CLEAR,
});

// reset Password
export const resetPassword = (details) => ({
  type: RESET_PASSWORD_REQUEST,
  payload: details,
});

export const failedResetPassword = (details) => ({
  // Replace any with Network Data Fail Data format
  type: RESET_PASSWORD_FAILURE,
  payload: details,
});

export const successResetPassword = (details) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: details,
});

// Restaurant Details
export const getRestaurantRequest = (details) => ({
  type: RESTAURANT_DETAIL_REQUEST,
  payload: details,
});

export const getRestaurantSuccess = (details) => ({
  type: RESTAURANT_DETAIL_SUCCESS,
  payload: details,
});

export const getRestaurantFailed = (details) => ({
  type: RESTAURANT_DETAIL_FAILURE,
  payload: details,
});

//

export const selectBranch = (details) => ({
  type: SELECTED_BRANCH,
  payload: details,
});
