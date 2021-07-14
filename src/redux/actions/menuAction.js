import {
  GET_MENUS_ERROR,
  GET_MENUS_FAILURE,
  GET_MENUS_REQUEST,
  GET_MENUS_SUCCESS,
} from "../constants/employeeContants";

import {
  UPDATE_ITEM_OPTION_CLEAR,
  UPDATE_ITEM_OPTION_ERROR,
  UPDATE_ITEM_OPTION_FAILURE,
  UPDATE_ITEM_OPTION_REQUEST,
  UPDATE_ITEM_OPTION_SUCCESS,
} from "../constants/menuConstants";

// Get All CheckIn Details
export const getMenus = (details) => ({
  type: GET_MENUS_REQUEST,
  payload: details,
});

export const errorGetMenus = (details) => ({
  // Replace any with Network Data Fail Data format
  type: GET_MENUS_ERROR,
  payload: details,
});

export const failedGetMenus = (details) => ({
  // Replace any with Network Data Fail Data format
  type: GET_MENUS_FAILURE,
  payload: details,
});

export const successGetMenus = (details) => ({
  type: GET_MENUS_SUCCESS,
  payload: details,
});

// Update Menu Item
export const updateItemOption = (details) => ({
  type: UPDATE_ITEM_OPTION_REQUEST,
  payload: details,
});

export const errorUpdateItemOption = () => ({
  // Replace any with Network Data Fail Data format
  type: UPDATE_ITEM_OPTION_ERROR,
});

export const failedUpdateItemOption = () => ({
  // Replace any with Network Data Fail Data format
  type: UPDATE_ITEM_OPTION_FAILURE,
});

export const successUpdateItemOption = () => ({
  type: UPDATE_ITEM_OPTION_SUCCESS,
});

export const clearUpdateItemOption = () => ({
  type: UPDATE_ITEM_OPTION_CLEAR,
});
