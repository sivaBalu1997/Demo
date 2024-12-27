import { SALES_SUMMARY_REQUEST, SALES_SUMMARY_SUCCESS, SALES_SUMMARY_FAILURE } from "./newReportsConstants";

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