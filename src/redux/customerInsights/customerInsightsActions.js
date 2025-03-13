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
    SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_FAILURE

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