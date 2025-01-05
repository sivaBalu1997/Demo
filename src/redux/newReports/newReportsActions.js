import { SALES_SUMMARY_REQUEST, SALES_SUMMARY_SUCCESS, SALES_SUMMARY_FAILURE, SALES_BY_ITEM_CATEGORY_REQUEST, SALES_BY_ITEM_CATEGORY_SUCCESS, SALES_BY_ITEM_CATEGORY_FAILURE, SALES_BY_REVENUE_CLASS_REQUEST, SALES_BY_REVENUE_CLASS_FAILURE, SALES_BY_REVENUE_CLASS_SUCCESS, ACTUAL_SALES_REQUEST, ACTUAL_SALES_SUCCESS, ACTUAL_SALES_FAILURE, ACTUAL_SALES_THIRD_PARTY_REQUEST, ACTUAL_SALES_THIRD_PARTY_SUCCESS, ACTUAL_SALES_THIRD_PARTY_FAILURE, HOURLY_SALES_REQUEST, HOURLY_SALES_SUCCESS, HOURLY_SALES_FAILURE } from "./newReportsConstants";

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
