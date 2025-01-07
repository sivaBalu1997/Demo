import { API } from "redux/api";
import Store from "../store";

const SALES_SUMMARY_API_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/summary";

const SALES_BY_ITEM_CATEGORY_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/category";

const SALES_BY_REVENUE_CLASS_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/tags?";

const ACTUAL_SALES_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/payment?";

const HOURLY_SALES_CHART_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/hourly?";

const LIVE_DISCOUNT_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/discounts?"

const LIVE_OPEN_SALES_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/open-sales?"

const LIVE_ORDERS_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/tables?"

const LIVE_REFUNDS_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/refunds?"

const LIVE_NET_SALES_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/net-sales?"

const LIVE_ORDER_NON_DINE_IN_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/tracking?"

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

export const getLiveDiscount = (liveDiscountPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${LIVE_DISCOUNT_ENDPOINT}locationId=${liveDiscountPayload?.locationid}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getLiveOpenSales = (liveOpenSalesPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${LIVE_OPEN_SALES_ENDPOINT}locationId=${liveOpenSalesPayload?.locationid}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}


export const getLiveOrders = (liveOrdersPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${LIVE_ORDERS_ENDPOINT}locationId=${liveOrdersPayload?.locationid}&page=${liveOrdersPayload?.tablePageNo}&size=${liveOrdersPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getLiveRefunds = (liveRefundsPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${LIVE_REFUNDS_ENDPOINT}locationId=${liveRefundsPayload?.locationid}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getLiveNetSales = (liveNetSalesPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${LIVE_NET_SALES_ENDPOINT}locationId=${liveNetSalesPayload?.locationid}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getLiveOrderNonDineIn = (liveOrderNonDineInPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${LIVE_ORDER_NON_DINE_IN_ENDPOINT}locationId=${liveOrderNonDineInPayload?.locationid}&startDate=${liveOrderNonDineInPayload?.startDate}&endDate=${liveOrderNonDineInPayload?.endDate}&page=${liveOrderNonDineInPayload?.tablePageNo}&size=${liveOrderNonDineInPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}







