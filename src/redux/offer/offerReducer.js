import { produce } from "immer";
import {
  OFFER_LIST_REQUEST,
  OFFER_LIST_SUCCESS,
  OFFER_LIST_FAILURE,
  SET_OFFER_STATUS,
  CREATE_OFFER_REQUEST,
  CREATE_OFFER_SUCCESS,
  CREATE_OFFER_FAILURE,
  CREATE_OFFER_CLEAR,
  DROPDOWN_DATA_REQUEST,
  DROPDOWN_DATA_SUCCESS,
  DROPDOWN_DATA_FAILURE,
  EDIT_OFFER_REQUEST,
  EDIT_OFFER_SUCCESS,
  EDIT_OFFER_FAILURE,
  UPDATE_OFFER_CLEAR,
  DELETE_OFFER_REQUEST,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAILED,
  RESET_DELETE_DATA,
  DISABLE_OFFER_REQUEST,
  DISABLE_OFFER_SUCCESS,
  DISABLE_OFFER_FAILED,
  RESET_DISABLE_DATA,
  OFFER_DATA_REQUEST,
  OFFER_DATA_SUCCESS,
  OFFER_DATA_FAILED,
} from "../offer/offerConstants";

const initialOfferState = {
  // Outlets
  offerList: [],

  offerListLoading: true,
  offerListFailure: "",
  isSelectedOfferDeleted: false,
  isSelectedOfferDisabled: false,
  offerStatus: 1,
  createOffer: [],
  createOfferLoading: false,
  createOfferFailure: false,
  dropdownData: [],
  dropdowndataLoading: true,
  dropdowndataFailure: "",
  EditOffer: [],
  EditOfferLoading: false,
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
  disableOfferLoading: false,
  disableOfferSuccess: false,
  disableOfferFailed: false,
  disableOfferSuccessMessage: "",
  disableOfferFailureMessage: "",
  OfferDataSendingRequest:[],
  OfferDataSendingrSuccess:false,
  OfferDataSendingFailed:false,
  OfferDataSendingloading:false,





};

export default function offerReducer(state = initialOfferState, action) {
  return produce(state, (draft) => {
    switch (action.type) {

      case OFFER_DATA_REQUEST:
        console.log("eeee",action.payload);
        
        draft.OfferDataSendingRequest =action.payload;
        draft.OfferDataSendingloading = true;
        break;
      case OFFER_DATA_SUCCESS:
        draft.OfferDataSendingrSuccess = action.payload;
        draft.OfferDataSendingloading = false;
        draft.OfferDataSendingFailed=false
        break;
      case OFFER_DATA_FAILED:
        draft.OfferDataSendingloading = false;
        draft.OfferDataSendingrSuccess=false
        draft.OfferDataSendingFailed = action.payload;
        break;

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
        draft.createOfferFailure = false;
        draft.addOfferSuccess = false;
        draft.addOfferFailed = false;
        draft.addOfferSuccessMessage = "";
        draft.addOfferFailedMessage = "";
        break;
      case CREATE_OFFER_SUCCESS:
        draft.createOffer = action.payload;
        draft.createOfferLoading = false;
        draft.createOfferFailure = false;
        draft.addOfferSuccess = true;
        draft.addOfferFailed = false;
        draft.addOfferSuccessMessage = "";
        draft.addOfferFailedMessage = "";

        break;
      case CREATE_OFFER_FAILURE:
        draft.createOfferLoading = false;
        draft.createOfferFailure = true;
        draft.addOfferSuccess = false;
        draft.addOfferFailed = true;
        draft.addOfferSuccessMessage = "";
        draft.addOfferFailedMessage = action.payload;
        break;
      case CREATE_OFFER_CLEAR:
        draft.createOfferLoading = false;
        draft.createOfferFailure = false;
        draft.addOfferSuccess = false;
        draft.addOfferFailed = false;
        draft.addOfferSuccessMessage = "";
        draft.addOfferFailedMessage = "";
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
      case UPDATE_OFFER_CLEAR:
        draft.EditOfferLoading = false;
        draft.EditOfferFailure = "";
        draft.updateOfferFailed = false;
        draft.updateOfferSuccess = false;
        draft.updateOfferFailureMessage = "";
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

      // Disable Offer
      case DISABLE_OFFER_REQUEST:
        draft.disableOfferLoading = true;
        draft.disableOfferFailed = false;
        draft.disableOfferSuccess = false;
        draft.disableOfferFailureMessage = "";
        draft.disableOfferSuccessMessage = "";
        break;
      case DISABLE_OFFER_SUCCESS:
        draft.disableOfferLoading = false;
        draft.disableOfferFailed = false;
        draft.disableOfferSuccess = true;
        draft.disableOfferFailureMessage = "";
        draft.disableOfferSuccessMessage = action.payload;
        break;
      case DISABLE_OFFER_FAILED:
        draft.disableOfferLoading = false;
        draft.disableOfferFailed = true;
        draft.disableOfferSuccess = false;
        draft.disableOfferFailureMessage = action.payload;
        draft.disableOfferSuccessMessage = "";
        break;

      case RESET_DISABLE_DATA:
        draft.disableOfferLoading = false;
        draft.disableOfferFailed = false;
        draft.disableOfferSuccess = false;
        draft.disableOfferFailureMessage = "";
        draft.disableOfferSuccessMessage = "";
        break;

      case SET_OFFER_STATUS:
        draft.offerStatus = action.payload;
        break;
      default:
        break;
    }
  });
}
