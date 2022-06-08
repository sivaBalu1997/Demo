import {
  OFFER_LIST_SUCCESS,
  OFFER_LIST_FAILURE,
  OFFER_LIST_REQUEST,
  OFFER_DISABLE_REQUEST,
  SET_OFFER_STATUS,
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
  CLEAR_OFFER_SUCCESS,
  DELETE_OFFER_REQUEST,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAILED,
  RESET_DELETE_DATA,
} from "../constants/offerConstants";

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

// Add Employee
export const failedEditOffer = (response) => ({
  type: EDIT_OFFER_FAILURE,
  payload: response,
});

export const disableOffer = (offerId) => ({
  type: OFFER_DISABLE_REQUEST,
  payload: offerId,
});

export const successGetOfferList = (response) => ({
  type: OFFER_LIST_SUCCESS,
  payload: response,
});

// Add Employee
export const failedGetOfferList = (response) => ({
  type: OFFER_LIST_FAILURE,
  payload: response,
});

// export const removeItemFromOfferList = (offerId) => ({
//     type: OFFER_REMOVE_ITEM,
//     payload: offerId,
// });

export const successOnDisableAnOffer = (response) => ({
  type: OFFER_DISABLE_SUCCESS,
  payload: response,
});

export const changeOfferStatus = (status) => ({
  type: SET_OFFER_STATUS,
  payload: status,
});
export const cleanOfferSuccessMsg = () => ({
  type: CLEAR_OFFER_SUCCESS,
  payload: "",
});
export const clearOfferSuccess = () => ({
  type: CLEAR_OFFER_SUCCESS,
  payload: "",
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
