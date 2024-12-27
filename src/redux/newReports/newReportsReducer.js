import { produce } from "immer";
import {
    SALES_SUMMARY_SUCCESS,
    SALES_SUMMARY_REQUEST,
    SALES_SUMMARY_FAILURE,
} from "../newReports/newReportsConstants";


const initialNewReportsState = {
    SalesSummaryloading: false,
    salesSummarySuccess: [],
    salesSummaryFailure: false,
};

export default function reportsReducer(state = initialNewReportsState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case SALES_SUMMARY_REQUEST:
                draft.salesSummarySuccess = [];
                draft.SalesSummaryloading = true;
                draft.salesSummaryFailure = false;
                break;
            case SALES_SUMMARY_SUCCESS:
                draft.salesSummarySuccess = action.payload;
                draft.SalesSummaryloading = false;
                draft.salesSummaryFailure = false;
                break;
            case SALES_SUMMARY_FAILURE:
                draft.salesSummarySuccess = [];
                draft.SalesSummaryloading = false;
                draft.salesSummaryFailure = true;
                break;
            default:
                break;
        }
    })
}
