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
