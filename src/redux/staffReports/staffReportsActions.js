import {
    STAFF_INSIGHTS_TOP_REVENUE_REQUEST,
    STAFF_INSIGHTS_TOP_REVENUE_SUCCESS,
    STAFF_INSIGHTS_TOP_REVENUE_FAILURE,

} from "./staffReportsConstants";

export const staffInsightsTopRevenueRequest = (data) => {
    return {
        type: STAFF_INSIGHTS_TOP_REVENUE_REQUEST,
        payload: data
    };
}

export const staffInsightsTopRevenueSuccess = (data) => {
    return {
        type: STAFF_INSIGHTS_TOP_REVENUE_SUCCESS,
        payload: data
    };
}

export const staffInsightsTopRevenueFailure = (error) => {
    return {
        type: STAFF_INSIGHTS_TOP_REVENUE_FAILURE,
        payload: error
    };
}
