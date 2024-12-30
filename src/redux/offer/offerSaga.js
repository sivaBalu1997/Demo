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
  fetchSubDropDownSuccess,
  SPOfferListSendingrSuccess,
  SPOfferListSendingFailed,
  SPOfferListRequest,
  SPOfferListSuccess,
  SPOfferListFailed,
  SPOfferListDeleteFailed,
  SPOfferListDeleteSuccess,
  SPOfferListDisableSuccess,
  SPOfferListDisableFailed,
  createSpecialOfferSuccess,
  createSpecialOfferFailure,
  updateSpecialOfferSuccess,
  updateSpecialOfferFailure,
  getOfferItemsSuccess,
  getOfferItemsFailure,
  createSpecialOfferOverlapData,
} from "./offerActions";
import {
  deleteOffer,
  disableOffer,
  getOfferList,
  createOffer,
  EditOffer,
  getDropdownData,
  getCatagoryDropdownData,
  getSPOfferList,
  getSPOfferListItemDelete,
  getSPOfferListItemDisable,
  createSpecialOffer,
  UpdateSpecialOffer,
  getOfferListdata,
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
  SUB_CATEGORY_FETCHDROPDOWN_REQUEST,
  SP_OFFER_LIST_REQUEST,
  SP_OFFER_LIST_SENDING_REQUEST,
  SP_OFFER_LIST_VIEW_REQUEST,
  SP_OFFER_LIST_DELETE_REQUEST,
  SP_OFFER_LIST_DISABLE_REQUEST,
  CREATE_SPECIAL_OFFER_REQUEST,
  GET_OFFER_ITEMS_REQUEST,
  UPDATE_SPECIAL_OFFER_REQUEST,
} from "./offerConstants";
import { showSuccessToast } from "util/toastUtils";
import {
  showErrorToast,
  showInfoToast,
  showWarningToast,
} from "../../util/toastUtils";

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
    yield put(createOfferFailure(err.response.data[0]));
  }
}

export function* EditOfferSaga(action) {
  try {
    const response = yield call(EditOffer, action.payload);
    if (response.status === 200) {
      yield put(successEditOffer(response.data));
    }
  } catch (err) {
    yield put(failedEditOffer(err.response.data[0]));
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
    } else {
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

export function* OfferDataPostSaga(action) {
  try {
    const response = yield call(createOffer, action.payload);
    if (response.status === 200) {
      yield put(SPOfferListSendingrSuccess(response.data));
    }
  } catch (err) {
    yield put(SPOfferListSendingFailed(err.response.data[0]));
  }
}

export function* getSpofferList(action) {
  try {
    const response = yield call(getSPOfferList, action.payload);
    console.log({ response });

    if (response.status === 200) {
      yield put(SPOfferListSuccess(response.data));
    }
  } catch (err) {
    yield put(SPOfferListFailed({ message: "Please Try Again" }));
  }
}

function* deleteSpOfferSaga(action) {
  try {
    console.log("vbnm", action.payload);
    const response = yield call(getSPOfferListItemDelete, action.payload);
    console.log(response);

    if (response.status === 200) {
      yield put(SPOfferListDeleteSuccess(response.data.message));

      yield put({
        type: SP_OFFER_LIST_VIEW_REQUEST,
        payload: action?.payload?.loactionId,
      });
      showSuccessToast(response.data.message);
    } else {
      yield put(SPOfferListDeleteFailed(response.data.message));

      showErrorToast(response.data.message);
    }
  } catch (err) {
    yield put(SPOfferListDeleteFailed("failed"));
  }
}

function* disableSpOfferSaga(action) {
  try {
    console.log("data", action.payload);

    const response = yield call(getSPOfferListItemDisable, action.payload);
    console.log(response);

    if (response.status === 200) {
      yield put(SPOfferListDisableSuccess(response.data.message));
      yield put({
        type: SP_OFFER_LIST_VIEW_REQUEST,
        payload: action?.payload?.locationId,
      });
      showSuccessToast(response.data.message);
    } else {
      yield put(SPOfferListDisableFailed(response.data.message));

      showErrorToast(response.data.message);
    }
  } catch (err) {
    yield put(SPOfferListDisableFailed("failed"));
  }
}

function* createSpecialOfferSaga(action) {
  try {
    const response = yield call(createSpecialOffer, action.payload);
    console.log("vb", action.payload);

    if (response.status === 200) {
      const resdata = {
        headers: {},
        body: [
          {
            offerId: "cefb0ef2-65ff-44e5-861b-3633c0e23c94",
            offerName: "Diwali201overlap",
            offerPrice: 20.0,
            offerStartTime: "12:30:00",
            offerEndTime: "13:30:00",
            itemId: "0193aad5-cfe3-7afd-8db0-1e5e4c632557",
            itemName: "heqe",
            currentOfferName: "Offertest34",
            currentOfferPrice: 25.0,
            currentOfferStartTime: "00:00:00",
            currentOfferEndTime: "12:35:00",
          },
          {
            offerId: "cefb0ef2-65ff-44e5-861b-3633c0e23c94",
            offerName: "Diwali201overlap",
            offerPrice: 20.0,
            offerStartTime: "12:30:00",
            offerEndTime: "13:30:00",
            itemId: "0193aafb-a8f3-77d4-b45f-e2faaba5788c",
            itemName: "heqe",
            currentOfferName: "Offertest34",
            currentOfferPrice: 25.0,
            currentOfferStartTime: "00:00:00",
            currentOfferEndTime: "12:35:00",
          },
          {
            offerId: "cefb0ef2-65ff-44e5-861b-3633c0e23c94",
            offerName: "Diwali201overlap",
            offerPrice: 20.0,
            offerStartTime: "12:30:00",
            offerEndTime: "13:30:00",
            itemId: "0193ab90-1165-79c1-82b7-a688a44027e2",
            itemName: "kasbjndk",
            currentOfferName: "Offertest34",
            currentOfferPrice: 25.0,
            currentOfferStartTime: "00:00:00",
            currentOfferEndTime: "12:35:00",
          },
        ],
        statusCode: "CONFLICT",
        statusCodeValue: 409,
      };

      if(response.data.statusCodeValue===409)
      {
        yield put(createSpecialOfferOverlapData(response.data.body));

      }
      else{
        yield put(createSpecialOfferSuccess(response.data.message));
        showSuccessToast(response.data.message);
        yield put({
          type: SP_OFFER_LIST_VIEW_REQUEST,
          payload: action?.payload?.locationId,
        });
      }

      
    } 
    
    
    else {
      yield put(createSpecialOfferFailure(response.data.message));
      showErrorToast(response.data.message);
    }
  } catch (err) {
    yield put(createSpecialOfferFailure({ message: "Please Try Again" }));
  }
}
function* getOfferListItemSage(action) {
  try {
    const response = yield call(getOfferListdata, action.payload);
    if (response.status === 200) {
      yield put(getOfferItemsSuccess(response.data));
    } else {
      yield put(getOfferItemsFailure(response.data.message));
    }
  } catch (err) {
    yield put(getOfferItemsFailure({ message: "Please Try Again" }));
  }
}

export function* updateSpOfferSaga(action) {
  try {
    const response = yield call(UpdateSpecialOffer, action.payload);
    if (response.status === 200) {


      if(response.data.statusCodeValue===409)
        {
          yield put(createSpecialOfferOverlapData(response.data.body));
  
        }
        else{
   
          showSuccessToast(response.data.message);
         

          yield put(updateSpecialOfferSuccess(response.data));
          yield put({
            type: SP_OFFER_LIST_VIEW_REQUEST,
            payload: action?.payload?.locationId,
          });
        }
     
    }
    else {
      yield put(updateSpecialOfferFailure(response.data.message));
      showErrorToast(response.data.message);
    }

  } catch (err) {
    yield put(updateSpecialOfferFailure(err.response.data[0]));
  }
}

export default function* offerSaga() {
  yield takeLatest(GET_OFFER_ITEMS_REQUEST, getOfferListItemSage);
  yield takeLatest(CREATE_SPECIAL_OFFER_REQUEST, createSpecialOfferSaga);
  yield takeLatest(SUB_CATEGORY_FETCHDROPDOWN_REQUEST, subCategoryDropdownSaga);
  yield takeLatest(CATEGORY_FETCHDROPDOWN_REQUEST, categoryDropdownSaga);
  yield takeLatest(OFFER_LIST_REQUEST, getOfferListSaga);
  yield takeLatest(CREATE_OFFER_REQUEST, createOfferSaga);
  yield takeLatest(SP_OFFER_LIST_SENDING_REQUEST, OfferDataPostSaga);
  yield takeLatest(SP_OFFER_LIST_VIEW_REQUEST, getSpofferList);
  yield takeLatest(SP_OFFER_LIST_DELETE_REQUEST, deleteSpOfferSaga);
  yield takeLatest(SP_OFFER_LIST_DISABLE_REQUEST, disableSpOfferSaga);
  yield takeLatest(UPDATE_SPECIAL_OFFER_REQUEST, updateSpOfferSaga);
  yield takeLatest(DELETE_OFFER_REQUEST, deleteOfferSaga);
  yield takeLatest(DISABLE_OFFER_REQUEST, disableOfferSaga);
  yield takeLatest(DROPDOWN_DATA_REQUEST, dropdownDataSaga);
  yield takeLatest(EDIT_OFFER_REQUEST, EditOfferSaga);
}
