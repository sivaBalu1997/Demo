import { put, call, takeLatest } from "redux-saga/effects";
import {
  successSignUp,
  failedSignUp,
  failedSignIn,
  successSignIn,
  failedVerifyOTP,
  successVerifyOTP,
  storeCredentials,
  failedResetPassword,
  successResetPassword,
} from "../actions/authActions";
import {
  SIGNUP_REQUEST,
  SIGNIN_REQUEST,
  OTP_VERIFICATION_REQUEST,
  RESET_PASSWORD_REQUEST,
} from "../constants/authConstants";
import { signUp, signIn, verifyOTP, resetPassword } from "../api/authAPI";
import { CREDENTIALS } from "../../shared/constants";

function* signUpSaga(action) {
  try {
    const response = yield call(signUp, action.payload);
    console.log(response.data);
    if (response.status === 200) {
      const result = response.data;
      if (result.metaDataInfo.responseCode == "ERROR") {
        yield put(
          failedSignUp({ message: result.metaDataInfo.responseMessage })
        );
      } else if (result.metaDataInfo.responseCode == "SUCCESS") {
        yield put(
          successSignUp({ message: result.metaDataInfo.responseMessage })
        );
      }
    }
  } catch (err) {
    yield put(failedSignUp({ message: "Please Try Again" }));
  }
}

function* signInSaga(action) {
  try {
    const response = yield call(signIn, action.payload);
    if (response.status == 200) {
      const result = response.data;
      if (result.metaDataInfo.responseCode == "ERROR") {
        yield put(
          failedSignIn({
            message: response.data.metaDataInfo.responseMessage,
          })
        );
      } else {
        const result = response.data;
        console.log(result);
        // Store Credentials in Local Storage
        localStorage.setItem(
          CREDENTIALS,
          JSON.stringify(result.metaDataInfo.data)
        );
        yield put(successSignIn(result.metaDataInfo.data));
      }
    } else {
      yield put(
        failedSignIn({ message: "Failed to SignIn, Please Try Again" })
      );
    }
  } catch (err) {
    console.log("Catch", err);
    yield put(failedSignIn({ message: "Failed to SignIn, Please Try Again" }));
  }
}

function* verifyOTPSaga(action) {
  try {
    const response = yield call(verifyOTP, action.payload);
    // console.log(response);
    if (response.status === 200) {
      const result = response.data;
      if (result.metaDataInfo.responseCode == "ERROR") {
        yield put(
          failedVerifyOTP({ message: result.metaDataInfo.responseMessage })
        );
      } else if (result.metaDataInfo.responseCode == "SUCCESS") {
        yield put(
          successVerifyOTP({ userID: result.metaDataInfo.responseMessage })
        );
      }
    }
  } catch (err) {
    yield put(failedSignUp({ message: "Please Try Again" }));
  }
}

function* resetPasswordSaga(action) {
  try {
    const response = yield call(resetPassword, action.payload);
    // console.log(response);
    if (response.status === 200) {
      const result = response.data;
      if (result.metaDataInfo.responseCode == "ERROR") {
        yield put(
          failedResetPassword({ message: result.metaDataInfo.responseMessage })
        );
      } else if (result.metaDataInfo.responseCode == "SUCCESS") {
        yield put(
          successResetPassword({ message: result.metaDataInfo.responseMessage })
        );
      }
    }
  } catch (err) {
    yield put(failedSignUp({ message: "Please Try Again" }));
  }
}

export default function* authSaga() {
  yield takeLatest(SIGNUP_REQUEST, signUpSaga);
  yield takeLatest(SIGNIN_REQUEST, signInSaga);
  yield takeLatest(OTP_VERIFICATION_REQUEST, verifyOTPSaga);
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
}
