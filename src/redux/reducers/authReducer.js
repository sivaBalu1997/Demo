import { produce } from "immer";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  OTP_VERIFICATION_REQUEST,
  OTP_VERIFICATION_SUCCESS,
  OTP_VERIFICATION_FAILURE,
  OTP_STATE_CLEAR,
  CREDENTIALS_STORE,
  SIGNOUT,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "../constants/authConstants";

const initialAuthState = {
  // Auth Credential
  credentials: null,

  // SignIn
  signedIn: false,
  signInLoading: false,
  signInMessage: "",

  // SignUp
  signedUp: false,
  signUpLoading: false,
  signUpMessage: "",

  user: null,
  userID: null,

  // OTP
  otpVerficationLoading: false,
  otpVerifiedSuccess: false,

  // Reset Password
  resetPasswordLoading: false,
  resetPasswordSuccess: false,
};

export default function authReducer(state = initialAuthState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      // Credential Reducer
      case CREDENTIALS_STORE:
        draft.credentials = action.payload;
        break;
      // SignUp Reducers
      case SIGNUP_REQUEST:
        draft.signedUp = false;
        draft.signUpLoading = true;
        break;
      case SIGNUP_SUCCESS:
        draft.signedUp = true;
        draft.signUpLoading = false;
        break;
      case SIGNUP_FAILURE:
        draft.signedUp = false;
        draft.signUpLoading = false;
        draft.signUpMessage = action.payload.message;
        break;
      // SignIn Reducers
      case SIGNIN_REQUEST:
        draft.signedIn = false;
        draft.signInLoading = true;
        break;
      case SIGNIN_SUCCESS:
        draft.signedIn = true;
        draft.signInLoading = false;
        draft.credentials = action.payload;
        break;
      case SIGNIN_FAILURE:
        draft.signedIn = false;
        draft.signInLoading = false;
        draft.signInMessage = action.payload.message;
        break;
      case SIGNOUT:
        draft.signedIn = false;
        break;
      // OTP Verify Reducers
      case OTP_VERIFICATION_REQUEST:
        draft.otpVerficationLoading = true;
        draft.otpVerifiedSuccess = false;
        break;
      case OTP_VERIFICATION_SUCCESS:
        draft.otpVerficationLoading = false;
        draft.otpVerifiedSuccess = true;
        draft.userID = action.payload.userID;
        break;
      case OTP_VERIFICATION_FAILURE:
        draft.otpVerficationLoading = false;
        draft.otpVerifiedSuccess = false;
        break;
      case OTP_STATE_CLEAR:
        draft.otpVerficationLoading = false;
        draft.otpVerifiedSuccess = false;
        break;
      // Reset Password
      case RESET_PASSWORD_REQUEST:
        draft.resetPasswordLoading = true;
        draft.resetPasswordSuccess = false;
        break;
      case RESET_PASSWORD_SUCCESS:
        draft.resetPasswordLoading = false;
        draft.resetPasswordSuccess = true;
        break;
      case RESET_PASSWORD_FAILURE:
        draft.resetPasswordLoading = false;
        draft.resetPasswordSuccess = false;
        break;
      default:
        break;
    }
  });
}
