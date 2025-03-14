import {
    LIVE_CHECK_IN_OVERVIEW_REQUEST,
    LIVE_CHECK_IN_OVERVIEW_SUCCESS,
    LIVE_CHECK_IN_OVERVIEW_FAILURE,
    LIVE_CHECK_IN_SEATER_AVAILABILITY_REQUEST,
    LIVE_CHECK_IN_SEATER_AVAILABILITY_SUCCESS,
    LIVE_CHECK_IN_SEATER_AVAILABILITY_FAILURE,
    LIVE_CHECK_IN_GUEST_COUNT_REQUEST,
    LIVE_CHECK_IN_GUEST_COUNT_SUCCESS,
    LIVE_CHECK_IN_GUEST_COUNT_FAILURE,
    LIVE_CHECK_IN_STATUS_REQUEST,
    LIVE_CHECK_IN_STATUS_SUCCESS,
    LIVE_CHECK_IN_STATUS_FAILURE,
    LIVE_CHECK_IN_AVG_WAIT_TIME_REQUEST,
    LIVE_CHECK_IN_AVG_WAIT_TIME_SUCCESS,
    LIVE_CHECK_IN_AVG_WAIT_TIME_FAILURE,
    LIVE_CHECK_IN_GROUP_AVG_WAIT_TIME_REQUEST,
    LIVE_CHECK_IN_GROUP_AVG_WAIT_TIME_SUCCESS,
    LIVE_CHECK_IN_GROUP_AVG_WAIT_TIME_FAILURE,
    LIVE_CHECK_IN_TABLE_REQUEST,
    LIVE_CHECK_IN_TABLE_SUCCESS,
    LIVE_CHECK_IN_TABLE_FAILURE,
    LIVE_CHECK_IN_TODAY_REQUEST,
    LIVE_CHECK_IN_TODAY_SUCCESS,
    LIVE_CHECK_IN_TODAY_FAILURE,
    CHECK_IN_OVERVIEW_REQUEST,
    CHECK_IN_OVERVIEW_SUCCESS,
    CHECK_IN_OVERVIEW_FAILURE,
    CHECK_IN_OVERVIEW_HOURLY_REQUEST,
    CHECK_IN_OVERVIEW_HOURLY_SUCCESS,
    CHECK_IN_OVERVIEW_HOURLY_FAILURE,
    CHECK_IN_OVERVIEW_GUESTS_HOURLY_REQUEST,
    CHECK_IN_OVERVIEW_GUESTS_HOURLY_SUCCESS,
    CHECK_IN_OVERVIEW_GUESTS_HOURLY_FAILURE,
    CHECK_IN_OVERVIEW_DAILY_AND_GUEST_REQUEST,
    CHECK_IN_OVERVIEW_DAILY_AND_GUEST_SUCCESS,
    CHECK_IN_OVERVIEW_DAILY_AND_GUEST_FAILURE,
    CHECK_IN_OVERVIEW_DINE_IN_GROUP_REQUEST,
    CHECK_IN_OVERVIEW_DINE_IN_GROUP_SUCCESS,
    CHECK_IN_OVERVIEW_DINE_IN_GROUP_FAILURE,
    CHECK_IN_OVERVIEW_GUEST_SIZE_REQUEST,
    CHECK_IN_OVERVIEW_GUEST_SIZE_SUCCESS,
    CHECK_IN_OVERVIEW_GUEST_SIZE_FAILURE,
    CHECK_IN_OVERVIEW_TABLE_DETAILS_REQUEST,
    CHECK_IN_OVERVIEW_TABLE_DETAILS_SUCCESS,
    CHECK_IN_OVERVIEW_TABLE_DETAILS_FAILURE,
    CHECK_IN_OVERVIEW_TOP_CUSTOMER_REQUEST,
    CHECK_IN_OVERVIEW_TOP_CUSTOMER_SUCCESS,
    CHECK_IN_OVERVIEW_TOP_CUSTOMER_FAILURE,
    CHECK_IN_OVERVIEW_AVG_WAIT_TIME_GROUP_REQUEST,
    CHECK_IN_OVERVIEW_AVG_WAIT_TIME_GROUP_SUCCESS,
    CHECK_IN_OVERVIEW_AVG_WAIT_TIME_GROUP_FAILURE,
} from "./checkInReportsConstants";

export const liveCheckInOverviewRequest = (data) => {
    return {
        type: LIVE_CHECK_IN_OVERVIEW_REQUEST,
        payload: data
    };
}

export const liveCheckInOverviewSuccess = (data) => {
    return {
        type: LIVE_CHECK_IN_OVERVIEW_SUCCESS,
        payload: data
    };
}

export const liveCheckInOverviewFailure = (error) => {
    return {
        type: LIVE_CHECK_IN_OVERVIEW_FAILURE,
        payload: error
    };
}

export const liveCheckInSeaterAvailabilityRequest = (data) => {
    return {
        type: LIVE_CHECK_IN_SEATER_AVAILABILITY_REQUEST,
        payload: data
    };
}

export const liveCheckInSeaterAvailabilitySuccess = (data) => {
    return {
        type: LIVE_CHECK_IN_SEATER_AVAILABILITY_SUCCESS,
        payload: data
    };
}

export const liveCheckInSeaterAvailabilityFailure = (error) => {
    return {
        type: LIVE_CHECK_IN_SEATER_AVAILABILITY_FAILURE,
        payload: error
    };
}

export const liveCheckInGuestCountRequest = (data) => {
    return {
        type: LIVE_CHECK_IN_GUEST_COUNT_REQUEST,
        payload: data
    };
}

export const liveCheckInGuestCountSuccess = (data) => {
    return {
        type: LIVE_CHECK_IN_GUEST_COUNT_SUCCESS,
        payload: data
    };
}

export const liveCheckInGuestCountFailure = (error) => {
    return {
        type: LIVE_CHECK_IN_GUEST_COUNT_FAILURE,
        payload: error
    };
}

export const liveCheckInStatusRequest = (data) => {
    return {
        type: LIVE_CHECK_IN_STATUS_REQUEST,
        payload: data
    };
}

export const liveCheckInStatusSuccess = (data) => {   
    return {
        type: LIVE_CHECK_IN_STATUS_SUCCESS,
        payload: data
    };
}

export const liveCheckInStatusFailure = (error) => {
    return {
        type: LIVE_CHECK_IN_STATUS_FAILURE,
        payload: error
    };
}

export const liveCheckInAvgWaitTimeRequest = (data) => {
    return {
        type: LIVE_CHECK_IN_AVG_WAIT_TIME_REQUEST,
        payload: data
    };
}

export const liveCheckInAvgWaitTimeSuccess = (data) => {
    return {
        type: LIVE_CHECK_IN_AVG_WAIT_TIME_SUCCESS,
        payload: data
    };
}

export const liveCheckInAvgWaitTimeFailure = (error) => {
    return {
        type: LIVE_CHECK_IN_AVG_WAIT_TIME_FAILURE,
        payload: error
    };
}

export const liveCheckInGroupAvgWaitTimeRequest = (data) => {
    return {
        type: LIVE_CHECK_IN_GROUP_AVG_WAIT_TIME_REQUEST,
        payload: data
    };
}

export const liveCheckInGroupAvgWaitTimeSuccess = (data) => {
    return {
        type: LIVE_CHECK_IN_GROUP_AVG_WAIT_TIME_SUCCESS,
        payload: data
    };
}

export const liveCheckInGroupAvgWaitTimeFailure = (error) => {
    return {
        type: LIVE_CHECK_IN_GROUP_AVG_WAIT_TIME_FAILURE,
        payload: error
    };
}

export const liveCheckInTableRequest = (data) => {
    return {
        type: LIVE_CHECK_IN_TABLE_REQUEST,
        payload: data
    };
}

export const liveCheckInTableSuccess = (data) => {
    return {
        type: LIVE_CHECK_IN_TABLE_SUCCESS,
        payload: data
    };
}

export const liveCheckInTableFailure = (error) => {
    return {
        type: LIVE_CHECK_IN_TABLE_FAILURE,
        payload: error
    };
}

export const liveCheckInTodayRequest = (data) => {
    return {
        type: LIVE_CHECK_IN_TODAY_REQUEST,
        payload: data
    };
}

export const liveCheckInTodaySuccess = (data) => {
    return {
        type: LIVE_CHECK_IN_TODAY_SUCCESS,
        payload: data
    };
}

export const liveCheckInTodayFailure = (error) => {
    return {
        type: LIVE_CHECK_IN_TODAY_FAILURE,
        payload: error
    };
}

export const checkInOverviewRequest = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_REQUEST,
        payload: data
    };
}

export const checkInOverviewSuccess = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_SUCCESS,
        payload: data
    };
}

export const checkInOverviewFailure = (error) => {
    return {
        type: CHECK_IN_OVERVIEW_FAILURE,
        payload: error
    };
}

export const checkInOverviewHourlyRequest = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_HOURLY_REQUEST,
        payload: data
    };
}

export const checkInOverviewHourlySuccess = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_HOURLY_SUCCESS,
        payload: data
    };
}

export const checkInOverviewHourlyFailure = (error) => {
    return {
        type: CHECK_IN_OVERVIEW_HOURLY_FAILURE,
        payload: error
    };
}

export const checkInOverviewGuestsHourlyRequest = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_GUESTS_HOURLY_REQUEST,
        payload: data
    };
}

export const checkInOverviewGuestsHourlySuccess = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_GUESTS_HOURLY_SUCCESS,
        payload: data
    };
}

export const checkInOverviewGuestsHourlyFailure = (error) => {
    return {
        type: CHECK_IN_OVERVIEW_GUESTS_HOURLY_FAILURE,
        payload: error
    };
}

export const checkInOverviewDailyAndGuestRequest = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_DAILY_AND_GUEST_REQUEST,
        payload: data
    };
}

export const checkInOverviewDailyAndGuestSuccess = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_DAILY_AND_GUEST_SUCCESS,
        payload: data
    };
}

export const checkInOverviewDailyAndGuestFailure = (error) => {
    return {
        type: CHECK_IN_OVERVIEW_DAILY_AND_GUEST_FAILURE,
        payload: error
    };
}

export const checkInOverviewDineInGroupRequest = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_DINE_IN_GROUP_REQUEST,
        payload: data
    };
}

export const checkInOverviewDineInGroupSuccess = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_DINE_IN_GROUP_SUCCESS,
        payload: data
    };
}

export const checkInOverviewDineInGroupFailure = (error) => {
    return {
        type: CHECK_IN_OVERVIEW_DINE_IN_GROUP_FAILURE,
        payload: error
    };
}

export const checkInOverviewGuestSizeRequest = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_GUEST_SIZE_REQUEST,
        payload: data
    };
}

export const checkInOverviewGuestSizeSuccess = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_GUEST_SIZE_SUCCESS,
        payload: data
    };
}

export const checkInOverviewGuestSizeFailure = (error) => {
    return {
        type: CHECK_IN_OVERVIEW_GUEST_SIZE_FAILURE,
        payload: error
    };
}

export const checkInOverviewTableDetailsRequest = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_TABLE_DETAILS_REQUEST,
        payload: data
    };
}

export const checkInOverviewTableDetailsSuccess = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_TABLE_DETAILS_SUCCESS,
        payload: data
    };
}

export const checkInOverviewTableDetailsFailure = (error) => {
    return {
        type: CHECK_IN_OVERVIEW_TABLE_DETAILS_FAILURE,
        payload: error
    };
}

export const checkInOverviewTopCustomerRequest = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_TOP_CUSTOMER_REQUEST,
        payload: data
    };
}

export const checkInOverviewTopCustomerSuccess = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_TOP_CUSTOMER_SUCCESS,
        payload: data
    };
}

export const checkInOverviewTopCustomerFailure = (error) => {
    return {
        type: CHECK_IN_OVERVIEW_TOP_CUSTOMER_FAILURE,
        payload: error
    };
}

export const checkInOverviewAvgWaitTimeGroupRequest = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_AVG_WAIT_TIME_GROUP_REQUEST,
        payload: data
    };
}

export const checkInOverviewAvgWaitTimeGroupSuccess = (data) => {
    return {
        type: CHECK_IN_OVERVIEW_AVG_WAIT_TIME_GROUP_SUCCESS,
        payload: data
    };
}

export const checkInOverviewAvgWaitTimeGroupFailure = (error) => {
    return {
        type: CHECK_IN_OVERVIEW_AVG_WAIT_TIME_GROUP_FAILURE,
        payload: error
    };
}
