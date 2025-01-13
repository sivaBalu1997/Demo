import { SALES_SUMMARY_REQUEST, SALES_SUMMARY_SUCCESS, SALES_SUMMARY_FAILURE, SALES_BY_ITEM_CATEGORY_REQUEST, SALES_BY_ITEM_CATEGORY_SUCCESS, SALES_BY_ITEM_CATEGORY_FAILURE, SALES_BY_REVENUE_CLASS_REQUEST, SALES_BY_REVENUE_CLASS_FAILURE, SALES_BY_REVENUE_CLASS_SUCCESS, ACTUAL_SALES_REQUEST, ACTUAL_SALES_SUCCESS, ACTUAL_SALES_FAILURE, ACTUAL_SALES_THIRD_PARTY_REQUEST, ACTUAL_SALES_THIRD_PARTY_SUCCESS, ACTUAL_SALES_THIRD_PARTY_FAILURE, HOURLY_SALES_REQUEST, HOURLY_SALES_SUCCESS, HOURLY_SALES_FAILURE, LIVE_DISCOUNT_REQUEST, LIVE_DISOUNT_SUCCESS, LIVE_DISCOUNT_FAILURE, LIVE_OPEN_SALES_REQUEST, LIVE_OPEN_SALES_SUCCESS, LIVE_OPEN_SALES_FAILURE, LIVE_ORDERS_REQUEST, LIVE_ORDERS_SUCCESS, LIVE_ORDERS_FAILURE, LIVE_REFUNDS_REQUEST, LIVE_REFUNDS_SUCCESS, LIVE_REFUNDS_FAILURE, LIVE_NET_SALES_REQUEST, LIVE_NET_SALES_SUCCESS, LIVE_NET_SALES_FAILURE, LIVE_ORDER_NON_DINE_IN_REQUEST, LIVE_ORDER_NON_DINE_IN_SUCCESS, LIVE_ORDER_NON_DINE_IN_FAILURE, DISCOUNT_SUMMARY_REQUEST, DISCOUNT_SUMMARY_SUCCESS, DISCOUNT_SUMMARY_FAILURE, CANCELLATION_SUMMARY_REQUEST, CANCELLATION_SUMMARY_SUCCESS, CANCELLATION_SUMMARY_FAILURE } from "./newReportsConstants";

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