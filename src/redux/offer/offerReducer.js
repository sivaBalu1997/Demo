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
  CATEGORY_FETCHDROPDOWN_REQUEST,
  CATEGORY_FETCHDROPDOWN_FAILURE,
  CATEGORY_FETCHDROPDOWN_SUCCESS,
  SUB_CATEGORY_FETCHDROPDOWN_REQUEST,
  SUB_CATEGORY_FETCHDROPDOWN_FAILURE,
  SUB_CATEGORY_FETCHDROPDOWN_SUCCESS,
  
  SP_OFFER_LIST_REQUEST,
 SP_OFFER_LIST_SUCCESS,
SP_OFFER_LIST_FAILED,
SP_OFFER_LIST_SENDING_REQUEST,
SP_OFFER_LIST_SENDING_SUCCESS,
SP_OFFER_LIST_SENDING_FAILED,
SP_OFFER_LIST_VIEW_REQUEST,
SP_OFFER_LIST_VIEW_SUCCESS,
SP_OFFER_LIST_VIEW_FAILED,
SP_OFFER_LIST_DELETE_REQUEST,
SP_OFFER_LIST_DELETE_SUCCESS,
SP_OFFER_LIST_DELETE_FAILED,
SP_OFFER_LIST_DISABLE_REQUEST,
SP_OFFER_LIST_DISABLE_SUCCESS,
SP_OFFER_LIST_DISABLE_FAILED,
CREATE_SPECIAL_OFFER_REQUEST,
CREATE_SPECIAL_OFFER_SUCCESS,
CREATE_SPECIAL_OFFER_FAILURE,
UPDATE_SPECIAL_OFFER_REQUEST,
UPDATE_SPECIAL_OFFER_SUCCESS,
UPDATE_SPECIAL_OFFER_FAILURE,
SP_OFFER_LIST_EDIT_REQUEST,
GET_OFFER_ITEMS_SUCCESS,
GET_OFFER_ITEMS_REQUEST,
GET_OFFER_ITEMS_FAILURE,
REMOVE_EDITDATA_WHEN_ADD,
CREATE_SPECIAL_OFFER_OVERLAP,
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
  categoryData :[],
  getCategorySuccess :false,
  getCategoryLoading :false,
  getCategorySuccessMessage :"",
  getCategoryErrorMessage :'',
  subCategoryData : [],
  getSubCategorySuccess : false,
  getSubCategoryLoading : false,
  getSubCategoryErrorMessage : "",
  getSubCategoryErrorMessage : '',
  SpOfferListLoading:false,
  SpofferListSuccessResponse:[],
  SpofferListFailureResponse:false,
  SPofferItemDeleteLoading:false,
  SPofferItemDeleteSuccess:"",
  SPofferItemDeleteFailed:"",
  SPofferItemDisableLoading:false,
  SPofferItemDisableSuccess:"",
  SPofferItemDisableFailed:"",
  createSpecialOfferError:'',
  createSpecialOfferSuccess:false,
  createSpecialOfferloading :false,
  createSpecialOfferOverlapData:[],
  updateSpecialOfferError:'',
  updateSpecialOfferSuccess:false,
  updateSpecialOfferloading :false,

  editSpData:[],



  getOfferListData : [],
  getOfferListSuccess : false,
  getOfferListLoading : false,
  getOfferListSuccessMessage : "",
  getOfferListErrorMessage : '',
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
        draft.disableOfferFailureMessage = "";
        break;
      case CATEGORY_FETCHDROPDOWN_REQUEST:
        draft.categoryData = [];
        draft.getCategoryLoading = true;
        draft.getCategorySuccessMessage = "";
        draft.getCategoryErrorMessage = "";
        break;
      case CATEGORY_FETCHDROPDOWN_SUCCESS:
        draft.categoryData = action.payload;
        draft.getCategorySuccess = true;
        draft.getCategoryLoading = false;
        draft.getCategoryErrorMessage = "";
        draft.getCategorySuccessMessage = action.payload;
        break;
      case CATEGORY_FETCHDROPDOWN_FAILURE:
        draft.categoryData = [];
        draft.getCategorySuccess = false;
        draft.getCategoryLoading = false;
        draft.getCategoryErrorMessage = action.payload;
        draft.getCategorySuccessMessage = "";
        break;
        case SUB_CATEGORY_FETCHDROPDOWN_REQUEST:
          draft.subCategoryData = [];
          draft.getSubCategoryLoading = true;
          draft.getSubCategorySuccessMessage = "";
          draft.getSubCategoryErrorMessage = "";
          break;
        case SUB_CATEGORY_FETCHDROPDOWN_SUCCESS:
          draft.subCategoryData = action.payload;
          draft.getSubCategorySuccess = true;
          draft.getSubCategoryLoading = false;
          draft.getSubCategorySuccessMessage = "";
          draft.getSubCategoryErrorMessage = action.payload;
          break;
        case SUB_CATEGORY_FETCHDROPDOWN_FAILURE:
          draft.subCategoryData = [];
          draft.getSubCategorySuccess = false;
          draft.getSubCategoryLoading = false;
          draft.getSubCategoryErrorMessage = action.payload;
          draft.getSubCategorySuccessMessage = "";
          break;

      case SET_OFFER_STATUS:
        draft.offerStatus = action.payload;
        break;

        case  SP_OFFER_LIST_SENDING_REQUEST:
          console.log("eeee",action.payload);
          
          draft.OfferDataSendingRequest =action.payload;
          draft.OfferDataSendingloading = true;
          break;
        case  SP_OFFER_LIST_SENDING_SUCCESS:
          draft.OfferDataSendingrSuccess = action.payload;
          draft.OfferDataSendingloading = false;
          draft.OfferDataSendingFailed=false
          break;
        case SP_OFFER_LIST_SENDING_FAILED:
          draft.OfferDataSendingloading = false;
          draft.OfferDataSendingrSuccess=false
          draft.OfferDataSendingFailed = action.payload;
          break;
          
        case  SP_OFFER_LIST_SENDING_REQUEST:
        console.log("eeee",action.payload);
        
        draft.OfferDataSendingRequest =action.payload;
        draft.OfferDataSendingloading = true;
        break;
      case  SP_OFFER_LIST_SENDING_SUCCESS:
        draft.OfferDataSendingrSuccess = action.payload;
        draft.OfferDataSendingloading = false;
        draft.OfferDataSendingFailed=false
        break;
      case SP_OFFER_LIST_SENDING_FAILED:
        draft.OfferDataSendingloading = false;
        draft.OfferDataSendingrSuccess=false
        draft.OfferDataSendingFailed = action.payload;
        break;


        case  SP_OFFER_LIST_VIEW_REQUEST:
          draft.SpOfferListLoading =true;
          draft.SpofferListSuccessResponse = [];
          draft.createSpecialOfferSuccess=false;
          draft.updateSpecialOfferSuccess=false
          
        
          break;
        case  SP_OFFER_LIST_VIEW_SUCCESS:
          draft.SpOfferListLoading =false;
          draft.SpofferListSuccessResponse = action.payload;
          break;
        case SP_OFFER_LIST_VIEW_FAILED:
          draft.SpOfferListLoading =false;
         draft.SpofferListFailureResponse=true;
          break;  



          case  SP_OFFER_LIST_DELETE_REQUEST:
            draft.SPofferItemDeleteLoading =true;
           
            break;
          case  SP_OFFER_LIST_DELETE_SUCCESS:
            draft.SPofferItemDeleteLoading =false;
            draft.SPofferItemDeleteSuccess = action.payload;
            break;
          case SP_OFFER_LIST_DELETE_FAILED:
            draft.SPofferItemDeleteLoading =false;
           draft.SPofferItemDeleteFailed=action.payload;
            break;   
            
            
            case  SP_OFFER_LIST_DISABLE_REQUEST:
            draft.SPofferItemDisableLoading =true;
           
            break;
          case  SP_OFFER_LIST_DISABLE_SUCCESS:
            draft.SPofferItemDisableLoading =false;
            draft.SPofferItemDisableSuccess = action.payload;
            break;
          case SP_OFFER_LIST_DISABLE_FAILED:
            draft.SPofferItemDisableLoading =false;
           draft.SPofferItemDisableFailed=action.payload;
            break;   
            case  CREATE_SPECIAL_OFFER_REQUEST:
              draft.createSpecialOfferError=''
              draft.createSpecialOfferSuccess=false
              draft.createSpecialOfferloading = true;
              draft.createSpecialOfferOverlapData=[]
              break;
            case  CREATE_SPECIAL_OFFER_SUCCESS:
              draft.createSpecialOfferSuccess = true;
              draft.createSpecialOfferloading = false;
              draft.createSpecialOfferError=''
              break;
            case CREATE_SPECIAL_OFFER_FAILURE:
              draft.createSpecialOfferloading = false;
              draft.createSpecialOfferSuccess=false
              draft.createSpecialOfferError = action.payload;
              break;

              case CREATE_SPECIAL_OFFER_OVERLAP:
                draft.createSpecialOfferloading = false;
              draft.createSpecialOfferOverlapData=action.payload
              draft.createSpecialOfferSuccess = false;
              draft.createSpecialOfferError ="";


              case  UPDATE_SPECIAL_OFFER_REQUEST:
                draft.updateSpecialOfferError=''
                draft.updateSpecialOfferSuccess=false
                draft.updateSpecialOfferloading = true;
                break;
              case  UPDATE_SPECIAL_OFFER_SUCCESS:
                draft.updateSpecialOfferSuccess = true;
                draft.updateSpecialOfferloading = false;
                draft.updateSpecialOfferError=''
                break;
              case UPDATE_SPECIAL_OFFER_FAILURE:
                draft.updateSpecialOfferloading = false;
                draft.updateSpecialOfferSuccess=false
                draft.updateSpecialOfferError = action.payload;
                break;
                case SP_OFFER_LIST_EDIT_REQUEST:
                  draft.editSpData = action.payload;
                  break;

                  case REMOVE_EDITDATA_WHEN_ADD:
                  draft.editSpData = [];
                  break;


              case GET_OFFER_ITEMS_REQUEST:
                draft.getOfferListData = [];
                draft.getOfferListLoading = true;
                draft.getOfferListSuccessMessage = "";
                draft.getOfferListErrorMessage = "";
                break;
              case GET_OFFER_ITEMS_SUCCESS:
                draft.getOfferListData = action.payload;
                draft.getOfferListSuccess = true;
                draft.getOfferListLoading = false;
                draft.getOfferListSuccessMessage = "";
                draft.getOfferListErrorMessage = action.payload;
                break;
              case GET_OFFER_ITEMS_FAILURE:
                draft.getOfferListData = [];
                draft.getOfferListSuccess = false;
                draft.getOfferListLoading = false;
                draft.getOfferListErrorMessage = action.payload;
                draft.getOfferListSuccessMessage = "";
                break;
      default:
        break;
    }
  });
}
