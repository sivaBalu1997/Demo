import { put, call, takeLatest, debounce, fork } from "redux-saga/effects";
import { showSuccessToast, showErrorToast } from "util/toastUtils";
import {
    liveCheckInOverviewSuccess,
    liveCheckInOverviewFailure,
    liveCheckInSeaterAvailabilitySuccess,
    liveCheckInSeaterAvailabilityFailure,
    liveCheckInGuestCountSuccess,
    liveCheckInGuestCountFailure,
    liveCheckInStatusSuccess,
    liveCheckInStatusFailure,
    liveCheckInAvgWaitTimeSuccess,
    liveCheckInAvgWaitTimeFailure,
    liveCheckInGroupAvgWaitTimeSuccess,
    liveCheckInGroupAvgWaitTimeFailure,
    liveCheckInTableSuccess,
    liveCheckInTableFailure,
    liveCheckInTodaySuccess,
    liveCheckInTodayFailure,
    checkInOverviewSuccess,
    checkInOverviewFailure,
    checkInOverviewHourlySuccess,
    checkInOverviewHourlyFailure,
    checkInOverviewGuestsHourlySuccess,
    checkInOverviewGuestsHourlyFailure,
    checkInOverviewDailyAndGuestSuccess,
    checkInOverviewDailyAndGuestFailure,
    checkInOverviewDineInGroupSuccess,
    checkInOverviewDineInGroupFailure,
    checkInOverviewGuestSizeSuccess,
    checkInOverviewGuestSizeFailure,
    checkInOverviewTableDetailsSuccess,
    checkInOverviewTableDetailsFailure,
    checkInOverviewTopCustomerSuccess,
    checkInOverviewTopCustomerFailure,
    checkInOverviewAvgWaitTimeGroupSuccess,
    checkInOverviewAvgWaitTimeGroupFailure,
} from "./checkInReportsActions";
import {
    LIVE_CHECK_IN_OVERVIEW_REQUEST,
    LIVE_CHECK_IN_SEATER_AVAILABILITY_REQUEST,
    LIVE_CHECK_IN_GUEST_COUNT_REQUEST,
    LIVE_CHECK_IN_STATUS_REQUEST,
    LIVE_CHECK_IN_AVG_WAIT_TIME_REQUEST,
    LIVE_CHECK_IN_GROUP_AVG_WAIT_TIME_REQUEST,
    LIVE_CHECK_IN_TABLE_REQUEST,
    LIVE_CHECK_IN_TODAY_REQUEST,
    CHECK_IN_OVERVIEW_REQUEST,
    CHECK_IN_OVERVIEW_HOURLY_REQUEST,
    CHECK_IN_OVERVIEW_GUESTS_HOURLY_REQUEST,
    CHECK_IN_OVERVIEW_DAILY_AND_GUEST_REQUEST,
    CHECK_IN_OVERVIEW_DINE_IN_GROUP_REQUEST,
    CHECK_IN_OVERVIEW_GUEST_SIZE_REQUEST,
    CHECK_IN_OVERVIEW_TABLE_DETAILS_REQUEST,
    CHECK_IN_OVERVIEW_TOP_CUSTOMER_REQUEST,
    CHECK_IN_OVERVIEW_AVG_WAIT_TIME_GROUP_REQUEST,
} from "./checkInReportsConstants";
import {
    getLiveCheckInOverview,
    getLiveSeaterAvailability,
    getLiveGuestCount,
    getLiveCheckInStatus,
    getLiveAvgWaitTime,
    getLiveGroupAvgWaitTime,
    getLiveCheckInTable,
    getLiveCheckInToday,
    getCheckInOverview,
    getCheckInOverviewHourly,
    getCheckInOverviewGuestsHourly,
    getCheckInOverviewDailyAndGuest,
    getCheckInOverviewDineInGroup,
    getCheckInOverviewGuestSize,
    getCheckInOverviewTableDetails,
    getCheckInOverviewTopCustomer,
    getCheckInOverviewAvgWaitTimeGroup,
} from "./checkInReportsApi";
import { decryptJson } from "util/react-ec-utils";

// Live Check-in Sagas
export function* liveCheckInOverviewSaga(action) {
    try {
        const response = yield call(getLiveCheckInOverview, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(liveCheckInOverviewSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveCheckInOverviewFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveCheckInOverviewFailure(error));
    }
}

export function* liveSeaterAvailabilitySaga(action) {
    try {
        const response = yield call(getLiveSeaterAvailability, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(liveCheckInSeaterAvailabilitySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveCheckInSeaterAvailabilityFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveCheckInSeaterAvailabilityFailure(error));
    }
}

export function* liveGuestCountSaga(action) {
    try {
        const response = yield call(getLiveGuestCount, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(liveCheckInGuestCountSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveCheckInGuestCountFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveCheckInGuestCountFailure(error));
    }
}

export function* liveCheckInStatusSaga(action) {
    try {
        const response = yield call(getLiveCheckInStatus, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(liveCheckInStatusSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveCheckInStatusFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveCheckInStatusFailure(error));
    }
}

export function* liveAvgWaitTimeSaga(action) {
    try {
        const response = yield call(getLiveAvgWaitTime, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(liveCheckInAvgWaitTimeSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveCheckInAvgWaitTimeFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveCheckInAvgWaitTimeFailure(error));
    }
}

export function* liveGroupAvgWaitTimeSaga(action) {
    try {
        const response = yield call(getLiveGroupAvgWaitTime, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(liveCheckInGroupAvgWaitTimeSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveCheckInGroupAvgWaitTimeFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveCheckInGroupAvgWaitTimeFailure(error));
    }
}

export function* liveCheckInTableSaga(action) {
    try {
        const response = yield call(getLiveCheckInTable, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(liveCheckInTableSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveCheckInTableFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveCheckInTableFailure(error));
    }
}

export function* liveCheckInTodaySaga(action) {
    try {
        const response = yield call(getLiveCheckInToday, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(liveCheckInTodaySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveCheckInTodayFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveCheckInTodayFailure(error));
    }
}

// Check-in Overview Sagas
export function* checkInOverviewSaga(action) {
    try {
        const response = yield call(getCheckInOverview, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(checkInOverviewSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(checkInOverviewFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(checkInOverviewFailure(error));
    }
}

export function* checkInOverviewHourlySaga(action) {
    try {
        const response = yield call(getCheckInOverviewHourly, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(checkInOverviewHourlySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(checkInOverviewHourlyFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(checkInOverviewHourlyFailure(error));
    }
}

export function* checkInOverviewGuestsHourlySaga(action) {
    try {
        const response = yield call(getCheckInOverviewGuestsHourly, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(checkInOverviewGuestsHourlySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(checkInOverviewGuestsHourlyFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(checkInOverviewGuestsHourlyFailure(error));
    }
}

export function* checkInOverviewDailyAndGuestSaga(action) {
    try {
        const response = yield call(getCheckInOverviewDailyAndGuest, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(checkInOverviewDailyAndGuestSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(checkInOverviewDailyAndGuestFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(checkInOverviewDailyAndGuestFailure(error));
    }
}

export function* checkInOverviewDineInGroupSaga(action) {
    try {
        const response = yield call(getCheckInOverviewDineInGroup, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(checkInOverviewDineInGroupSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(checkInOverviewDineInGroupFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(checkInOverviewDineInGroupFailure(error));
    }
}

export function* checkInOverviewGuestSizeSaga(action) {
    try {
        const response = yield call(getCheckInOverviewGuestSize, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(checkInOverviewGuestSizeSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(checkInOverviewGuestSizeFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(checkInOverviewGuestSizeFailure(error));
    }
}

export function* checkInOverviewTableDetailsSaga(action) {
    try {
        const response = yield call(getCheckInOverviewTableDetails, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(checkInOverviewTableDetailsSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(checkInOverviewTableDetailsFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(checkInOverviewTableDetailsFailure(error));
    }
}

export function* checkInOverviewTopCustomerSaga(action) {
    try {
        const response = yield call(getCheckInOverviewTopCustomer, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(checkInOverviewTopCustomerSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(checkInOverviewTopCustomerFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(checkInOverviewTopCustomerFailure(error));
    }
}

export function* checkInOverviewAvgWaitTimeGroupSaga(action) {
    try {
        const response = yield call(getCheckInOverviewAvgWaitTimeGroup, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(checkInOverviewAvgWaitTimeGroupSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(checkInOverviewAvgWaitTimeGroupFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(checkInOverviewAvgWaitTimeGroupFailure(error));
    }
}

export default function* watchNewReportRequest() {
    // Live Check-in watchers
    yield takeLatest(LIVE_CHECK_IN_OVERVIEW_REQUEST, liveCheckInOverviewSaga);
    yield takeLatest(LIVE_CHECK_IN_SEATER_AVAILABILITY_REQUEST, liveSeaterAvailabilitySaga);
    yield takeLatest(LIVE_CHECK_IN_GUEST_COUNT_REQUEST, liveGuestCountSaga);
    yield takeLatest(LIVE_CHECK_IN_STATUS_REQUEST, liveCheckInStatusSaga);
    yield takeLatest(LIVE_CHECK_IN_AVG_WAIT_TIME_REQUEST, liveAvgWaitTimeSaga);
    yield takeLatest(LIVE_CHECK_IN_GROUP_AVG_WAIT_TIME_REQUEST, liveGroupAvgWaitTimeSaga);
    yield takeLatest(LIVE_CHECK_IN_TABLE_REQUEST, liveCheckInTableSaga);
    yield takeLatest(LIVE_CHECK_IN_TODAY_REQUEST, liveCheckInTodaySaga);

    // Check-in Overview watchers
    yield takeLatest(CHECK_IN_OVERVIEW_REQUEST, checkInOverviewSaga);
    yield takeLatest(CHECK_IN_OVERVIEW_HOURLY_REQUEST, checkInOverviewHourlySaga);
    yield takeLatest(CHECK_IN_OVERVIEW_GUESTS_HOURLY_REQUEST, checkInOverviewGuestsHourlySaga);
    yield takeLatest(CHECK_IN_OVERVIEW_DAILY_AND_GUEST_REQUEST, checkInOverviewDailyAndGuestSaga);
    yield takeLatest(CHECK_IN_OVERVIEW_DINE_IN_GROUP_REQUEST, checkInOverviewDineInGroupSaga);
    yield takeLatest(CHECK_IN_OVERVIEW_GUEST_SIZE_REQUEST, checkInOverviewGuestSizeSaga);
    yield takeLatest(CHECK_IN_OVERVIEW_TABLE_DETAILS_REQUEST, checkInOverviewTableDetailsSaga);
    yield takeLatest(CHECK_IN_OVERVIEW_TOP_CUSTOMER_REQUEST, checkInOverviewTopCustomerSaga);
    yield takeLatest(CHECK_IN_OVERVIEW_AVG_WAIT_TIME_GROUP_REQUEST, checkInOverviewAvgWaitTimeGroupSaga);

}