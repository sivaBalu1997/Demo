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
    }
    if(payload?.tableRecordLimit){
        query+="&size="+payload?.tableRecordLimit
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

export const getLiveCheckInOverview = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/overview${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getLiveSeaterAvailability = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/seater-wise-availability${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getLiveGuestCount = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/guest-count${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getLiveCheckInStatus = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/status${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getLiveAvgWaitTime = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/avg-wait-time${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getLiveGroupAvgWaitTime = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/group-avg-wait-time${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getLiveCheckInTable = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/table${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getLiveCheckInToday = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/live/checkin/today${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getCheckInOverview = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/checkin/overview${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getCheckInOverviewHourly = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/checkin/overview/hourly${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getCheckInOverviewGuestsHourly = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/checkin/overview/guests-hourly${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getCheckInOverviewDailyAndGuest = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/checkin/overview/daily-and-guest${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getCheckInOverviewDineInGroup = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/checkin/overview/dine-in-group${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getCheckInOverviewGuestSize = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/checkin/overview/guest-size${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getCheckInOverviewTableDetails = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/checkin/overview/table-details${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getCheckInOverviewTopCustomer = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/checkin/overview/top-customer${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getCheckInOverviewAvgWaitTimeGroup = (params) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(params);
    return API({
        method: "get",
        url: `${reportsBaseUrl}/checkin/overview/avg-wait-time-group${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};
