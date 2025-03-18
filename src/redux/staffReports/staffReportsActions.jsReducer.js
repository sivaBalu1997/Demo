import { produce } from "immer";
import {
    PRODUCT_INSIGHTS_TOP_REVENUE_REQUEST,
    PRODUCT_INSIGHTS_TOP_REVENUE_SUCCESS,
    PRODUCT_INSIGHTS_TOP_REVENUE_FAILURE,

   
} from "./productReportsConstants";
   

const initialNewReportsState = {
    // Top Revenue
    topRevenueLoading: false,
    topRevenueSuccess: [],
    topRevenueFailure: false,

 
};

export default function checkInReportsReducer(state = initialNewReportsState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case PRODUCT_INSIGHTS_TOP_REVENUE_REQUEST:
                draft.topRevenueLoading = true;
                draft.topRevenueSuccess = [];
                draft.topRevenueFailure = false;
                break;
            case PRODUCT_INSIGHTS_TOP_REVENUE_SUCCESS:
                draft.topRevenueSuccess = action.payload;
                draft.topRevenueLoading = false;
                draft.topRevenueFailure = false;
                break;
            case PRODUCT_INSIGHTS_TOP_REVENUE_FAILURE:
                draft.topRevenueSuccess = [];
                draft.topRevenueLoading = false;
                draft.topRevenueFailure = true;
                break;

           

            default:
                break;
        }
    })
}