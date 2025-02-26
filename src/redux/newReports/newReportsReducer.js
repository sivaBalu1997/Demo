import { produce } from "immer";
import {
    SALES_SUMMARY_SUCCESS,
    SALES_SUMMARY_REQUEST,
    SALES_SUMMARY_FAILURE,
    SALES_BY_ITEM_CATEGORY_REQUEST,
    SALES_BY_ITEM_CATEGORY_SUCCESS,
    SALES_BY_ITEM_CATEGORY_FAILURE,
    SALES_BY_REVENUE_CLASS_REQUEST,
    SALES_BY_REVENUE_CLASS_SUCCESS,
    SALES_BY_REVENUE_CLASS_FAILURE,
    ACTUAL_SALES_REQUEST,
    ACTUAL_SALES_SUCCESS,
    ACTUAL_SALES_FAILURE,
    ACTUAL_SALES_THIRD_PARTY_REQUEST,
    ACTUAL_SALES_THIRD_PARTY_SUCCESS,
    ACTUAL_SALES_THIRD_PARTY_FAILURE,
    HOURLY_SALES_REQUEST,
    HOURLY_SALES_SUCCESS,
    HOURLY_SALES_FAILURE,
    LIVE_DISCOUNT_REQUEST,
    LIVE_DISOUNT_SUCCESS,
    LIVE_DISCOUNT_FAILURE,
    LIVE_OPEN_SALES_REQUEST,
    LIVE_OPEN_SALES_SUCCESS,
    LIVE_OPEN_SALES_FAILURE,
    LIVE_ORDERS_REQUEST,
    LIVE_ORDERS_SUCCESS,
    LIVE_ORDERS_FAILURE,
    LIVE_REFUNDS_REQUEST,
    LIVE_REFUNDS_SUCCESS,
    LIVE_REFUNDS_FAILURE,
    LIVE_NET_SALES_REQUEST,
    LIVE_NET_SALES_SUCCESS,
    LIVE_NET_SALES_FAILURE,
    LIVE_ORDER_NON_DINE_IN_SUCCESS,
    LIVE_ORDER_NON_DINE_IN_FAILURE,
    LIVE_ORDER_NON_DINE_IN_REQUEST,
    DISCOUNT_SUMMARY_REQUEST,
    DISCOUNT_SUMMARY_SUCCESS,
    DISCOUNT_SUMMARY_FAILURE,
    CANCELLATION_SUMMARY_REQUEST,
    CANCELLATION_SUMMARY_SUCCESS,
    CANCELLATION_SUMMARY_FAILURE,
    EMPLOYEE_STAFF_TIP_GRATUITY_REQUEST,
    EMPLOYEE_STAFF_TIP_GRATUITY_SUCCESS,
    EMPLOYEE_STAFF_TIP_GRATUITY_FAILURE,
    EMPLOYEE_STAFF_DISCOUNT_REQUEST,
    EMPLOYEE_STAFF_PERFORMANCE_REQUEST,
    EMPLOYEE_STAFF_PERFORMANCE_SUCCESS,
    EMPLOYEE_STAFF_DISCOUNT_SUCCESS,
    EMPLOYEE_STAFF_DISCOUNT_FAILURE,
    EMPLOYEE_STAFF_PERFORMANCE_FAILURE,
    EMPLOYEE_STAFF_ACTIVITY_REQUEST,
    EMPLOYEE_STAFF_ACTIVITY_SUCCESS,
    EMPLOYEE_STAFF_ACTIVITY_FAILURE,
    DAY_CHECKIN_REQUEST,
    DAY_CHECKIN_SUCCESS,
    DAY_CHECKIN_FAILURE,
    DAILY_CHECKIN_REQUEST,
    DAILY_CHECKIN_SUCCESS,
    DAILY_CHECKIN_FAILURE,
    DAILY_GUEST_REQUEST,
    DAILY_GUEST_SUCCESS,
    DAILY_GUEST_FAILURE,
    DAILY_CANCELLATION_REQUEST,
    DAILY_CANCELLATION_SUCCESS,
    DAILY_CANCELLATION_FAILURE,
    HOURLY_GUESTS_REQUEST,
    HOURLY_GUESTS_SUCCESS,
    HOURLY_GUESTS_FAILURE,
    DAILY_HOURLY_CHECKIN_REQUEST,
    DAILY_HOURLY_CHECKIN_SUCCESS,
    DAILY_HOURLY_CHECKIN_FAILURE,
    DAY_OVER_DAY_GUEST_REQUEST,
    DAY_OVER_DAY_GUEST_SUCCESS,
    DAY_OVER_DAY_GUEST_FAILURE,
    PEAK_SUMMARY_REQUEST,
    PEAK_SUMMARY_SUCCESS,
    PEAK_SUMMARY_FAILURE,
    PARTY_SIZE_REQUEST,
    PARTY_SIZE_SUCCESS,
    PARTY_SIZE_FAILURE,
    CUSTOMER_SIZE_REQUEST,
    CUSTOMER_SIZE_SUCCESS,
    CUSTOMER_SIZE_FAILURE,
    NEW_CUSTOMER_SIZE_REQUEST,
    NEW_CUSTOMER_SIZE_SUCCESS,
    NEW_CUSTOMER_SIZE_FAILURE,
    CUSTOMER_DETAILS_REQUEST,
    CUSTOMER_DETAILS_SUCCESS,
    CUSTOMER_DETAILS_FAILURE,
    LIVE_CHECKIN_STATUS_REQUEST,
    LIVE_CHECKIN_STATUS_SUCCESS,
    LIVE_CHECKIN_STATUS_FAILURE,
    DAILY_CHECKIN_STATUS_REQUEST,
    DAILY_CHECKIN_STATUS_SUCCESS,
    DAILY_CHECKIN_STATUS_FAILURE,
    BILLED_UNBILLED_REQUEST,
    BILLED_UNBILLED_SUCCESS,
    BILLED_UNBILLED_FAILURE,
    EMPLOYEE_SALES_OVERVIEW_REQUEST,
    EMPLOYEE_SALES_OVERVIEW_SUCCESS,
    EMPLOYEE_SALES_OVERVIEW_FAILURE,
    VOIDED_SUMMARY_REQUEST,
    VOIDED_SUMMARY_SUCCESS,
    VOIDED_SUMMARY_FAILURE,
    DROPDOWN_DETAILS_REQUEST,
    DROPDOWN_DETAILS_SUCCESS,
    DROPDOWN_DETAILS_FAILURE,
    CATEGORY_CHANNEL_SUMMARY_REQUEST,
    CATEGORY_CHANNEL_SUMMARY_SUCCESS,
    CATEGORY_CHANNEL_SUMMARY_FAILURE,
    CATEGORY_SALES_REQUEST,
    CATEGORY_SALES_SUCCESS,
    CATEGORY_SALES_FAILURE,
    CATEGORY_SALES_SUMMARY_REQUEST,
    CATEGORY_SALES_SUMMARY_SUCCESS,
    CATEGORY_SALES_SUMMARY_FAILURE,
    LOCATION_DETAILS_REQUEST,
    LOCATION_DETAILS_SUCCESS,
    LOCATION_DETAILS_FAILURE,
    SELCTED_LOCATION,
    PAYMENT_DETAILS_SUCCESS,
    PAYMENT_DETAILS_REQUEST,
    PAYMENT_DETAILS_FAILURE,
    SALES_SUMMARY_REPORT_REQUEST,
    SALES_SUMMARY_REPORT_SUCCESS,
    SALES_SUMMARY_REPORT_FAILURE,
    STAFF_SALES_REQUEST,
    STAFF_SALES_SUCCESS,
    STAFF_SALES_FAILURE,
    SALES_CATEGORY_REQUEST,
    SALES_CATEGORY_SUCCESS,
    SALES_CATEGORY_FAILURE,
    SALES_CARD_TYPE_REQUEST,
    SALES_CARD_TYPE_SUCCESS,
    SALES_CARD_TYPE_FAILURE,
    HOURLY_SALES_REPORT_CHART_REQUEST,
    HOURLY_SALES_REPORT_CHART_SUCCESS,
    HOURLY_SALES_REPORT_CHART_FAILURE,
    SALES_BY_CHANNEL_REQUEST,
    SALES_BY_CHANNEL_SUCCESS,
    SALES_BY_CHANNEL_FAILURE,
    GET_VOIDED_ORDER_SUMMARY_REQUEST,
    GET_VOIDED_ORDER_SUMMARY_SUCCESS,
    GET_VOIDED_ORDER_SUMMARY_FAILURE,
    GET_OFFER_SUMMARY_REQUEST,
    GET_OFFER_SUMMARY_SUCCESS,
    GET_OFFER_SUMMARY_FAILURE,
    STORE_LOCATIONS_LIST,
} from "../newReports/newReportsConstants";

const initialNewReportsState = {
    // sales summary
    SalesSummaryLoading: false,
    salesSummarySuccess: [],
    salesSummaryFailure: false,
    salesSummaryStatus: false,
    // sales by item category
    salesByItemCategoryLoading: false,
    salesByItemCategorySuccess: [],
    salesByItemCategoryFailure: false,
    // sales by revenue class
    salesByRevenueClassLoading: false,
    salesByRevenueClassSuccess: [],
    salesByRevenueClassFailure: false,
    // actal sales 
    actualSalesLoading: false,
    actualSalesSuccess: [],
    actualSalesFailure: false,
    // actual third party sales
    actualThirdPartySalesLoading: false,
    actualThirdPartySalesSuccess: [],
    actualThirdPartySalesFailure: false,
    // hourly sales
    hourlySalesLoading: false,
    hourlySalesSuccess: [],
    hourlySalesFailure: false,
    // live discount
    liveDiscountLoading: false,
    liveDiscountSuccess: [],
    liveDiscountFailure: false,
    // live open sales
    liveOpenSalesLoading: false,
    liveOpenSalesSuccess: [],
    liveOpenSalesFailure: false,
    // live orders 
    liveOrdersLoading: false,
    liveOrdersSuccess: [],
    liveOrdersFailure: false,
    // live refunds
    liveRefundsLoading: false,
    liveRefundsSuccess: [],
    liveRefundsFailure: false,
    // live net sales
    liveNetSalesLoading: false,
    liveNetSalesSuccess: [],
    liveNetSalesFailure: false,
    // live order non dine in
    liveOrderNonDineInLoading: false,
    liveOrderNonDineInSuccess: [],
    liveOrderNonDineInFailure: false,
    // discount summary
    discountSummaryLoading: false,
    discountSummarySuccess: [],
    discountSummaryFailure: false,
    // cancellation summary
    cancellationSummaryLoading: false,
    cancellationSummarySuccess: [],
    cancellationSummaryFailure: false,
    // employee staff tip gratuity
    employeeStaffTipGratuityLoading: false,
    employeeStaffTipGratuitySuccess: [],
    employeeStaffTipGratuityFailure: false,
    // employee staff discount
    employeeStaffDiscountLoading: false,
    employeeStaffDiscountSuccess: [],
    employeeStaffDiscountFailure: false,
    // employee staff performance
    employeeStaffPerformanceLoading: false,
    employeeStaffPerformanceSuccess: [],
    employeeStaffPerformanceFailure: false,
    // employee staff activity
    employeeStaffActivityLoading: false,
    employeeStaffActivitySuccess: [],
    employeeStaffActivityFailure: false,
    // day CheckIn
    dayCheckInLoading: false,
    dayCheckInSuccess: [],
    dayCheckInFailure: false,
    // daily checkIn
    dailyCheckInLoading: false,
    dailyCheckInSuccess: [],
    dailyCheckInResponseSuccess: false,
    dailyCheckInFailure: false,
    // daily guests
    dailyGuestLoading: false,
    dailyGuestSuccess: [],
    dailyGuestSuccessResponse: false,
    dailyGuestFailure: false,
    // daily cancellation
    dailyCancellationLoading: false,
    dailyCancellationSuccess: [],
    dailyCancellationSucessResponse: false,
    dailyCancellationFailure: false,
    // hourly guests
    dailyHourlyGuestsLoading: false,
    dailyHourlyGuestsSuccess: [],
    dailyHourlyGuestsFailure: false,
    // daily hourly checkin
    dailyHourlyCheckInLoading: false,
    dailyHourlyCheckInSuccess: [],
    dailyHourlyCheckInfailure: false,
    // day over day guest
    dayOverDayGuestLoading: false,
    dayOverDayGuestSuccess: [],
    dayOverDayGuestFailure: false,
    // peak summary
    peakSummaryLoading: false,
    peakSummarySuccess: [],
    peakSummaryFailure: false,
    // party size
    partySizeLoading: false,
    partySizeSuccess: [],
    partySizeFailure: false,
    // customer size
    customerSizeLoading: false,
    customerSizeSuccess: [],
    customerSizeSuccessResponse: false,
    customerSizeFailure: false,
    // new customer size
    newCustomerSizeLoading: false,
    newCustomerSizeSuccess: [],
    newCustomerSizeSuccessResponse: false,
    newCustomerSizeFailure: false,
    // customer details
    customerDetailsLoading: false,
    customerDetailsSuccess: [],
    customerDetailsFailure: false,
    // live check-in status
    liveCheckInStatusLoading: false,
    liveCheckInStatusSuccess: [],
    liveCheckInStatusFailure: false,
    // daily check-in status
    dailyCheckInStatusLoading: false,
    dailyCheckInStatusSuccess: [],
    dailyCheckInStatusFailure: false,
    // billed or unbilled
    billedUnbilledLoading: false,
    billedUnbilledSuccess: [],
    billedUnbilledFailure: false,
    // employee sales overview
    employeeSalesOverviewLoading: false,
    employeeSalesOverviewSuccess: [],
    employeeSalesOverviewFailure: false,


    // voided summary
    voidedSummaryLoading: false,
    voidedSummaryData: null,
    voidedSummaryError: null,

    // dropdown details
    dropdownDetailsLoading: false,
    dropdownDetailsData: [],
    dropdownDetailsError: null,

    // category channel summary
    categoryChannelSummaryLoading: false,
    categoryChannelSummaryData: null,
    categoryChannelSummaryError: null,

    // category sales
    categorySalesLoading: false,
    categorySalesData: null,
    categorySalesError: null,

    // category sales summary
    categorySalesSummaryLoading: false,
    categorySalesSummaryData: null,
    categorySalesSummaryError: null,

    // Location Details
    locationDetailsLoading: false,
    locationDetailsData: null,
    locationDetailsError: null,


    // Payment Details
    paymentDetailsLoading: false,
    paymentDetailsData: [],
    paymentDetailsError: null,

    // Sales Summary Report
    salesSummaryReportData: {},
    salesSummaryReportLoading: false,
    salesSummaryReportError: null,

    // Staff Sales
    staffSalesData: [],
    staffSalesLoading: false,
    staffSalesError: null,

    // Sales Category
    salesCategoryLoading: false,
    salesCategoryData: null,
    salesCategoryError: null,

    // Sales Card Type
    salesCardTypeLoading: false,
    salesCardTypeData: [],
    salesCardTypeError: null,

    // Hourly Sales Report Chart
    hourlySalesReportChartLoading: false,
    hourlySalesReportChartData: null,
    hourlySalesReportChartError: null,

    // Sales By Channel
    salesByChannelLoading: false,
    salesByChannelData: [],
    salesByChannelError: null,

    // Sales By Revenue Class
    salesByRevenueClassLoading: false,
    salesByRevenueClassData: null,
    salesByRevenueClassError: null,

    // Voided Order Summary
    voidedOrderSummaryLoading: false,
    voidedOrderSummaryData: [],
    voidedOrderSummaryError: null,

    // Offer Summary
    offerSummaryLoading: false,
    offerSummaryData: [],
    offerSummaryError: null,

    selectedLocation: {},
    storeLocationsList: []
};

export default function reportsReducer(state = initialNewReportsState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            // Sales Summary :
            case SALES_SUMMARY_REQUEST:
                draft.salesSummarySuccess = [];
                draft.SalesSummaryLoading = true;
                draft.salesSummaryFailure = false;
                draft.salesSummaryStatus = false;
                break;
            case SALES_SUMMARY_SUCCESS:
                draft.salesSummarySuccess = action.payload;
                draft.SalesSummaryLoading = false;
                draft.salesSummaryFailure = false;
                draft.salesSummaryStatus = true
                break;
            case SALES_SUMMARY_FAILURE:
                draft.salesSummarySuccess = [];
                draft.SalesSummaryLoading = false;
                draft.salesSummaryFailure = true;
                draft.salesSummaryStatus = false;
                break;
            // sales by item category :
            case SALES_BY_ITEM_CATEGORY_REQUEST:
                draft.salesByItemCategorySuccess = [];
                draft.salesByItemCategoryLoading = true;
                draft.salesByItemCategoryFailure = false;
                break;
            case SALES_BY_ITEM_CATEGORY_SUCCESS:
                draft.salesByItemCategorySuccess = action.payload;
                draft.salesByItemCategoryLoading = false;
                draft.salesByItemCategoryFailure = false;
                break;
            case SALES_BY_ITEM_CATEGORY_FAILURE:
                draft.salesByItemCategorySuccess = [];
                draft.salesByItemCategoryLoading = false;
                draft.salesByItemCategoryFailure = true;
                break;
            //sales by revenue class :
            case SALES_BY_REVENUE_CLASS_REQUEST:
                draft.salesByRevenueClassSuccess = [];
                draft.salesByRevenueClassLoading = true;
                draft.salesByRevenueClassFailure = false;
                break;
            case SALES_BY_REVENUE_CLASS_SUCCESS:
                draft.salesByRevenueClassSuccess = action.payload;
                draft.salesByRevenueClassLoading = false;
                draft.salesByRevenueClassFailure = false;
                break;
            case SALES_BY_REVENUE_CLASS_FAILURE:
                draft.salesByRevenueClassSuccess = [];
                draft.salesByRevenueClassLoading = false;
                draft.salesByRevenueClassFailure = true;
                break;
            // actual sales Maghil :
            case ACTUAL_SALES_REQUEST:
                draft.actualSalesSuccess = [];
                draft.actualSalesLoading = true;
                draft.actualSalesFailure = false;
                break;
            case ACTUAL_SALES_SUCCESS:
                draft.actualSalesSuccess = action.payload;
                draft.actualSalesLoading = false;
                draft.actualSalesFailure = false;
                break;
            case ACTUAL_SALES_FAILURE:
                draft.actualSalesSuccess = [];
                draft.actualSalesLoading = false;
                draft.actualSalesFailure = true;
                break;
            // actual sales third party :
            case ACTUAL_SALES_THIRD_PARTY_REQUEST:
                draft.actualThirdPartySalesSuccess = [];
                draft.actualThirdPartySalesLoading = true;
                draft.actualThirdPartySalesFailure = false;
                break;
            case ACTUAL_SALES_THIRD_PARTY_SUCCESS:
                draft.actualThirdPartySalesSuccess = action.payload;
                draft.actualThirdPartySalesLoading = false;
                draft.actualThirdPartySalesFailure = false;
                break;
            case ACTUAL_SALES_THIRD_PARTY_FAILURE:
                draft.actualThirdPartySalesSuccess = [];
                draft.actualThirdPartySalesLoading = false;
                draft.actualThirdPartySalesFailure = true;
                break;
            //Hourly sales :
            case HOURLY_SALES_REQUEST:
                draft.hourlySalesSuccess = [];
                draft.hourlySalesLoading = true;
                draft.hourlySalesFailure = false;
                break;
            case HOURLY_SALES_SUCCESS:
                draft.hourlySalesSuccess = action.payload;
                draft.hourlySalesLoading = false;
                draft.hourlySalesFailure = false;
                break;
            case HOURLY_SALES_FAILURE:
                draft.hourlySalesSuccess = [];
                draft.hourlySalesLoading = false;
                draft.hourlySalesFailure = true;
                break;
            // live discount
            case LIVE_DISCOUNT_REQUEST:
                draft.liveDiscountSuccess = [];
                draft.liveDiscountLoading = true;
                draft.liveDiscountFailure = false;
                break;
            case LIVE_DISOUNT_SUCCESS:
                draft.liveDiscountSuccess = action.payload;
                draft.liveDiscountLoading = false;
                draft.liveDiscountFailure = false
                break;
            case LIVE_DISCOUNT_FAILURE:
                draft.liveDiscountSuccess = [];
                draft.liveDiscountLoading = false;
                draft.liveDiscountFailure = true;
                break;
            // open sales
            case LIVE_OPEN_SALES_REQUEST:
                draft.liveOpenSalesSuccess = [];
                draft.liveOpenSalesLoading = true;
                draft.liveOpenSalesFailure = false;
                break;
            case LIVE_OPEN_SALES_SUCCESS:
                draft.liveOpenSalesSuccess = action.payload;
                draft.liveOpenSalesLoading = false;
                draft.liveOpenSalesFailure = false
                break;
            case LIVE_OPEN_SALES_FAILURE:
                draft.liveOpenSalesSuccess = [];
                draft.liveOpenSalesLoading = false;
                draft.liveOpenSalesFailure = true;
                break;
            // live orders table
            case LIVE_ORDERS_REQUEST:
                draft.liveOrdersSuccess = [];
                draft.liveOrdersLoading = true;
                draft.liveOrdersFailure = false;
                break;
            case LIVE_ORDERS_SUCCESS:
                draft.liveOrdersSuccess = action.payload;
                draft.liveOrdersLoading = false;
                draft.liveOrdersFailure = false
                break;
            case LIVE_ORDERS_FAILURE:
                draft.liveOrdersSuccess = [];
                draft.liveOrdersLoading = false;
                draft.liveOrdersFailure = true;
                break;
            // refunds
            case LIVE_REFUNDS_REQUEST:
                draft.liveRefundsSuccess = [];
                draft.liveRefundsLoading = true;
                draft.liveRefundsFailure = false;
                break;
            case LIVE_REFUNDS_SUCCESS:
                draft.liveRefundsSuccess = action.payload;
                draft.liveRefundsLoading = false;
                draft.liveRefundsFailure = false
                break;
            case LIVE_REFUNDS_FAILURE:
                draft.liveRefundsSuccess = [];
                draft.liveRefundsLoading = false;
                draft.liveRefundsFailure = true;
                break;
            // net sales
            case LIVE_NET_SALES_REQUEST:
                draft.liveNetSalesSuccess = [];
                draft.liveNetSalesLoading = true;
                draft.liveNetSalesFailure = false;
                break;
            case LIVE_NET_SALES_SUCCESS:
                draft.liveNetSalesSuccess = action.payload;
                draft.liveNetSalesLoading = false;
                draft.liveNetSalesFailure = false
                break;
            case LIVE_NET_SALES_FAILURE:
                draft.liveNetSalesSuccess = [];
                draft.liveNetSalesLoading = false;
                draft.liveNetSalesFailure = true;
                break;
            // live order non dine in
            case LIVE_ORDER_NON_DINE_IN_REQUEST:
                draft.liveOrderNonDineInSuccess = [];
                draft.liveOrderNonDineInLoading = true;
                draft.liveOrderNonDineInFailure = false;
                break;
            case LIVE_ORDER_NON_DINE_IN_SUCCESS:
                draft.liveOrderNonDineInSuccess = action.payload;
                draft.liveOrderNonDineInLoading = false;
                draft.liveOrderNonDineInFailure = false
                break;
            case LIVE_ORDER_NON_DINE_IN_FAILURE:
                draft.liveOrderNonDineInSuccess = [];
                draft.liveOrderNonDineInLoading = false;
                draft.liveOrderNonDineInFailure = true;
                break;
            // discount summary 
            case DISCOUNT_SUMMARY_REQUEST:
                draft.discountSummarySuccess = [];
                draft.discountSummaryLoading = true;
                draft.discountSummaryFailure = false;
                break;
            case DISCOUNT_SUMMARY_SUCCESS:
                draft.discountSummarySuccess = action.payload;
                draft.discountSummaryLoading = false;
                draft.discountSummaryFailure = false
                break;
            case DISCOUNT_SUMMARY_FAILURE:
                draft.discountSummarySuccess = [];
                draft.discountSummaryLoading = false;
                draft.discountSummaryFailure = true;
                break;
            // cancellation summary
            case CANCELLATION_SUMMARY_REQUEST:
                draft.cancellationSummarySuccess = [];
                draft.cancellationSummaryLoading = true;
                draft.cancellationSummaryFailure = false;
                break;
            case CANCELLATION_SUMMARY_SUCCESS:
                draft.cancellationSummarySuccess = action.payload;
                draft.cancellationSummaryLoading = false;
                draft.cancellationSummaryFailure = false
                break;
            case CANCELLATION_SUMMARY_FAILURE:
                draft.cancellationSummarySuccess = [];
                draft.cancellationSummaryLoading = false;
                draft.cancellationSummaryFailure = true;
                break;
            // employee staff tip gratuity success
            case EMPLOYEE_STAFF_TIP_GRATUITY_REQUEST:
                draft.employeeStaffTipGratuitySuccess = [];
                draft.employeeStaffTipGratuityLoading = true;
                draft.employeeStaffTipGratuityFailure = false;
                break;
            case EMPLOYEE_STAFF_TIP_GRATUITY_SUCCESS:
                draft.employeeStaffTipGratuitySuccess = action.payload;
                draft.employeeStaffTipGratuityLoading = false;
                draft.employeeStaffTipGratuityFailure = false
                break;
            case EMPLOYEE_STAFF_TIP_GRATUITY_FAILURE:
                draft.employeeStaffTipGratuitySuccess = [];
                draft.employeeStaffTipGratuityLoading = false;
                draft.employeeStaffTipGratuityFailure = true;
                break;
            // employee staff discount
            case EMPLOYEE_STAFF_DISCOUNT_REQUEST:
                draft.employeeStaffDiscountSuccess = [];
                draft.employeeStaffDiscountLoading = true;
                draft.employeeStaffDiscountFailure = false;
                break;
            case EMPLOYEE_STAFF_DISCOUNT_FAILURE:
                draft.employeeStaffDiscountSuccess = [];
                draft.employeeStaffDiscountLoading = false;
                draft.employeeStaffDiscountFailure = true;
                break;
            case EMPLOYEE_STAFF_DISCOUNT_SUCCESS:
                draft.employeeStaffDiscountSuccess = action.payload;
                draft.employeeStaffDiscountLoading = false;
                draft.employeeStaffDiscountFailure = false
                break;
            // employee staff performance
            case EMPLOYEE_STAFF_PERFORMANCE_REQUEST:
                draft.employeeStaffPerformanceSuccess = [];
                draft.employeeStaffPerformanceLoading = true;
                draft.employeeStaffPerformanceFailure = false;
                break;
            case EMPLOYEE_STAFF_PERFORMANCE_FAILURE:
                draft.employeeStaffPerformanceSuccess = [];
                draft.employeeStaffPerformanceLoading = false;
                draft.employeeStaffPerformanceFailure = true;
                break;
            case EMPLOYEE_STAFF_PERFORMANCE_SUCCESS:
                draft.employeeStaffPerformanceSuccess = action.payload;
                draft.employeeStaffPerformanceLoading = false;
                draft.employeeStaffPerformanceFailure = false
                break;
            // employee staff activity
            case EMPLOYEE_STAFF_ACTIVITY_REQUEST:
                draft.employeeStaffActivitySuccess = [];
                draft.employeeStaffActivityLoading = true;
                draft.employeeStaffActivityFailure = false;
                break;
            case EMPLOYEE_STAFF_ACTIVITY_FAILURE:
                draft.employeeStaffActivitySuccess = [];
                draft.employeeStaffActivityLoading = false;
                draft.employeeStaffActivityFailure = true;
                break;
            case EMPLOYEE_STAFF_ACTIVITY_SUCCESS:
                draft.employeeStaffActivitySuccess = action.payload;
                draft.employeeStaffActivityLoading = false;
                draft.employeeStaffActivityFailure = false
                break;
            // day checkIn
            case DAY_CHECKIN_REQUEST:
                draft.dayCheckInLoading = true;
                draft.dayCheckInSuccess = [];
                draft.dayCheckInFailure = false;
                break;
            case DAY_CHECKIN_SUCCESS:
                draft.dayCheckInLoading = false;
                draft.dayCheckInSuccess = action.payload;
                draft.dayCheckInFailure = false;
                break;
            case DAY_CHECKIN_FAILURE:
                draft.dayCheckInLoading = true;
                draft.dayCheckInSuccess = [];
                draft.dayCheckInFailure = true;
                break;
            // daily checkIn :
            case DAILY_CHECKIN_REQUEST:
                draft.dailyCheckInLoading = true;
                draft.dailyCheckInSuccess = [];
                draft.dailyCheckInResponseSuccess = false;
                draft.dailyCheckInFailure = false;
                break;
            case DAILY_CHECKIN_SUCCESS:
                draft.dailyCheckInLoading = false;
                draft.dailyCheckInSuccess = action.payload;
                draft.dailyCheckInResponseSuccess = true;
                draft.dailyCheckInFailure = false;
                break;
            case DAILY_CHECKIN_FAILURE:
                draft.dailyCheckInLoading = false;
                draft.dailyCheckInSuccess = [];
                draft.dailyCheckInResponseSuccess = false;
                draft.dailyCheckInFailure = true;
                break;
            // daily guest :
            case DAILY_GUEST_REQUEST:
                draft.dailyGuestLoading = true;
                draft.dailyGuestSuccess = [];
                draft.dailyGuestSuccessResponse = false;
                draft.dailyGuestFailure = false;
                break;
            case DAILY_GUEST_SUCCESS:
                draft.dailyGuestLoading = false;
                draft.dailyGuestSuccessResponse = true;
                draft.dailyGuestSuccess = action.payload;
                draft.dailyGuestFailure = false;
                break;
            case DAILY_GUEST_FAILURE:
                draft.dailyGuestLoading = false;
                draft.dailyGuestSuccessResponse = false;
                draft.dailyGuestSuccess = [];
                draft.dailyGuestFailure = true;
                break;
            // daily cancellation :
            case DAILY_CANCELLATION_REQUEST:
                draft.dailyCancellationLoading = true;
                draft.dailyCancellationSuccess = [];
                draft.dailyCancellationSucessResponse = false;
                draft.dailyCancellationFailure = false;
                break;
            case DAILY_CANCELLATION_SUCCESS:
                draft.dailyCancellationLoading = false;
                draft.dailyCancellationSuccess = action.payload;
                draft.dailyCancellationSucessResponse = true;
                draft.dailyCancellationFailure = false;
                break;
            case DAILY_CANCELLATION_FAILURE:
                draft.dailyCancellationLoading = false;
                draft.dailyCancellationSuccess = [];
                draft.dailyCancellationSucessResponse = false;
                draft.dailyCancellationFailure = true;
                break;
            // hourly guests :
            case HOURLY_GUESTS_REQUEST:
                draft.dailyHourlyGuestsLoading = true;
                draft.dailyHourlyGuestsSuccess = [];
                draft.dailyHourlyGuestsFailure = false;
                break;
            case HOURLY_GUESTS_SUCCESS:
                draft.dailyHourlyGuestsLoading = false;
                draft.dailyHourlyGuestsSuccess = action.payload;
                draft.dailyHourlyGuestsFailure = false;
                break;
            case HOURLY_GUESTS_FAILURE:
                draft.dailyHourlyGuestsLoading = false;
                draft.dailyHourlyGuestsSuccess = [];
                draft.dailyHourlyGuestsFailure = true;
                break;
            // daily hourly checkin
            case DAILY_HOURLY_CHECKIN_REQUEST:
                draft.dailyHourlyCheckInLoading = true;
                draft.dailyHourlyCheckInSuccess = [];
                draft.dailyHourlyCheckInfailure = false;
                break;
            case DAILY_HOURLY_CHECKIN_SUCCESS:
                draft.dailyHourlyCheckInLoading = false;
                draft.dailyHourlyCheckInSuccess = action.payload;
                draft.dailyHourlyCheckInfailure = false;
                break;
            case DAILY_HOURLY_CHECKIN_FAILURE:
                draft.dailyHourlyCheckInLoading = false;
                draft.dailyHourlyCheckInSuccess = [];
                draft.dailyHourlyCheckInfailure = true;
                break;
            // day over day guest
            case DAY_OVER_DAY_GUEST_REQUEST:
                draft.dayOverDayGuestLoading = true;
                draft.dayOverDayGuestSuccess = [];
                draft.dayOverDayGuestFailure = false;
                break;
            case DAY_OVER_DAY_GUEST_SUCCESS:
                draft.dayOverDayGuestLoading = false;
                draft.dayOverDayGuestSuccess = action.payload;
                draft.dayOverDayGuestFailure = false;
                break;
            case DAY_OVER_DAY_GUEST_FAILURE:
                draft.dayOverDayGuestLoading = false;
                draft.dayOverDayGuestSuccess = [];
                draft.dayOverDayGuestFailure = true;
                break;
            // peak summary
            case PEAK_SUMMARY_REQUEST:
                draft.peakSummaryLoading = true;
                draft.peakSummarySuccess = [];
                draft.peakSummaryFailure = false;
                break;
            case PEAK_SUMMARY_SUCCESS:
                draft.peakSummaryLoading = false;
                draft.peakSummarySuccess = action.payload;
                draft.peakSummaryFailure = false;
                break;
            case PEAK_SUMMARY_FAILURE:
                draft.peakSummaryLoading = false;
                draft.peakSummarySuccess = [];
                draft.peakSummaryFailure = true;
                break;
            // party size
            case PARTY_SIZE_REQUEST:
                draft.partySizeLoading = true;
                draft.partySizeSuccess = [];
                draft.partySizeFailure = false;
                break;
            case PARTY_SIZE_SUCCESS:
                draft.partySizeLoading = false;
                draft.partySizeSuccess = action.payload;
                draft.partySizeFailure = false;
                break;
            case PARTY_SIZE_FAILURE:
                draft.partySizeLoading = false;
                draft.partySizeSuccess = [];
                draft.partySizeFailure = true;
                break;
            // customer size
            case CUSTOMER_SIZE_REQUEST:
                draft.customerSizeLoading = true;
                draft.customerSizeSuccess = [];
                draft.customerSizeSuccessResponse = false;
                draft.customerSizeFailure = false;
                break;
            case CUSTOMER_SIZE_SUCCESS:
                draft.customerSizeLoading = false;
                draft.customerSizeSuccess = action.payload;
                draft.customerSizeSuccessResponse = true;
                draft.customerSizeFailure = false;
                break;
            case CUSTOMER_SIZE_FAILURE:
                draft.customerSizeLoading = false;
                draft.customerSizeSuccess = [];
                draft.customerSizeSuccessResponse = false;
                draft.customerSizeFailure = true;
                break;
            // new customer size
            case NEW_CUSTOMER_SIZE_REQUEST:
                draft.newCustomerSizeLoading = true;
                draft.customerSizeSuccess = [];
                draft.customerSizeFailure = false;
                draft.newCustomerSizeSuccessResponse = false;
                break;
            case NEW_CUSTOMER_SIZE_SUCCESS:
                draft.newCustomerSizeLoading = false;
                draft.newCustomerSizeSuccess = action.payload;
                draft.newCustomerSizeSuccessResponse = true;
                draft.newCustomerSizeFailure = false;
                break;
            case NEW_CUSTOMER_SIZE_FAILURE:
                draft.newCustomerSizeLoading = false;
                draft.newCustomerSizeSuccess = [];
                draft.newCustomerSizeFailure = true;
                draft.newCustomerSizeSuccessResponse = false;
                break;
            // customer details
            case CUSTOMER_DETAILS_REQUEST:
                draft.customerDetailsLoading = true;
                draft.customerDetailsSuccess = [];
                draft.customerDetailsFailure = false;
                break;
            case CUSTOMER_DETAILS_SUCCESS:
                draft.customerDetailsLoading = false;
                draft.customerDetailsSuccess = action.payload;
                draft.customerDetailsFailure = false;
                break;
            case CUSTOMER_DETAILS_FAILURE:
                draft.customerDetailsLoading = false;
                draft.customerDetailsSuccess = [];
                draft.customerDetailsFailure = true;
                break;
            // live Check-In status
            case LIVE_CHECKIN_STATUS_REQUEST:
                draft.liveCheckInStatusLoading = true;
                draft.liveCheckInStatusSuccess = [];
                draft.liveCheckInStatusFailure = false;
                break;
            case LIVE_CHECKIN_STATUS_SUCCESS:
                draft.liveCheckInStatusLoading = false;
                draft.liveCheckInStatusSuccess = action.payload;
                draft.liveCheckInStatusFailure = false;
                break;
            case LIVE_CHECKIN_STATUS_FAILURE:
                draft.liveCheckInStatusLoading = false;
                draft.liveCheckInStatusSuccess = [];
                draft.liveCheckInStatusFailure = true;
                break;
            case DAILY_CHECKIN_STATUS_REQUEST:
                draft.dailyCheckInStatusLoading = true;
                draft.dailyCheckInStatusSuccess = [];
                draft.dailyCheckInStatusFailure = false;
                break;
            case DAILY_CHECKIN_STATUS_SUCCESS:
                draft.dailyCheckInStatusLoading = false;
                draft.dailyCheckInStatusSuccess = action.payload;
                draft.dailyCheckInStatusFailure = false;
                break;
            case DAILY_CHECKIN_STATUS_FAILURE:
                draft.dailyCheckInStatusLoading = false;
                draft.dailyCheckInStatusSuccess = [];
                draft.dailyCheckInStatusFailure = true;
                break;
            case BILLED_UNBILLED_REQUEST:
                draft.billedUnbilledLoading = true;
                draft.billedUnbilledSuccess = [];
                draft.billedUnbilledFailure = false;
                break;
            case BILLED_UNBILLED_SUCCESS:
                draft.billedUnbilledLoading = false;
                draft.billedUnbilledSuccess = action.payload;
                draft.billedUnbilledFailure = false;
                break;
            case BILLED_UNBILLED_FAILURE:
                draft.billedUnbilledLoading = false;
                draft.billedUnbilledSuccess = [];
                draft.billedUnbilledFailure = true;
                break;
            case EMPLOYEE_SALES_OVERVIEW_REQUEST:
                draft.employeeSalesOverviewLoading = true;
                draft.employeeSalesOverviewSuccess = [];
                draft.employeeSalesOverviewFailure = false;
                break;
            case EMPLOYEE_SALES_OVERVIEW_SUCCESS:
                draft.employeeSalesOverviewLoading = false;
                draft.employeeSalesOverviewSuccess = action.payload;
                draft.employeeSalesOverviewFailure = false;
                break;
            case EMPLOYEE_SALES_OVERVIEW_FAILURE:
                draft.employeeSalesOverviewLoading = false;
                draft.employeeSalesOverviewSuccess = [];
                draft.employeeSalesOverviewFailure = true;
                break;
            // Voided Summary
            case VOIDED_SUMMARY_REQUEST:
                draft.voidedSummaryLoading = true;
                draft.voidedSummaryData = null;
                draft.voidedSummaryError = null;
                break;
            case VOIDED_SUMMARY_SUCCESS:
                draft.voidedSummaryLoading = false;
                draft.voidedSummaryData = action.payload;
                draft.voidedSummaryError = null;
                break;
            case VOIDED_SUMMARY_FAILURE:
                draft.voidedSummaryLoading = false;
                draft.voidedSummaryData = null;
                draft.voidedSummaryError = action.payload;
                break;

            // Dropdown Details
            case DROPDOWN_DETAILS_REQUEST:
                draft.dropdownDetailsLoading = true;
                draft.dropdownDetailsError = null;
                break;
            case DROPDOWN_DETAILS_SUCCESS:
                draft.dropdownDetailsLoading = false;
                draft.dropdownDetailsData = action.payload;
                draft.dropdownDetailsError = null;
                break;
            case DROPDOWN_DETAILS_FAILURE:
                draft.dropdownDetailsLoading = false;
                draft.dropdownDetailsData = [];
                draft.dropdownDetailsError = action.payload;
                break;

            // Category Channel Summary
            case CATEGORY_CHANNEL_SUMMARY_REQUEST:
                draft.categoryChannelSummaryLoading = true;
                draft.categoryChannelSummaryError = null;
                break;
            case CATEGORY_CHANNEL_SUMMARY_SUCCESS:
                draft.categoryChannelSummaryLoading = false;
                draft.categoryChannelSummaryData = action.payload;
                break;
            case CATEGORY_CHANNEL_SUMMARY_FAILURE:
                draft.categoryChannelSummaryLoading = false;
                draft.categoryChannelSummaryError = action.payload;
                break;

            // Category Sales
            case CATEGORY_SALES_REQUEST:
                draft.categorySalesLoading = true;
                draft.categorySalesError = null;
                break;
            case CATEGORY_SALES_SUCCESS:
                draft.categorySalesLoading = false;
                draft.categorySalesData = action.payload;
                draft.categorySalesError = null;
                break;
            case CATEGORY_SALES_FAILURE:
                draft.categorySalesLoading = false;
                draft.categorySalesError = action.payload;
                break;

            // Category Sales Summary
            case CATEGORY_SALES_SUMMARY_REQUEST:
                draft.categorySalesSummaryLoading = true;
                draft.categorySalesSummaryError = null;
                break;
            case CATEGORY_SALES_SUMMARY_SUCCESS:
                draft.categorySalesSummaryLoading = false;
                draft.categorySalesSummaryData = action.payload;
                draft.categorySalesSummaryError = null;
                break;
            case CATEGORY_SALES_SUMMARY_FAILURE:
                draft.categorySalesSummaryLoading = false;
                draft.categorySalesSummaryError = action.payload;
                break;

            // Location Details
            case LOCATION_DETAILS_REQUEST:
                draft.locationDetailsLoading = true;
                draft.locationDetailsError = null;
                break;
            case LOCATION_DETAILS_SUCCESS:
                draft.locationDetailsLoading = false;
                draft.locationDetailsData = action.payload;
                draft.locationDetailsError = null;
                break;
            case LOCATION_DETAILS_FAILURE:
                draft.locationDetailsLoading = false;
                draft.locationDetailsData = null;
                draft.locationDetailsError = action.payload;
                break;

            // Location Details
            case PAYMENT_DETAILS_REQUEST:
                draft.paymentDetailsLoading = true;
                draft.paymentDetailsError = null;
                break;
            case PAYMENT_DETAILS_SUCCESS:
                draft.paymentDetailsLoading = false;
                draft.paymentDetailsData = action.payload;
                draft.paymentDetailsError = null;
                break;
            case PAYMENT_DETAILS_FAILURE:
                draft.paymentDetailsLoading = false;
                draft.paymentDetailsData = [];
                draft.paymentDetailsError = action.payload;
                break;

            case SELCTED_LOCATION:
                draft.selectedLocation = action.payload;
                break;

            case STORE_LOCATIONS_LIST:
                draft.storeLocationsList = action.payload;
                break;

            // Staff Sales
            case STAFF_SALES_REQUEST:
                draft.staffSalesData = [];
                draft.staffSalesLoading = true;
                draft.staffSalesError = null;
                break;
            case STAFF_SALES_SUCCESS:
                draft.staffSalesData = action.payload;
                draft.staffSalesLoading = false;
                draft.staffSalesError = null;
                break;
            case STAFF_SALES_FAILURE:
                draft.staffSalesData = [];
                draft.staffSalesLoading = false;
                draft.staffSalesError = action.payload;
                break;

            // Sales Summary Report
            case SALES_SUMMARY_REPORT_REQUEST:
                draft.salesSummaryReportData = {};
                draft.salesSummaryReportLoading = true;
                draft.salesSummaryReportError = null;
                break;
            case SALES_SUMMARY_REPORT_SUCCESS:
                draft.salesSummaryReportData = action.payload;
                draft.salesSummaryReportLoading = false;
                draft.salesSummaryReportError = null;
                break;
            case SALES_SUMMARY_REPORT_FAILURE:
                draft.salesSummaryReportData = {};
                draft.salesSummaryReportLoading = false;
                draft.salesSummaryReportError = action.payload;
                break;

            // Sales Category
            case SALES_CATEGORY_REQUEST:
                draft.salesCategoryLoading = true;
                draft.salesCategoryData = null;
                draft.salesCategoryError = null;
                break;
            case SALES_CATEGORY_SUCCESS:
                draft.salesCategoryLoading = false;
                draft.salesCategoryData = action.payload;
                draft.salesCategoryError = null;
                break;
            case SALES_CATEGORY_FAILURE:
                draft.salesCategoryLoading = false;
                draft.salesCategoryData = null;
                draft.salesCategoryError = action.payload;
                break;

            // Sales Card Type
            case SALES_CARD_TYPE_REQUEST:
                draft.salesCardTypeLoading = true;
                draft.salesCardTypeData = [];
                draft.salesCardTypeError = null;
                break;
            case SALES_CARD_TYPE_SUCCESS:
                draft.salesCardTypeLoading = false;
                draft.salesCardTypeData = action.payload;
                draft.salesCardTypeError = null;
                break;
            case SALES_CARD_TYPE_FAILURE:
                draft.salesCardTypeLoading = false;
                draft.salesCardTypeData = [];
                draft.salesCardTypeError = action.payload;
                break;

            // Hourly Sales Report Chart
            case HOURLY_SALES_REPORT_CHART_REQUEST:
                draft.hourlySalesReportChartLoading = true;
                draft.hourlySalesReportChartData = null;
                draft.hourlySalesReportChartError = null;
                break;
            case HOURLY_SALES_REPORT_CHART_SUCCESS:
                draft.hourlySalesReportChartLoading = false;
                draft.hourlySalesReportChartData = action.payload;
                draft.hourlySalesReportChartError = null;
                break;
            case HOURLY_SALES_REPORT_CHART_FAILURE:
                draft.hourlySalesReportChartLoading = false;
                draft.hourlySalesReportChartData = null;
                draft.hourlySalesReportChartError = action.payload;
                break;

            // Sales By Channel
            case SALES_BY_CHANNEL_REQUEST:
                draft.salesByChannelLoading = true;
                draft.salesByChannelData = [];
                draft.salesByChannelError = null;
                break;
            case SALES_BY_CHANNEL_SUCCESS:
                draft.salesByChannelLoading = false;
                draft.salesByChannelData = action.payload;
                draft.salesByChannelError = null;
                break;
            case SALES_BY_CHANNEL_FAILURE:
                draft.salesByChannelLoading = false;
                draft.salesByChannelData = [];
                draft.salesByChannelError = action.payload;
                break;

            //get offer summary
            case GET_OFFER_SUMMARY_REQUEST:
                draft.offerSummaryLoading = true;
                draft.offerSummaryData = [];
                draft.offerSummaryError = null;
                break;
            case GET_OFFER_SUMMARY_SUCCESS:
                draft.offerSummaryLoading = false;
                draft.offerSummaryData = action.payload;
                draft.offerSummaryError = null;
                break;
            case GET_OFFER_SUMMARY_FAILURE:
                draft.offerSummaryLoading = false;
                draft.offerSummaryData = [];
                draft.offerSummaryError = action.payload;
                break;

            //get voided order summary
            case GET_VOIDED_ORDER_SUMMARY_REQUEST:
                draft.voidedOrderSummaryLoading = true;
                draft.voidedOrderSummaryData = [];
                draft.voidedOrderSummaryError = null;
                break;
            case GET_VOIDED_ORDER_SUMMARY_SUCCESS:
                draft.voidedOrderSummaryLoading = false;
                draft.voidedOrderSummaryData = action.payload;
                draft.voidedOrderSummaryError = null;
                break;
            case GET_VOIDED_ORDER_SUMMARY_FAILURE:
                draft.voidedOrderSummaryLoading = false;
                draft.voidedOrderSummaryData = [];
                draft.voidedOrderSummaryError = action.payload;
                break;

            default:
                break;
        }
    })
}