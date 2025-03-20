import { put, call, takeLatest, debounce, fork } from "redux-saga/effects";
import { showSuccessToast, showErrorToast } from "util/toastUtils";
import {
    salesSummarySuccess,
    salesSummaryFailure,
    salesByItemCategoryFailure,
    salesByItemCategorySuccess,
    salesByRevenueClassSuccess,
    salesByRevenueClassFailure,
    actualSalesFailure,
    actualSalesSuccess,
    actualSalesThirdPartySuccess,
    actualSalesThirdPartyFailure,
    hourlySalesSuccess,
    hourlySalesFailure,
    liveDiscountSuccess,
    liveDiscountFailure,
    liveOpenSalesSuccess,
    liveOpenSalesFailure,
    liveOrdersSuccess,
    liveOrdersFailure,
    liveRefundsSuccess,
    liveRefundsFailure,
    liveNetSalesSuccess,
    liveNetSalesFailure,
    liveOrderNonDineInSuccess,
    liveOrderNonDineInFailure,
    discountSummarySuccess,
    discountSummaryFailure,
    cancellationSummarySuccess,
    cancellationSummaryFailure,
    employeeStaffTipGratuitySuccess,
    employeeStaffTipGratuityFailure,
    employeeStaffDiscountSuccess,
    employeeStaffDiscountFailure,
    employeeStaffPerformanceFailure,
    employeeStaffPerformanceSuccess,
    employeeStaffActivitySuccess,
    employeeStaffActivityFailure,
    dayCheckInSuccess,
    dayCheckInFailure,
    dailyCheckInSuccess,
    dailyCheckInFailure,
    dailyGuestSuccess,
    dailyGuestFailure,
    dailyCancellationSuccess,
    dailyCancellationFailure,
    hourlyGuestsSuccess,
    hourlyGuestsFailure,
    dailyHourlyCheckInSuccess,
    dailyHourlyCheckInFailure,
    dayOverDayGuestSuccess,
    dayOverDayGuestFailure,
    peakSummarySuccess,
    peakSummaryFailure,
    partySizeSuccess,
    partySizeFailure,
    customerSizeSuccess,
    customerSizeFailure,
    newCustomerSizeSuccess,
    newCustomerSizeFailure,
    customerDetailsSuccess,
    customerDetailsFailure,
    liveCheckInStatusSuccess,
    liveCheckInStatusFailure,
    dailyCheckInStatusSuccess,
    dailyCheckInStatusFailure,
    employeeSalesOverviewSuccess,
    employeeSalesOverviewFailure,
    voidedSummarySuccess,
    voidedSummaryFailure,
    dropdownDetailsSuccess,
    dropdownDetailsFailure,
    categoryChannelSummarySuccess,
    categoryChannelSummaryFailure,
    categorySalesSuccess,
    categorySalesFailure,
    categorySalesSummarySuccess,
    categorySalesSummaryFailure,
    locationDetailsSuccess,
    locationDetailsFailure,
    paymentDetailsSuccess,
    paymentDetailsFailure,
    salesSummaryReportSuccess,
    salesSummaryReportFailure,
    staffSalesSuccess,
    staffSalesFailure,
    salesCategorySuccess,
    salesCategoryFailure,
    salesCardTypeSuccess,
    salesCardTypeFailure,
    hourlySalesReportChartSuccess,
    hourlySalesReportChartFailure,
    salesByChannelSuccess,
    salesByChannelFailure,
    getVoidedOrderSummarySuccess,
    getOfferSummaryFailure,
    voidedOrderSummarySuccess,
    voidedOrderSummaryFailure,
    offerSummaryFailure,
    offerSummarySuccess,
    getEmployeeActivitySuccess,
    getEmployeeActivityFailure,
    getEmployeeActivityRequest,
    getPremisesSummarySuccess,
    getPremisesSummaryFailure,
    getEmployeeChartSliceTableSuccess,
    getEmployeeChartSliceTableFailure,
    billedSuccess,
    billedFailure,
    unBilledSuccess,
    unBilledFailure,
    getRestaurantRequestFromNewReports,
    getRestaurantFailreFromNewReports,
    getRestaurantSuccessFromNewReports
} from "./newReportsActions";
import {
    ACTUAL_SALES_REQUEST,
    ACTUAL_SALES_THIRD_PARTY_REQUEST,
    CANCELLATION_SUMMARY_REQUEST,
    CUSTOMER_DETAILS_REQUEST,
    CUSTOMER_SIZE_REQUEST,
    DAILY_CANCELLATION_REQUEST,
    DAILY_CHECKIN_REQUEST,
    DAILY_CHECKIN_STATUS_REQUEST,
    DAILY_GUEST_REQUEST,
    DAILY_HOURLY_CHECKIN_REQUEST,
    DAY_CHECKIN_REQUEST,
    DAY_OVER_DAY_GUEST_REQUEST,
    DISCOUNT_SUMMARY_REQUEST,
    EMPLOYEE_SALES_OVERVIEW_REQUEST,
    EMPLOYEE_STAFF_ACTIVITY_REQUEST,
    EMPLOYEE_STAFF_DISCOUNT_REQUEST,
    EMPLOYEE_STAFF_PERFORMANCE_REQUEST,
    EMPLOYEE_STAFF_TIP_GRATUITY_REQUEST,
    HOURLY_GUESTS_REQUEST,
    HOURLY_SALES_REQUEST,
    HOURLY_SALES_REPORT_CHART_REQUEST,
    LIVE_CHECKIN_STATUS_REQUEST,
    LIVE_DISCOUNT_REQUEST,
    LIVE_NET_SALES_REQUEST,
    LIVE_OPEN_SALES_REQUEST,
    LIVE_ORDER_NON_DINE_IN_REQUEST,
    LIVE_ORDERS_REQUEST,
    LIVE_REFUNDS_REQUEST,
    NEW_CUSTOMER_SIZE_REQUEST,
    PARTY_SIZE_REQUEST,
    PEAK_SUMMARY_REQUEST,
    SALES_BY_ITEM_CATEGORY_REQUEST,
    SALES_BY_REVENUE_CLASS_REQUEST,
    SALES_CATEGORY_REQUEST,
    SALES_CARD_TYPE_REQUEST,
    SALES_SUMMARY_REQUEST,
    SALES_SUMMARY_REPORT_REQUEST,
    STAFF_SALES_REQUEST,
    VOIDED_SUMMARY_REQUEST,
    DROPDOWN_DETAILS_REQUEST,
    CATEGORY_CHANNEL_SUMMARY_REQUEST,
    CATEGORY_SALES_REQUEST,
    CATEGORY_SALES_SUMMARY_REQUEST,
    LOCATION_DETAILS_REQUEST,
    PAYMENT_DETAILS_REQUEST,
    SALES_BY_CHANNEL_REQUEST,
    GET_OFFER_SUMMARY_REQUEST,
    GET_VOIDED_ORDER_SUMMARY_REQUEST,
    GET_EMPLOYEE_ACTIVITY_REQUEST,
    GET_PREMISES_SUMMARARY_REQUEST,
    GET_EMPLOYEE_CHART_SLICE_TABLE_REQUEST,
    BILLED_REQUEST,
    UNBILLED_REQUEST,
    GET_DETAILS_RESTAURANT_REQUEST
} from "./newReportsConstants";
import {
    getActualSales,
    getCancellationSummary,
    getCustomerDetails,
    getCustomerSize,
    getDailyCancellation,
    getDailyCheckIn,
    getDailyCheckInStatus,
    getDailyGuest,
    getDailyHourlyCheckIn,
    getDayCheckIn,
    getDayOverDayGuest,
    getDiscountSummary,
    getEmployeeSalesOverview,
    getEmployeeStaffActivity,
    getEmployeeStaffDiscount,
    getEmployeeStaffPerformance,
    getEmployeeStaffTipGratuity,
    getHourlyGuests,
    getHourlySalesChart,
    getHourlySalesReportChart,
    getLiveCheckInStatus,
    getLiveDiscount,
    getLiveNetSales,
    getLiveOpenSales,
    getLiveOrderNonDineIn,
    getLiveOrders,
    getLiveRefunds,
    getNewCustomerSize,
    getPartySize,
    getPeakSummary,
    getSalesByItemCategory,
    getSalesByRevenueClass,
    getSalesCategory,
    getSalesCardType,
    getSalesSummary,
    getSalesSummaryReport,
    getStaffSales,
    getVoidedSummary,
    getDropDownDetails,
    getCategoryChannelSummary,
    getCategorySales,
    getCategorySalesSummary,
    getLocationDetails,
    getPaymentDetails,
    getSalesByChannel,
    getVoidedOrderSummary,
    getOfferSummary,
    getEmployeeActivity,
    getPremisesSummary,
    getEmployeeChartSliceTable,
    getUnbilled,
    getBilled,
} from "./newReportsApi";
import { decryptJson } from "util/react-ec-utils";
import throttle from "lodash.throttle";
import { getRestaurantDetails } from "redux/auth/authAPI";

export function* salesSummaryRequestSaga(action) {
    try {
        const response = yield call(getSalesSummary, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(salesSummarySuccess(decryptedData));
            // showSuccessToast(decryptedData?.message);
        } else {
            yield put(salesSummaryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(salesSummaryFailure(error));
    }
}

export function* salesByItemCategoryRequestSaga(action) {
    try {
        const response = yield call(getSalesByItemCategory, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of salesByItemCategoryRequestSaga", { decryptedData })
            yield put(salesByItemCategorySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(salesByItemCategoryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(salesByItemCategoryFailure(error));
    }
}

export function* salesByRevenueClassRequestSaga(action) {
    try {
        const response = yield call(getSalesByRevenueClass, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of salesByRevenueClassRequestSaga", { decryptedData })
            yield put(salesByRevenueClassSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(salesByRevenueClassFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(salesByRevenueClassFailure(error));
    }
}

export function* actualSalesRequestSaga(action) {
    try {
        const response = yield call(getActualSales, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of actualSalesRequestSaga", { decryptedData })
            yield put(actualSalesSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(actualSalesFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(actualSalesFailure(error));
    }
}

export function* actualSalesThirdPartyRequestSaga(action) {
    try {
        const response = yield call(getActualSales, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of actualSalesThirdPartyRequestSaga", { decryptedData })
            yield put(actualSalesThirdPartySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(actualSalesThirdPartyFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(actualSalesThirdPartyFailure(error));
    }
}


export function* hourlySalesRequestSaga(action) {
    try {
        const response = yield call(getHourlySalesChart, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of hourlySalesRequestSaga", { decryptedData })
            yield put(hourlySalesSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(hourlySalesFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(hourlySalesFailure(error));
    }
}

export function* liveDiscountRequestSaga(action) {
    try {
        const response = yield call(getLiveDiscount, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of liveDiscountRequestSaga", { decryptedData })
            yield put(liveDiscountSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveDiscountFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveDiscountFailure(error));
    }
}

//liveOpenSalesRequestSaga
export function* liveOpenSalesRequestSaga(action) {
    try {
        const response = yield call(getLiveOpenSales, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of liveOpenSalesRequestSaga", { decryptedData })
            yield put(liveOpenSalesSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveOpenSalesFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveOpenSalesFailure(error));
    }
}

//liveOrdersRequestSaga
export function* liveOrdersRequestSaga(action) {
    try {
        const response = yield call(getLiveOrders, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of liveOrdersRequestSaga ONE", { decryptedData })
        if (response.status === 200) {
            // console.log("response of liveOrdersRequestSaga", { decryptedData })
            yield put(liveOrdersSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveOrdersFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveOrdersFailure(error));
    }
}

//liveRefundsRequestSaga
export function* liveRefundsRequestSaga(action) {
    try {
        const response = yield call(getLiveRefunds, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of liveRefundsRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(liveRefundsSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveRefundsFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveRefundsFailure(error));
    }
}

//liveNetSalesRequestSaga
export function* liveNetSalesRequestSaga(action) {
    try {
        const response = yield call(getLiveNetSales, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of liveNetSalesRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(liveNetSalesSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveNetSalesFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveNetSalesFailure(error));
    }
}

//liveOrderNonDineInRequestSaga
export function* liveOrderNonDineInRequestSaga(action) {
    try {
        const response = yield call(getLiveOrderNonDineIn, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of liveOrderNonDineInRequestSaga ONE", { decryptedData })
        if (response.status === 200) {
            yield put(liveOrderNonDineInSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveOrderNonDineInFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveOrderNonDineInFailure(error));
    }
}

//discountSummaryRequestSaga
export function* discountSummaryRequestSaga(action) {
    try {
        const response = yield call(getDiscountSummary, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of discountSummaryRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(discountSummarySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(discountSummaryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(discountSummaryFailure(error));
    }
}

//cancellationSummaryRequestSaga
export function* cancellationSummaryRequestSaga(action) {
    try {
        const response = yield call(getCancellationSummary, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of cancellationSummaryRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(cancellationSummarySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(cancellationSummaryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(cancellationSummaryFailure(error));
    }
}

//employeeStaffTipGratuityRequestSaga
export function* employeeStaffTipGratuityRequestSaga(action) {
    try {
        const response = yield call(getEmployeeStaffTipGratuity, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of employeeStaffTipGratuityRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(employeeStaffTipGratuitySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(employeeStaffTipGratuityFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(employeeStaffTipGratuityFailure(error));
    }
}

//employeeStaffDiscountRequestSaga
export function* employeeStaffDiscountRequestSaga(action) {
    try {
        const response = yield call(getEmployeeStaffDiscount, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of employeeStaffDiscountRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(employeeStaffDiscountSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(employeeStaffDiscountFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(employeeStaffDiscountFailure(error));
    }
}

//employeeStaffPerformanceRequestSaga
export function* employeeStaffPerformanceRequestSaga(action) {
    try {
        const response = yield call(getEmployeeStaffPerformance, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of employeeStaffPerformanceRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(employeeStaffPerformanceSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(employeeStaffPerformanceFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(employeeStaffPerformanceFailure(error));
    }
}

//employeeStaffActivityRequestSaga
export function* employeeStaffActivityRequestSaga(action) {
    try {
        const response = yield call(getEmployeeStaffActivity, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of employeeStaffActivityRequestSaga", { decryptedData })
            yield put(employeeStaffActivitySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(employeeStaffActivityFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(employeeStaffActivityFailure(error));
    }
}

//dayCheckInRequestSaga
export function* dayCheckInRequestSaga(action) {
    try {
        const response = yield call(getDayCheckIn, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of dayCheckInRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(dayCheckInSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(dayCheckInFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(dayCheckInFailure(error))
    }
}

// dailyCheckInRequestSaga
export function* dailyCheckInRequestSaga(action) {
    try {
        const response = yield call(getDailyCheckIn, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of dailyCheckInRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(dailyCheckInSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(dailyCheckInFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(dailyCheckInFailure(error))
    }
}

// dailyGuestRequestSaga
export function* dailyGuestRequestSaga(action) {
    try {
        const response = yield call(getDailyGuest, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of dailyGuestRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(dailyGuestSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(dailyGuestFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(dailyGuestFailure(error))
    }
}

//   dailyCancellationRequestSaga
export function* dailyCancellationRequestSaga(action) {
    try {
        const response = yield call(getDailyCancellation, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of dailyCancellationRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(dailyCancellationSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(dailyCancellationFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(dailyCancellationFailure(error))
    }
}

//  hourlyGuestsRequestSaga
export function* hourlyGuestsRequestSaga(action) {
    // console.log("AAAA")
    try {
        // console.log("BBBB")
        const response = yield call(getHourlyGuests, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of hourlyGuestsRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(hourlyGuestsSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(hourlyGuestsFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(hourlyGuestsFailure(error))
    }
}

// dailyHourlyCheckInRequestSaga
export function* dailyHourlyCheckInRequestSaga(action) {
    try {
        const response = yield call(getDailyHourlyCheckIn, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of dailyHourlyCheckInRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(dailyHourlyCheckInSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(dailyHourlyCheckInFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(dailyHourlyCheckInFailure(error))
    }
}

//  dayOverDayGuestRequestSaga
export function* dayOverDayGuestRequestSaga(action) {
    try {
        const response = yield call(getDayOverDayGuest, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of dayOverDayGuestRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(dayOverDayGuestSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(dayOverDayGuestFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(dayOverDayGuestFailure(error))
    }
}

//  peakSummaryRequestSaga
export function* peakSummaryRequestSaga(action) {
    try {
        const response = yield call(getPeakSummary, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of peakSummaryRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(peakSummarySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(peakSummaryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(peakSummaryFailure(error))
    }
}

//  partySizeRequestSaga
export function* partySizeRequestSaga(action) {
    try {
        const response = yield call(getPartySize, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of partySizeRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(partySizeSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(partySizeFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(partySizeFailure(error))
    }
}

// customerSizeRequestSaga
export function* customerSizeRequestSaga(action) {
    try {
        const response = yield call(getCustomerSize, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of customerSizeRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(customerSizeSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(customerSizeFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(customerSizeFailure(error))
    }
}

//  newCustomerSizeRequestSaga
export function* newCustomerSizeRequestSaga(action) {
    try {
        const response = yield call(getNewCustomerSize, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of newCustomerSizeRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(newCustomerSizeSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(newCustomerSizeFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(newCustomerSizeFailure(error))
    }
}

//  customeDetailsRequestSaga
export function* customeDetailsRequestSaga(action) {
    try {
        const response = yield call(getCustomerDetails, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of customeDetailsRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(customerDetailsSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(customerDetailsFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(customerDetailsFailure(error))
    }
}

//  liveCheckInStatusRequestSaga
export function* liveCheckInStatusRequestSaga(action) {
    try {
        const response = yield call(getLiveCheckInStatus, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of liveCheckInStatusRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(liveCheckInStatusSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveCheckInStatusFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveCheckInStatusFailure(error))
    }
}

// dailyCheckInStatusRequestSaga
export function* dailyCheckInStatusRequestSaga(action) {
    try {
        const response = yield call(getDailyCheckInStatus, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of dailyCheckInStatusRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(dailyCheckInStatusSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(dailyCheckInStatusFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(dailyCheckInStatusFailure(error))
    }
}

// billedRequestSaga
export function* billedRequestSaga(action) {
    // console.log('inside saga')
    try {
        const response = yield call(getBilled, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of billedRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(billedSuccess(decryptedData));
        } else {
            yield put(billedFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        // console.log('inside catch')
        yield put(billedFailure(error))
        showErrorToast(error.message);
    }
}


// unbilledRequestSaga
export function* unbilledRequestSaga(action) {
    // console.log('inside saga')
    try {
        const response = yield call(getUnbilled, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of unbilledRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(unBilledSuccess(decryptedData));
        } else {
            yield put(unBilledFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        // console.log('inside catch')
        yield put(unBilledFailure(error))
        showErrorToast(error.message);
    }
}

// Voided Summary Saga
function* voidedSummaryRequestSaga(action) {
    try {
        const response = yield call(getVoidedSummary, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of voidedSummaryRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(voidedSummarySuccess(decryptedData));
        } else {
            yield put(voidedSummaryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }

    } catch (error) {
        yield put(voidedSummaryFailure(error.message));
        showErrorToast(error.message);
    }
}

// Dropdown Details Saga
function* dropdownDetailsRequestSaga(action) {
    try {
        const response = yield call(getDropDownDetails, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of dropdownDetailsRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(dropdownDetailsSuccess(decryptedData));
        } else {
            yield put(dropdownDetailsFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(dropdownDetailsFailure(error.message));
        showErrorToast(error.message);
    }
}

// Category Channel Summary Saga
function* categoryChannelSummaryRequestSaga(action) {
    try {
        const response = yield call(getCategoryChannelSummary, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of categoryChannelSummaryRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(categoryChannelSummarySuccess(decryptedData));
        } else {
            yield put(categoryChannelSummaryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(categoryChannelSummaryFailure(error.message));
        showErrorToast(error.message);
    }
}

// Category Sales Saga
function* categorySalesRequestSaga(action) {
    try {
        const response = yield call(getCategorySales, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of categorySalesRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(categorySalesSuccess(decryptedData));
        } else {
            yield put(categorySalesFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(categorySalesFailure(error.message));
        showErrorToast(error.message);
    }
}

// Category Sales Summary Saga
function* categorySalesSummaryRequestSaga(action) {
    try {
        const response = yield call(getCategorySalesSummary, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of categorySalesSummaryRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(categorySalesSummarySuccess(decryptedData));
        } else {
            yield put(categorySalesSummaryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(categorySalesSummaryFailure(error.message));
        showErrorToast(error.message);
    }
}

// Location Details Saga
function* locationDetailsRequestSaga(action) {
    try {
        const response = yield call(getLocationDetails, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of locationDetailsRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(locationDetailsSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(locationDetailsFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(locationDetailsFailure(error.message));
        showErrorToast(error.message);
    }
}

function* paymentDetailsRequestSaga(action) {
    try {
        const response = yield call(getPaymentDetails, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of paymentDetailsRequestSaga EEEEE", { decryptedData })
        if (response.status === 200) {
            yield put(paymentDetailsSuccess(decryptedData));
        } else {
            yield put(paymentDetailsFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(paymentDetailsFailure(error.message));
        showErrorToast(error.message);
    }
}

function* salesSummaryReportRequestSaga(action) {
    try {
        const response = yield call(getSalesSummaryReport, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of salesSummaryReportRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(salesSummaryReportSuccess(decryptedData));
        } else {
            yield put(salesSummaryReportFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(salesSummaryReportFailure(error.message));
        showErrorToast(error.message);
    }
}

function* staffSalesRequestSaga(action) {
    try {
        const response = yield call(getStaffSales, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of staffSalesRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(staffSalesSuccess(decryptedData));
        } else {
            yield put(staffSalesFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(staffSalesFailure(error.message));
        showErrorToast(error.message);
    }
}

// Sales Category Saga
function* salesCategoryRequestSaga(action) {
    try {
        const response = yield call(getSalesCategory, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of salesCategoryRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(salesCategorySuccess(decryptedData));
        } else {
            yield put(salesCategoryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(salesCategoryFailure(error.message));
        showErrorToast(error.message);
    }
}

// Sales Card Type Saga
function* salesCardTypeRequestSaga(action) {
    try {
        const response = yield call(getSalesCardType, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of salesCardTypeRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(salesCardTypeSuccess(decryptedData));
        } else {
            yield put(salesCardTypeFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(salesCardTypeFailure(error.message));
        showErrorToast(error.message);
    }
}

// Hourly Sales Report Chart Saga
function* hourlySalesReportChartRequestSaga(action) {
    try {
        const response = yield call(getHourlySalesReportChart, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of hourlySalesReportChartRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(hourlySalesReportChartSuccess(decryptedData));
        } else {
            yield put(hourlySalesReportChartFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(hourlySalesReportChartFailure(error.message));
        showErrorToast(error.message);
    }
}

// Sales By Channel Saga
function* salesByChannelRequestSaga(action) {
    try {
        const response = yield call(getSalesByChannel, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of salesByChannelRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(salesByChannelSuccess(decryptedData));
        } else {
            yield put(salesByChannelFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(salesByChannelFailure(error.message));
        showErrorToast(error.message);
    }
}

// Offer Summary Saga
function* offerSummaryRequestSaga(action) {
    try {
        const response = yield call(getOfferSummary, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of offerSummaryRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(offerSummarySuccess(decryptedData));
        } else {
            yield put(offerSummaryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(offerSummaryFailure(error.message));
        showErrorToast(error.message);
    }
}

// Voided Order Summary Saga
function* voidedOrderSummaryRequestSaga(action) {
    try {
        const response = yield call(getVoidedOrderSummary, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of voidedOrderSummaryRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(voidedOrderSummarySuccess(decryptedData));
        } else {
            yield put(voidedOrderSummaryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(voidedOrderSummaryFailure(error.message));
        showErrorToast(error.message);
    }
}


// employeeSalesOverViewSaga
export function* employeeSalesOverViewSaga(action) {
    try {
        const response = yield call(getEmployeeSalesOverview, action.payload);
        // const decryptedData = response?.data
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of employeeSalesOverViewSaga", { decryptedData });
            yield put(employeeSalesOverviewSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(employeeSalesOverviewFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(employeeSalesOverviewFailure(error));
    }
}

// getEmployeeActivityRequestSaga
export function* getEmployeeActivityRequestSaga(action) {
    try {
        const response = yield call(getEmployeeActivity, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of getEmployeeActivityRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(getEmployeeActivitySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(getEmployeeActivityFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(getEmployeeActivityFailure(error));
    }
}

// getPremisesSummaryRequestSaga
export function* getPremisesSummaryRequestSaga(action) {
    try {
        const response = yield call(getPremisesSummary, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of getPremisesSummaryRequestSaga", { decryptedData })
        if (response.status === 200) {
            yield put(getPremisesSummarySuccess(decryptedData));
        } else {
            yield put(getPremisesSummaryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(getPremisesSummaryFailure(error));
        showErrorToast(error.message);
    }
}


//  getEmployeeChartSliceTableRequestSaga
export function* getEmployeeChartSliceTableRequestSaga(action) {
    try {
        const response = yield call(getEmployeeChartSliceTable, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        // console.log("response of getEmployeeChartSliceTableRequestSaga PPP2", { decryptedData })
        if (response.status === 200) {
            yield put(getEmployeeChartSliceTableSuccess(decryptedData));
        } else {
            yield put(getEmployeeChartSliceTableFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(getEmployeeChartSliceTableFailure(error));
        showErrorToast(error.message);
    }
}

// getDetailsRestaurantRequestSaga
export function* getDetailsRestaurantRequestSaga(action) {
    try {
        const response = yield call(getRestaurantDetails, action.payload);
        const decryptedData = response?.data
        // console.log("response of getDetailsRestaurantRequestSaga", { decryptedData })
        if (response.status === 200) {
            // console.log("response of getDetailsRestaurantRequestSaga", { decryptedData })
            yield put(getRestaurantSuccessFromNewReports(decryptedData));
        } else {
            yield put(getRestaurantFailreFromNewReports(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {

        yield put(getRestaurantFailreFromNewReports(error));
        showErrorToast(error.message);
    }
}


export default function* watchNewReportRequest() {
    yield takeLatest(SALES_SUMMARY_REQUEST, salesSummaryRequestSaga);
    yield takeLatest(SALES_BY_ITEM_CATEGORY_REQUEST, salesByItemCategoryRequestSaga);
    yield takeLatest(SALES_BY_REVENUE_CLASS_REQUEST, salesByRevenueClassRequestSaga);
    yield takeLatest(ACTUAL_SALES_REQUEST, actualSalesRequestSaga);
    yield takeLatest(ACTUAL_SALES_THIRD_PARTY_REQUEST, actualSalesThirdPartyRequestSaga);
    yield takeLatest(HOURLY_SALES_REQUEST, hourlySalesRequestSaga);
    yield takeLatest(LIVE_DISCOUNT_REQUEST, liveDiscountRequestSaga);
    yield takeLatest(LIVE_OPEN_SALES_REQUEST, liveOpenSalesRequestSaga);
    yield debounce(1000, LIVE_ORDERS_REQUEST, liveOrdersRequestSaga);
    yield takeLatest(LIVE_REFUNDS_REQUEST, liveRefundsRequestSaga);
    yield takeLatest(LIVE_NET_SALES_REQUEST, liveNetSalesRequestSaga);
    yield debounce(1000, LIVE_ORDER_NON_DINE_IN_REQUEST, liveOrderNonDineInRequestSaga);
    yield debounce(200, DISCOUNT_SUMMARY_REQUEST, discountSummaryRequestSaga);
    yield debounce(200, CANCELLATION_SUMMARY_REQUEST, cancellationSummaryRequestSaga);
    yield takeLatest(EMPLOYEE_STAFF_TIP_GRATUITY_REQUEST, employeeStaffTipGratuityRequestSaga);
    yield takeLatest(EMPLOYEE_STAFF_DISCOUNT_REQUEST, employeeStaffDiscountRequestSaga);
    yield takeLatest(EMPLOYEE_STAFF_PERFORMANCE_REQUEST, employeeStaffPerformanceRequestSaga);
    yield debounce(1000, EMPLOYEE_STAFF_ACTIVITY_REQUEST, employeeStaffActivityRequestSaga);
    yield takeLatest(DAY_CHECKIN_REQUEST, dayCheckInRequestSaga);
    yield takeLatest(DAILY_CHECKIN_REQUEST, dailyCheckInRequestSaga);
    yield takeLatest(DAILY_GUEST_REQUEST, dailyGuestRequestSaga);
    yield takeLatest(DAILY_CANCELLATION_REQUEST, dailyCancellationRequestSaga);
    yield takeLatest(HOURLY_GUESTS_REQUEST, hourlyGuestsRequestSaga);
    yield takeLatest(DAILY_HOURLY_CHECKIN_REQUEST, dailyHourlyCheckInRequestSaga);
    yield takeLatest(DAY_OVER_DAY_GUEST_REQUEST, dayOverDayGuestRequestSaga);
    yield takeLatest(PEAK_SUMMARY_REQUEST, peakSummaryRequestSaga);
    yield takeLatest(PARTY_SIZE_REQUEST, partySizeRequestSaga);
    yield takeLatest(CUSTOMER_SIZE_REQUEST, customerSizeRequestSaga);
    yield takeLatest(NEW_CUSTOMER_SIZE_REQUEST, newCustomerSizeRequestSaga);
    yield takeLatest(CUSTOMER_DETAILS_REQUEST, customeDetailsRequestSaga);
    yield takeLatest(LIVE_CHECKIN_STATUS_REQUEST, liveCheckInStatusRequestSaga);
    yield takeLatest(DAILY_CHECKIN_STATUS_REQUEST, dailyCheckInStatusRequestSaga);
    yield takeLatest(BILLED_REQUEST, billedRequestSaga);
    yield takeLatest(UNBILLED_REQUEST, unbilledRequestSaga);
    yield takeLatest(EMPLOYEE_SALES_OVERVIEW_REQUEST, employeeSalesOverViewSaga);
    yield takeLatest(DAILY_CHECKIN_STATUS_REQUEST, dailyCheckInStatusRequestSaga)
    yield takeLatest(VOIDED_SUMMARY_REQUEST, voidedSummaryRequestSaga);
    yield takeLatest(DROPDOWN_DETAILS_REQUEST, dropdownDetailsRequestSaga);
    yield takeLatest(CATEGORY_CHANNEL_SUMMARY_REQUEST, categoryChannelSummaryRequestSaga);
    yield takeLatest(CATEGORY_SALES_REQUEST, categorySalesRequestSaga);
    yield takeLatest(CATEGORY_SALES_SUMMARY_REQUEST, categorySalesSummaryRequestSaga);
    yield takeLatest(LOCATION_DETAILS_REQUEST, locationDetailsRequestSaga);
    yield takeLatest(PAYMENT_DETAILS_REQUEST, paymentDetailsRequestSaga);
    yield takeLatest(SALES_SUMMARY_REPORT_REQUEST, salesSummaryReportRequestSaga);
    yield takeLatest(STAFF_SALES_REQUEST, staffSalesRequestSaga);
    yield takeLatest(SALES_CATEGORY_REQUEST, salesCategoryRequestSaga);
    yield takeLatest(SALES_CARD_TYPE_REQUEST, salesCardTypeRequestSaga);
    yield takeLatest(HOURLY_SALES_REPORT_CHART_REQUEST, hourlySalesReportChartRequestSaga);
    yield takeLatest(SALES_BY_CHANNEL_REQUEST, salesByChannelRequestSaga);
    yield takeLatest(GET_OFFER_SUMMARY_REQUEST, offerSummaryRequestSaga);
    yield takeLatest(GET_VOIDED_ORDER_SUMMARY_REQUEST, voidedOrderSummaryRequestSaga);
    yield takeLatest(GET_EMPLOYEE_ACTIVITY_REQUEST, getEmployeeActivityRequestSaga);
    yield takeLatest(GET_PREMISES_SUMMARARY_REQUEST, getPremisesSummaryRequestSaga);
    yield takeLatest(GET_EMPLOYEE_CHART_SLICE_TABLE_REQUEST, getEmployeeChartSliceTableRequestSaga);
    yield takeLatest(GET_DETAILS_RESTAURANT_REQUEST, getDetailsRestaurantRequestSaga);
}