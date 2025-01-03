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
} from "../newReports/newReportsConstants";
import { actualSalesSuccess } from "./newReportsActions";


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
};

export default function reportsReducer(state = initialNewReportsState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
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
            default:
                break;
        }
    })
}
