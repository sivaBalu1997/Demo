import { put, call, takeLatest } from "redux-saga/effects";
import { showSuccessToast, showErrorToast } from "util/toastUtils";
import { salesSummarySuccess, salesSummaryFailure } from "./newReportsActions";
import { SALES_SUMMARY_REQUEST } from "./newReportsConstants";
import { getSalesSummary } from "./newReportsApi";

export function* salesSummaryRequestSaga(action) {
    try {
        const response = yield call(getSalesSummary, action.payload);
        if (response.status === 200) {
            console.log({ response });
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

export default function* watchNewReportRequest() {
    yield takeLatest(SALES_SUMMARY_REQUEST, salesSummaryRequestSaga);
}