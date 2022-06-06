import {
  GET_MENU_CATEGORY_FAILED,
  GET_MENU_CATEGORY_SUCCESS,
  GET_MENU_CATEGORY_REQUEST,
  GET_MENU_SUB_CATEGORY_FAILED,
  GET_MENU_SUB_CATEGORY_REQUEST,
  GET_MENU_SUB_CATEGORY_SUCCESS,
  GET_TAG_CLASS_FAILED,
  GET_TAG_CLASS_REQUEST,
  GET_TAG_CLASS_SUCCESS,
  GET_INGR_REQUEST,
  GET_INGR_SUCCESS,
  GET_INGR_FAILED,
  ADD_MENU_ITEM_FAILED,
  ADD_MENU_ITEM_REQUEST,
  ADD_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEM_FAILED,
  UPDATE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_FAILED,
  GET_MODIFIER_REQUEST,
  GET_MODIFIER_SUCCESS,
  GET_MODIFIER_FAILED,
  GET_AVAILABILITY_REQUEST,
  GET_AVAILABILITY_SUCCESS,
  GET_AVAILABILITY_FAILED,
  UPDATE_MENU_ATTRIBUTE_REQUEST,
  UPDATE_MENU_ATTRIBUTE_SUCCESS,
  UPDATE_MENU_ATTRIBUTE_FAILED,
  CLEAR_MENU_ITEM_SUCCESS,
  RESET_DELETE_DATA,
} from "../constants/productCatalogConstants";

// Get Menu Category
export const getMenuCategoryRequest = (details) => ({
  type: GET_MENU_CATEGORY_REQUEST,
  payload: details,
});

export const getMenuCategorySuccess = (details) => ({
  type: GET_MENU_CATEGORY_SUCCESS,
  payload: details,
});
export const getMenuCategoryFailed = (details) => ({
  type: GET_MENU_CATEGORY_FAILED,
  payload: details,
});

// Get Menu Sub Category
export const getMenuSubCategoryRequest = (details) => ({
  type: GET_MENU_SUB_CATEGORY_REQUEST,
  payload: details,
});

export const getMenuSubCategorySuccess = (details) => ({
  type: GET_MENU_SUB_CATEGORY_SUCCESS,
  payload: details,
});

export const getMenuSubCategoryFailed = (details) => ({
  type: GET_MENU_SUB_CATEGORY_FAILED,
  payload: details,
});

// Get Tax Class
export const getTagClassRequest = (details) => ({
  type: GET_TAG_CLASS_REQUEST,
  payload: details,
});

export const getTagClassSuccess = (details) => ({
  type: GET_TAG_CLASS_SUCCESS,
  payload: details,
});

export const getTagClassFailed = (details) => ({
  type: GET_TAG_CLASS_FAILED,
  payload: details,
});

// Get Ingredients
export const getIngredientsRequest = (details) => ({
  type: GET_INGR_REQUEST,
  payload: details,
});

export const getIngredientsSuccess = (details) => ({
  type: GET_INGR_SUCCESS,
  payload: details,
});

export const getIngredientsFailed = (details) => ({
  type: GET_INGR_FAILED,
  payload: details,
});

// Get Modifier
export const getModifierRequest = (details) => ({
  type: GET_MODIFIER_REQUEST,
  payload: details,
});

export const getModifierSuccess = (details) => ({
  type: GET_MODIFIER_SUCCESS,
  payload: details,
});

export const getModifierFailed = (details) => ({
  type: GET_MODIFIER_FAILED,
  payload: details,
});

// Get Modifier
export const getAvailabilityRequest = (details) => ({
  type: GET_AVAILABILITY_REQUEST,
  payload: details,
});

export const getAvailabilitySuccess = (details) => ({
  type: GET_AVAILABILITY_SUCCESS,
  payload: details,
});

export const getAvailabilityFailed = (details) => ({
  type: GET_AVAILABILITY_FAILED,
  payload: details,
});

// Add menu Items
export const addMenuItemRequest = (data) => ({
  type: ADD_MENU_ITEM_REQUEST,
  payload: data,
});

export const addMenuItemSuccess = (data) => ({
  type: ADD_MENU_ITEM_SUCCESS,
  payload: data,
});

export const cleanMenuItemSuccessMsg = () => ({
  type: CLEAR_MENU_ITEM_SUCCESS,
  payload: "",
});
export const addMenuItemFailed = (data) => ({
  type: ADD_MENU_ITEM_FAILED,
  payload: data,
});

// Update Menu Item
export const updateMenuItemRequest = (data) => ({
  type: UPDATE_MENU_ITEM_REQUEST,
  payload: data,
});

export const updateMenuItemSuccess = (data) => ({
  type: UPDATE_MENU_ITEM_SUCCESS,
  payload: data,
});

export const updateMenuItemFailed = (data) => ({
  type: UPDATE_MENU_ITEM_FAILED,
  payload: data,
});

export const clearMenuItemSuccess = () => ({
  type: CLEAR_MENU_ITEM_SUCCESS,
  payload: "",
});

// Update Menu Attributes
export const updateMenuAttributeRequest = (data) => ({
  type: UPDATE_MENU_ATTRIBUTE_REQUEST,
  payload: data,
});
export const updateMenuAttributeSuccess = (data) => ({
  type: UPDATE_MENU_ATTRIBUTE_SUCCESS,
  payload: data,
});
export const updateMenuAttributeFailed = (data) => ({
  type: UPDATE_MENU_ATTRIBUTE_FAILED,
  payload: data,
});

// Delete Menu Item
export const deleteMenuItemRequest = (data) => ({
  type: DELETE_MENU_ITEM_REQUEST,
  payload: data,
});

export const deleteMenuItemSuccess = (data) => ({
  type: DELETE_MENU_ITEM_SUCCESS,
  payload: data,
});

export const deleteMenuItemFailed = (data) => ({
  type: DELETE_MENU_ITEM_FAILED,
  payload: data,
});

export const resetDeleteData = () => ({
  type: RESET_DELETE_DATA,
});
