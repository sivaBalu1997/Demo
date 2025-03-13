import { produce } from "immer";
import {
    SUMMARY_INSIGHTS_CUSTOMER_VOLUME_REQUEST,
    SUMMARY_INSIGHTS_CUSTOMER_VOLUME_SUCCESS,
    SUMMARY_INSIGHTS_CUSTOMER_VOLUME_FAILURE,
    SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_REQUEST,
    SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_SUCCESS,
    SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_FAILURE,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_REQUEST,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_SUCCESS,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_FAILURE,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_REQUEST,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_SUCCESS,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_FAILURE,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_REQUEST,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_SUCCESS,
    SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_FAILURE

} from "./customerInsightsConstants";

const initialNewReportsState = {
    // Live Check In Overview
    summaryInsightsCustomerVolumeLoading: false,
    summaryInsightsCustomerVolumeSuccess: [],
    summaryInsightsCustomerVolumeFailure: false,



    summaryInsightsCustomerByTenureLoading: false,
    summaryInsightsCustomerByTenureSuccess: [],
    summaryInsightsCustomerByTenureFailure: false,

   summaryInsightsCustomerByTotalSpendLoading : false,
    summaryInsightsCustomerByTotalSpendSuccess : [],
   summaryInsightsCustomerByTotalSpendFailure :false,

   summaryInsightsCustomerByAvgCoverSizeLoading : false,
   summaryInsightsCustomerByAvgCoverSizeSuccess : [],
   summaryInsightsCustomerByAvgCoverSizeFailure :false,


   summaryInsightsCustomerByLoyaltyLoading : false,
   summaryInsightsCustomerByLoyaltySuccess : [],
   summaryInsightsCustomerByLoyaltyFailure :false,
};

export default function checkInReportsReducer(state = initialNewReportsState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case SUMMARY_INSIGHTS_CUSTOMER_VOLUME_REQUEST:
                draft.summaryInsightsCustomerVolumeLoading = true;
                draft.summaryInsightsCustomerVolumeSuccess = [];
                draft.summaryInsightsCustomerVolumeFailure = false;
                break;
            case SUMMARY_INSIGHTS_CUSTOMER_VOLUME_SUCCESS:
                draft.summaryInsightsCustomerVolumeSuccess = action.payload;
                draft.summaryInsightsCustomerVolumeLoading = false;
                draft.summaryInsightsCustomerVolumeFailure = false;
                break;
            case SUMMARY_INSIGHTS_CUSTOMER_VOLUME_FAILURE:
                draft.summaryInsightsCustomerVolumeSuccess = [];
                draft.summaryInsightsCustomerVolumeLoading = false;
                draft.summaryInsightsCustomerVolumeFailure = true;
                break;


            case SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_REQUEST:
                draft.summaryInsightsCustomerByTenureLoading = true;
                draft.summaryInsightsCustomerByTenureSuccess = [];
                draft.summaryInsightsCustomerByTenureFailure = false;
                break;
            case SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_SUCCESS:
                draft.summaryInsightsCustomerByTenureSuccess = action.payload;
                draft.summaryInsightsCustomerByTenureLoading = false;
                draft.summaryInsightsCustomerByTenureFailure = false;
                break;
            case SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_FAILURE:
                draft.summaryInsightsCustomerByTenureSuccess = [];
                draft.summaryInsightsCustomerByTenureLoading = false;
                draft.summaryInsightsCustomerByTenureFailure = true;
                break;




            case SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_REQUEST:
                draft.summaryInsightsCustomerByTotalSpendLoading = true;
                draft.summaryInsightsCustomerByTotalSpendSuccess = [];
                draft.summaryInsightsCustomerByTotalSpendFailure = false;
                break;
            case SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_SUCCESS:
                draft.summaryInsightsCustomerByTotalSpendSuccess = action.payload;
                draft.summaryInsightsCustomerByTotalSpendLoading = false;
                draft.summaryInsightsCustomerByTotalSpendFailure = false;
                break;
            case SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_FAILURE:
                draft.summaryInsightsCustomerByTotalSpendSuccess = [];
                draft.summaryInsightsCustomerByTotalSpendLoading = false;
                draft.summaryInsightsCustomerByTotalSpendFailure = true;
                break;




            case SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_REQUEST:
                draft.summaryInsightsCustomerByAvgCoverSizeLoading = true;
                draft.summaryInsightsCustomerByAvgCoverSizeSuccess = [];
                draft.summaryInsightsCustomerByAvgCoverSizeFailure = false;
                break;
            case SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_SUCCESS:
                draft.summaryInsightsCustomerByAvgCoverSizeSuccess = action.payload;
                draft.summaryInsightsCustomerByAvgCoverSizeLoading = false;
                draft.summaryInsightsCustomerByAvgCoverSizeFailure = false;
                break;
            case SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_FAILURE:
                draft.summaryInsightsCustomerByAvgCoverSizeSuccess = [];
                draft.summaryInsightsCustomerByAvgCoverSizeLoading = false;
                draft.summaryInsightsCustomerByAvgCoverSizeFailure = true;
                break;

          


            case SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_REQUEST:
                draft.summaryInsightsCustomerByLoyaltyLoading = true;
                draft.summaryInsightsCustomerByLoyaltySuccess = [];
                draft.summaryInsightsCustomerByLoyaltyFailure = false;
                break;
            case SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_SUCCESS:
                draft.summaryInsightsCustomerByLoyaltySuccess = action.payload;
                draft.summaryInsightsCustomerByLoyaltyLoading = false;
                draft.summaryInsightsCustomerByLoyaltyFailure = false;
                break;
            case SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_FAILURE:
                draft.summaryInsightsCustomerByLoyaltySuccess = [];
                draft.summaryInsightsCustomerByLoyaltyLoading = false;
                draft.summaryInsightsCustomerByLoyaltyFailure = true;
                break;

                                        
            default:
                break;
        }
    })
}