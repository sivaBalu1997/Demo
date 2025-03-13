import { put, call, takeLatest, debounce, fork } from "redux-saga/effects";
import { showSuccessToast, showErrorToast } from "util/toastUtils";
import {
    summaryInsightsCustomerVolumeSuccess,
    summaryInsightsCustomerVolumeFailure,
    summaryInsightsCustomerByTenureSuccess,
    summaryInsightsCustomerByTenureFailure,
    summaryInsightsCustomerByTotalSpendSuccess,
    summaryInsightsCustomerByTotalSpendFailure,
    summaryInsightsCustomerByAvgCoverSizeSuccess,
    summaryInsightsCustomerByAvgCoverSizeFailure,
    summaryInsightsCustomerByLoyaltySuccess,
    summaryInsightsCustomerByLoyaltyFailure
} from "./customerInsightsActions";
import {
    SUMMARY_INSIGHTS_CUSTOMER_VOLUME_REQUEST,
    SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_REQUEST,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_REQUEST,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_REQUEST,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_REQUEST

} from "./customerInsightsConstants";
import {
    getSummaryInsightsCustomerVolume,
    getSummaryInsightsCustomerByTenure,
    getSummaryInsightsCustomersByTotalSpend,
    getSummaryInsightsCustomersByAvgCoverSize,
    getSummaryInsightsCustomersByLoyalty

} from "./customerInsightsApi";
import { decryptJson } from "util/react-ec-utils";

export function* summaryInsightsCustomerVolumeSaga(action) {
    try {
        const response = yield call(getSummaryInsightsCustomerVolume, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(summaryInsightsCustomerVolumeSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(summaryInsightsCustomerVolumeFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(summaryInsightsCustomerVolumeFailure(error));
    }
}

export function* summaryInsightsCustomerByTenureSaga(action) {
    try {
        const response = yield call(getSummaryInsightsCustomerByTenure, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(summaryInsightsCustomerByTenureSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(summaryInsightsCustomerByTenureFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(summaryInsightsCustomerByTenureFailure(error));
    }
}



export function* summaryInsightsCustomerByTotalSpendSaga(action) {
    try {
        const response = yield call(getSummaryInsightsCustomersByTotalSpend, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(summaryInsightsCustomerByTotalSpendSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(summaryInsightsCustomerByTotalSpendFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(summaryInsightsCustomerByTotalSpendFailure(error));
    }
}


export function* summaryInsightsCustomerByAvgCoverSizeSaga(action) {
    try {
        const response = yield call(getSummaryInsightsCustomersByAvgCoverSize, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(summaryInsightsCustomerByAvgCoverSizeSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(summaryInsightsCustomerByAvgCoverSizeFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(summaryInsightsCustomerByAvgCoverSizeFailure(error));
    }
}


export function* summaryInsightsCustomerByLoyaltyLevelSaga(action) {
    try {
        const response = yield call(getSummaryInsightsCustomersByLoyalty, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(summaryInsightsCustomerByLoyaltySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(summaryInsightsCustomerByLoyaltyFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(summaryInsightsCustomerByLoyaltyFailure(error));
    }
}
// export function* checkInOverviewTopCustomerSaga(action) {
//     try {
//         const response = yield call(getCheckInOverviewTopCustomer, action.payload);
//         const decryptedData = decryptJson(response?.data?.encryptedText)
//         if (response.status === 200) {
//             yield put(checkInOverviewTopCustomerSuccess(decryptedData));
//             showSuccessToast(decryptedData?.message);
//         } else {
//             yield put(checkInOverviewTopCustomerFailure(decryptedData?.message));
//             showErrorToast(decryptedData?.message);
//         }
//     } catch (error) {
//         yield put(checkInOverviewTopCustomerFailure(error));
//     }

export default function* watchNewReportRequest() {
    yield takeLatest(SUMMARY_INSIGHTS_CUSTOMER_VOLUME_REQUEST, summaryInsightsCustomerVolumeSaga);
    yield takeLatest(SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_REQUEST, summaryInsightsCustomerByTenureSaga);
    yield takeLatest(SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_REQUEST, summaryInsightsCustomerByTotalSpendSaga);
    yield takeLatest(SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_REQUEST, summaryInsightsCustomerByAvgCoverSizeSaga); //);
    yield takeLatest(SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_REQUEST, summaryInsightsCustomerByLoyaltyLevelSaga); //);

    

    // yield debounce(1000, CHECK_IN_OVERVIEW_TOP_CUSTOMER_REQUEST, checkInOverviewTopCustomerSaga);

}