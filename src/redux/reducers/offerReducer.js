import { produce } from "immer";
import {
  OFFER_LIST_REQUEST,
  OFFER_LIST_SUCCESS,
  OFFER_LIST_FAILURE,
  OFFER_DISABLE_REQUEST,
  OFFER_DELETE_REQUEST,
  SET_OFFER_STATUS,
  OFFER_DELETE_SUCCESS,
  OFFER_DELETE_FAILURE,
  OFFER_DISABLE_SUCCESS,
  CREATE_OFFER_REQUEST,
  CREATE_OFFER_SUCCESS,
  CREATE_OFFER_FAILURE,
  DROPDOWN_DATA_REQUEST,
  DROPDOWN_DATA_SUCCESS,
  DROPDOWN_DATA_FAILURE,
  EDIT_OFFER_REQUEST,
  EDIT_OFFER_SUCCESS,
  EDIT_OFFER_FAILURE,
  DELETE_OFFER_REQUEST,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAILED,
  RESET_DELETE_DATA,
} from "../constants/offerConstants";

const initialOfferState = {
  // Outlets
  offerList: [],

  offerListLoading: true,
  offerListFailure: "",
  isSelectedOfferDeleted: false,
  isSelectedOfferDisabled: false,
  offerStatus: 1,
  createOffer: [],
  createOfferLoading: true,
  createOfferFailure: false,
  dropdownData: [],
  dropdowndataLoading: true,
  dropdowndataFailure: "",
  EditOffer: [],
  EditOfferLoading: true,
  EditOfferFailure: "",
  addOfferSuccess: false,
  addOfferFailed: false,
  addOfferSuccessMessage: "",
  addOfferFailedMessage: "",
  updateOfferSuccess: false,
  updateOfferFailed: false,
  updateOfferSuccessMessage: "",
  updateOfferFailureMessage: "",
  deleteOfferLoading: false,
  deleteOfferSuccess: false,
  deleteOfferFailed: false,
  deleteOfferSuccessMessage: "",
  deleteOfferFailureMessage: "",
};

export default function offerReducer(state = initialOfferState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      // SignUp Reducers
      case OFFER_LIST_REQUEST:
        draft.offerList = [];
        draft.offerListLoading = true;
        break;
      case OFFER_LIST_SUCCESS:
        draft.offerList = action.payload;
        draft.offerListLoading = false;
        break;
      case OFFER_LIST_FAILURE:
        draft.offerListLoading = false;
        draft.offerListFailure = "";
        break;

      //  Create Offer Reducers
      case CREATE_OFFER_REQUEST:
        draft.createOffer = [];
        draft.createOfferLoading = true;
        draft.addOfferSuccess = false;
        draft.addOfferFailed = false;
        draft.addOfferSuccessMessage = "";
        draft.addOfferFailedMessage = "";
        break;
      case CREATE_OFFER_SUCCESS:
        draft.createOffer = action.payload;
        draft.createOfferLoading = false;
        draft.addOfferSuccess = true;
        draft.addOfferFailed = false;
        draft.addOfferSuccessMessage = "";
        draft.addOfferFailedMessage = "";

        break;
      case CREATE_OFFER_FAILURE:
        draft.createOfferLoading = false;
        draft.createOfferFailure = true;
        draft.addOfferSuccess = false;
        draft.addOfferFailed = false;
        draft.addOfferSuccessMessage = "";
        draft.addOfferFailedMessage = action.payload;
        break;

      case EDIT_OFFER_REQUEST:
        draft.EditOffer = [];
        draft.EditOfferLoading = true;
        draft.updateOfferFailed = false;
        draft.updateOfferSuccess = false;
        draft.updateOfferFailureMessage = "";
        draft.updateOfferSuccessMessage = "";

        break;
      case EDIT_OFFER_SUCCESS:
        draft.EditOffer = action.payload;
        draft.EditOfferLoading = false;
        draft.updateOfferFailed = false;
        draft.updateOfferSuccess = true;
        draft.updateOfferFailureMessage = "";
        draft.updateOfferSuccessMessage = action.payload;

        break;
      case EDIT_OFFER_FAILURE:
        draft.EditOfferLoading = false;
        draft.EditOfferFailure = "";
        draft.updateOfferFailed = true;
        draft.updateOfferSuccess = false;
        draft.updateOfferFailureMessage = action.payload;
        draft.updateMenuItemSuccessMessage = "";

        break;

      case DROPDOWN_DATA_REQUEST:
        draft.dropdownData = [];
        draft.dropdowndataLoading = true;
        break;
      case DROPDOWN_DATA_SUCCESS:
        draft.dropdownData = action.payload;
        draft.dropdowndataLoading = false;
        break;
      case DROPDOWN_DATA_FAILURE:
        draft.dropdowndataLoading = false;
        draft.dropdowndataFailure = "";
        break;

      // Delete Offer
      case DELETE_OFFER_REQUEST:
        draft.deleteOfferLoading = true;
        draft.deleteOfferFailed = false;
        draft.deleteOfferSuccess = false;
        draft.deleteOfferFailureMessage = "";
        draft.deleteOfferSuccessMessage = "";
        break;
      case DELETE_OFFER_SUCCESS:
        draft.deleteOfferLoading = false;
        draft.deleteOfferFailed = false;
        draft.deleteOfferSuccess = true;
        draft.deleteOfferFailureMessage = "";
        draft.deleteOfferSuccessMessage = action.payload;
        break;
      case DELETE_OFFER_FAILED:
        draft.deleteOfferLoading = false;
        draft.deleteOfferFailed = true;
        draft.deleteOfferSuccess = false;
        draft.deleteOfferFailureMessage = action.payload;
        draft.deleteOfferSuccessMessage = "";
        break;

      case RESET_DELETE_DATA:
        draft.deleteOfferLoading = false;
        draft.deleteOfferFailed = false;
        draft.deleteOfferSuccess = false;
        draft.deleteOfferFailureMessage = "";
        draft.deleteOfferSuccessMessage = "";
        break;

     
      case OFFER_DISABLE_REQUEST:
        draft.offerListLoading = false;
        draft.offerListFailure = "";
        break;
   
      case OFFER_DISABLE_SUCCESS:
        if (action.payload.metaDataInfo.responseCode === "ERROR") {
          draft.isSelectedOfferDisabled = false;
        } else if (action.payload.metaDataInfo.responseCode === "SUCCESS") {
          draft.isSelectedOfferDisabled = true;
        }

        break;
      case SET_OFFER_STATUS:
        draft.offerStatus = action.payload;
        break;
      default:
        break;
    }
  });
}
