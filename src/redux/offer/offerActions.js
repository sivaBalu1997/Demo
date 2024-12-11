import {
  OFFER_LIST_SUCCESS,
  OFFER_LIST_FAILURE,
  OFFER_LIST_REQUEST,
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
  CLEAR_OFFER_SUCCESS,
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
  CATEGORY_FETCHDROPDOWN_SUCCESS,
  CATEGORY_FETCHDROPDOWN_FAILURE,
  SUB_CATEGORY_FETCHDROPDOWN_REQUEST,
  SUB_CATEGORY_FETCHDROPDOWN_SUCCESS,
  SUB_CATEGORY_FETCHDROPDOWN_FAILURE,
  CREATE_SPECIAL_OFFER_REQUEST,
  CREATE_SPECIAL_OFFER_SUCCESS,
  CREATE_SPECIAL_OFFER_FAILURE,
} from "./offerConstants";
export const getOfferList = (offerListParams) => ({
  type: OFFER_LIST_REQUEST,
  payload: offerListParams,
});
export const createOffer = (createofferParams) => ({
  type: CREATE_OFFER_REQUEST,
  payload: createofferParams,
});

export const createOfferSuccess = (createofferParams) => ({
  type: CREATE_OFFER_SUCCESS,
  payload: createofferParams,
});
export const createOfferFailure = (createofferParams) => ({
  type: CREATE_OFFER_FAILURE,
  payload: createofferParams,
});

export const createOfferClear = () => ({
  type:CREATE_OFFER_CLEAR,
});
export const getDropdownData = (dropDownParams) => ({
  type: DROPDOWN_DATA_REQUEST,
  payload: dropDownParams,
});
export const successDropdownData = (response) => ({
  type: DROPDOWN_DATA_SUCCESS,
  payload: response,
});
export const failureDropdownData = (response) => ({
  type: DROPDOWN_DATA_FAILURE,
  payload: response,
});

export const EditOffer = (offerId) => ({
  type: EDIT_OFFER_REQUEST,
  payload: offerId,
}); //EDIT_OFFER_SUCCESS

export const successEditOffer = (response) => ({
  type: EDIT_OFFER_SUCCESS,
  payload: response,
});

export const updateOfferClear = () => ({
  type:UPDATE_OFFER_CLEAR,
});

export const failedEditOffer = (response) => ({
  type: EDIT_OFFER_FAILURE,
  payload: response,
});

export const successGetOfferList = (response) => ({
  type: OFFER_LIST_SUCCESS,
  payload: response,
});

export const failedGetOfferList = (response) => ({
  type: OFFER_LIST_FAILURE,
  payload: response,
});

export const changeOfferStatus = (status) => ({
  type: SET_OFFER_STATUS,
  payload: status,
});
export const cleanOfferSuccessMsg = () => ({
  type: CLEAR_OFFER_SUCCESS,
 
});
export const clearOfferSuccess  = () => ({
  type: CLEAR_OFFER_SUCCESS,

});

// Disable Offer
export const disableOfferRequest = (data) => ({
  type: DISABLE_OFFER_REQUEST,
  payload: data,
});

export const disableOfferSuccess = (data) => ({
  type: DISABLE_OFFER_SUCCESS,
  payload: data,
});

export const disableOfferFailed = (data) => ({
  type: DISABLE_OFFER_FAILED,
  payload: data,
});

export const resetDisableData = () => ({
  type: RESET_DISABLE_DATA,
});

// Delete Offer
export const deleteOfferRequest = (data) => ({
  type: DELETE_OFFER_REQUEST,
  payload: data,
});

export const deleteOfferSuccess = (data) => ({
  type: DELETE_OFFER_SUCCESS,
  payload: data,
});

export const deleteOfferFailed = (data) => ({
  type: DELETE_OFFER_FAILED,
  payload: data,
});

export const resetDeleteData = () => ({
  type: RESET_DELETE_DATA,
});


export const OfferDataSendingRequest = (data) => ({
  type: OFFER_DATA_REQUEST,
  payload: data,
});

export const OfferDataSendingrSuccess = (data) => ({
  type:  OFFER_DATA_SUCCESS,
  payload: data,
});

export const OfferDataSendingFailed = (data) => ({
  type:  OFFER_DATA_FAILED,
  payload: data,
});
export const fetchDropDownRequest = (data) => ({
  type: CATEGORY_FETCHDROPDOWN_REQUEST,
  payload: data,
});

export const fetchDropDownSuccess = (response) => ({
  type: CATEGORY_FETCHDROPDOWN_SUCCESS,
  payload: response,
});

export const fetchDropDownFailure = (error) => ({
  type: CATEGORY_FETCHDROPDOWN_FAILURE,
  payload: error,
});
export const fetchSubDropDownRequest = (data) => ({
  type: SUB_CATEGORY_FETCHDROPDOWN_REQUEST,
  payload: data,
});

export const fetchSubDropDownSuccess = (response) => ({
  type: SUB_CATEGORY_FETCHDROPDOWN_SUCCESS,
  payload: response,
});

export const fetchSubDropDownFailure = (error) => ({
  type: SUB_CATEGORY_FETCHDROPDOWN_FAILURE,
  payload: error,
});
export const createSpecialOfferRequest = (data) => ({
  type: CREATE_SPECIAL_OFFER_REQUEST,
  payload: data,
});

export const createSpecialOfferSuccess = (response) => ({
  type: CREATE_SPECIAL_OFFER_SUCCESS,
  payload: response,
});

export const createSpecialOfferFailure = (error) => ({
  type: CREATE_SPECIAL_OFFER_FAILURE,
  payload: error,
});