import { API } from "redux/api";
import Store from "../store";

const baseUrl = "https://rptd.gcp.magilhub.com"
// const baseUrl = "http://34.23.205.137:8080" //PreProd Url

// http://34.23.205.137:8080/magilhub-data-services-reports/

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

export const getLiveCheckInOverview = (params) => {
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
        url: `${reportsBaseUrl}/live/checkin/inqueue-guest-count${query}`,
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
        url: `${reportsBaseUrl}/live/checkin/status-checkin${query}`,
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
        url: `${reportsBaseUrl}/live/checkin/average-wait-time${query}`,
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
        url: `${reportsBaseUrl}/live/checkin/average-wait-time-by-groups${query}`,
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
        url: `${reportsBaseUrl}/live/checkin/liveortoday-checkins${query}&type=livecheckin`,
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
        url: `${reportsBaseUrl}/live/checkin/liveortoday-checkins${query}&type=todaycheckin`,
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
        url: `${reportsBaseUrl}/checkin/overview/totals${query}`,
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
        url: `${reportsBaseUrl}/checkin/overview/hourlyCheckin${query}`,
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
        url: `${reportsBaseUrl}/checkin/overview/hourlyGuests${query}`,
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
        url: `${reportsBaseUrl}/checkin/overview/daily-checkIns-and-guests${query}`,
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
        url: `${reportsBaseUrl}/checkin/overview/dineInDuration${query}`,
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
        url: `${reportsBaseUrl}/checkin/overview/guestSizeDistribution${query}`,
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
        url: `${reportsBaseUrl}/checkin/overview/checkin-details${query}`,
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
        url: `${reportsBaseUrl}/checkin/overview/top-repeat-customers${query}`, // api not recieved
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
        url: `${reportsBaseUrl}/checkin/overview/avgWaitTimeByGroup${query}`,// api not recieved
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};
