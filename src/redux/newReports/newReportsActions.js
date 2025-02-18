import { SALES_SUMMARY_REQUEST, SALES_SUMMARY_SUCCESS, SALES_SUMMARY_FAILURE, SALES_BY_ITEM_CATEGORY_REQUEST, SALES_BY_ITEM_CATEGORY_SUCCESS, SALES_BY_ITEM_CATEGORY_FAILURE, SALES_BY_REVENUE_CLASS_REQUEST, SALES_BY_REVENUE_CLASS_FAILURE, SALES_BY_REVENUE_CLASS_SUCCESS, ACTUAL_SALES_REQUEST, ACTUAL_SALES_SUCCESS, ACTUAL_SALES_FAILURE, ACTUAL_SALES_THIRD_PARTY_REQUEST, ACTUAL_SALES_THIRD_PARTY_SUCCESS, ACTUAL_SALES_THIRD_PARTY_FAILURE, HOURLY_SALES_REQUEST, HOURLY_SALES_SUCCESS, HOURLY_SALES_FAILURE, LIVE_DISCOUNT_REQUEST, LIVE_DISOUNT_SUCCESS, LIVE_DISCOUNT_FAILURE, LIVE_OPEN_SALES_REQUEST, LIVE_OPEN_SALES_SUCCESS, LIVE_OPEN_SALES_FAILURE, LIVE_ORDERS_REQUEST, LIVE_ORDERS_SUCCESS, LIVE_ORDERS_FAILURE, LIVE_REFUNDS_REQUEST, LIVE_REFUNDS_SUCCESS, LIVE_REFUNDS_FAILURE, LIVE_NET_SALES_REQUEST, LIVE_NET_SALES_SUCCESS, LIVE_NET_SALES_FAILURE, LIVE_ORDER_NON_DINE_IN_REQUEST, LIVE_ORDER_NON_DINE_IN_SUCCESS, LIVE_ORDER_NON_DINE_IN_FAILURE, DISCOUNT_SUMMARY_REQUEST, DISCOUNT_SUMMARY_SUCCESS, DISCOUNT_SUMMARY_FAILURE, CANCELLATION_SUMMARY_REQUEST, CANCELLATION_SUMMARY_SUCCESS, CANCELLATION_SUMMARY_FAILURE, EMPLOYEE_STAFF_TIP_GRATUITY_REQUEST, EMPLOYEE_STAFF_TIP_GRATUITY_SUCCESS, EMPLOYEE_STAFF_TIP_GRATUITY_FAILURE, EMPLOYEE_STAFF_DISCOUNT_REQUEST, EMPLOYEE_STAFF_DISCOUNT_SUCCESS, EMPLOYEE_STAFF_DISCOUNT_FAILURE, EMPLOYEE_STAFF_PERFORMANCE_REQUEST, EMPLOYEE_STAFF_PERFORMANCE_SUCCESS, EMPLOYEE_STAFF_PERFORMANCE_FAILURE, EMPLOYEE_STAFF_ACTIVITY_REQUEST, EMPLOYEE_STAFF_ACTIVITY_SUCCESS, EMPLOYEE_STAFF_ACTIVITY_FAILURE, DAY_CHECKIN_REQUEST, DAY_CHECKIN_SUCCESS, DAY_CHECKIN_FAILURE, DAILY_CHECKIN_REQUEST, DAILY_CHECKIN_SUCCESS, DAILY_CHECKIN_FAILURE, DAILY_GUEST_REQUEST, DAILY_GUEST_SUCCESS, DAILY_GUEST_FAILURE, DAILY_CANCELLATION_REQUEST, DAILY_CANCELLATION_SUCCESS, DAILY_CANCELLATION_FAILURE, DAILY_HOURLY_CHECKIN_REQUEST, DAILY_HOURLY_CHECKIN_SUCCESS, DAILY_HOURLY_CHECKIN_FAILURE, DAY_OVER_DAY_GUEST_REQUEST, DAY_OVER_DAY_GUEST_SUCCESS, DAY_OVER_DAY_GUEST_FAILURE, PEAK_SUMMARY_REQUEST, PEAK_SUMMARY_SUCCESS, PEAK_SUMMARY_FAILURE, PARTY_SIZE_REQUEST, PARTY_SIZE_SUCCESS, PARTY_SIZE_FAILURE, CUSTOMER_SIZE_REQUEST, CUSTOMER_SIZE_SUCCESS, CUSTOMER_SIZE_FAILURE, NEW_CUSTOMER_SIZE_REQUEST, NEW_CUSTOMER_SIZE_SUCCESS, NEW_CUSTOMER_SIZE_FAILURE, CUSTOMER_DETAILS_REQUEST, CUSTOMER_DETAILS_SUCCESS, CUSTOMER_DETAILS_FAILURE, LIVE_CHECKIN_STATUS_REQUEST, LIVE_CHECKIN_STATUS_SUCCESS, LIVE_CHECKIN_STATUS_FAILURE, DAILY_CHECKIN_STATUS_REQUEST, DAILY_CHECKIN_STATUS_SUCCESS, DAILY_CHECKIN_STATUS_FAILURE, HOURLY_GUESTS_REQUEST, HOURLY_GUESTS_SUCCESS, HOURLY_GUESTS_FAILURE } from "./newReportsConstants";

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