import {
    SALES_TRENDS_REQUEST,
    SALES_TRENDS_SUCCESS,
    SALES_TRENDS_FAILURE,

    CATEGORIES_LEVEL_SALES_TREND_REQUEST,
    CATEGORIES_LEVEL_SALES_TREND_SUCCESS,
    CATEGORIES_LEVEL_SALES_TREND_FAILURE,


    ITEMS_LEVEL_SALES_TREND_REQUEST,
    ITEMS_LEVEL_SALES_TREND_SUCCESS,
    ITEMS_LEVEL_SALES_TREND_FAILURE,

} from "./salesTrendsConstants";

export const salesTrendsRequest = (data) => {
    return {
        type: SALES_TRENDS_REQUEST,
        payload: data
    };
}

export const salesTrendsSuccess = (data) => {
    return {
        type: SALES_TRENDS_SUCCESS,
        payload: data
    };
}

export const salesTrendsFailure = (error) => {
    return {
        type: SALES_TRENDS_FAILURE,
        payload: error
    };
}




export const categoriesLevelSalesTrendRequest = (data) => {
    return {
        type: CATEGORIES_LEVEL_SALES_TREND_REQUEST,
        payload: data
    };
}

export const categoriesLevelSalesTrendSuccess = (data) => {
    return {
        type: CATEGORIES_LEVEL_SALES_TREND_SUCCESS,
        payload: data
    };
}

export const categoriesLevelSalesTrendFailure = (error) => {
    return {
        type: CATEGORIES_LEVEL_SALES_TREND_FAILURE,
        payload: error
    };
}






export const itemsLevelSalesTrendRequest = (data) => {
    return {
        type: ITEMS_LEVEL_SALES_TREND_REQUEST,
        payload: data
    };
}

export const itemsLevelSalesTrendSuccess = (data) => {
    return {
        type: ITEMS_LEVEL_SALES_TREND_SUCCESS,
        payload: data
    };
}

export const itemsLevelSalesTrendFailure = (error) => {
    return {
        type: ITEMS_LEVEL_SALES_TREND_FAILURE,
        payload: error
    };
}


