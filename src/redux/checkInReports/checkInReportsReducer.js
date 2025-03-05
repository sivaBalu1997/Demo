import { produce } from "immer";
import {
    SALES_SUMMARY_SUCCESS,
    SALES_SUMMARY_REQUEST,
    SALES_SUMMARY_FAILURE,
    
} from "./checkInReportsConstants";

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
   
};

export default function checkInReportsReducer(state = initialNewReportsState, action) {
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
            
            default:
                break;
        }
    })
}