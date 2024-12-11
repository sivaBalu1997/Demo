import { put, call, takeLatest } from "redux-saga/effects";
import {
  successGetOfferList,
  failedGetOfferList,
 
  failureDropdownData,
  successDropdownData,
  createOfferSuccess,
  createOfferFailure,
  successEditOffer,
  failedEditOffer,
  deleteOfferSuccess,
  deleteOfferFailed,
  disableOfferSuccess,
  disableOfferFailed,
  OfferDataSendingrSuccess,
  OfferDataSendingFailed,
  fetchDropDownFailure,
  fetchDropDownSuccess,
  fetchSubDropDownFailure,
  fetchSubDropDownSuccess
  
} from "./offerActions";
import {
  deleteOffer,
  disableOffer,
  getOfferList,
  createOffer,
  EditOffer,
  getDropdownData,
  getCatagoryDropdownData,
} from "../offer/offersAPI";
import {
  OFFER_LIST_REQUEST,
  
  EDIT_OFFER_REQUEST,
  CREATE_OFFER_REQUEST,
  DROPDOWN_DATA_REQUEST,
  DELETE_OFFER_REQUEST,
  DISABLE_OFFER_REQUEST,
  OFFER_DATA_REQUEST,
  CATEGORY_FETCHDROPDOWN_REQUEST,
  SUB_CATEGORY_FETCHDROPDOWN_REQUEST
  
} from "./offerConstants";

export function* getOfferListSaga(action) {
  try {
    const response = yield call(getOfferList, action.payload);

    if (response.status === 200) {
   
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
 
    yield put(createOfferFailure(err.response.data[0] ));
  }
}

export function* OfferDataPostSaga(action) {
  try {
    const response = yield call(createOffer, action.payload);
    if (response.status === 200) {
      yield put(OfferDataSendingrSuccess(response.data));
    }
  } catch (err) {
 
    yield put(OfferDataSendingFailed(err.response.data[0] ));
  }
}

export function* EditOfferSaga(action) {
  try {
    const response = yield call(EditOffer, action.payload);
    if (response.status === 200) {
      yield put(successEditOffer(response.data));
    }
  } catch (err) {
    yield put(failedEditOffer(err.response.data[0] ));
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

function* deleteOfferSaga(action) {
  try {
    const response = yield call(deleteOffer, action.payload);
    if (response.status === 200) {
      yield put(deleteOfferSuccess(response.data));
    } else {
      yield put(deleteOfferFailed({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(deleteOfferFailed({ message: "please Try Again" }));
  }
}

export function* disableOfferSaga(action) {
  try {
    const response = yield call(disableOffer, action.payload);
    if (response.status === 200) {
      yield put(disableOfferSuccess(response.data));
    }
    else {
      yield put(disableOfferFailed({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(disableOfferFailed({ message: "Please Try Again" }));
  }
}
function* categoryDropdownSaga(action) {
  try {
    const response = yield call(getCatagoryDropdownData, action.payload);
    if (response.status === 200) {
      yield put(fetchDropDownSuccess(response.data));
    } else {
      yield put(fetchDropDownFailure({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(fetchDropDownFailure({ message: "please Try Again" }));
  }
}
function* subCategoryDropdownSaga(action) {
  try {
    const response = yield call(getCatagoryDropdownData, action.payload);
    if (response.status === 200) {
      yield put(fetchSubDropDownSuccess(response.data));
    } else {
      yield put(fetchSubDropDownFailure({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(fetchSubDropDownFailure({ message: "please Try Again" }));
  }
}

export default function* offerSaga() {
  yield takeLatest(SUB_CATEGORY_FETCHDROPDOWN_REQUEST, subCategoryDropdownSaga);
  yield takeLatest(CATEGORY_FETCHDROPDOWN_REQUEST, categoryDropdownSaga);
  yield takeLatest(OFFER_LIST_REQUEST, getOfferListSaga);
  yield takeLatest(CREATE_OFFER_REQUEST, createOfferSaga);
  yield takeLatest(OFFER_DATA_REQUEST, OfferDataPostSaga);

  yield takeLatest(DELETE_OFFER_REQUEST, deleteOfferSaga);
  yield takeLatest(DISABLE_OFFER_REQUEST, disableOfferSaga);
  yield takeLatest(DROPDOWN_DATA_REQUEST, dropdownDataSaga);
  yield takeLatest(EDIT_OFFER_REQUEST, EditOfferSaga);
}
