import {
    STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_REQUEST,
    STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_SUCCESS,
    STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_FAILURE,
    STAFF_OVERVIEW_ACTIVITIES_REQUEST,
    STAFF_OVERVIEW_ACTIVITIES_SUCCESS,
    STAFF_OVERVIEW_ACTIVITIES_FAILURE,
    STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_TABLE_REQUEST,
    STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_TABLE_SUCCESS,
    STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_TABLE_FAILURE,
    STAFF_TREND_SALES_PERFORMANCE_REQUEST,
    STAFF_TREND_SALES_PERFORMANCE_SUCCESS,
    STAFF_TREND_SALES_PERFORMANCE_FAILURE,
    STAFF_TREND_REVENUE_IMPACT_PERFORMANCE_REQUEST,
    STAFF_TREND_REVENUE_IMPACT_PERFORMANCE_SUCCESS,
    STAFF_TREND_REVENUE_IMPACT_PERFORMANCE_FAILURE,
    STAFF_TREND_ERROR_PERFORMANCE_REQUEST,
    STAFF_TREND_ERROR_PERFORMANCE_SUCCESS,
    STAFF_TREND_ERROR_PERFORMANCE_FAILURE,

} from "./staffReportsConstants";

export const staffOverviewEmployeePerformanceRequest = (data) => {
    return {
        type: STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_REQUEST,
        payload: data
    };
}

export const staffOverviewEmployeePerformanceSuccess = (data) => {
    return {
        type: STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_SUCCESS,
        payload: data
    };
}

export const staffOverviewEmployeePerformanceFailure = (error) => {
    return {
        type: STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_FAILURE,
        payload: error
    };
}

export const staffOverviewActivitiesRequest = (data) => {
    return {
        type: STAFF_OVERVIEW_ACTIVITIES_REQUEST,
        payload: data
    };
}

export const staffOverviewActivitiesSuccess = (data) => {
    return {
        type: STAFF_OVERVIEW_ACTIVITIES_SUCCESS,
        payload: data
    };
}

export const staffOverviewActivitiesFailure = (error) => {
    return {
        type: STAFF_OVERVIEW_ACTIVITIES_FAILURE,
        payload: error
    };
}

export const staffOverviewEmployeePerformanceTableRequest = (data) => {
    return {
        type: STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_TABLE_REQUEST,
        payload: data
    };
}

export const staffOverviewEmployeePerformanceTableSuccess = (data) => {
    return {
        type: STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_TABLE_SUCCESS,
        payload: data
    };
}

export const staffOverviewEmployeePerformanceTableFailure = (error) => {
    return {
        type: STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_TABLE_FAILURE,
        payload: error
    };
}

export const staffTrendSalesPerformanceRequest = (data) => {
    return {
        type: STAFF_TREND_SALES_PERFORMANCE_REQUEST,
        payload: data
    };
}

export const staffTrendSalesPerformanceSuccess = (data) => {
    return {
        type: STAFF_TREND_SALES_PERFORMANCE_SUCCESS,
        payload: data
    };
}

export const staffTrendSalesPerformanceFailure = (error) => {
    return {
        type: STAFF_TREND_SALES_PERFORMANCE_FAILURE,
        payload: error
    };
}

export const staffTrendRevenueImpactPerformanceRequest = (data) => {
    return {
        type: STAFF_TREND_REVENUE_IMPACT_PERFORMANCE_REQUEST,
        payload: data
    };
}

export const staffTrendRevenueImpactPerformanceSuccess = (data) => {
    return {
        type: STAFF_TREND_REVENUE_IMPACT_PERFORMANCE_SUCCESS,
        payload: data
    };
}

export const staffTrendRevenueImpactPerformanceFailure = (error) => {
    return {
        type: STAFF_TREND_REVENUE_IMPACT_PERFORMANCE_FAILURE,
        payload: error
    };
}

export const staffTrendErrorPerformanceRequest = (data) => {
    return {
        type: STAFF_TREND_ERROR_PERFORMANCE_REQUEST,
        payload: data
    };
}

export const staffTrendErrorPerformanceSuccess = (data) => {
    return {
        type: STAFF_TREND_ERROR_PERFORMANCE_SUCCESS,
        payload: data
    };
}

export const staffTrendErrorPerformanceFailure = (error) => {
    return {
        type: STAFF_TREND_ERROR_PERFORMANCE_FAILURE,
        payload: error
    };
}
