import {
    PRODUCT_INSIGHTS_TOP_REVENUE_REQUEST,
    PRODUCT_INSIGHTS_TOP_REVENUE_SUCCESS,
    PRODUCT_INSIGHTS_TOP_REVENUE_FAILURE,

    PRODUCT_INSIGHTS_TOP_POPULAR_REQUEST,
    PRODUCT_INSIGHTS_TOP_POPULAR_SUCCESS,
    PRODUCT_INSIGHTS_TOP_POPULAR_FAILURE,

    PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_REQUEST,
    PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_SUCCESS,
    PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_FAILURE,

    PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_REQUEST,
    PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_SUCCESS,
    PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_FAILURE,

    PRODUCT_INSIGHTS_CANCELLED_ITEMS_REQUEST,
    PRODUCT_INSIGHTS_CANCELLED_ITEMS_SUCCESS,
    PRODUCT_INSIGHTS_CANCELLED_ITEMS_FAILURE,

    PRODUCT_INSIGHTS_CANCELLED_REASONS_REQUEST,
    PRODUCT_INSIGHTS_CANCELLED_REASONS_SUCCESS,
    PRODUCT_INSIGHTS_CANCELLED_REASONS_FAILURE,

    PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_REQUEST,
    PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_SUCCESS,
    PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_FAILURE,

    PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_REQUEST,
    PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_SUCCESS,
    PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_FAILURE,

    PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_REQUEST,
    PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_SUCCESS,
    PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_FAILURE,
} from "./productReportsConstants";

export const productInsightsTopRevenueRequest = (data) => {
    return {
        type: PRODUCT_INSIGHTS_TOP_REVENUE_REQUEST,
        payload: data
    };
}

export const productInsightsTopRevenueSuccess = (data) => {
    return {
        type: PRODUCT_INSIGHTS_TOP_REVENUE_SUCCESS,
        payload: data
    };
}

export const productInsightsTopRevenueFailure = (error) => {
    return {
        type: PRODUCT_INSIGHTS_TOP_REVENUE_FAILURE,
        payload: error
    };
}

export const productInsightsTopPopularRequest = (data) => {
    return {
        type: PRODUCT_INSIGHTS_TOP_POPULAR_REQUEST,
        payload: data
    };
}

export const productInsightsTopPopularSuccess = (data) => {
    return {
        type: PRODUCT_INSIGHTS_TOP_POPULAR_SUCCESS,
        payload: data
    };
}

export const productInsightsTopPopularFailure = (error) => {
    return {
        type: PRODUCT_INSIGHTS_TOP_POPULAR_FAILURE,
        payload: error
    };
}

export const productInsightsTopPopularRevenueRequest = (data) => {
    return {
        type: PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_REQUEST,
        payload: data
    };
}

export const productInsightsTopPopularRevenueSuccess = (data) => {
    return {
        type: PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_SUCCESS,
        payload: data
    };
}

export const productInsightsTopPopularRevenueFailure = (error) => {
    return {
        type: PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_FAILURE,
        payload: error
    };
}

export const productInsightsTopRevenueStreamsRequest = (data) => {
    return {
        type: PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_REQUEST,
        payload: data
    };
}

export const productInsightsTopRevenueStreamsSuccess = (data) => {
    return {
        type: PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_SUCCESS,
        payload: data
    };
}

export const productInsightsTopRevenueStreamsFailure = (error) => {
    return {
        type: PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_FAILURE,
        payload: error
    };
}

export const productInsightsCancelledItemsRequest = (data) => {
    return {
        type: PRODUCT_INSIGHTS_CANCELLED_ITEMS_REQUEST,
        payload: data
    };
}

export const productInsightsCancelledItemsSuccess = (data) => {
    return {
        type: PRODUCT_INSIGHTS_CANCELLED_ITEMS_SUCCESS,
        payload: data
    };
}

export const productInsightsCancelledItemsFailure = (error) => {
    return {
        type: PRODUCT_INSIGHTS_CANCELLED_ITEMS_FAILURE,
        payload: error
    };
}

export const productInsightsCancelledReasonsRequest = (data) => {
    return {
        type: PRODUCT_INSIGHTS_CANCELLED_REASONS_REQUEST,
        payload: data
    };
}

export const productInsightsCancelledReasonsSuccess = (data) => {
    return {
        type: PRODUCT_INSIGHTS_CANCELLED_REASONS_SUCCESS,
        payload: data
    };
}

export const productInsightsCancelledReasonsFailure = (error) => {
    return {
        type: PRODUCT_INSIGHTS_CANCELLED_REASONS_FAILURE,
        payload: error
    };
}

export const productInsightsItemsCancelledReasonsRequest = (data) => {
    return {
        type: PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_REQUEST,
        payload: data
    };
}

export const productInsightsItemsCancelledReasonsSuccess = (data) => {
    return {
        type: PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_SUCCESS,
        payload: data
    };
}

export const productInsightsItemsCancelledReasonsFailure = (error) => {
    return {
        type: PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_FAILURE,
        payload: error
    };
}

export const productInsightsAvailabilityByChannelsRequest = (data) => {
    return {
        type: PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_REQUEST,
        payload: data
    };
}

export const productInsightsAvailabilityByChannelsSuccess = (data) => {
    return {
        type: PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_SUCCESS,
        payload: data
    };
}

export const productInsightsAvailabilityByChannelsFailure = (error) => {
    return {
        type: PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_FAILURE,
        payload: error
    };
}

export const productInsightsAvailabilityByChannelsDetailsRequest = (data) => {
    return {
        type: PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_REQUEST,
        payload: data
    };
}

export const productInsightsAvailabilityByChannelsDetailsSuccess = (data) => {
    return {
        type: PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_SUCCESS,
        payload: data
    };
}

export const productInsightsAvailabilityByChannelsDetailsFailure = (error) => {
    return {
        type: PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_FAILURE,
        payload: error
    };
}
