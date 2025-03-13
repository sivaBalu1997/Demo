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

export const getSummaryInsightsCustomerVolume = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/checkin-overview${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getSummaryInsightsCustomerByTenure = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/checkin-overview${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};



export const getSummaryInsightsCustomersByTotalSpend= (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/checkin-overview${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getSummaryInsightsCustomersByAvgCoverSize= (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/checkin-overview${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getSummaryInsightsCustomersByLoyalty= (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/checkin-overview${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};


export const getDetailedInsightsSummary= (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/checkin-overview${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getDetailedInsightsDineIn= (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/checkin-overview${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getDetailedInsightsOffPrem= (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/checkin-overview${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};


export const getDetailedInsightsCustomersOrder= (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/checkin-overview${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};



export const getDetailedInsightsLatestOrder= (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/checkin-overview${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};


export const getDetailedInsightsCustomersTopFavItems= (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/checkin-overview${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};