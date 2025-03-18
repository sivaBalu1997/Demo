import { API } from "redux/api";
import Store from "../store";

const baseUrl = "https://rptd.gcp.magilhub.com"
const reportsBaseUrl = `${baseUrl}/magilhub-data-services-reports`


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
        url: `${reportsBaseUrl}/product/insights/top-revenue-categories${query}`,
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
        url: `${reportsBaseUrl}/product/insights/popular${query}&sortOrder=${true}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getProductInsightsTopLeastPopular = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/product/insights/popular${query}&sortOrder=${false}`,
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
        url: `${reportsBaseUrl}/product/insights/popular-revenue${query}&sortOrder=${true}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getProductInsightsTopLeastPopularRevenue = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/product/insights/popular-revenue${query}&sortOrder=${false}`,
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
        url: `${reportsBaseUrl}/product/insights/top-revenue-categories${query}`,
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
        url: `${reportsBaseUrl}/product/insights/cancelled-items${query}&sortOrder=true`,
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
        url: `${reportsBaseUrl}/product/insights/cancelled-reason${query}`,
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
        url: `${reportsBaseUrl}/product/insights/items-cancelled-reason${query}`,
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
        url: `${reportsBaseUrl}${query}`,
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
        url: `${reportsBaseUrl}${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};
