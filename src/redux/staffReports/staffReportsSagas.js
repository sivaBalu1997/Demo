import { put, call, takeLatest } from "redux-saga/effects";
import { showErrorToast } from "util/toastUtils";
import { decryptJson } from "util/react-ec-utils";

import {
    STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_REQUEST,
    STAFF_OVERVIEW_ACTIVITIES_REQUEST,
    STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_TABLE_REQUEST,
    STAFF_TREND_SALES_PERFORMANCE_REQUEST,
    STAFF_TREND_REVENUE_IMPACT_PERFORMANCE_REQUEST,
    STAFF_TREND_ERROR_PERFORMANCE_REQUEST,
} from './staffReportsConstants';

import {
    staffOverviewEmployeePerformanceSuccess,
    staffOverviewEmployeePerformanceFailure,
    staffOverviewActivitiesSuccess,
    staffOverviewActivitiesFailure,
    staffOverviewEmployeePerformanceTableSuccess,
    staffOverviewEmployeePerformanceTableFailure,
    staffTrendSalesPerformanceSuccess,
    staffTrendSalesPerformanceFailure,
    staffTrendRevenueImpactPerformanceSuccess,
    staffTrendRevenueImpactPerformanceFailure,
    staffTrendErrorPerformanceSuccess,
    staffTrendErrorPerformanceFailure,
} from './staffReportsActions';

import {
    getStaffOverviewEmployeePerformance,
    getStaffOverviewActivities,
    getStaffOverviewEmployeePerformanceTable,
    getStaffTrendSalesPerformance,
    getStaffTrendRevenueImpactPerformance,
    getStaffTrendErrorPerformance,
} from './staffReportsApi';

function* staffOverviewEmployeePerformanceSaga(action) {
    try {
        const response = yield call(getStaffOverviewEmployeePerformance, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(staffOverviewEmployeePerformanceSuccess(decryptedData));
        } else {
            yield put(staffOverviewEmployeePerformanceFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(staffOverviewEmployeePerformanceFailure(error));
    }
}

function* staffOverviewActivitiesSaga(action) {
    try {
        const response = yield call(getStaffOverviewActivities, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(staffOverviewActivitiesSuccess(decryptedData));
        } else {
            yield put(staffOverviewActivitiesFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(staffOverviewActivitiesFailure(error));
    }
}

function* staffOverviewEmployeePerformanceTableSaga(action) {
    try {
        const response = yield call(getStaffOverviewEmployeePerformanceTable, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(staffOverviewEmployeePerformanceTableSuccess(decryptedData));
        } else {
            yield put(staffOverviewEmployeePerformanceTableFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(staffOverviewEmployeePerformanceTableFailure(error));
    }
}

function* staffTrendSalesPerformanceSaga(action) {
    try {
        const response = yield call(getStaffTrendSalesPerformance, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(staffTrendSalesPerformanceSuccess(decryptedData));
        } else {
            yield put(staffTrendSalesPerformanceFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(staffTrendSalesPerformanceFailure(error));
    }
}

function* staffTrendRevenueImpactPerformanceSaga(action) {
    try {
        const response = yield call(getStaffTrendRevenueImpactPerformance, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(staffTrendRevenueImpactPerformanceSuccess(decryptedData));
        } else {
            yield put(staffTrendRevenueImpactPerformanceFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(staffTrendRevenueImpactPerformanceFailure(error));
    }
}

function* staffTrendErrorPerformanceSaga(action) {
    try {
        const response = yield call(getStaffTrendErrorPerformance, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(staffTrendErrorPerformanceSuccess(decryptedData));
        } else {
            yield put(staffTrendErrorPerformanceFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(staffTrendErrorPerformanceFailure(error));
    }
}




export default function* watchNewReportRequest() {
    // Product Reports watchers
    yield takeLatest(STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_REQUEST, staffOverviewEmployeePerformanceSaga);
    yield takeLatest(STAFF_OVERVIEW_ACTIVITIES_REQUEST, staffOverviewActivitiesSaga);
    yield takeLatest(STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_TABLE_REQUEST, staffOverviewEmployeePerformanceTableSaga);
    yield takeLatest(STAFF_TREND_SALES_PERFORMANCE_REQUEST, staffTrendSalesPerformanceSaga);
    yield takeLatest(STAFF_TREND_REVENUE_IMPACT_PERFORMANCE_REQUEST, staffTrendRevenueImpactPerformanceSaga);
    yield takeLatest(STAFF_TREND_ERROR_PERFORMANCE_REQUEST, staffTrendErrorPerformanceSaga);
}