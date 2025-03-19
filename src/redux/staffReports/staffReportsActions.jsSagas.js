import { put, call, takeLatest, debounce, fork } from "redux-saga/effects";
import { showSuccessToast, showErrorToast } from "util/toastUtils";


import { decryptJson } from "util/react-ec-utils";

import {
    PRODUCT_INSIGHTS_TOP_REVENUE_REQUEST,
} from './productReportsConstants';

import {
    productInsightsTopRevenueSuccess,
    productInsightsTopRevenueFailure,
  
} from './productReportsActions';

import {
    getProductInsightsTopRevenue
} from './productReportsApi';

function* productInsightsTopRevenueSaga(action) {
    try {
        const response = yield call(getProductInsightsTopRevenue, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(productInsightsTopRevenueSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(productInsightsTopRevenueFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(productInsightsTopRevenueFailure(error));
    }
}


export default function* watchNewReportRequest() {
    // Product Reports watchers
    yield takeLatest(PRODUCT_INSIGHTS_TOP_REVENUE_REQUEST, productInsightsTopRevenueSaga);
}