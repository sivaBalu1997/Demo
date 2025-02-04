import { API } from "redux/api";
import Store from "../store";

const SALES_SUMMARY_API_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/summary";

const SALES_BY_ITEM_CATEGORY_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/category";

const SALES_BY_REVENUE_CLASS_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/tags?";

const ACTUAL_SALES_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/payment?";

const HOURLY_SALES_CHART_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/hourly?";

const DISCOUNT_SUMMARY_ENDPOINT = 'https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/discountSummary?';

const CANCELLATION_SUMMARY_ENDPOINT = 'https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/cancelSummary?';

const LIVE_DISCOUNT_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/live/discounts?"

const LIVE_OPEN_SALES_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/live/open-sales?"

const LIVE_ORDERS_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/live/tables?"

const LIVE_REFUNDS_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/live/refunds?"

const LIVE_NET_SALES_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/live/net-sales?"

const LIVE_ORDER_NON_DINE_IN_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/live/tracking?"

const EMPLOYEE_STAFF_TIP_GRATUITY_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/employee/staffTipAndGratuity?"

const EMPLOYEE_STAFF_DISCOUNT_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/employee/staffDiscount?"

const EMPLOYEE_STAFF_PERFORMANCE_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/employee/staffPerformance?"

const EMPLOYEE_STAFF_ACTIVITY_ENDPOINT = "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/employee/staffActivity?"


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
        url: `${LIVE_ORDER_NON_DINE_IN_ENDPOINT}locationId=${liveOrderNonDineInPayload?.locationid}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getDiscountSummary = (discountSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${DISCOUNT_SUMMARY_ENDPOINT}locationId=${discountSummaryPayload?.locationid}&startDate=${discountSummaryPayload?.startDate}&endDate=${discountSummaryPayload?.endDate}&page=${discountSummaryPayload?.tablePageNo}&size=${discountSummaryPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getCancellationSummary = (cancellationSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${CANCELLATION_SUMMARY_ENDPOINT}locationId=${cancellationSummaryPayload?.locationid}&startDate=${cancellationSummaryPayload?.startDate}&endDate=${cancellationSummaryPayload?.endDate}&page=${cancellationSummaryPayload?.tablePageNo}&size=${cancellationSummaryPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getEmployeeStaffTipGratuity = (employeeStaffTipGratuityPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${EMPLOYEE_STAFF_TIP_GRATUITY_ENDPOINT}locationId=${employeeStaffTipGratuityPayload?.locationid}&startDate=${employeeStaffTipGratuityPayload?.startDate}&endDate=${employeeStaffTipGratuityPayload?.endDate}&page=${employeeStaffTipGratuityPayload?.tablePageNo}&size=${employeeStaffTipGratuityPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getEmployeeStaffDiscount = (employeeStaffDiscountPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${EMPLOYEE_STAFF_DISCOUNT_ENDPOINT}locationId=${employeeStaffDiscountPayload?.locationid}&startDate=${employeeStaffDiscountPayload?.startDate}&endDate=${employeeStaffDiscountPayload?.endDate}&page=${employeeStaffDiscountPayload?.tablePageNo}&size=${employeeStaffDiscountPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getEmployeeStaffPerformance = (employeeStaffPerformancePayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${EMPLOYEE_STAFF_PERFORMANCE_ENDPOINT}locationId=${employeeStaffPerformancePayload?.locationid}&startDate=${employeeStaffPerformancePayload?.startDate}&endDate=${employeeStaffPerformancePayload?.endDate}&page=${employeeStaffPerformancePayload?.tablePageNo}&size=${employeeStaffPerformancePayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getEmployeeStaffActivity = (employeeStaffActivityPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${EMPLOYEE_STAFF_ACTIVITY_ENDPOINT}locationId=${employeeStaffActivityPayload?.locationid}&startDate=${employeeStaffActivityPayload?.startDate}&endDate=${employeeStaffActivityPayload?.endDate}&page=${employeeStaffActivityPayload?.tablePageNo}&size=${employeeStaffActivityPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}







