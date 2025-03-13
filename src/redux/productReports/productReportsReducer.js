import { produce } from "immer";
import {
    PRODUCT_INSIGHTS_TOP_REVENUE_REQUEST,
    PRODUCT_INSIGHTS_TOP_REVENUE_SUCCESS,
    PRODUCT_INSIGHTS_TOP_REVENUE_FAILURE,

    PRODUCT_INSIGHTS_TOP_POPULAR_REQUEST,
    PRODUCT_INSIGHTS_TOP_POPULAR_SUCCESS,
    PRODUCT_INSIGHTS_TOP_POPULAR_FAILURE,

    PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_REQUEST,
    PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_SUCCESS,
    PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_FAILURE,

    PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_REQUEST,
    PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_SUCCESS,
    PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_FAILURE,

    PRODUCT_INSIGHTS_CANCELLED_ITEMS_REQUEST,
    PRODUCT_INSIGHTS_CANCELLED_ITEMS_SUCCESS,
    PRODUCT_INSIGHTS_CANCELLED_ITEMS_FAILURE,

    PRODUCT_INSIGHTS_CANCELLED_REASONS_REQUEST,
    PRODUCT_INSIGHTS_CANCELLED_REASONS_SUCCESS,
    PRODUCT_INSIGHTS_CANCELLED_REASONS_FAILURE,

    PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_REQUEST,
    PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_SUCCESS,
    PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_FAILURE,

    PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_REQUEST,
    PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_SUCCESS,
    PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_FAILURE,

    PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_REQUEST,
    PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_SUCCESS,
    PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_FAILURE,
} from "./productReportsConstants";
   

const initialNewReportsState = {
    // Top Revenue
    topRevenueLoading: false,
    topRevenueSuccess: [],
    topRevenueFailure: false,

    // Top Popular
    topPopularLoading: false,
    topPopularSuccess: [],
    topPopularFailure: false,

    // Top Popular Revenue
    topPopularRevenueLoading: false,
    topPopularRevenueSuccess: [],
    topPopularRevenueFailure: false,

    // Top Revenue Streams
    topRevenueStreamsLoading: false,
    topRevenueStreamsSuccess: [],
    topRevenueStreamsFailure: false,

    // Cancelled Items
    cancelledItemsLoading: false,
    cancelledItemsSuccess: [],
    cancelledItemsFailure: false,

    // Cancelled Reasons
    cancelledReasonsLoading: false,
    cancelledReasonsSuccess: [],
    cancelledReasonsFailure: false,

    // Items Cancelled Reasons
    itemsCancelledReasonsLoading: false,
    itemsCancelledReasonsSuccess: [],
    itemsCancelledReasonsFailure: false,

    // Availability By Channels
    availabilityByChannelsLoading: false,
    availabilityByChannelsSuccess: [],
    availabilityByChannelsFailure: false,

    // Availability By Channels Details
    availabilityByChannelsDetailsLoading: false,
    availabilityByChannelsDetailsSuccess: [],
    availabilityByChannelsDetailsFailure: false,

 
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

            case PRODUCT_INSIGHTS_TOP_POPULAR_REQUEST:
                draft.topPopularLoading = true;
                draft.topPopularSuccess = [];
                draft.topPopularFailure = false;
                break;
            case PRODUCT_INSIGHTS_TOP_POPULAR_SUCCESS:
                draft.topPopularSuccess = action.payload;
                draft.topPopularLoading = false;
                draft.topPopularFailure = false;
                break;
            case PRODUCT_INSIGHTS_TOP_POPULAR_FAILURE:
                draft.topPopularSuccess = [];
                draft.topPopularLoading = false;
                draft.topPopularFailure = true;
                break;

            case PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_REQUEST:
                draft.topPopularRevenueLoading = true;
                draft.topPopularRevenueSuccess = [];
                draft.topPopularRevenueFailure = false;
                break;
            case PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_SUCCESS:
                draft.topPopularRevenueSuccess = action.payload;
                draft.topPopularRevenueLoading = false;
                draft.topPopularRevenueFailure = false;
                break;
            case PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_FAILURE:
                draft.topPopularRevenueSuccess = [];
                draft.topPopularRevenueLoading = false;
                draft.topPopularRevenueFailure = true;
                break;

            case PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_REQUEST:
                draft.topRevenueStreamsLoading = true;
                draft.topRevenueStreamsSuccess = [];
                draft.topRevenueStreamsFailure = false;
                break;
            case PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_SUCCESS:
                draft.topRevenueStreamsSuccess = action.payload;
                draft.topRevenueStreamsLoading = false;
                draft.topRevenueStreamsFailure = false;
                break;
            case PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_FAILURE:
                draft.topRevenueStreamsSuccess = [];
                draft.topRevenueStreamsLoading = false;
                draft.topRevenueStreamsFailure = true;
                break;

            case PRODUCT_INSIGHTS_CANCELLED_ITEMS_REQUEST:
                draft.cancelledItemsLoading = true;
                draft.cancelledItemsSuccess = [];
                draft.cancelledItemsFailure = false;
                break;
            case PRODUCT_INSIGHTS_CANCELLED_ITEMS_SUCCESS:
                draft.cancelledItemsSuccess = action.payload;
                draft.cancelledItemsLoading = false;
                draft.cancelledItemsFailure = false;
                break;
            case PRODUCT_INSIGHTS_CANCELLED_ITEMS_FAILURE:
                draft.cancelledItemsSuccess = [];
                draft.cancelledItemsLoading = false;
                draft.cancelledItemsFailure = true;
                break;

            case PRODUCT_INSIGHTS_CANCELLED_REASONS_REQUEST:
                draft.cancelledReasonsLoading = true;
                draft.cancelledReasonsSuccess = [];
                draft.cancelledReasonsFailure = false;
                break;
            case PRODUCT_INSIGHTS_CANCELLED_REASONS_SUCCESS:
                draft.cancelledReasonsSuccess = action.payload;
                draft.cancelledReasonsLoading = false;
                draft.cancelledReasonsFailure = false;
                break;
            case PRODUCT_INSIGHTS_CANCELLED_REASONS_FAILURE:
                draft.cancelledReasonsSuccess = [];
                draft.cancelledReasonsLoading = false;
                draft.cancelledReasonsFailure = true;
                break;

            case PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_REQUEST:
                draft.itemsCancelledReasonsLoading = true;
                draft.itemsCancelledReasonsSuccess = [];
                draft.itemsCancelledReasonsFailure = false;
                break;
            case PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_SUCCESS:
                draft.itemsCancelledReasonsSuccess = action.payload;
                draft.itemsCancelledReasonsLoading = false;
                draft.itemsCancelledReasonsFailure = false;
                break;
            case PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_FAILURE:
                draft.itemsCancelledReasonsSuccess = [];
                draft.itemsCancelledReasonsLoading = false;
                draft.itemsCancelledReasonsFailure = true;
                break;

            case PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_REQUEST:
                draft.availabilityByChannelsLoading = true;
                draft.availabilityByChannelsSuccess = [];
                draft.availabilityByChannelsFailure = false;
                break;
            case PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_SUCCESS:
                draft.availabilityByChannelsSuccess = action.payload;
                draft.availabilityByChannelsLoading = false;
                draft.availabilityByChannelsFailure = false;
                break;
            case PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_FAILURE:
                draft.availabilityByChannelsSuccess = [];
                draft.availabilityByChannelsLoading = false;
                draft.availabilityByChannelsFailure = true;
                break;

            case PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_REQUEST:
                draft.availabilityByChannelsDetailsLoading = true;
                draft.availabilityByChannelsDetailsSuccess = [];
                draft.availabilityByChannelsDetailsFailure = false;
                break;
            case PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_SUCCESS:
                draft.availabilityByChannelsDetailsSuccess = action.payload;
                draft.availabilityByChannelsDetailsLoading = false;
                draft.availabilityByChannelsDetailsFailure = false;
                break;
            case PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_FAILURE:
                draft.availabilityByChannelsDetailsSuccess = [];
                draft.availabilityByChannelsDetailsLoading = false;
                draft.availabilityByChannelsDetailsFailure = true;
                break;

            default:
                break;
        }
    })
}