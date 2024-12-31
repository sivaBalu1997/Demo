import { API } from "redux/api";
import Store from "../store";

export const getSalesSummary = (salesSummaryPayload) => {
    return API({
        method: "get",
        url: `/sales/summary?locationId=${salesSummaryPayload?.locationId}&startDate=${salesSummaryPayload?.startDate}&endDate=${salesSummaryPayload?.endDate}`,
    });
};