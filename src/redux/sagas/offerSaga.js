import { put, call, takeLatest } from "redux-saga/effects";
import { successGetOfferList, failedGetOfferList, successOnDeleteAnOffer, successOnDisableAnOffer } from "../actions/offerActions";
import { deleteOffer, disableOffer, getOfferList } from "../api/offersAPI";
import { OFFER_LIST_REQUEST, OFFER_DELETE_REQUEST, OFFER_DISABLE_REQUEST } from "../constants/offerConstants";

export function* getOfferListSaga(action) {
    try {
        const response = yield call(getOfferList, action.payload);
        if (response.status === 200) {
            //console.log("Outlets :" + response.data);
            yield put(successGetOfferList(response.data));
        }
    } catch (err) {
        yield put(failedGetOfferList({ message: "Please Try Again" }));
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
    yield takeLatest(OFFER_DELETE_REQUEST, deleteOfferSaga);
    yield takeLatest(OFFER_DISABLE_REQUEST, disableOfferSaga);
}