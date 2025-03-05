import { put, call, takeLatest, debounce, fork } from "redux-saga/effects";
import { showSuccessToast, showErrorToast } from "util/toastUtils";
import {
    salesSummarySuccess,
    salesSummaryFailure,
   
} from "./checkInReportsActions";
import {
    ACTUAL_SALES_REQUEST,
 
} from "./checkInReportsConstants";
import {
    getActualSales,
   
} from "./checkInReportsApi";
import { decryptJson } from "util/react-ec-utils";

export function* checkInReportsSaga(action) {
    try {
        const response = yield call(getSalesSummary, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of salesSummaryRequestSaga", { decryptedData });
            yield put(salesSummarySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(salesSummaryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(salesSummaryFailure(error));
    }
}



export default function* watchNewReportRequest() {
    yield takeLatest(SALES_SUMMARY_REQUEST, salesSummaryRequestSaga);
   
}