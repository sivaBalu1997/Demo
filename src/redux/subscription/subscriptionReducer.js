import { produce } from "immer";
import { act } from "react-dom/test-utils";
import {
  GET_SUBSCRIPTION_PLAN_REQUEST,
  GET_SUBSCRIPTION_PLAN_SUCCESS,
  GET_SUBSCRIPTION_PLAN_FAILURE,
  CREATE_SUBSCRIPTION_FAILURE,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_REQUEST,
  CLEAR_SUBSCRIPTION_REQUEST,
  SUBSCRIPTION_BILLING_REQUEST,
  SUBSCRIPTION_BILLING_REQUEST_SUCCESS,
  SUBSCRIPTION_BILLING_REQUEST_FAILURE,
  CANCEL_SUBSCRIPTION_REQUEST,
  UPDATE_SUBSCRIPTION_REQUEST,
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAILURE,
  CLEAR_UPDATE_SUBSCRIPTION,
} from "../subscription/subscriptionConstants";

const initialSubscriptionState = {
  getPlanLoading: false,
  getPlanSuccess: false,

  createSubscriptionLoading: false,
  createSubscriptionSuccess: false,
  createSubscriptionFailure: false,

  updateSubscriptionLoading: false,
  updateSubscriptionSuccess: false,
  updateSubscriptionFailure: false,

  getSubscriptionDetailsLoading : true,

  subscriptionPlan: [],
  subscriptionShortURL: null,
  subscriptionDetails: null,
  invoiceDetails: [],
};

export default function subscriptionReducer(
  state = initialSubscriptionState,
  action
) {
  return produce(state, (draft) => {
    switch (action.type) {
      // Get Subcription Plan
      case GET_SUBSCRIPTION_PLAN_REQUEST:
        draft.subscriptionPlan = [];
        draft.getPlanLoading = true;
        break;
      case GET_SUBSCRIPTION_PLAN_SUCCESS:
        draft.subscriptionPlan = action.payload;
        draft.getPlanLoading = false;
        draft.getPlanSuccess = true;
        draft.getPlanErrorMessage = "";

        break;
      case GET_SUBSCRIPTION_PLAN_FAILURE:
        draft.getPlanLoading = false;
        draft.getPlanSuccess = false;
        draft.getPlanErrorMessage = action.payload;
        break;

      // Create Subscription
      case CREATE_SUBSCRIPTION_REQUEST:
        draft.createSubscriptionLoading = true;
        break;
      case CREATE_SUBSCRIPTION_SUCCESS:
        draft.createSubscriptionLoading = false;
        draft.subscriptionShortURL = action.payload;
        draft.createSubscriptionSuccess = true;
        break;
      case CREATE_SUBSCRIPTION_FAILURE:
        draft.createSubscriptionLoading = false;
        draft.createSubscriptionFailure = true;
        break;
      case CLEAR_SUBSCRIPTION_REQUEST:
        draft.createSubscriptionSuccess = false;
        draft.createSubscriptionFailure = false;
        draft.subscriptionShortURL = null;
        break;

      case CANCEL_SUBSCRIPTION_REQUEST:
        draft.updateSubscriptionLoading = true;
        break;
      // Update Subscription
      case UPDATE_SUBSCRIPTION_REQUEST:
        draft.updateSubscriptionLoading = true;
        break;
      case UPDATE_SUBSCRIPTION_SUCCESS:
        draft.updateSubscriptionLoading = false;
        draft.updateSubscriptionSuccess = true;
        break;
      case UPDATE_SUBSCRIPTION_FAILURE:
        draft.updateSubscriptionLoading = false;
        draft.updateSubscriptionFailure = true;
        break;
      case CLEAR_UPDATE_SUBSCRIPTION:
        draft.updateSubscriptionSuccess = false;
        draft.updateSubscriptionFailure = false;
        break;
      case SUBSCRIPTION_BILLING_REQUEST:
        draft.getSubscriptionDetailsLoading = true;
        break;
      case SUBSCRIPTION_BILLING_REQUEST_SUCCESS:
        draft.subscriptionDetails = action.payload.subscriptionDetails;
        draft.invoiceDetails = action.payload.invoiceDetails;
        draft.getSubscriptionDetailsLoading = false;
        break;
      case SUBSCRIPTION_BILLING_REQUEST_FAILURE:
        draft.getSubscriptionDetailsLoading = false;
      default:
        break;
    }
  });
}
