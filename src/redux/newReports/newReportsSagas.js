import { put, call, takeLatest } from "redux-saga/effects";
import { showSuccessToast, showErrorToast } from "util/toastUtils";
import { salesSummarySuccess, salesSummaryFailure, salesByItemCategoryFailure, salesByItemCategorySuccess, salesByRevenueClassSuccess, salesByRevenueClassFailure, actualSalesRequest, actualSalesFailure, actualSalesSuccess, actualSalesThirdPartySuccess, actualSalesThirdPartyFailure } from "./newReportsActions";
import { ACTUAL_SALES_REQUEST, ACTUAL_SALES_THIRD_PARTY_REQUEST, SALES_BY_ITEM_CATEGORY_REQUEST, SALES_BY_REVENUE_CLASS_REQUEST, SALES_SUMMARY_REQUEST } from "./newReportsConstants";
import { getActualSales, getSalesByItemCategory, getSalesByRevenueClass, getSalesSummary } from "./newReportsApi";

export function* salesSummaryRequestSaga(action) {
    try {
        const response = yield call(getSalesSummary, action.payload);
        if (response.status === 200) {
            console.log("response of salesSummaryRequestSaga", { response });
            yield put(salesSummarySuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(salesSummaryFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(salesSummaryFailure(error));
    }
}

export function* salesByItemCategoryRequestSaga(action) {
    try {
        const response = yield call(getSalesByItemCategory, action.payload);
        if (response.status === 200) {
            console.log("response of salesByItemCategoryRequestSaga", { response })
            yield put(salesByItemCategorySuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(salesByItemCategoryFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(salesByItemCategoryFailure(error));
    }
}

export function* salesByRevenueClassRequestSaga(action) {
    try {
        const response = yield call(getSalesByRevenueClass, action.payload);
        if (response.status === 200) {
            console.log("response of salesByRevenueClassRequestSaga", { response })
            yield put(salesByRevenueClassSuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(salesByRevenueClassFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(salesByRevenueClassFailure(error));
    }
}

export function* actualSalesRequestSaga(action) {
    try {
        const response = yield call(getActualSales, action.payload);
        if (response.status === 200) {
            console.log("response of actualSalesRequestSaga", { response })
            yield put(actualSalesSuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(actualSalesFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(actualSalesFailure(error));
    }
}

export function* actualSalesThirdPartyRequestSaga(action) {
    try {
        const response = yield call(getActualSales, action.payload);
        if (response.status === 200) {
            console.log("response of actualSalesThirdPartyRequestSaga", { response })
            yield put(actualSalesThirdPartySuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(actualSalesThirdPartyFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(actualSalesThirdPartyFailure(error));
    }
}

export default function* watchNewReportRequest() {
    yield takeLatest(SALES_SUMMARY_REQUEST, salesSummaryRequestSaga);
    yield takeLatest(SALES_BY_ITEM_CATEGORY_REQUEST, salesByItemCategoryRequestSaga);
    yield takeLatest(SALES_BY_REVENUE_CLASS_REQUEST, salesByRevenueClassRequestSaga);
    yield takeLatest(ACTUAL_SALES_REQUEST, actualSalesRequestSaga);
    yield takeLatest(ACTUAL_SALES_THIRD_PARTY_REQUEST, actualSalesThirdPartyRequestSaga);
}