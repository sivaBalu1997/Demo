import { REPORTS_API } from "redux/api";
import Store from "../store";

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

    if (Array.isArray(payload?.staffIds) && payload.staffIds.length > 0) {
        query += `&staffIds=${payload.staffIds.join(",")}`;
    } else if (typeof payload?.staffIds === "string" || payload?.staffIds === "") {
        query += `&staffIds=${payload?.staffIds}`;
    }

    if(payload?.errorType){
        query+=`&errorType=${payload?.errorType}`
    }

    return "?"+query?.slice(1)
}

// Overview APIs under Staff Reports :
export const getStaffOverviewEmployeePerformance = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return REPORTS_API({
        method: "get",
        url: `/staff/overview/employee-performance${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getStaffOverviewActivities = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return REPORTS_API({
        method: "get",
        url: `/staff/overview/activities${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

// Performance Trend APIs under Staff reports :
export const getStaffOverviewEmployeePerformanceTable = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return REPORTS_API({
        method: "get",
        url: `/staff/overview/employee-performance-table${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getStaffTrendSalesPerformance = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return REPORTS_API({
        method: "get",
        url: `/staff/overview/sales-performance${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getStaffTrendRevenueImpactPerformance = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return REPORTS_API({
        method: "get",
        url: `/staff/trend/revenue-impact-performance${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getStaffTrendErrorPerformance = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return REPORTS_API({
        method: "get",
        url: `/staff/overview/error-performance${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};




