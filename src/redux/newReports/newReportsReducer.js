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
} from "../newReports/newReportsConstants";



const initialNewReportsState = {
    SalesSummaryLoading: false,
    salesSummarySuccess: [],
    salesSummaryFailure: false,
    salesByItemCategoryLoading: false,
    salesByItemCategorySuccess: [],
    salesByItemCategoryFailure: false,
    salesByRevenueClassLoading: false,
    salesByRevenueClassSuccess: [],
    salesByRevenueClassFailure: false,
    actualSalesLoading: false,
    actualSalesSuccess: [],
    actualSalesFailure: false,
    actualThirdPartySalesLoading: false,
    actualThirdPartySalesSuccess: [],
    actualThirdPartySalesFailure: false,
    hourlySalesLoading: false,
    hourlySalesSuccess: [],
    hourlySalesFailure: false,
    liveDiscountLoading: false,
    liveDiscountSuccess: [],
    liveDiscountFailure: false,
    liveOpenSalesLoading: false,
    liveOpenSalesSuccess: [],
    liveOpenSalesFailure: false,
    liveOrdersLoading: false,
    liveOrdersSuccess: [],
    liveOrdersFailure: false,
    liveRefundsLoading: false,
    liveRefundsSuccess: [],
    liveRefundsFailure: false,
    liveNetSalesLoading: false,
    liveNetSalesSuccess: [],
    liveNetSalesFailure: false,
    liveOrderNonDineInLoading: false,
    liveOrderNonDineInSuccess: [],
    liveOrderNonDineInFailure: false,
};

export default function reportsReducer(state = initialNewReportsState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            // Sales Summary :
            case SALES_SUMMARY_REQUEST:
                draft.salesSummarySuccess = [];
                draft.SalesSummaryLoading = true;
                draft.salesSummaryFailure = false;
                break;
            case SALES_SUMMARY_SUCCESS:
                draft.salesSummarySuccess = action.payload;
                draft.SalesSummaryLoading = false;
                draft.salesSummaryFailure = false;
                break;
            case SALES_SUMMARY_FAILURE:
                draft.salesSummarySuccess = [];
                draft.SalesSummaryLoading = false;
                draft.salesSummaryFailure = true;
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
            default:
                break;
        }
    })
}
