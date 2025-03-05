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
export const getSalesSummary = (getSalesLocationStartEndDate) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query=generateQueryParams(getSalesLocationStartEndDate)
    return API({
        method: "get",
        url: `${reportsBaseUrl}/sales/summary${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};
