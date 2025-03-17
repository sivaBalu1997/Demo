import { API } from "redux/api";
import Store from "../store";

const baseUrl = "https://rptd.gcp.magilhub.com"
const reportsBaseUrl = `${baseUrl}/magilhub-data-services-reports`

const PRODUCT_INSIGHTS_TOP_REVENUE_ENDPOINT = `${reportsBaseUrl}/products/insights/top-revenue`;
const PRODUCT_INSIGHTS_TOP_POPULAR_ENDPOINT = `${reportsBaseUrl}/products/insights/popular`;
const PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_ENDPOINT = `${reportsBaseUrl}/products/insights/top-popular-revenue`;
const PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_ENDPOINT = `${reportsBaseUrl}/products/insights/revenue-streams`;
const PRODUCT_INSIGHTS_CANCELLED_ITEMS_ENDPOINT = `${reportsBaseUrl}/products/insights/cancelled-items`;
const PRODUCT_INSIGHTS_CANCELLED_REASONS_ENDPOINT = `${reportsBaseUrl}/products/insights/cancelled-reasons`;
const PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_ENDPOINT = `${reportsBaseUrl}/products/insights/items-cancelled-reasons`;
const PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_ENDPOINT = `${reportsBaseUrl}/products/insights/availability-by-channels`;
const PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_ENDPOINT = `${reportsBaseUrl}/products/insights/availability-by-channels-details`;

const generateQueryParams = (payload) => {
    let query = "";
    if(payload?.locationId){
        query+="&locationId="+payload?.locationId
    }else if(payload?.locationid){
        query+="&locationId="+payload?.locationid
    }

    if(payload?.startDate){
        query+="&startDate="+payload?.startDate
    }
    if(payload?.endDate){
        query+="&endDate="+payload?.endDate
    }

    if(payload?.tablePageNo){
        query+="&page="+payload?.tablePageNo
    }else if(payload?.page){
        query+="&page="+payload?.page
    }
    if(payload?.tableRecordLimit){
        query+="&size="+payload?.tableRecordLimit
    }else if(payload?.size){
        query+="&size="+payload?.size
    }
    if(payload?.searchQuery){
        query+="&search="+payload?.searchQuery
    }else if(payload?.search){
        query+="&search="+payload?.search
    }

    if (payload?.itemIds?.length > 0) {
        query += `&itemIds=${(payload?.itemIds || [])?.join(",")}`;
    } else if (payload?.categoryIds?.length > 0) {
        query += `&categoryIds=${(payload?.categoryIds || [])?.join(",")}`;
    }else if(payload?.groupByCategory){
        query+=`&groupByCategory=${payload?.groupByCategory}`
    }
    if(payload?.reason){
        query+=`&reason=${payload?.reason}`
    }
    if(payload?.offer){
        query+=`&offer=${payload?.offer}`
    }
    return "?"+query?.slice(1)
}

export const getProductInsightsTopRevenue = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${PRODUCT_INSIGHTS_TOP_REVENUE_ENDPOINT}${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getProductInsightsTopPopular = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${PRODUCT_INSIGHTS_TOP_POPULAR_ENDPOINT}${query}?sortOrder=${params?.sortOrder}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getProductInsightsTopPopularRevenue = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_ENDPOINT}${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getProductInsightsTopRevenueStreams = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_ENDPOINT}${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getProductInsightsCancelledItems = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${PRODUCT_INSIGHTS_CANCELLED_ITEMS_ENDPOINT}${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getProductInsightsCancelledReasons = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${PRODUCT_INSIGHTS_CANCELLED_REASONS_ENDPOINT}${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getProductInsightsItemsCancelledReasons = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_ENDPOINT}${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getProductInsightsAvailabilityByChannels = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_ENDPOINT}${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getProductInsightsAvailabilityByChannelsDetails = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_ENDPOINT}${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};
