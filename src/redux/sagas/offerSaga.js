import { put, call, takeLatest } from "redux-saga/effects";
import {
  successGetOfferList,
  failedGetOfferList,
  successOnDeleteAnOffer,
  successOnDisableAnOffer,
  failureDropdownData,
  successDropdownData,
  createOfferSuccess,
  createOfferFailure,
  successEditOffer,
  failedEditOffer,
} from "../actions/offerActions";
import {
  deleteOffer,
  disableOffer,
  getOfferList,
  createOffer,
  EditOffer,
  getDropdownData,
} from "../api/offersAPI";
import {
  OFFER_LIST_REQUEST,
  OFFER_DELETE_REQUEST,
  OFFER_DISABLE_REQUEST,
  EDIT_OFFER_REQUEST,
  CREATE_OFFER_REQUEST,
  DROPDOWN_DATA_REQUEST,
} from "../constants/offerConstants";

export function* getOfferListSaga(action) {
  try {
    const response = yield call(getOfferList, action.payload);
    
    if (response.status === 200) {
      console.log(response,response.data,"DDDDDD")
      console.log("Outlets :" + response.data);
      yield put(successGetOfferList(response.data));
    }
  } catch (err) {
    yield put(failedGetOfferList({ message: "Please Try Again" }));
  }
}

export function* createOfferSaga(action) {
  try {
    const response = yield call(createOffer, action.payload);
    if (response.status === 200) {
     
      yield put(createOfferSuccess(response.data));
    }
  } catch (err) {
    yield put(createOfferFailure({ message: "Please Try Again" }));
  }
}

export function* EditOfferSaga(action) {
  try {
    const response = yield call(EditOffer, action.payload);
    if (response.status === 200) {

      yield put(successEditOffer(response.data));
    }
  } catch (err) {
    yield put(failedEditOffer({ message: "Please Try Again" }));
  }
}

export function* dropdownDataSaga(action) {
  try {
    const response = yield call(getDropdownData, action.payload);
    if (response.status === 200) {
     
      yield put(successDropdownData(response.data));
    }
  } catch (err) {
    yield put(failureDropdownData({ message: "Please Try Again" }));
  }
}

export function* deleteOfferSaga(action) {
  try {
    const response = yield call(deleteOffer, action.payload);
    if (response.status === 200) {
      yield put(successOnDeleteAnOffer(response.data));
     
    }
  } catch (err) {
    yield put(failedGetOfferList({ message: "Please Try Again" }));
  }
}

export function* disableOfferSaga(action) {
  try {
    const response = yield call(disableOffer, action.payload);
    if (response.status === 200) {
      yield put(successOnDisableAnOffer(response.data));
    }
  } catch (err) {
    yield put(failedGetOfferList({ message: "Please Try Again" }));
  }
}

export default function* offerSaga() {
  yield takeLatest(OFFER_LIST_REQUEST, getOfferListSaga);
  yield takeLatest(CREATE_OFFER_REQUEST, createOfferSaga);
  yield takeLatest(CREATE_OFFER_REQUEST, createOfferSaga);
  yield takeLatest(OFFER_DELETE_REQUEST, deleteOfferSaga);
  yield takeLatest(OFFER_DISABLE_REQUEST, disableOfferSaga);
  yield takeLatest(DROPDOWN_DATA_REQUEST, dropdownDataSaga);
  yield takeLatest(EDIT_OFFER_REQUEST, EditOfferSaga);
}
