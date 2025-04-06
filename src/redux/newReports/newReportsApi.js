import { REPORTS_API } from "redux/api";
import Store from "../store";

const LIVE_DISCOUNT_ENDPOINT = `/sales/live/discounts?`;

const LIVE_OPEN_SALES_ENDPOINT = `/sales/live/open-sales?`;

const LIVE_ORDERS_ENDPOINT = `/sales/live/tables?`;

const LIVE_REFUNDS_ENDPOINT = `/sales/live/refunds?`;

const LIVE_NET_SALES_ENDPOINT = `/sales/live/net-sales?`;

const LIVE_ORDER_NON_DINE_IN_ENDPOINT = `/sales/live/tracking?`;

const EMPLOYEE_STAFF_TIP_GRATUITY_ENDPOINT = `/sales/employee/staffTipAndGratuity?`;

const EMPLOYEE_STAFF_DISCOUNT_ENDPOINT = `/sales/employee/staffDiscount?`;

const EMPLOYEE_STAFF_PERFORMANCE_ENDPOINT = `/sales/employee/staffPerformance?`;

const EMPLOYEE_STAFF_ACTIVITY_ENDPOINT = `/sales/employee/staffActivity?`;



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
    }else if(payload?.search|| payload?.search===""){
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
    if(payload?.chartSliceName){
         query+=`&chartSliceName=${payload?.chartSliceName}`
    }
    return "?"+query?.slice(1)
}
export const getSalesSummary = (getSalesLocationStartEndDate) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query=generateQueryParams(getSalesLocationStartEndDate)
    return REPORTS_API({
        method: "get",
        url: `/sales/summary${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
};

export const getSalesByItemCategory = (salesByItemCategoryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query=generateQueryParams(salesByItemCategoryPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/category${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getSalesByRevenueClass = (salesByRevenueClassPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query=generateQueryParams(salesByRevenueClassPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/tags${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getActualSales = (actualSalesPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query=generateQueryParams(actualSalesPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/payment${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getHourlySalesChart = (hourlySalesPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query=generateQueryParams(hourlySalesPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/hourly${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}


export const getLiveDiscount = (liveDiscountPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    
    return REPORTS_API({
        method: "get",
        url: `${LIVE_DISCOUNT_ENDPOINT}locationId=${liveDiscountPayload?.locationid}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getLiveOpenSales = (liveOpenSalesPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `${LIVE_OPEN_SALES_ENDPOINT}locationId=${liveOpenSalesPayload?.locationid}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}


export const getLiveOrders = (liveOrdersPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
  
    const {
      locationid,
      tablePageNo,
      tableRecordLimit,
      searchQuery,
      type, // this may or may not exist
    } = liveOrdersPayload;
  
    const baseURL = `${LIVE_ORDERS_ENDPOINT}locationId=${locationid}&page=${tablePageNo}&size=${tableRecordLimit}&search=${searchQuery || ""}`;
    const typeParam = type ? `&type=${type}` : "";
  
    return REPORTS_API({
      method: "get",
      url: `${baseURL}${typeParam}`,
      headers: {
        Authorization: 'bearer ' + token,
      }
    });
  };

export const getLiveRefunds = (liveRefundsPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `${LIVE_REFUNDS_ENDPOINT}locationId=${liveRefundsPayload?.locationid}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getLiveNetSales = (liveNetSalesPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
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
    const {
        locationid,
        tablePageNo,
        tableRecordLimit,
        searchQuery,
        type, // this may or may not exist
      } = liveOrderNonDineInPayload;
      const baseURL = `${LIVE_ORDER_NON_DINE_IN_ENDPOINT}locationId=${locationid}&page=${tablePageNo}&size=${tableRecordLimit}&search=${searchQuery || ""}`;
      const typeParam = type ? `&type=${type}` : "";
    return REPORTS_API({
        method: "get",
        url: `${baseURL}${typeParam}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getDiscountSummary = (discountSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(discountSummaryPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/discountSummary${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getCancellationSummary = (cancellationSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(cancellationSummaryPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/cancelSummary${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getEmployeeStaffTipGratuity = (employeeStaffTipGratuityPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `${EMPLOYEE_STAFF_TIP_GRATUITY_ENDPOINT}locationId=${employeeStaffTipGratuityPayload?.locationid}&startDate=${employeeStaffTipGratuityPayload?.startDate}&endDate=${employeeStaffTipGratuityPayload?.endDate}&page=${employeeStaffTipGratuityPayload?.tablePageNo}&size=${employeeStaffTipGratuityPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getEmployeeStaffDiscount = (employeeStaffDiscountPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `${EMPLOYEE_STAFF_DISCOUNT_ENDPOINT}locationId=${employeeStaffDiscountPayload?.locationid}&startDate=${employeeStaffDiscountPayload?.startDate}&endDate=${employeeStaffDiscountPayload?.endDate}&page=${employeeStaffDiscountPayload?.tablePageNo}&size=${employeeStaffDiscountPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getEmployeeStaffPerformance = (employeeStaffPerformancePayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `${EMPLOYEE_STAFF_PERFORMANCE_ENDPOINT}locationId=${employeeStaffPerformancePayload?.locationid}&startDate=${employeeStaffPerformancePayload?.startDate}&endDate=${employeeStaffPerformancePayload?.endDate}&page=${employeeStaffPerformancePayload?.tablePageNo}&size=${employeeStaffPerformancePayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getEmployeeStaffActivity = (employeeStaffActivityPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `${EMPLOYEE_STAFF_ACTIVITY_ENDPOINT}locationId=${employeeStaffActivityPayload?.locationid}&startDate=${employeeStaffActivityPayload?.startDate}&endDate=${employeeStaffActivityPayload?.endDate}&page=${employeeStaffActivityPayload?.tablePageNo}&size=${employeeStaffActivityPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}


export const getDayCheckIn = (dayCheckInPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    
    return REPORTS_API({
        method: "get",
        url: `/sales/checkIn/dayCheckIn?locationId=${dayCheckInPayload?.locationid}&startDate=${dayCheckInPayload?.startDate}&endDate=${dayCheckInPayload?.endDate}&page=${dayCheckInPayload?.tablePageNo}&size=${dayCheckInPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getDailyCheckIn = (dailyCheckInPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `/sales/checkIn/dailyCheckIn?locationId=${dailyCheckInPayload?.locationid}&startDate=${dailyCheckInPayload?.startDate}&endDate=${dailyCheckInPayload?.endDate}&page=${dailyCheckInPayload?.tablePageNo || null}&size=${dailyCheckInPayload?.tableRecordLimit || null}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getDailyGuest = (dailyGuestPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `/sales/checkIn/dailyGuests?locationId=${dailyGuestPayload?.locationid}&startDate=${dailyGuestPayload?.startDate}&endDate=${dailyGuestPayload?.endDate}&page=${dailyGuestPayload?.tablePageNo}&size=${dailyGuestPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getDailyCancellation = (dailyCancellationPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `/sales/checkIn/dailyCancellation?locationId=${dailyCancellationPayload?.locationid}&startDate=${dailyCancellationPayload?.startDate}&endDate=${dailyCancellationPayload?.endDate}&page=${dailyCancellationPayload?.tablePageNo}&size=${dailyCancellationPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getHourlyGuests = (hourlyGuestsPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `/sales/checkIn/hourlyGuests?locationId=${hourlyGuestsPayload?.locationid}&startDate=${hourlyGuestsPayload?.startDate}&endDate=${hourlyGuestsPayload?.endDate}&page=${hourlyGuestsPayload?.tablePageNo || null}&size=${hourlyGuestsPayload?.tableRecordLimit || null}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getDailyHourlyCheckIn = (dailyHouryCheckInPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `/sales/checkIn/dailyHourlyCheckin?locationId=${dailyHouryCheckInPayload?.locationid}&startDate=${dailyHouryCheckInPayload?.startDate}&endDate=${dailyHouryCheckInPayload?.endDate}&page=${dailyHouryCheckInPayload?.tablePageNo}&size=${dailyHouryCheckInPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getDayOverDayGuest = (dayOverDayGuestPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `/sales/checkIn/dayOverDayGuest?locationId=${dayOverDayGuestPayload?.locationid}&startDate=${dayOverDayGuestPayload?.startDate}&endDate=${dayOverDayGuestPayload?.endDate}&page=${dayOverDayGuestPayload?.tablePageNo}&size=${dayOverDayGuestPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getPeakSummary = (peakSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `/sales/checkIn/peakSummary?locationId=${peakSummaryPayload?.locationid}&startDate=${peakSummaryPayload?.startDate}&endDate=${peakSummaryPayload?.endDate}&page=${peakSummaryPayload?.tablePageNo}&size=${peakSummaryPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getPartySize = (partySizePayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `/sales/checkIn/partySize?locationId=${partySizePayload?.locationid}&startDate=${partySizePayload?.startDate}&endDate=${partySizePayload?.endDate}&page=${partySizePayload?.tablePageNo}&size=${partySizePayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getCustomerSize = (customerSizePayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `/sales/checkIn/customerSize?locationId=${customerSizePayload?.locationid}&startDate=${customerSizePayload?.startDate}&endDate=${customerSizePayload?.endDate}&page=${customerSizePayload?.tablePageNo}&size=${customerSizePayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getNewCustomerSize = (newCustomerSizePayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `/sales/checkIn/newCustomerSize?locationId=${newCustomerSizePayload?.locationid}&startDate=${newCustomerSizePayload?.startDate}&endDate=${newCustomerSizePayload?.endDate}&page=${newCustomerSizePayload?.tablePageNo}&size=${newCustomerSizePayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getCustomerDetails = (customerDetailsPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `/sales/checkIn/customerDetails?locationId=${customerDetailsPayload?.locationid}&startDate=${customerDetailsPayload?.startDate}&endDate=${customerDetailsPayload?.endDate}&page=${customerDetailsPayload?.tablePageNo}&size=${customerDetailsPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getLiveCheckInStatus = (liveCheckInStatusPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `/sales/checkIn/liveCheckInStatus?locationId=${liveCheckInStatusPayload?.locationid}&startDate=${liveCheckInStatusPayload?.startDate}&endDate=${liveCheckInStatusPayload?.endDate}&page=${liveCheckInStatusPayload?.tablePageNo}&size=${liveCheckInStatusPayload?.tableRecordLimit}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getDailyCheckInStatus = (dailyCheckInStatusPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query=generateQueryParams(dailyCheckInStatusPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/checkIn/dailyCheckInStatus${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getBilledAndUnbilled = (billedAndUnbilledPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    // console.log('inside REPORTS_API')
    return REPORTS_API({
        method: "get",
        url: `/sales/live/billedOrders?locationId=${billedAndUnbilledPayload?.locationid}&type=${billedAndUnbilledPayload?.type}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getBilled = (billedPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    // console.log('inside REPORTS_API')
    return REPORTS_API({
        method: "get",
        url: `/sales/live/billedOrders?locationId=${billedPayload?.locationid}&type=${billedPayload?.type}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getUnbilled = (unBilledPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    // console.log('inside REPORTS_API')
    return REPORTS_API({
        method: "get",
        url: `/sales/live/billedOrders?locationId=${unBilledPayload?.locationid}&type=${unBilledPayload?.type}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}



export const getEmployeeSalesOverview = (employeeSalesOverviewPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const { locationid, startDate, endDate, staffId } = employeeSalesOverviewPayload || {};

    let url = `/sales/employee/overview?locationId=${locationid}&startDate=${startDate}&endDate=${endDate}`;

    if (staffId && staffId !== "all") {
        url += `&staffId=${staffId}`;
    }

    return REPORTS_API({
        method: "get",
        url,
        headers: {
            Authorization: `bearer ${token}`,
        }
    });
};


export const getVoidedSummary = (voidedSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
const query=  generateQueryParams(voidedSummaryPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/category/getVoidedDetailsSummary${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}


export const getDropDownDetails = (dropDownDetailsPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `/sales/category/getDropDownDetails?locationId=${dropDownDetailsPayload?.locationid}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getCategoryChannelSummary = (categoryChannelSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
const query=  generateQueryParams(categoryChannelSummaryPayload)

    let url = `/sales/category/getCategoryChannelSummary${query}`;



    return REPORTS_API({
        method: "get",
        url: url,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}


export const getSalesSummaryReport = (salesSummaryReportPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
const query=  generateQueryParams(salesSummaryReportPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/summary${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}


export const getCategorySalesSummary = (categorySalesSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
const query=  generateQueryParams(categorySalesSummaryPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/category/getCategorySalesSummary${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getSalesByChannel = (salesByChannelPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query=  generateQueryParams(salesByChannelPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/channel${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}


export const getCategorySales = (categorySalesPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(categorySalesPayload)

    return REPORTS_API({
        method: "get",
        url: `/sales/category/getCategorySales${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}
export const getOfferSummary = (offerSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(offerSummaryPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/offerSummary${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getVoidedOrderSummary = (voidedSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(voidedSummaryPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/voidedSummary${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getStaffSales = (staffSalesPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(staffSalesPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/staff${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }

    });
}

export const getPaymentDetails = (paymentDetailsPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(paymentDetailsPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/payment${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getSalesCategory = (salesCategoryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(salesCategoryPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/category${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getSalesCardType = (salesCardTypePayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(salesCardTypePayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/cardType${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}
export const getLocationDetails = (LocationDetailsPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    return REPORTS_API({
        method: "get",
        url: `/sales/location?locationId=${LocationDetailsPayload?.locationId}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}
export const getHourlySalesReportChart = (hourlySalesPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query = generateQueryParams(hourlySalesPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/hourly?${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}


export const getEmployeeActivity = (employeeActivityPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const { locationid, startDate, endDate, staffId } = employeeActivityPayload || {};

    let url = `/sales/employee/activity?locationId=${locationid}&startDate=${startDate}&endDate=${endDate}`;

    if (staffId && staffId !== "all" && staffId !== "All") {
        url += `&staffId=${staffId}`;
    }

    return REPORTS_API({
        method: "get",
        url,
        headers: {
            Authorization: `bearer ${token}`,
        }
    });
};

export const getPremisesSummary = (premisesSummaryPayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query=generateQueryParams(premisesSummaryPayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/premisesSummary${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

// https://rptd.gcp.magilhub.com/magilhub-data-services-reports/sales/employee/activity/actions?locationId=d15139f6-ea2b-4b4c-8541-7a9112bfd8bf&startDate=2024-11-01&endDate=2024-12-31&action=Void payment,Remove Tax

export const getEmployeeChartSliceTable = (employeeChartSliceTablePayload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const query=generateQueryParams(employeeChartSliceTablePayload)
    return REPORTS_API({
        method: "get",
        url: `/sales/employee/activity/actions${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}

export const getDownloadableReport = (payload) => {
    const token = Store.getState()?.auth?.credentials?.accessToken;
    const {apiEndPoint, ...queryParams}=payload
    const query=generateQueryParams(queryParams)
    
    return REPORTS_API({
        method: "get",
        url: `${apiEndPoint}${query}`,
        headers: {
            Authorization: 'bearer ' + token,
        }
    });
}