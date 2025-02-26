import { API } from "redux/api";
import Store from "../store";


const baseUrl = "https://rptd.gcp.magilhub.com"
const reportsBaseUrl = `${baseUrl}/magilhub-data-services-reports`

const REPORTS_API_ENDPOINT = `${reportsBaseUrl}`;

const SALES_SUMMARY_API_ENDPOINT = `${reportsBaseUrl}/sales/summary`;

const SALES_BY_ITEM_CATEGORY_ENDPOINT = `${reportsBaseUrl}/sales/category`;

const SALES_BY_REVENUE_CLASS_ENDPOINT = `${reportsBaseUrl}/sales/tags?`;

const ACTUAL_SALES_ENDPOINT = `${reportsBaseUrl}/sales/payment?`;

const HOURLY_SALES_CHART_ENDPOINT = `${reportsBaseUrl}/sales/hourly?`;

const DISCOUNT_SUMMARY_ENDPOINT = `${reportsBaseUrl}/sales/discountSummary?`;

const CANCELLATION_SUMMARY_ENDPOINT = `${reportsBaseUrl}/sales/cancelSummary?`;

const LIVE_DISCOUNT_ENDPOINT = `${reportsBaseUrl}/sales/live/discounts?`;

const LIVE_OPEN_SALES_ENDPOINT = `${reportsBaseUrl}/sales/live/open-sales?`;

const LIVE_ORDERS_ENDPOINT = `${reportsBaseUrl}/sales/live/tables?`;

const LIVE_REFUNDS_ENDPOINT = `${reportsBaseUrl}/sales/live/refunds?`;

const LIVE_NET_SALES_ENDPOINT = `${reportsBaseUrl}/sales/live/net-sales?`;

const LIVE_ORDER_NON_DINE_IN_ENDPOINT = `${reportsBaseUrl}/sales/live/tracking?`;

const EMPLOYEE_STAFF_TIP_GRATUITY_ENDPOINT = `${reportsBaseUrl}/sales/employee/staffTipAndGratuity?`;

const EMPLOYEE_STAFF_DISCOUNT_ENDPOINT = `${reportsBaseUrl}/sales/employee/staffDiscount?`;

const EMPLOYEE_STAFF_PERFORMANCE_ENDPOINT = `${reportsBaseUrl}/sales/employee/staffPerformance?`;

const EMPLOYEE_STAFF_ACTIVITY_ENDPOINT = `${reportsBaseUrl}/sales/employee/staffActivity?`;

// const routes={
//     test_api: "https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/cardType?locationId=d15139f6-ea2b-4b4c-8541-7a9112bfd8bf&startDate=2024-12-01&endDate=2024-12-11&page=1&size=15"
// }
//    https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/checkIn/dayCheckIn?locationId=d15139f6-ea2b-4b4c-8541-7a9112bfd8bf&startDate=2025-01-01&endDate=2025-02-28&page=1&size=15


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
    // &search=${liveOrdersPayload?.searchQuery || ""}
    return API({
        method: "get",
        url: `${LIVE_ORDERS_ENDPOINT}locationId=${liveOrdersPayload?.locationid}&page=${liveOrdersPayload?.tablePageNo}&size=${liveOrdersPayload?.tableRecordLimit}&search=${liveOrdersPayload?.searchQuery || ""}`,
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
    // &search=${liveOrderNonDineInPayload?.searchQuery || ""}
    return API({
        method: "get",
        url: `${LIVE_ORDER_NON_DINE_IN_ENDPOINT}locationId=${liveOrderNonDineInPayload?.locationid}&startDate=${liveOrderNonDineInPayload?.startDate}&endDate=${liveOrderNonDineInPayload?.endDate}&page=${liveOrderNonDineInPayload?.tablePageNo}&size=${liveOrderNonDineInPayload?.tableRecordLimit}&search=${liveOrderNonDineInPayload?.searchQuery || ""}`,
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

// New ======================= New //
export const getDayCheckIn = (dayCheckInPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/checkIn/dayCheckIn?locationId=${dayCheckInPayload?.locationid}&startDate=${dayCheckInPayload?.startDate}&endDate=${dayCheckInPayload?.endDate}&page=${dayCheckInPayload?.tablePageNo}&size=${dayCheckInPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getDailyCheckIn = (dailyCheckInPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/checkIn/dailyCheckIn?locationId=${dailyCheckInPayload?.locationid}&startDate=${dailyCheckInPayload?.startDate}&endDate=${dailyCheckInPayload?.endDate}&page=${dailyCheckInPayload?.tablePageNo || null}&size=${dailyCheckInPayload?.tableRecordLimit || null}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getDailyGuest = (dailyGuestPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/checkIn/dailyGuests?locationId=${dailyGuestPayload?.locationid}&startDate=${dailyGuestPayload?.startDate}&endDate=${dailyGuestPayload?.endDate}&page=${dailyGuestPayload?.tablePageNo}&size=${dailyGuestPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getDailyCancellation = (dailyCancellationPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/checkIn/dailyCancellation?locationId=${dailyCancellationPayload?.locationid}&startDate=${dailyCancellationPayload?.startDate}&endDate=${dailyCancellationPayload?.endDate}&page=${dailyCancellationPayload?.tablePageNo}&size=${dailyCancellationPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getHourlyGuests = (hourlyGuestsPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/checkIn/hourlyGuests?locationId=${hourlyGuestsPayload?.locationid}&startDate=${hourlyGuestsPayload?.startDate}&endDate=${hourlyGuestsPayload?.endDate}&page=${hourlyGuestsPayload?.tablePageNo || null}&size=${hourlyGuestsPayload?.tableRecordLimit || null}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getDailyHourlyCheckIn = (dailyHouryCheckInPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/checkIn/dailyHourlyCheckin?locationId=${dailyHouryCheckInPayload?.locationid}&startDate=${dailyHouryCheckInPayload?.startDate}&endDate=${dailyHouryCheckInPayload?.endDate}&page=${dailyHouryCheckInPayload?.tablePageNo}&size=${dailyHouryCheckInPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getDayOverDayGuest = (dayOverDayGuestPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/checkIn/dayOverDayGuest?locationId=${dayOverDayGuestPayload?.locationid}&startDate=${dayOverDayGuestPayload?.startDate}&endDate=${dayOverDayGuestPayload?.endDate}&page=${dayOverDayGuestPayload?.tablePageNo}&size=${dayOverDayGuestPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getPeakSummary = (peakSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/checkIn/peakSummary?locationId=${peakSummaryPayload?.locationid}&startDate=${peakSummaryPayload?.startDate}&endDate=${peakSummaryPayload?.endDate}&page=${peakSummaryPayload?.tablePageNo}&size=${peakSummaryPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getPartySize = (partySizePayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/checkIn/partySize?locationId=${partySizePayload?.locationid}&startDate=${partySizePayload?.startDate}&endDate=${partySizePayload?.endDate}&page=${partySizePayload?.tablePageNo}&size=${partySizePayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getCustomerSize = (customerSizePayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/checkIn/customerSize?locationId=${customerSizePayload?.locationid}&startDate=${customerSizePayload?.startDate}&endDate=${customerSizePayload?.endDate}&page=${customerSizePayload?.tablePageNo}&size=${customerSizePayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getNewCustomerSize = (newCustomerSizePayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/checkIn/newCustomerSize?locationId=${newCustomerSizePayload?.locationid}&startDate=${newCustomerSizePayload?.startDate}&endDate=${newCustomerSizePayload?.endDate}&page=${newCustomerSizePayload?.tablePageNo}&size=${newCustomerSizePayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getCustomerDetails = (customerDetailsPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/checkIn/customerDetails?locationId=${customerDetailsPayload?.locationid}&startDate=${customerDetailsPayload?.startDate}&endDate=${customerDetailsPayload?.endDate}&page=${customerDetailsPayload?.tablePageNo}&size=${customerDetailsPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getLiveCheckInStatus = (liveCheckInStatusPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/checkIn/liveCheckInStatus?locationId=${liveCheckInStatusPayload?.locationid}&startDate=${liveCheckInStatusPayload?.startDate}&endDate=${liveCheckInStatusPayload?.endDate}&page=${liveCheckInStatusPayload?.tablePageNo}&size=${liveCheckInStatusPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getDailyCheckInStatus = (dailyCheckInStatusPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/checkIn/dailyCheckInStatus?locationId=${dailyCheckInStatusPayload?.locationid}&startDate=${dailyCheckInStatusPayload?.startDate}&endDate=${dailyCheckInStatusPayload?.endDate}&page=${dailyCheckInStatusPayload?.tablePageNo}&size=${dailyCheckInStatusPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getBilledAndUnbilled = (billedAndUnbilledPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    // console.log('inside Api')
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/live/billedOrders?locationId=${billedAndUnbilledPayload?.locationid}&type=${billedAndUnbilledPayload?.type}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

// https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/employee/overview?locationId=d15139f6-ea2b-4b4c-8541-7a9112bfd8bf&startDate=2024-12-02&endDate=2024-12-02

export const getEmployeeSalesOverview = (employeeSalesOverviewPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/employee/overview?locationId=${employeeSalesOverviewPayload?.locationid}&startDate=${employeeSalesOverviewPayload?.startDate}&endDate=${employeeSalesOverviewPayload?.endDate}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}


export const getVoidedSummary = (voidedSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    let query = "";
    if (voidedSummaryPayload?.itemIds?.length > 0) {
        query += `&itemIds=${voidedSummaryPayload?.itemIds.join(',')}`;
    } else if (voidedSummaryPayload?.categoryIds?.length > 0) {
        query += `&categoryIds=${voidedSummaryPayload?.categoryIds.join(',')}`;
    }
    return API({
        method: "get",
        url: `${reportsBaseUrl}/sales/category/getVoidedDetailsSummary?locationId=${voidedSummaryPayload?.locationId}&startDate=${voidedSummaryPayload?.startDate}&endDate=${voidedSummaryPayload?.endDate}${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}


export const getDropDownDetails = (dropDownDetailsPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${reportsBaseUrl}/sales/category/getDropDownDetails?locationId=${dropDownDetailsPayload?.locationid}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getCategoryChannelSummary = (categoryChannelSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    let query = ""
    if (categoryChannelSummaryPayload?.itemIds?.length > 0) {

        query += `&itemIds=${(categoryChannelSummaryPayload?.itemIds || [])?.join(",")}`;
    } else if (categoryChannelSummaryPayload?.categoryIds?.length > 0) {
        query += `&categoryIds=${(categoryChannelSummaryPayload?.categoryIds || [])?.join(",")}`;
    }


    let url = `${reportsBaseUrl}/sales/category/getCategoryChannelSummary?locationId=${categoryChannelSummaryPayload?.locationId}&startDate=${categoryChannelSummaryPayload?.startDate}&endDate=${categoryChannelSummaryPayload?.endDate}${query}`;



    return API({
        method: "get",
        url: url,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}


export const getSalesSummaryReport = (salesSummaryReportPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    let query = ""

    if (salesSummaryReportPayload?.itemIds?.length > 0) {
        query += `&itemIds=${salesSummaryReportPayload?.itemIds.join(',')}`;
    } else if (salesSummaryReportPayload?.categoryIds?.length > 0) {
        query += `&categoryIds=${salesSummaryReportPayload?.categoryIds.join(',')}`;
    }
    return API({
        method: "get",
        url: `${reportsBaseUrl}/sales/summary?locationId=${salesSummaryReportPayload?.locationid}&startDate=${salesSummaryReportPayload?.startDate}&endDate=${salesSummaryReportPayload?.endDate}&page=${salesSummaryReportPayload?.tablePageNo || 1}&size=${salesSummaryReportPayload?.tableRecordLimit}${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}


export const getCategorySalesSummary = (categorySalesSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const categoryIds = categorySalesSummaryPayload?.categoryIds?.join(',');
    return API({
        method: "get",
        url: `${reportsBaseUrl}/sales/category/getCategorySalesSummary?locationId=${categorySalesSummaryPayload?.locationid}&startDate=${categorySalesSummaryPayload?.startDate}&endDate=${categorySalesSummaryPayload?.endDate}&categoryIds=${categoryIds}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getSalesByChannel = (salesByChannelPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/channel?locationId=${salesByChannelPayload?.locationid}&startDate=${salesByChannelPayload?.startDate}&endDate=${salesByChannelPayload?.endDate}&page=${salesByChannelPayload?.tablePageNo}&size=${salesByChannelPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}


export const getCategorySales = (categorySalesPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const categoryIds = categorySalesPayload?.categoryIds?.join(',');
    return API({
        method: "get",
        url: `${reportsBaseUrl}/sales/category/getCategorySales?locationId=${categorySalesPayload?.locationid}&startDate=${categorySalesPayload?.startDate}&endDate=${categorySalesPayload?.endDate}&categoryIds=${categoryIds}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}
export const getOfferSummary = (offerSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/offerSummary?locationId=${offerSummaryPayload?.locationid}&startDate=${offerSummaryPayload?.startDate}&endDate=${offerSummaryPayload?.endDate}&page=${offerSummaryPayload?.tablePageNo}&size=${offerSummaryPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getVoidedOrderSummary = (voidedSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/voidedSummary?locationId=${voidedSummaryPayload?.locationid}&startDate=${voidedSummaryPayload?.startDate}&endDate=${voidedSummaryPayload?.endDate}&page=${voidedSummaryPayload?.tablePageNo || 1}&size=${voidedSummaryPayload?.tableRecordLimit || 100}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getStaffSales = (staffSalesPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/staff?locationId=${staffSalesPayload?.locationid}&startDate=${staffSalesPayload?.startDate}&endDate=${staffSalesPayload?.endDate}&page=${staffSalesPayload?.tablePageNo || 1}&size=${staffSalesPayload?.tableRecordLimit || 100}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getSalesTags = (salesTagsPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${SALES_BY_REVENUE_CLASS_ENDPOINT}locationId=${salesTagsPayload?.locationid}&startDate=${salesTagsPayload?.startDate}&endDate=${salesTagsPayload?.endDate}&page=${salesTagsPayload?.tablePageNo || 1}&size=${salesTagsPayload?.tableRecordLimit || 100}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getPaymentDetails = (paymentDetailsPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/payment?locationId=${paymentDetailsPayload?.locationid}&startDate=${paymentDetailsPayload?.startDate}&endDate=${paymentDetailsPayload?.endDate}&page=${paymentDetailsPayload?.tablePageNo || 1}&size=${paymentDetailsPayload?.tableRecordLimit || 100}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getSalesCategory = (salesCategoryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/category?locationId=${salesCategoryPayload?.locationid}&startDate=${salesCategoryPayload?.startDate}&endDate=${salesCategoryPayload?.endDate}&page=${salesCategoryPayload?.tablePageNo || 1}&size=${salesCategoryPayload?.tableRecordLimit || 100}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getSalesCardType = (salesCardTypePayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/cardType?locationId=${salesCardTypePayload?.locationid}&startDate=${salesCardTypePayload?.startDate}&endDate=${salesCardTypePayload?.endDate}&page=${salesCardTypePayload?.tablePageNo || 1}&size=${salesCardTypePayload?.tableRecordLimit || 100}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}
export const getLocationDetails = (LocationDetailsPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/location?locationId=${LocationDetailsPayload?.locationId}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}
export const getHourlySalesReportChart = (hourlySalesPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/hourly?locationId=${hourlySalesPayload?.locationid}&startDate=${hourlySalesPayload?.startDate}&endDate=${hourlySalesPayload?.endDate}&page=${hourlySalesPayload?.tablePageNo || 1}&size=${hourlySalesPayload?.tableRecordLimit || 100}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

// http://localhost:9081/magilhub-data-services-reports/sales/employee/activity?locationId=d15139f6-ea2b-4b4c-8541-7a9112bfd8bf&startDate=2024-12-01&endDate=2024-12-31

// /sales/employee/activity?locationId

export const getEmployeeActivity = (employeeActivityPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/employee/activity?locationId=${employeeActivityPayload?.locationid}&startDate=${employeeActivityPayload?.startDate}&endDate=${employeeActivityPayload?.endDate}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getPremisesSummary = (premisesSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return API({
        method: "get",
        url: `${REPORTS_API_ENDPOINT}/sales/premisesSummary?locationId=${premisesSummaryPayload?.locationId}&startDate=${premisesSummaryPayload?.startDate}&endDate=${premisesSummaryPayload?.endDate}&page=${premisesSummaryPayload?.tablePageNo}&size=${premisesSummaryPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}