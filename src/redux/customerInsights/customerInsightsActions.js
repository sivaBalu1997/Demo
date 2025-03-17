import {
    SUMMARY_INSIGHTS_CUSTOMER_VOLUME_REQUEST,
    SUMMARY_INSIGHTS_CUSTOMER_VOLUME_SUCCESS,
    SUMMARY_INSIGHTS_CUSTOMER_VOLUME_FAILURE,

    SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_REQUEST,
    SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_SUCCESS,
    SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_FAILURE,


    SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_REQUEST,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_SUCCESS,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_FAILURE,

    SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_REQUEST,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_SUCCESS,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_FAILURE,


    SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_REQUEST,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_SUCCESS,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_FAILURE,


DETAILED_INSIGHTS_CUSTOMER_DETAILS_REQUEST,
DETAILED_INSIGHTS_CUSTOMER_DETAILS_SUCCESS,
DETAILED_INSIGHTS_CUSTOMER_DETAILS_FAILURE,

    DETAILED_INSIGHTS_SUMMARY_REQUEST,
    DETAILED_INSIGHTS_SUMMARY_SUCCESS,
    DETAILED_INSIGHTS_SUMMARY_FAILURE,
    DETAILED_INSIGHTS_DINE_IN_REQUEST,
    DETAILED_INSIGHTS_DINE_IN_SUCCESS,
    DETAILED_INSIGHTS_DINE_IN_FAILURE,
    DETAILED_INSIGHTS_OFF_PREM_REQUEST,
    DETAILED_INSIGHTS_OFF_PREM_SUCCESS,
    DETAILED_INSIGHTS_OFF_PREM_FAILURE,
    DETAILED_INSIGHTS_CUSTOMERS_ORDER_REQUEST,
    DETAILED_INSIGHTS_CUSTOMERS_ORDER_SUCCESS,
    DETAILED_INSIGHTS_CUSTOMERS_ORDER_FAILURE,
    DETAILED_INSIGHTS_LATEST_ORDER_REQUEST,
    DETAILED_INSIGHTS_LATEST_ORDER_SUCCESS,
    DETAILED_INSIGHTS_LATEST_ORDER_FAILURE,
    DETAILED_INSIGHTS_CUSTOMERS_TOP_FAV_ITEM_REQUEST,
    DETAILED_INSIGHTS_CUSTOMERS_TOP_FAV_ITEM_SUCCESS,
    DETAILED_INSIGHTS_CUSTOMERS_TOP_FAV_ITEM_FAILURE

} from "./customerInsightsConstants";

export const summaryInsightsCustomerVolumeRequest = (data) => {
    return {
        type: SUMMARY_INSIGHTS_CUSTOMER_VOLUME_REQUEST,
        payload: data
    };
}

export const summaryInsightsCustomerVolumeSuccess = (data) => {
    return {
        type: SUMMARY_INSIGHTS_CUSTOMER_VOLUME_SUCCESS,
        payload: data
    };
}

export const summaryInsightsCustomerVolumeFailure = (error) => {
    return {
        type: SUMMARY_INSIGHTS_CUSTOMER_VOLUME_FAILURE,
        payload: error
    };
}




export const summaryInsightsCustomerByTenureRequest = (data) => {
    return {
        type: SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_REQUEST,
        payload: data
    };
}

export const summaryInsightsCustomerByTenureSuccess = (data) => {
    return {
        type: SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_SUCCESS,
        payload: data
    };
}

export const summaryInsightsCustomerByTenureFailure = (error) => {
    return {
        type: SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_FAILURE,
        payload: error
    };
}






export const summaryInsightsCustomerByTotalSpendRequest = (data) => {
    return {
        type: SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_REQUEST,
        payload: data
    };
}

export const summaryInsightsCustomerByTotalSpendSuccess = (data) => {
    return {
        type: SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_SUCCESS,
        payload: data
    };
}

export const summaryInsightsCustomerByTotalSpendFailure = (error) => {
    return {
        type: SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_FAILURE,
        payload: error
    };
}




export const summaryInsightsCustomerByAvgCoverSizeRequest = (data) => {
    return {
        type: SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_REQUEST,
        payload: data
    };
}

export const summaryInsightsCustomerByAvgCoverSizeSuccess = (data) => {
    return {
        type: SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_SUCCESS,
        payload: data
    };
}

export const summaryInsightsCustomerByAvgCoverSizeFailure = (error) => {
    return {
        type: SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_FAILURE,
        payload: error
    };
}





export const summaryInsightsCustomerByLoyaltyLevelsRequest = (data) => {
    return {
        type: SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_REQUEST,
        payload: data
    };
}

export const summaryInsightsCustomerByLoyaltyLevelsSuccess = (data) => {
    return {
        type: SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_SUCCESS,
        payload: data
    };
}

export const summaryInsightsCustomerByLoyaltyLevelsFailure = (error) => {
    return {
        type: SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_FAILURE,
        payload: error
    };
}





export const detailedInsightsCustomerDetailsRequest = (data) => {
    return {
        type: DETAILED_INSIGHTS_CUSTOMER_DETAILS_REQUEST,
        payload: data
    };
}
export const detailedInsightsCustomerDetailsSuccess = (data) => {
    return {
        type: DETAILED_INSIGHTS_CUSTOMER_DETAILS_SUCCESS,
        payload: data
    };
}
export const detailedInsightsCustomerDetailsFailure = (data) => {
    return {
        type: DETAILED_INSIGHTS_CUSTOMER_DETAILS_FAILURE,
        payload: data
    };
}
export const detailedInsightsSummaryRequest = (data) => {
    return {
        type: DETAILED_INSIGHTS_SUMMARY_REQUEST,
        payload: data
    };
}

export const detailedInsightsSummarySuccess = (data) => {
    return {
        type: DETAILED_INSIGHTS_SUMMARY_SUCCESS,
        payload: data
    };
}

export const detailedInsightsSummaryFailure = (error) => {
    return {
        type: DETAILED_INSIGHTS_SUMMARY_FAILURE,
        payload: error
    };
}






export const detailedInsightsDineInRequest = (data) => {
    return {
        type: DETAILED_INSIGHTS_DINE_IN_REQUEST,
        payload: data
    };
}

export const detailedInsightsDineInSuccess = (data) => {
    return {
        type: DETAILED_INSIGHTS_DINE_IN_SUCCESS,
        payload: data
    };
}

export const detailedInsightsDineInFailure = (error) => {
    return {
        type: DETAILED_INSIGHTS_DINE_IN_FAILURE,
        payload: error
    };
}



export const detailedInsightsOffPremRequest = (data) => {
    return {
        type: DETAILED_INSIGHTS_OFF_PREM_REQUEST,
        payload: data
    };
}

export const detailedInsightsOffPremSuccess = (data) => {
    return {
        type: DETAILED_INSIGHTS_OFF_PREM_SUCCESS,
        payload: data
    };
}

export const detailedInsightsOffPremFailure = (error) => {
    return {
        type: DETAILED_INSIGHTS_OFF_PREM_FAILURE,
        payload: error
    };
}



export const detailedInsightsCustomerOrderRequest = (data) => {
    return {
        type: DETAILED_INSIGHTS_CUSTOMERS_ORDER_REQUEST,
        payload: data
    };
}

export const detailedInsightsCustomerOrderSuccess = (data) => {
    return {
        type: DETAILED_INSIGHTS_CUSTOMERS_ORDER_SUCCESS,
        payload: data
    };
}

export const detailedInsightsCustomerOrderFailure = (error) => {
    return {
        type: DETAILED_INSIGHTS_CUSTOMERS_ORDER_FAILURE,
        payload: error
    };
}




export const detailedInsightsLatestOrderRequest = (data) => {
    return {
        type: DETAILED_INSIGHTS_LATEST_ORDER_REQUEST,
        payload: data
    };
}

export const detailedInsightsLatestOrderSuccess = (data) => {
    return {
        type: DETAILED_INSIGHTS_LATEST_ORDER_SUCCESS,
        payload: data
    };
}

export const detailedInsightsLatestOrderFailure = (error) => {
    return {
        type: DETAILED_INSIGHTS_LATEST_ORDER_FAILURE,
        payload: error
    };
}




export const detailedInsightsCustomerTopFavItemsRequest = (data) => {
    return {
        type: DETAILED_INSIGHTS_CUSTOMERS_TOP_FAV_ITEM_REQUEST,
        payload: data
    };
}

export const detailedInsightsCustomerTopFavItemsSuccess = (data) => {
    return {
        type: DETAILED_INSIGHTS_CUSTOMERS_TOP_FAV_ITEM_SUCCESS,
        payload: data
    };
}

export const detailedInsightsCustomerTopFavItemsFailure = (error) => {
    return {
        type: DETAILED_INSIGHTS_CUSTOMERS_TOP_FAV_ITEM_FAILURE,
        payload: error
    };
}