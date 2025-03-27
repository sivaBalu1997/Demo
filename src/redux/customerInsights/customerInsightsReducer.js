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
  SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_FAILURE,
  DETAILED_INSIGHTS_SUMMARY_REQUEST,
  DETAILED_INSIGHTS_SUMMARY_SUCCESS,
  DETAILED_INSIGHTS_SUMMARY_FAILURE,
  DETAILED_INSIGHTS_DINE_IN_SUCCESS,
  DETAILED_INSIGHTS_DINE_IN_FAILURE,
  DETAILED_INSIGHTS_DINE_IN_REQUEST,
  DETAILED_INSIGHTS_OFF_PREM_REQUEST,
  DETAILED_INSIGHTS_OFF_PREM_SUCCESS,
  DETAILED_INSIGHTS_OFF_PREM_FAILURE,
  DETAILED_INSIGHTS_CUSTOMERS_ORDER_REQUEST,
  DETAILED_INSIGHTS_CUSTOMERS_ORDER_SUCCESS,
  DETAILED_INSIGHTS_CUSTOMERS_ORDER_FAILURE,
  DETAILED_INSIGHTS_LATEST_ORDER_REQUEST,
  DETAILED_INSIGHTS_LATEST_ORDER_SUCCESS,
  DETAILED_INSIGHTS_LATEST_ORDER_FAILURE,
  DETAILED_INSIGHTS_CUSTOMERS_TOP_FAV_ITEM_REQUEST,
  DETAILED_INSIGHTS_CUSTOMERS_TOP_FAV_ITEM_SUCCESS,
  DETAILED_INSIGHTS_CUSTOMERS_TOP_FAV_ITEM_FAILURE,
  DETAILED_INSIGHTS_CUSTOMER_DETAILS_REQUEST,
  DETAILED_INSIGHTS_CUSTOMER_DETAILS_SUCCESS,
  DETAILED_INSIGHTS_CUSTOMER_DETAILS_FAILURE,
} from "./customerInsightsConstants";

const initialNewReportsState = {
  // Live Check In Overview
  summaryInsightsCustomerVolumeLoading: false,
  summaryInsightsCustomerVolumeSuccess: [],
  summaryInsightsCustomerVolumeFailure: false,

  summaryInsightsCustomerByTenureLoading: false,
  summaryInsightsCustomerByTenureSuccess: [],
  summaryInsightsCustomerByTenureFailure: false,

  summaryInsightsCustomerByTotalSpendLoading: false,
  summaryInsightsCustomerByTotalSpendSuccess: [],
  summaryInsightsCustomerByTotalSpendFailure: false,

  summaryInsightsCustomerByAvgCoverSizeLoading: false,
  summaryInsightsCustomerByAvgCoverSizeSuccess: [],
  summaryInsightsCustomerByAvgCoverSizeFailure: false,

  summaryInsightsCustomerByLoyaltyLoading: false,
  summaryInsightsCustomerByLoyaltySuccess: [],
  summaryInsightsCustomerByLoyaltyFailure: false,


  detailedInsightsCustomerDetailsLoading: false,
  detailedInsightsCustomerDetailsSuccess: [],
  detailedInsightsCustomerDetailsFailure: false,

  detailedInsightsSummaryLoading: false,
  detailedInsightsSummarySuccess: [],
  detailedInsightsSummaryFailure: false,

  detailedInsightsDineInLoading : false,
  detailedInsightsDineInSuccess :[],
 detailedInsightsDineInFailure : false,


 detailedInsightsOffPremSuccess :[],
 detailedInsightsOffPremLoading :false,
 detailedInsightsOffPremFailure : false,

 detailedInsightsCustomersOrderLoading : false,
 detailedInsightsCustomersOrderSuccess :[],
 detailedInsightsCustomersOrderFailure : false,



 detailedInsightsLatestOrderLoading :false,
 detailedInsightsLatestOrderSuccess : [],
 detailedInsightsLatestOrderFailure : false,

 detailedInsightsCustomersTopFavItemsLoading :false,
 detailedInsightsCustomersTopFavItemsSuccess : [],
 detailedInsightsCustomersTopFavItemsFailure : false,


};

export default function checkInReportsReducer(
  state = initialNewReportsState,
  action
) {
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

      case DETAILED_INSIGHTS_CUSTOMER_DETAILS_REQUEST:
        draft.detailedInsightsCustomerDetailsLoading = true;
        draft.detailedInsightsCustomerDetailsSuccess = [];
        draft.detailedInsightsCustomerDetailsFailure = false;
        break;
      case DETAILED_INSIGHTS_CUSTOMER_DETAILS_SUCCESS:
        draft.detailedInsightsCustomerDetailsSuccess = action.payload;
        draft.detailedInsightsCustomerDetailsLoading = false;
        draft.detailedInsightsCustomerDetailsFailure = false;
        break;
      case DETAILED_INSIGHTS_CUSTOMER_DETAILS_FAILURE:
        draft.detailedInsightsCustomerDetailsSuccess = [];
        draft.detailedInsightsCustomerDetailsLoading = false;
        draft.detailedInsightsCustomerDetailsFailure = true;
        break;
      case DETAILED_INSIGHTS_SUMMARY_REQUEST:
        draft.detailedInsightsSummaryLoading = true;
        draft.detailedInsightsSummarySuccess = [];
        draft.detailedInsightsSummaryFailure = false;
        break;
      case DETAILED_INSIGHTS_SUMMARY_SUCCESS:
        draft.detailedInsightsSummarySuccess =  action.payload?[action.payload]:[];
        draft.detailedInsightsSummaryLoading = false;
        draft.detailedInsightsSummaryFailure = false;
        break;
      case DETAILED_INSIGHTS_SUMMARY_FAILURE:
        draft.detailedInsightsSummarySuccess = [];
        draft.detailedInsightsSummaryLoading = false;
        draft.detailedInsightsSummaryFailure = true;
        break;


      case DETAILED_INSIGHTS_DINE_IN_REQUEST:
        draft.detailedInsightsDineInLoading = true;
        draft.detailedInsightsDineInSuccess = [];
        draft.detailedInsightsDineInFailure = false;
        break;
      case DETAILED_INSIGHTS_DINE_IN_SUCCESS:
        draft.detailedInsightsDineInSuccess =  action.payload?[action.payload]:[];
        draft.detailedInsightsDineInLoading = false;
        draft.detailedInsightsDineInFailure = false;
        break;
      case DETAILED_INSIGHTS_DINE_IN_FAILURE:
        draft.detailedInsightsDineInSuccess = [];
        draft.detailedInsightsDineInLoading = false;
        draft.detailedInsightsDineInFailure = true;
        break;



      case DETAILED_INSIGHTS_OFF_PREM_REQUEST:
        draft.detailedInsightsOffPremLoading = true;
        draft.detailedInsightsOffPremSuccess = [];
        draft.detailedInsightsOffPremFailure = false;
        break;
      case DETAILED_INSIGHTS_OFF_PREM_SUCCESS:
        draft.detailedInsightsOffPremSuccess =  action.payload?[action.payload]:[];
        draft.detailedInsightsOffPremLoading = false;
        draft.detailedInsightsOffPremFailure = false;
        break;
      case DETAILED_INSIGHTS_OFF_PREM_FAILURE:
        draft.detailedInsightsOffPremSuccess = [];
        draft.detailedInsightsOffPremLoading = false;
        draft.detailedInsightsOffPremFailure = true;
        break;


      case DETAILED_INSIGHTS_CUSTOMERS_ORDER_REQUEST:
        draft.detailedInsightsCustomersOrderLoading = true;
        draft.detailedInsightsCustomersOrderSuccess = [];
        draft.detailedInsightsCustomersOrderFailure = false;
        break;
      case DETAILED_INSIGHTS_CUSTOMERS_ORDER_SUCCESS:
        draft.detailedInsightsCustomersOrderSuccess = action.payload;
        draft.detailedInsightsCustomersOrderLoading = false;
        draft.detailedInsightsCustomersOrderFailure = false;
        break;
      case DETAILED_INSIGHTS_CUSTOMERS_ORDER_FAILURE:
        draft.detailedInsightsCustomersOrderSuccess = [];
        draft.detailedInsightsCustomersOrderLoading = false;
        draft.detailedInsightsCustomersOrderFailure = true;
        break;



      case DETAILED_INSIGHTS_LATEST_ORDER_REQUEST:
        draft.detailedInsightsLatestOrderLoading = true;
        draft.detailedInsightsLatestOrderSuccess = [];
        draft.detailedInsightsLatestOrderFailure = false;
        break;
      case DETAILED_INSIGHTS_LATEST_ORDER_SUCCESS:
        draft.detailedInsightsLatestOrderSuccess = action.payload?[action.payload]:[];
        draft.detailedInsightsLatestOrderLoading = false;
        draft.detailedInsightsLatestOrderFailure = false;
        break;
      case DETAILED_INSIGHTS_LATEST_ORDER_FAILURE:
        draft.detailedInsightsLatestOrderSuccess = [];
        draft.detailedInsightsLatestOrderLoading = false;
        draft.detailedInsightsLatestOrderFailure = true;
        break;




     case DETAILED_INSIGHTS_CUSTOMERS_TOP_FAV_ITEM_REQUEST:
        draft.detailedInsightsCustomersTopFavItemsLoading = true;
        draft.detailedInsightsCustomersTopFavItemsSuccess = [];
        draft.detailedInsightsCustomersTopFavItemsFailure = false;
        break;
      case DETAILED_INSIGHTS_CUSTOMERS_TOP_FAV_ITEM_SUCCESS:
        draft.detailedInsightsCustomersTopFavItemsSuccess = action.payload;
        draft.detailedInsightsCustomersTopFavItemsLoading = false;
        draft.detailedInsightsCustomersTopFavItemsFailure = false;
        break;
      case DETAILED_INSIGHTS_CUSTOMERS_TOP_FAV_ITEM_FAILURE:
        draft.detailedInsightsCustomersTopFavItemsSuccess = [];
        draft.detailedInsightsCustomersTopFavItemsLoading = false;
        draft.detailedInsightsCustomersTopFavItemsFailure = true;
        break;
      default:
        break;
    }
  });
}
