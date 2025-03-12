import { produce } from "immer";
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

const initialNewReportsState = {
    // Live Check In Overview
    liveCheckInOverviewLoading: false,
    liveCheckInOverviewSuccess: [],
    liveCheckInOverviewFailure: false,

    // Live Check In Seater Availability
    liveCheckInSeaterAvailabilityLoading: false,
    liveCheckInSeaterAvailabilitySuccess: [],
    liveCheckInSeaterAvailabilityFailure: false,

    // Live Check In Guest Count
    liveCheckInGuestCountLoading: false,
    liveCheckInGuestCountSuccess: [],
    liveCheckInGuestCountFailure: false,

    // Live Check In Status
    liveCheckinStatusLoading: false,
    liveCheckinStatusSuccess: [],
    liveCheckinStatusFailure: false,

    // Live Check In Avg Wait Time
    liveCheckInAvgWaitTimeLoading: false,
    liveCheckInAvgWaitTimeSuccess: [],
    liveCheckInAvgWaitTimeFailure: false,

    // Live Check In Group Avg Wait Time
    liveCheckInGroupAvgWaitTimeLoading: false,
    liveCheckInGroupAvgWaitTimeSuccess: [],
    liveCheckInGroupAvgWaitTimeFailure: false,

    // Live Check In Table
    liveCheckInTableLoading: false,
    liveCheckInTableSuccess: [],
    liveCheckInTableFailure: false,

    // Live Check In Today
    liveCheckInTodayLoading: false,
    liveCheckInTodaySuccess: [],
    liveCheckInTodayFailure: false,

    // Check In Overview
    checkInOverviewLoading: false,
    checkInOverviewSuccess: [],
    checkInOverviewFailure: false,

    // Check In Overview Hourly
    checkInOverviewHourlyLoading: false,
    checkInOverviewHourlySuccess: [],
    checkInOverviewHourlyFailure: false,

    // Check In Overview Guests Hourly
    checkInOverviewGuestsHourlyLoading: false,
    checkInOverviewGuestsHourlySuccess: [],
    checkInOverviewGuestsHourlyFailure: false,

    // Check In Overview Daily and Guest
    checkInOverviewDailyAndGuestLoading: false,
    checkInOverviewDailyAndGuestSuccess: [],
    checkInOverviewDailyAndGuestFailure: false,

    // Check In Overview Dine In Group
    checkInOverviewDineInGroupLoading: false,
    checkInOverviewDineInGroupSuccess: [],
    checkInOverviewDineInGroupFailure: false,

    // Check In Overview Guest Size
    checkInOverviewGuestSizeLoading: false,
    checkInOverviewGuestSizeSuccess: [],
    checkInOverviewGuestSizeFailure: false,

    // Check In Overview Table Details
    checkInOverviewTableDetailsLoading: false,
    checkInOverviewTableDetailsSuccess: [],
    checkInOverviewTableDetailsFailure: false,

    // Check In Overview Top Customer
    checkInOverviewTopCustomerLoading: false,
    checkInOverviewTopCustomerSuccess: [],
    checkInOverviewTopCustomerFailure: false,

    // Check In Overview Avg Wait Time Group
    checkInOverviewAvgWaitTimeGroupLoading: false,
    checkInOverviewAvgWaitTimeGroupSuccess: [],
    checkInOverviewAvgWaitTimeGroupFailure: false,
};

export default function checkInReportsReducer(state = initialNewReportsState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case LIVE_CHECK_IN_OVERVIEW_REQUEST:
                draft.liveCheckInOverviewLoading = true;
                draft.liveCheckInOverviewSuccess = [];
                draft.liveCheckInOverviewFailure = false;
                break;
            case LIVE_CHECK_IN_OVERVIEW_SUCCESS:
                draft.liveCheckInOverviewSuccess = action.payload;
                draft.liveCheckInOverviewLoading = false;
                draft.liveCheckInOverviewFailure = false;
                break;
            case LIVE_CHECK_IN_OVERVIEW_FAILURE:
                draft.liveCheckInOverviewSuccess = [];
                draft.liveCheckInOverviewLoading = false;
                draft.liveCheckInOverviewFailure = true;
                break;

            case LIVE_CHECK_IN_SEATER_AVAILABILITY_REQUEST:
                draft.liveCheckInSeaterAvailabilityLoading = true;
                draft.liveCheckInSeaterAvailabilitySuccess = [];
                draft.liveCheckInSeaterAvailabilityFailure = false;
                break;
            case LIVE_CHECK_IN_SEATER_AVAILABILITY_SUCCESS:
                draft.liveCheckInSeaterAvailabilitySuccess = action.payload;
                draft.liveCheckInSeaterAvailabilityLoading = false;
                draft.liveCheckInSeaterAvailabilityFailure = false;
                break;
            case LIVE_CHECK_IN_SEATER_AVAILABILITY_FAILURE:
                draft.liveCheckInSeaterAvailabilitySuccess = [];
                draft.liveCheckInSeaterAvailabilityLoading = false;
                draft.liveCheckInSeaterAvailabilityFailure = true;
                break;

            case LIVE_CHECK_IN_GUEST_COUNT_REQUEST:
                draft.liveCheckInGuestCountLoading = true;
                draft.liveCheckInGuestCountSuccess = [];
                draft.liveCheckInGuestCountFailure = false;
                break;
            case LIVE_CHECK_IN_GUEST_COUNT_SUCCESS:
                draft.liveCheckInGuestCountSuccess = action.payload;
                draft.liveCheckInGuestCountLoading = false;
                draft.liveCheckInGuestCountFailure = false;
                break;
            case LIVE_CHECK_IN_GUEST_COUNT_FAILURE:
                draft.liveCheckInGuestCountSuccess = [];
                draft.liveCheckInGuestCountLoading = false;
                draft.liveCheckInGuestCountFailure = true;
                break;

            case LIVE_CHECK_IN_STATUS_REQUEST:
                draft.liveCheckinStatusLoading = true;
                draft.liveCheckinStatusSuccess = [];
                draft.liveCheckinStatusFailure = false;
                break;
            case LIVE_CHECK_IN_STATUS_SUCCESS:
                console.log(2, action.payload);
                draft.liveCheckinStatusSuccess = action.payload;
                draft.liveCheckinStatusLoading = false;
                draft.liveCheckinStatusFailure = false;
                break;
            case LIVE_CHECK_IN_STATUS_FAILURE:
                draft.liveCheckinStatusSuccess = [];
                draft.liveCheckinStatusLoading = false;
                draft.liveCheckinStatusFailure = true;
                break;

            case LIVE_CHECK_IN_AVG_WAIT_TIME_REQUEST:
                draft.liveCheckInAvgWaitTimeLoading = true;
                draft.liveCheckInAvgWaitTimeSuccess = [];
                draft.liveCheckInAvgWaitTimeFailure = false;
                break;
            case LIVE_CHECK_IN_AVG_WAIT_TIME_SUCCESS:
                draft.liveCheckInAvgWaitTimeSuccess = action.payload;
                draft.liveCheckInAvgWaitTimeLoading = false;
                draft.liveCheckInAvgWaitTimeFailure = false;
                break;
            case LIVE_CHECK_IN_AVG_WAIT_TIME_FAILURE:
                draft.liveCheckInAvgWaitTimeSuccess = [];
                draft.liveCheckInAvgWaitTimeLoading = false;
                draft.liveCheckInAvgWaitTimeFailure = true;
                break;

            case LIVE_CHECK_IN_GROUP_AVG_WAIT_TIME_REQUEST:
                draft.liveCheckInGroupAvgWaitTimeLoading = true;
                draft.liveCheckInGroupAvgWaitTimeSuccess = [];
                draft.liveCheckInGroupAvgWaitTimeFailure = false;
                break;
            case LIVE_CHECK_IN_GROUP_AVG_WAIT_TIME_SUCCESS:
                draft.liveCheckInGroupAvgWaitTimeSuccess = action.payload;
                draft.liveCheckInGroupAvgWaitTimeLoading = false;
                draft.liveCheckInGroupAvgWaitTimeFailure = false;
                break;
            case LIVE_CHECK_IN_GROUP_AVG_WAIT_TIME_FAILURE:
                draft.liveCheckInGroupAvgWaitTimeSuccess = [];
                draft.liveCheckInGroupAvgWaitTimeLoading = false;
                draft.liveCheckInGroupAvgWaitTimeFailure = true;
                break;

            case LIVE_CHECK_IN_TABLE_REQUEST:
                draft.liveCheckInTableLoading = true;
                draft.liveCheckInTableSuccess = [];
                draft.liveCheckInTableFailure = false;
                break;
            case LIVE_CHECK_IN_TABLE_SUCCESS:
                draft.liveCheckInTableSuccess = action.payload;
                draft.liveCheckInTableLoading = false;
                draft.liveCheckInTableFailure = false;
                break;
            case LIVE_CHECK_IN_TABLE_FAILURE:
                draft.liveCheckInTableSuccess = [];
                draft.liveCheckInTableLoading = false;
                draft.liveCheckInTableFailure = true;
                break;

            case LIVE_CHECK_IN_TODAY_REQUEST:
                draft.liveCheckInTodayLoading = true;
                draft.liveCheckInTodaySuccess = [];
                draft.liveCheckInTodayFailure = false;
                break;
            case LIVE_CHECK_IN_TODAY_SUCCESS:
                draft.liveCheckInTodaySuccess = action.payload;
                draft.liveCheckInTodayLoading = false;
                draft.liveCheckInTodayFailure = false;
                break;
            case LIVE_CHECK_IN_TODAY_FAILURE:
                draft.liveCheckInTodaySuccess = [];
                draft.liveCheckInTodayLoading = false;
                draft.liveCheckInTodayFailure = true;
                break;

            case CHECK_IN_OVERVIEW_REQUEST:
                draft.checkInOverviewLoading = true;
                draft.checkInOverviewSuccess = [];
                draft.checkInOverviewFailure = false;
                break;
            case CHECK_IN_OVERVIEW_SUCCESS:
                draft.checkInOverviewSuccess = action.payload;
                draft.checkInOverviewLoading = false;
                draft.checkInOverviewFailure = false;
                break;
            case CHECK_IN_OVERVIEW_FAILURE:
                draft.checkInOverviewSuccess = [];
                draft.checkInOverviewLoading = false;
                draft.checkInOverviewFailure = true;
                break;

            case CHECK_IN_OVERVIEW_HOURLY_REQUEST:
                draft.checkInOverviewHourlyLoading = true;
                draft.checkInOverviewHourlySuccess = [];
                draft.checkInOverviewHourlyFailure = false;
                break;
            case CHECK_IN_OVERVIEW_HOURLY_SUCCESS:
                draft.checkInOverviewHourlySuccess = action.payload;
                draft.checkInOverviewHourlyLoading = false;
                draft.checkInOverviewHourlyFailure = false;
                break;
            case CHECK_IN_OVERVIEW_HOURLY_FAILURE:
                draft.checkInOverviewHourlySuccess = [];
                draft.checkInOverviewHourlyLoading = false;
                draft.checkInOverviewHourlyFailure = true;
                break;

            case CHECK_IN_OVERVIEW_GUESTS_HOURLY_REQUEST:
                draft.checkInOverviewGuestsHourlyLoading = true;
                draft.checkInOverviewGuestsHourlySuccess = [];
                draft.checkInOverviewGuestsHourlyFailure = false;
                break;
            case CHECK_IN_OVERVIEW_GUESTS_HOURLY_SUCCESS:
                draft.checkInOverviewGuestsHourlySuccess = action.payload;
                draft.checkInOverviewGuestsHourlyLoading = false;
                draft.checkInOverviewGuestsHourlyFailure = false;
                break;
            case CHECK_IN_OVERVIEW_GUESTS_HOURLY_FAILURE:
                draft.checkInOverviewGuestsHourlySuccess = [];
                draft.checkInOverviewGuestsHourlyLoading = false;
                draft.checkInOverviewGuestsHourlyFailure = true;
                break;

            case CHECK_IN_OVERVIEW_DAILY_AND_GUEST_REQUEST:
                draft.checkInOverviewDailyAndGuestLoading = true;
                draft.checkInOverviewDailyAndGuestSuccess = [];
                draft.checkInOverviewDailyAndGuestFailure = false;
                break;
            case CHECK_IN_OVERVIEW_DAILY_AND_GUEST_SUCCESS:
                draft.checkInOverviewDailyAndGuestSuccess = action.payload;
                draft.checkInOverviewDailyAndGuestLoading = false;
                draft.checkInOverviewDailyAndGuestFailure = false;
                break;
            case CHECK_IN_OVERVIEW_DAILY_AND_GUEST_FAILURE:
                draft.checkInOverviewDailyAndGuestSuccess = [];
                draft.checkInOverviewDailyAndGuestLoading = false;
                draft.checkInOverviewDailyAndGuestFailure = true;
                break;

            case CHECK_IN_OVERVIEW_DINE_IN_GROUP_REQUEST:
                draft.checkInOverviewDineInGroupLoading = true;
                draft.checkInOverviewDineInGroupSuccess = [];
                draft.checkInOverviewDineInGroupFailure = false;
                break;
            case CHECK_IN_OVERVIEW_DINE_IN_GROUP_SUCCESS:
                draft.checkInOverviewDineInGroupSuccess = action.payload;
                draft.checkInOverviewDineInGroupLoading = false;
                draft.checkInOverviewDineInGroupFailure = false;
                break;
            case CHECK_IN_OVERVIEW_DINE_IN_GROUP_FAILURE:
                draft.checkInOverviewDineInGroupSuccess = [];
                draft.checkInOverviewDineInGroupLoading = false;
                draft.checkInOverviewDineInGroupFailure = true;
                break;

            case CHECK_IN_OVERVIEW_GUEST_SIZE_REQUEST:
                draft.checkInOverviewGuestSizeLoading = true;
                draft.checkInOverviewGuestSizeSuccess = [];
                draft.checkInOverviewGuestSizeFailure = false;
                break;
            case CHECK_IN_OVERVIEW_GUEST_SIZE_SUCCESS:
                draft.checkInOverviewGuestSizeSuccess = action.payload;
                draft.checkInOverviewGuestSizeLoading = false;
                draft.checkInOverviewGuestSizeFailure = false;
                break;
            case CHECK_IN_OVERVIEW_GUEST_SIZE_FAILURE:
                draft.checkInOverviewGuestSizeSuccess = [];
                draft.checkInOverviewGuestSizeLoading = false;
                draft.checkInOverviewGuestSizeFailure = true;
                break;

            case CHECK_IN_OVERVIEW_TABLE_DETAILS_REQUEST:
                draft.checkInOverviewTableDetailsLoading = true;
                draft.checkInOverviewTableDetailsSuccess = [];
                draft.checkInOverviewTableDetailsFailure = false;
                break;
            case CHECK_IN_OVERVIEW_TABLE_DETAILS_SUCCESS:
                draft.checkInOverviewTableDetailsSuccess = action.payload;
                draft.checkInOverviewTableDetailsLoading = false;
                draft.checkInOverviewTableDetailsFailure = false;
                break;
            case CHECK_IN_OVERVIEW_TABLE_DETAILS_FAILURE:
                draft.checkInOverviewTableDetailsSuccess = [];
                draft.checkInOverviewTableDetailsLoading = false;
                draft.checkInOverviewTableDetailsFailure = true;
                break;

            case CHECK_IN_OVERVIEW_TOP_CUSTOMER_REQUEST:
                draft.checkInOverviewTopCustomerLoading = true;
                draft.checkInOverviewTopCustomerSuccess = [];
                draft.checkInOverviewTopCustomerFailure = false;
                break;
            case CHECK_IN_OVERVIEW_TOP_CUSTOMER_SUCCESS:
                draft.checkInOverviewTopCustomerSuccess = action.payload;
                draft.checkInOverviewTopCustomerLoading = false;
                draft.checkInOverviewTopCustomerFailure = false;
                break;
            case CHECK_IN_OVERVIEW_TOP_CUSTOMER_FAILURE:
                draft.checkInOverviewTopCustomerSuccess = [];
                draft.checkInOverviewTopCustomerLoading = false;
                draft.checkInOverviewTopCustomerFailure = true;
                break;

            case CHECK_IN_OVERVIEW_AVG_WAIT_TIME_GROUP_REQUEST:
                draft.checkInOverviewAvgWaitTimeGroupLoading = true;
                draft.checkInOverviewAvgWaitTimeGroupSuccess = [];
                draft.checkInOverviewAvgWaitTimeGroupFailure = false;
                break;
            case CHECK_IN_OVERVIEW_AVG_WAIT_TIME_GROUP_SUCCESS:
                draft.checkInOverviewAvgWaitTimeGroupSuccess = action.payload;
                draft.checkInOverviewAvgWaitTimeGroupLoading = false;
                draft.checkInOverviewAvgWaitTimeGroupFailure = false;
                break;
            case CHECK_IN_OVERVIEW_AVG_WAIT_TIME_GROUP_FAILURE:
                draft.checkInOverviewAvgWaitTimeGroupSuccess = [];
                draft.checkInOverviewAvgWaitTimeGroupLoading = false;
                draft.checkInOverviewAvgWaitTimeGroupFailure = true;
                break;
            
            default:
                break;
        }
    })
}