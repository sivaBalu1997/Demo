import {
    SALES_SUMMARY_REQUEST,
    SALES_SUMMARY_SUCCESS,
    SALES_SUMMARY_FAILURE,
    SALES_BY_ITEM_CATEGORY_REQUEST,
    SALES_BY_ITEM_CATEGORY_SUCCESS,
    SALES_BY_ITEM_CATEGORY_FAILURE,
    SALES_BY_REVENUE_CLASS_REQUEST,
    SALES_BY_REVENUE_CLASS_FAILURE,
    SALES_BY_REVENUE_CLASS_SUCCESS,
    ACTUAL_SALES_REQUEST,
    ACTUAL_SALES_SUCCESS,
    ACTUAL_SALES_FAILURE,
    ACTUAL_SALES_THIRD_PARTY_REQUEST,
    ACTUAL_SALES_THIRD_PARTY_SUCCESS,
    ACTUAL_SALES_THIRD_PARTY_FAILURE,
    HOURLY_SALES_REQUEST,
    HOURLY_SALES_SUCCESS,
    HOURLY_SALES_FAILURE,
    LIVE_DISCOUNT_REQUEST,
    LIVE_DISOUNT_SUCCESS,
    LIVE_DISCOUNT_FAILURE,
    LIVE_OPEN_SALES_REQUEST,
    LIVE_OPEN_SALES_SUCCESS,
    LIVE_OPEN_SALES_FAILURE,
    LIVE_ORDERS_REQUEST,
    LIVE_ORDERS_SUCCESS,
    LIVE_ORDERS_FAILURE,
    LIVE_REFUNDS_REQUEST,
    LIVE_REFUNDS_SUCCESS,
    LIVE_REFUNDS_FAILURE,
    LIVE_NET_SALES_REQUEST,
    LIVE_NET_SALES_SUCCESS,
    LIVE_NET_SALES_FAILURE,
    LIVE_ORDER_NON_DINE_IN_REQUEST,
    LIVE_ORDER_NON_DINE_IN_SUCCESS,
    LIVE_ORDER_NON_DINE_IN_FAILURE,
    DISCOUNT_SUMMARY_REQUEST,
    DISCOUNT_SUMMARY_SUCCESS,
    DISCOUNT_SUMMARY_FAILURE,
    CANCELLATION_SUMMARY_REQUEST,
    CANCELLATION_SUMMARY_SUCCESS,
    CANCELLATION_SUMMARY_FAILURE,
    EMPLOYEE_STAFF_TIP_GRATUITY_REQUEST,
    EMPLOYEE_STAFF_TIP_GRATUITY_SUCCESS,
    EMPLOYEE_STAFF_TIP_GRATUITY_FAILURE,
    EMPLOYEE_STAFF_DISCOUNT_REQUEST,
    EMPLOYEE_STAFF_DISCOUNT_SUCCESS,
    EMPLOYEE_STAFF_DISCOUNT_FAILURE,
    EMPLOYEE_STAFF_PERFORMANCE_REQUEST,
    EMPLOYEE_STAFF_PERFORMANCE_SUCCESS,
    EMPLOYEE_STAFF_PERFORMANCE_FAILURE,
    EMPLOYEE_STAFF_ACTIVITY_REQUEST,
    EMPLOYEE_STAFF_ACTIVITY_SUCCESS,
    EMPLOYEE_STAFF_ACTIVITY_FAILURE,
    DAY_CHECKIN_REQUEST,
    DAY_CHECKIN_SUCCESS,
    DAY_CHECKIN_FAILURE,
    DAILY_CHECKIN_REQUEST,
    DAILY_CHECKIN_SUCCESS,
    DAILY_CHECKIN_FAILURE,
    DAILY_GUEST_REQUEST,
    DAILY_GUEST_SUCCESS,
    DAILY_GUEST_FAILURE,
    DAILY_CANCELLATION_REQUEST,
    DAILY_CANCELLATION_SUCCESS,
    DAILY_CANCELLATION_FAILURE,
    DAILY_HOURLY_CHECKIN_REQUEST,
    DAILY_HOURLY_CHECKIN_SUCCESS,
    DAILY_HOURLY_CHECKIN_FAILURE,
    DAY_OVER_DAY_GUEST_REQUEST,
    DAY_OVER_DAY_GUEST_SUCCESS,
    DAY_OVER_DAY_GUEST_FAILURE,
    PEAK_SUMMARY_REQUEST,
    PEAK_SUMMARY_SUCCESS,
    PEAK_SUMMARY_FAILURE,
    PARTY_SIZE_REQUEST,
    PARTY_SIZE_SUCCESS,
    PARTY_SIZE_FAILURE,
    CUSTOMER_SIZE_REQUEST,
    CUSTOMER_SIZE_SUCCESS,
    CUSTOMER_SIZE_FAILURE,
    NEW_CUSTOMER_SIZE_REQUEST,
    NEW_CUSTOMER_SIZE_SUCCESS,
    NEW_CUSTOMER_SIZE_FAILURE,
    CUSTOMER_DETAILS_REQUEST,
    CUSTOMER_DETAILS_SUCCESS,
    CUSTOMER_DETAILS_FAILURE,
    LIVE_CHECKIN_STATUS_REQUEST,
    LIVE_CHECKIN_STATUS_SUCCESS,
    LIVE_CHECKIN_STATUS_FAILURE,
    DAILY_CHECKIN_STATUS_REQUEST,
    DAILY_CHECKIN_STATUS_SUCCESS,
    DAILY_CHECKIN_STATUS_FAILURE,
    HOURLY_GUESTS_REQUEST,
    HOURLY_GUESTS_SUCCESS,
    HOURLY_GUESTS_FAILURE,
    SALES_TAGS_REQUEST,
    SALES_TAGS_SUCCESS,
    SALES_TAGS_FAILURE,
    PAYMENT_DETAILS_REQUEST,
    PAYMENT_DETAILS_SUCCESS,
    PAYMENT_DETAILS_FAILURE,
    SALES_CATEGORY_REQUEST,
    SALES_CATEGORY_SUCCESS,
    SALES_CATEGORY_FAILURE,
    SALES_CARD_TYPE_REQUEST,
    SALES_CARD_TYPE_SUCCESS,
    SALES_CARD_TYPE_FAILURE,
    VOIDED_SUMMARY_REQUEST,
    VOIDED_SUMMARY_SUCCESS,
    VOIDED_SUMMARY_FAILURE,
    DROPDOWN_DETAILS_REQUEST,
    DROPDOWN_DETAILS_SUCCESS,
    DROPDOWN_DETAILS_FAILURE,
    CATEGORY_CHANNEL_SUMMARY_REQUEST,
    CATEGORY_CHANNEL_SUMMARY_SUCCESS,
    CATEGORY_CHANNEL_SUMMARY_FAILURE,
    CATEGORY_SALES_REQUEST,
    CATEGORY_SALES_SUCCESS,
    CATEGORY_SALES_FAILURE,
    CATEGORY_SALES_SUMMARY_REQUEST,
    CATEGORY_SALES_SUMMARY_SUCCESS,
    CATEGORY_SALES_SUMMARY_FAILURE,
    LOCATION_DETAILS_REQUEST,
    LOCATION_DETAILS_SUCCESS,
    LOCATION_DETAILS_FAILURE,
    BILLED_UNBILLED_REQUEST,
    BILLED_UNBILLED_SUCCESS,
    BILLED_UNBILLED_FAILURE,
    SELCTED_LOCATION,
    SALES_SUMMARY_REPORT_REQUEST,
    SALES_SUMMARY_REPORT_SUCCESS,
    SALES_SUMMARY_REPORT_FAILURE,
    STAFF_SALES_REQUEST,
    STAFF_SALES_SUCCESS,
    STAFF_SALES_FAILURE,
    HOURLY_SALES_REPORT_CHART_REQUEST,
    HOURLY_SALES_REPORT_CHART_SUCCESS,
    HOURLY_SALES_REPORT_CHART_FAILURE,
    SALES_BY_CHANNEL_SUCCESS,
    SALES_BY_CHANNEL_FAILURE,
    SALES_BY_CHANNEL_REQUEST,
    GET_OFFER_SUMMARY_FAILURE,
    GET_VOIDED_ORDER_SUMMARY_REQUEST,
    GET_VOIDED_ORDER_SUMMARY_SUCCESS,
    GET_VOIDED_ORDER_SUMMARY_FAILURE,
    GET_OFFER_SUMMARY_SUCCESS,
    GET_OFFER_SUMMARY_REQUEST,
    EMPLOYEE_SALES_OVERVIEW_REQUEST,
    EMPLOYEE_SALES_OVERVIEW_SUCCESS,
    EMPLOYEE_SALES_OVERVIEW_FAILURE,
    STORE_LOCATIONS_LIST,
    GET_EMPLOYEE_ACTIVITY_REQUEST,
    GET_EMPLOYEE_ACTIVITY_SUCCESS,
    GET_EMPLOYEE_ACTIVITY_FAILURE,
    SELCTED_ITEMS,
    SELCTED_CATEGORIES,
    GET_PREMISES_SUMMARARY_REQUEST,
    GET_PREMISES_SUMMARARY_SUCCESS,
    GET_PREMISES_SUMMARARY_FAILURE,
    ADD_CATEGORY_LIST,
    ADD_ITEMS_LIST,
    GET_EMPLOYEE_CHART_SLICE_TABLE_REQUEST,
    GET_EMPLOYEE_CHART_SLICE_TABLE_SUCCESS,
    GET_EMPLOYEE_CHART_SLICE_TABLE_FAILURE,
    SELCTED_DATE_FILTER_TYPE,
    SELCTED_START_DATE,
    SELCTED_END_DATE,
    BILLED_REQUEST,
    BILLED_SUCCESS,
    BILLED_FAILURE,
    UNBILLED_REQUEST,
    UNBILLED_SUCCESS,
    UNBILLED_FAILURE,
    GET_DETAILS_RESTAURANT_REQUEST,
    GET_DETAILS_RESTAURANT_SUCCESS,
    GET_DETAILS_RESTAURANT_FAILURE,
    GET_DOWNLOADABLE_REPORT_REQUEST,
    GET_DOWNLOADABLE_REPORT_SUCCESS,
    GET_DOWNLOADABLE_REPORT_FAILURE,
    OVERALL_ORDER_NON_DINE_IN_REQUEST,
    OVERALL_ORDER_NON_DINE_IN_SUCCESS,
    LOGOUT,
    ORDER_TRACKER_SUCCESS,
    ORDER_TRACKER_REQUEST,
    ORDER_TRACKER_FAILURE,
    OVERALL_ORDER_NON_DINE_IN_FAILURE
} from "./newReportsConstants";

export const salesSummaryRequest = (data) => {
    return {
        type: SALES_SUMMARY_REQUEST,
        payload: data
    };
}

export const salesSummarySuccess = (data) => {
    return {
        type: SALES_SUMMARY_SUCCESS,
        payload: data
    };
}

export const salesSummaryFailure = (error) => {
    return {
        type: SALES_SUMMARY_FAILURE,
        payload: error
    };
}

export const salesByItemCategoryRequest = (data) => {
    return {
        type: SALES_BY_ITEM_CATEGORY_REQUEST,
        payload: data
    };
}

export const salesByItemCategorySuccess = (data) => {
    return {
        type: SALES_BY_ITEM_CATEGORY_SUCCESS,
        payload: data
    };
}

export const salesByItemCategoryFailure = (error) => {
    return {
        type: SALES_BY_ITEM_CATEGORY_FAILURE,
        payload: error
    };
}

export const salesByRevenueClassRequest = (data) => {
    return {
        type: SALES_BY_REVENUE_CLASS_REQUEST,
        payload: data
    }
}

export const salesByRevenueClassSuccess = (data) => {
    return {
        type: SALES_BY_REVENUE_CLASS_SUCCESS,
        payload: data
    }
}

export const salesByRevenueClassFailure = (error) => {
    return {
        type: SALES_BY_REVENUE_CLASS_FAILURE,
        payload: error
    }
}

export const salesByChannelRequest = (data) => {
    return {
        type: SALES_BY_CHANNEL_REQUEST,
        payload: data
    }
}

export const salesByChannelSuccess = (data) => {
    return {
        type: SALES_BY_CHANNEL_SUCCESS,
        payload: data
    }
}

export const salesByChannelFailure = (error) => {
    return {
        type: SALES_BY_CHANNEL_FAILURE,
        payload: error
    }
}

export const actualSalesRequest = (data) => {
    return {
        type: ACTUAL_SALES_REQUEST,
        payload: data
    }
}

export const actualSalesSuccess = (data) => {
    return {
        type: ACTUAL_SALES_SUCCESS,
        payload: data
    }
}

export const actualSalesFailure = (error) => {
    return {
        type: ACTUAL_SALES_FAILURE,
        payload: error
    }
}

export const actualSalesThirdPartyRequest = (data) => {
    return {
        type: ACTUAL_SALES_THIRD_PARTY_REQUEST,
        payload: data
    }
}

export const actualSalesThirdPartySuccess = (data) => {
    return {
        type: ACTUAL_SALES_THIRD_PARTY_SUCCESS,
        payload: data
    }
}

export const actualSalesThirdPartyFailure = (error) => {
    return {
        type: ACTUAL_SALES_THIRD_PARTY_FAILURE,
        payload: error
    }
}

export const hourlySalesRequest = (data) => {
    return {
        type: HOURLY_SALES_REQUEST,
        payload: data
    }
}

export const hourlySalesSuccess = (data) => {
    return {
        type: HOURLY_SALES_SUCCESS,
        payload: data
    }
}

export const hourlySalesFailure = (error) => {
    return {
        type: HOURLY_SALES_FAILURE,
        payload: error
    }
}

export const liveDiscountRequest = (data) => {
    return {
        type: LIVE_DISCOUNT_REQUEST,
        payload: data
    }
}

export const liveDiscountSuccess = (data) => {
    return {
        type: LIVE_DISOUNT_SUCCESS,
        payload: data
    }
}

export const liveDiscountFailure = (error) => {
    return {
        type: LIVE_DISCOUNT_FAILURE,
        payload: error
    }
}

export const liveOpenSalesRequest = (data) => {
    return {
        type: LIVE_OPEN_SALES_REQUEST,
        payload: data
    }
}

export const liveOpenSalesSuccess = (data) => {
    return {
        type: LIVE_OPEN_SALES_SUCCESS,
        payload: data
    }
}

export const liveOpenSalesFailure = (error) => {
    return {
        type: LIVE_OPEN_SALES_FAILURE,
        payload: error
    }
}

export const liveOrdersRequest = (data) => {
    return {
        type: LIVE_ORDERS_REQUEST,
        payload: data
    }
}

export const liveOrdersSuccess = (data) => {
    return {
        type: LIVE_ORDERS_SUCCESS,
        payload: data
    }
}

export const liveOrdersFailure = (error) => {
    return {
        type: LIVE_ORDERS_FAILURE,
        payload: error
    }
}

export const liveRefundsRequest = (data) => {
    return {
        type: LIVE_REFUNDS_REQUEST,
        payload: data
    }
}

export const liveRefundsSuccess = (data) => {
    return {
        type: LIVE_REFUNDS_SUCCESS,
        payload: data
    }
}

export const liveRefundsFailure = (error) => {
    return {
        type: LIVE_REFUNDS_FAILURE,
        payload: error
    }
}

export const liveNetSalesRequest = (data) => {
    return {
        type: LIVE_NET_SALES_REQUEST,
        payload: data
    }
}

export const liveNetSalesSuccess = (data) => {
    return {
        type: LIVE_NET_SALES_SUCCESS,
        payload: data
    }
}

export const liveNetSalesFailure = (error) => {
    return {
        type: LIVE_NET_SALES_FAILURE,
        payload: error
    }
}

export const liveOrderNonDineInRequest = (data) => {
    return {
        type: LIVE_ORDER_NON_DINE_IN_REQUEST,
        payload: data
    }
}

export const liveOrderNonDineInSuccess = (data) => {
    return {
        type: LIVE_ORDER_NON_DINE_IN_SUCCESS,
        payload: data
    }
}

export const orderTrackerFailure = (data) => {
    return {
        type: ORDER_TRACKER_FAILURE,
        payload: data
    }
}

export const orderTrackerSuccess = (data) => {
    return {
        type: ORDER_TRACKER_SUCCESS,
        payload: data
    }
}


export const orderTrackerRequest = (data) => {
    return {
        type: ORDER_TRACKER_REQUEST,
        payload: data
    }
}

export const OverallOrderNonDineInRequest = (data) => {
    return {
        type: OVERALL_ORDER_NON_DINE_IN_REQUEST,
        payload: data
    }
}

export const OverallOrderNonDineInSuccess = (data) => {
    return {
        type: OVERALL_ORDER_NON_DINE_IN_SUCCESS,
        payload: data
    }
}

export const OverallOrderNonDineInFailure = (error) => {
    return {
        type: OVERALL_ORDER_NON_DINE_IN_FAILURE,
        payload: error
    }
}

export const liveOrderNonDineInFailure = (error) => {
    return {
        type: LIVE_ORDER_NON_DINE_IN_FAILURE,
        payload: error
    }
}

export const discountSummaryRequest = (data) => {
    return {
        type: DISCOUNT_SUMMARY_REQUEST,
        payload: data
    }
}

export const discountSummarySuccess = (data) => {
    return {
        type: DISCOUNT_SUMMARY_SUCCESS,
        payload: data
    }
}

export const discountSummaryFailure = (error) => {
    return {
        type: DISCOUNT_SUMMARY_FAILURE,
        payload: error
    }
}

export const cancellationSummaryRequest = (data) => {
    return {
        type: CANCELLATION_SUMMARY_REQUEST,
        payload: data
    }
}

export const cancellationSummarySuccess = (data) => {
    return {
        type: CANCELLATION_SUMMARY_SUCCESS,
        payload: data
    }
}

export const cancellationSummaryFailure = (error) => {
    return {
        type: CANCELLATION_SUMMARY_FAILURE,
        payload: error
    }
}

export const employeeStaffTipGratuityRequest = (data) => {
    return {
        type: EMPLOYEE_STAFF_TIP_GRATUITY_REQUEST,
        payload: data
    }
}

export const employeeStaffTipGratuitySuccess = (data) => {
    return {
        type: EMPLOYEE_STAFF_TIP_GRATUITY_SUCCESS,
        payload: data
    }
}

export const employeeStaffTipGratuityFailure = (error) => {
    return {
        type: EMPLOYEE_STAFF_TIP_GRATUITY_FAILURE,
        payload: error
    }
}

export const employeeStaffDiscountRequest = (data) => {
    return {
        type: EMPLOYEE_STAFF_DISCOUNT_REQUEST,
        payload: data
    }
}

export const employeeStaffDiscountSuccess = (data) => {
    return {
        type: EMPLOYEE_STAFF_DISCOUNT_SUCCESS,
        payload: data
    }
}

export const employeeStaffDiscountFailure = (error) => {
    return {
        type: EMPLOYEE_STAFF_DISCOUNT_FAILURE,
        payload: error
    }
}

export const employeeStaffPerformanceRequest = (data) => {
    return {
        type: EMPLOYEE_STAFF_PERFORMANCE_REQUEST,
        payload: data
    }
}

export const employeeStaffPerformanceSuccess = (data) => {
    return {
        type: EMPLOYEE_STAFF_PERFORMANCE_SUCCESS,
        payload: data
    }
}

export const employeeStaffPerformanceFailure = (error) => {
    return {
        type: EMPLOYEE_STAFF_PERFORMANCE_FAILURE,
        payload: error
    }
}

export const employeeStaffActivityRequest = (data) => {
    return {
        type: EMPLOYEE_STAFF_ACTIVITY_REQUEST,
        payload: data
    }
}

export const employeeStaffActivitySuccess = (data) => {
    return {
        type: EMPLOYEE_STAFF_ACTIVITY_SUCCESS,
        payload: data
    }
}

export const employeeStaffActivityFailure = (error) => {
    return {
        type: EMPLOYEE_STAFF_ACTIVITY_FAILURE,
        payload: error
    }
}

export const dayCheckInRequest = (data) => {
    return {
        type: DAY_CHECKIN_REQUEST,
        payload: data
    }
}

export const dayCheckInSuccess = (data) => {
    return {
        type: DAY_CHECKIN_SUCCESS,
        payload: data
    }
}

export const dayCheckInFailure = (error) => {
    return {
        type: DAY_CHECKIN_FAILURE,
        payload: error
    }
}


export const dailyCheckInRequest = (data) => {
    return {
        type: DAILY_CHECKIN_REQUEST,
        payload: data
    }
}

export const dailyCheckInSuccess = (data) => {
    return {
        type: DAILY_CHECKIN_SUCCESS,
        payload: data
    }
}

export const dailyCheckInFailure = (error) => {
    return {
        type: DAILY_CHECKIN_FAILURE,
        payload: error
    }
}

export const dailyGuestRequest = (data) => {
    return {
        type: DAILY_GUEST_REQUEST,
        payload: data
    }
}

export const dailyGuestSuccess = (data) => {
    return {
        type: DAILY_GUEST_SUCCESS,
        payload: data
    }
}

export const dailyGuestFailure = (error) => {
    return {
        type: DAILY_GUEST_FAILURE,
        payload: error
    }
}

export const dailyCancellationRequest = (data) => {
    return {
        type: DAILY_CANCELLATION_REQUEST,
        payload: data
    }
}

export const dailyCancellationSuccess = (data) => {
    return {
        type: DAILY_CANCELLATION_SUCCESS,
        payload: data
    }
}

export const dailyCancellationFailure = (error) => {
    return {
        type: DAILY_CANCELLATION_FAILURE,
        payload: error
    }
}

export const hourlyGuestsRequest = (data) => {
    return {
        type: HOURLY_GUESTS_REQUEST,
        payload: data
    }
}

export const hourlyGuestsSuccess = (data) => {
    return {
        type: HOURLY_GUESTS_SUCCESS,
        payload: data
    }
}

export const hourlyGuestsFailure = (error) => {
    return {
        type: HOURLY_GUESTS_FAILURE,
        payload: error
    }
}

export const dailyHourlyCheckInRequest = (data) => {
    return {
        type: DAILY_HOURLY_CHECKIN_REQUEST,
        payload: data
    }
}

export const dailyHourlyCheckInSuccess = (data) => {
    return {
        type: DAILY_HOURLY_CHECKIN_SUCCESS,
        payload: data
    }
}

export const dailyHourlyCheckInFailure = (error) => {
    return {
        type: DAILY_HOURLY_CHECKIN_FAILURE,
        payload: error
    }
}

export const dayOverDayGuestRequest = (data) => {
    return {
        type: DAY_OVER_DAY_GUEST_REQUEST,
        payload: data
    }
}

export const dayOverDayGuestSuccess = (data) => {
    return {
        type: DAY_OVER_DAY_GUEST_SUCCESS,
        payload: data
    }
}

export const dayOverDayGuestFailure = (error) => {
    return {
        type: DAY_OVER_DAY_GUEST_FAILURE,
        payload: error
    }
}

export const peakSummaryRequest = (data) => {
    return {
        type: PEAK_SUMMARY_REQUEST,
        payload: data
    }
}

export const peakSummarySuccess = (data) => {
    return {
        type: PEAK_SUMMARY_SUCCESS,
        payload: data
    }
}

export const peakSummaryFailure = (error) => {
    return {
        type: PEAK_SUMMARY_FAILURE,
        payload: error
    }
}


export const partySizeRequest = (data) => {
    return {
        type: PARTY_SIZE_REQUEST,
        payload: data
    }
}

export const partySizeSuccess = (data) => {
    return {
        type: PARTY_SIZE_SUCCESS,
        payload: data
    }
}

export const partySizeFailure = (error) => {
    return {
        type: PARTY_SIZE_FAILURE,
        payload: error
    }
}

export const customerSizeRequest = (data) => {
    return {
        type: CUSTOMER_SIZE_REQUEST,
        payload: data
    }
}

export const customerSizeSuccess = (data) => {
    return {
        type: CUSTOMER_SIZE_SUCCESS,
        payload: data
    }
}

export const customerSizeFailure = (error) => {
    return {
        type: CUSTOMER_SIZE_FAILURE,
        payload: error
    }
}

export const newCustomerSizeRequest = (data) => {
    return {
        type: NEW_CUSTOMER_SIZE_REQUEST,
        payload: data
    }
}

export const newCustomerSizeSuccess = (data) => {
    return {
        type: NEW_CUSTOMER_SIZE_SUCCESS,
        payload: data
    }
}

export const newCustomerSizeFailure = (error) => {
    return {
        type: NEW_CUSTOMER_SIZE_FAILURE,
        payload: error
    }
}

export const customerDetailsRequest = (data) => {
    return {
        type: CUSTOMER_DETAILS_REQUEST,
        payload: data
    }
}

export const customerDetailsSuccess = (data) => {
    return {
        type: CUSTOMER_DETAILS_SUCCESS,
        payload: data
    }
}

export const customerDetailsFailure = (error) => {
    return {
        type: CUSTOMER_DETAILS_FAILURE,
        payload: error
    }
}

export const liveCheckInStatusRequest = (data) => {
    return {
        type: LIVE_CHECKIN_STATUS_REQUEST,
        payload: data
    }
}

export const liveCheckInStatusSuccess = (data) => {
    return {
        type: LIVE_CHECKIN_STATUS_SUCCESS,
        payload: data
    }
}

export const liveCheckInStatusFailure = (error) => {
    return {
        type: LIVE_CHECKIN_STATUS_FAILURE,
        payload: error
    }
}

export const dailyCheckInStatusRequest = (data) => {
    return {
        type: DAILY_CHECKIN_STATUS_REQUEST,
        payload: data
    }
}

export const dailyCheckInStatusSuccess = (data) => {
    return {
        type: DAILY_CHECKIN_STATUS_SUCCESS,
        payload: data
    }
}

export const dailyCheckInStatusFailure = (error) => {
    return {
        type: DAILY_CHECKIN_STATUS_FAILURE,
        payload: error
    }
}

// Voided Summary Actions
export const voidedSummaryRequest = (data) => ({
    type: VOIDED_SUMMARY_REQUEST,
    payload: data
});

export const voidedSummarySuccess = (data) => ({
    type: VOIDED_SUMMARY_SUCCESS,
    payload: data
});

export const voidedSummaryFailure = (error) => ({
    type: VOIDED_SUMMARY_FAILURE,
    payload: error
});

// Dropdown Details Actions
export const dropdownDetailsRequest = (data) => ({
    type: DROPDOWN_DETAILS_REQUEST,
    payload: data
});

export const dropdownDetailsSuccess = (data) => ({
    type: DROPDOWN_DETAILS_SUCCESS,
    payload: data
});

export const dropdownDetailsFailure = (error) => ({
    type: DROPDOWN_DETAILS_FAILURE,
    payload: error
});

// Category Channel Summary Actions
export const categoryChannelSummaryRequest = (data) => ({
    type: CATEGORY_CHANNEL_SUMMARY_REQUEST,
    payload: data
});

export const categoryChannelSummarySuccess = (data) => ({
    type: CATEGORY_CHANNEL_SUMMARY_SUCCESS,
    payload: data
});

export const categoryChannelSummaryFailure = (error) => ({
    type: CATEGORY_CHANNEL_SUMMARY_FAILURE,
    payload: error
});

// Category Sales Actions
export const categorySalesRequest = (data) => ({
    type: CATEGORY_SALES_REQUEST,
    payload: data
});

export const categorySalesSuccess = (data) => ({
    type: CATEGORY_SALES_SUCCESS,
    payload: data
});

export const categorySalesFailure = (error) => ({
    type: CATEGORY_SALES_FAILURE,
    payload: error
});

// Category Sales Summary Actions
export const categorySalesSummaryRequest = (data) => ({
    type: CATEGORY_SALES_SUMMARY_REQUEST,
    payload: data
});

export const categorySalesSummarySuccess = (data) => ({
    type: CATEGORY_SALES_SUMMARY_SUCCESS,
    payload: data
});

export const categorySalesSummaryFailure = (error) => ({
    type: CATEGORY_SALES_SUMMARY_FAILURE,
    payload: error
});

export const salesTagsRequest = (data) => {
    return {
        type: SALES_TAGS_REQUEST,
        payload: data
    }
}

export const salesTagsSuccess = (data) => {
    return {
        type: SALES_TAGS_SUCCESS,
        payload: data
    }
}

export const salesTagsFailure = (error) => {
    return {
        type: SALES_TAGS_FAILURE,
        payload: error
    }
}

export const paymentDetailsRequest = (data) => {
    return {
        type: PAYMENT_DETAILS_REQUEST,
        payload: data
    }
}

export const paymentDetailsSuccess = (data) => {
    return {
        type: PAYMENT_DETAILS_SUCCESS,
        payload: data
    }
}

export const paymentDetailsFailure = (error) => {
    return {
        type: PAYMENT_DETAILS_FAILURE,
        payload: error
    }
}

export const salesCategoryRequest = (data) => {
    return {
        type: SALES_CATEGORY_REQUEST,
        payload: data
    }
}

export const salesCategorySuccess = (data) => {
    return {
        type: SALES_CATEGORY_SUCCESS,
        payload: data
    }
}

export const salesCategoryFailure = (error) => {
    return {
        type: SALES_CATEGORY_FAILURE,
        payload: error
    }
}

export const salesCardTypeRequest = (data) => {
    return {
        type: SALES_CARD_TYPE_REQUEST,
        payload: data
    }
}

export const salesCardTypeSuccess = (data) => {
    return {
        type: SALES_CARD_TYPE_SUCCESS,
        payload: data
    }
}

export const salesCardTypeFailure = (error) => {
    return {
        type: SALES_CARD_TYPE_FAILURE,
        payload: error
    }
}

// Location Details Actions
export const locationDetailsRequest = (data) => {
    return {
        type: LOCATION_DETAILS_REQUEST,
        payload: data
    }
}

export const locationDetailsSuccess = (data) => {
    return {
        type: LOCATION_DETAILS_SUCCESS,
        payload: data
    }
}

export const locationDetailsFailure = (error) => {
    return {
        type: LOCATION_DETAILS_FAILURE,
        payload: error
    }
}

export const billedRequest = (data) => {
    return {
        type: BILLED_REQUEST,
        payload: data
    }
}

export const billedSuccess = (data) => {
    return {
        type: BILLED_SUCCESS,
        payload: data
    }
}

export const billedFailure = (error) => {
    return {
        type: BILLED_FAILURE,
        payload: error
    }
}

export const unBilledRequest = (data) => {
    return {
        type: UNBILLED_REQUEST,
        payload: data
    }
}

export const unBilledSuccess = (data) => {
    return {
        type: UNBILLED_SUCCESS,
        payload: data
    }
}

export const unBilledFailure = (error) => {
    return {
        type: UNBILLED_FAILURE,
        payload: error
    }
}

export const employeeSalesOverviewRequest = (data) => {
    return {
        type: EMPLOYEE_SALES_OVERVIEW_REQUEST,
        payload: data
    }
}

export const employeeSalesOverviewSuccess = (data) => {
    return {
        type: EMPLOYEE_SALES_OVERVIEW_SUCCESS,
        payload: data
    }
}

export const employeeSalesOverviewFailure = (error) => {
    return {
        type: EMPLOYEE_SALES_OVERVIEW_FAILURE,
        payload: error
    }
}

export const changeDateFilterType = (data) => {
    return {
        type: SELCTED_DATE_FILTER_TYPE,
        payload: data
    }
}

export const changeStartDate = (data) => {
    return {
        type: SELCTED_START_DATE,
        payload: data
    }
}

export const changeEndDate = (data) => {
    return {
        type: SELCTED_END_DATE,
        payload: data
    }
}

export const changeLocation = (data) => {
    return {
        type: SELCTED_LOCATION,
        payload: data
    }
}


export const storeLocationsList = (data) => {
    return {
        type: STORE_LOCATIONS_LIST,
        payload: data
    }
}

export const addCategoryList = (data) => {
    return {
        type: ADD_CATEGORY_LIST,
        payload: data
    }
}


export const addItemList = (data) => {
    return {
        type: ADD_ITEMS_LIST,
        payload: data
    }
}

export const selectCategories = (data) => {
    return {
        type: SELCTED_CATEGORIES,
        payload: data
    }
}


export const selectItems = (data) => {
    return {
        type: SELCTED_ITEMS,
        payload: data
    }
}


// Staff Sales Actions
export const staffSalesRequest = (data) => ({
    type: STAFF_SALES_REQUEST,
    payload: data,
});

export const staffSalesSuccess = (data) => ({
    type: STAFF_SALES_SUCCESS,
    payload: data,
});

export const staffSalesFailure = (error) => ({
    type: STAFF_SALES_FAILURE,
    payload: error,
});

// Sales Summary Report Actions
export const salesSummaryReportRequest = (data) => ({
    type: SALES_SUMMARY_REPORT_REQUEST,
    payload: data,
});

export const salesSummaryReportSuccess = (data) => ({
    type: SALES_SUMMARY_REPORT_SUCCESS,
    payload: data,
});

export const salesSummaryReportFailure = (error) => ({
    type: SALES_SUMMARY_REPORT_FAILURE,
    payload: error,
});

// Hourly Sales Report Chart Actions
export const hourlySalesReportChartRequest = (data) => ({
    type: HOURLY_SALES_REPORT_CHART_REQUEST,
    payload: data
});

export const hourlySalesReportChartSuccess = (data) => ({
    type: HOURLY_SALES_REPORT_CHART_SUCCESS,
    payload: data
});

export const hourlySalesReportChartFailure = (error) => ({
    type: HOURLY_SALES_REPORT_CHART_FAILURE,
    payload: error
});

export const offerSummaryRequest = (data) => ({
    type: GET_OFFER_SUMMARY_REQUEST,
    payload: data
})

export const offerSummarySuccess = (data) => ({
    type: GET_OFFER_SUMMARY_SUCCESS,
    payload: data
})

export const offerSummaryFailure = (error) => ({
    type: GET_OFFER_SUMMARY_FAILURE,
    payload: error
})

export const voidedOrderSummaryRequest = (data) => ({
    type: GET_VOIDED_ORDER_SUMMARY_REQUEST,
    payload: data
})

export const voidedOrderSummarySuccess = (data) => ({
    type: GET_VOIDED_ORDER_SUMMARY_SUCCESS,
    payload: data
})

export const voidedOrderSummaryFailure = (error) => ({
    type: GET_VOIDED_ORDER_SUMMARY_FAILURE,
    payload: error
})

export const getEmployeeActivityRequest = (data) => ({
    type: GET_EMPLOYEE_ACTIVITY_REQUEST,
    payload: data
})

export const getEmployeeActivitySuccess = (data) => ({
    type: GET_EMPLOYEE_ACTIVITY_SUCCESS,
    payload: data
})

export const getEmployeeActivityFailure = (error) => ({
    type: GET_EMPLOYEE_ACTIVITY_FAILURE,
    payload: error
})

export const getPremisesSummaryRequest = (data) => ({
    type: GET_PREMISES_SUMMARARY_REQUEST,
    payload: data
})

export const getPremisesSummarySuccess = (data) => ({
    type: GET_PREMISES_SUMMARARY_SUCCESS,
    payload: data
})

export const getPremisesSummaryFailure = (error) => ({
    type: GET_PREMISES_SUMMARARY_FAILURE,
    payload: error
})

export const getEmployeeChartSliceTableRequest = (data) => ({
    type: GET_EMPLOYEE_CHART_SLICE_TABLE_REQUEST,
    payload: data
})

export const getEmployeeChartSliceTableSuccess = (data) => ({
    type: GET_EMPLOYEE_CHART_SLICE_TABLE_SUCCESS,
    payload: data
})

export const getEmployeeChartSliceTableFailure = (error) => ({
    type: GET_EMPLOYEE_CHART_SLICE_TABLE_FAILURE,
    payload: error
})


export const getRestaurantRequestFromNewReports = (data) => ({
  type: GET_DETAILS_RESTAURANT_REQUEST,
  payload: data,
});

export const getRestaurantSuccessFromNewReports = (data) => ({
  type: GET_DETAILS_RESTAURANT_SUCCESS,
  payload: data,
});

export const getRestaurantFailreFromNewReports = (error) => ({
  type: GET_DETAILS_RESTAURANT_FAILURE,
  payload: error,
});


export const getDownloadableReportRequest = (data) => ({
    type: GET_DOWNLOADABLE_REPORT_REQUEST,
    payload: data
})

export const getDownloadableReportSuccess = (data) => ({
    type: GET_DOWNLOADABLE_REPORT_SUCCESS,
    payload: data
})

export const getDownloadableReportFailure = (error) => ({
    type: GET_DOWNLOADABLE_REPORT_FAILURE,
    payload: error
})  

export const clearReportData=()=>({
    type: LOGOUT,
    payload:""
})
