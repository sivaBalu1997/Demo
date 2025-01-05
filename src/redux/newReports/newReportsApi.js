import { API } from "redux/api";
import Store from "../store";

//SALES PAGE APIs Start---------------------------------------------------------------------------------------------------------
const SALES_SUMMARY_API_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/summary";

const SALES_BY_ITEM_CATEGORY_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/category";

const SALES_BY_REVENUE_CLASS_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/tags?";

const ACTUAL_SALES_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/payment?";

const HOURLY_SALES_CHART_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/hourly?";

export const getSalesSummary = (getSalesLocationStartEndDate) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${SALES_SUMMARY_API_ENDPOINT}?locationId=${getSalesLocationStartEndDate?.locationid}&startDate=${getSalesLocationStartEndDate?.startDate}&endDate=${getSalesLocationStartEndDate?.endDate}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getSalesByItemCategory = (salesByItemCategoryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${SALES_BY_ITEM_CATEGORY_ENDPOINT}?locationId=${salesByItemCategoryPayload?.locationid}&startDate=${salesByItemCategoryPayload?.startDate}&endDate=${salesByItemCategoryPayload?.endDate}&page=${salesByItemCategoryPayload?.tablePageNo}&size=${salesByItemCategoryPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getSalesByRevenueClass = (salesByRevenueClassPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${SALES_BY_REVENUE_CLASS_ENDPOINT}locationId=${salesByRevenueClassPayload?.locationid}&startDate=${salesByRevenueClassPayload?.startDate}&endDate=${salesByRevenueClassPayload?.endDate}&page=${salesByRevenueClassPayload?.tablePageNo}&size=${salesByRevenueClassPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getActualSales = (actualSalesPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${ACTUAL_SALES_ENDPOINT}locationId=${actualSalesPayload?.locationid}&startDate=${actualSalesPayload?.startDate}&endDate=${actualSalesPayload?.endDate}&page=${actualSalesPayload?.tablePageNo}&size=${actualSalesPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getHourlySalesChart = (hourlySalesPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${HOURLY_SALES_CHART_ENDPOINT}locationId=${hourlySalesPayload?.locationid}&startDate=${hourlySalesPayload?.startDate}&endDate=${hourlySalesPayload?.endDate}&page=${hourlySalesPayload?.tablePageNo}&size=${hourlySalesPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}
//SALES PAGE APIs end---------------------------------------------------------------------------------------------------------

