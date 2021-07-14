import { produce } from "immer";
import {
  GET_MENUS_ERROR,
  GET_MENUS_FAILURE,
  GET_MENUS_SUCCESS,
  GET_MENUS_REQUEST,
} from "../constants/employeeContants";

import {
  UPDATE_ITEM_OPTION_CLEAR,
  UPDATE_ITEM_OPTION_ERROR,
  UPDATE_ITEM_OPTION_FAILURE,
  UPDATE_ITEM_OPTION_REQUEST,
  UPDATE_ITEM_OPTION_SUCCESS,
} from "../constants/menuConstants";

const initialEmployeeState = {
  // Get Menus
  menu: [],
  getMenuLoading: false,
  getMenuError: "",

  //Update Menu Item
  currentUpdateItemId: "",
  currentUpdateItemOption: "",
  currentOptionvalue: "",
  updateItemOptionLoading: false,
  updateItemOptionSuccess: false,
};

export default function employeeReducer(state = initialEmployeeState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      // Get Menu Reducers
      case GET_MENUS_REQUEST:
        draft.menu = [];
        draft.getMenuLoading = true;
        break;
      case GET_MENUS_SUCCESS:
        draft.menu = action.payload;
        draft.getMenuLoading = false;
        break;
      case GET_MENUS_FAILURE:
        draft.getMenuLoading = false;
        draft.getMenuError = action.payload;
        break;
      case GET_MENUS_ERROR:
        draft.getMenuLoading = false;
        draft.getMenuError = action.payload;
        break;

      // Update Menu Option
      case UPDATE_ITEM_OPTION_REQUEST:
        draft.updateItemOptionLoading = true;
        draft.currentUpdateItemId = action.payload.itemId;
        let option = Object.keys(action.payload)[2]; // Get Option Type
        let optionValue = Object.values(action.payload)[2]; // Get Option Type
        // console.log('Curret Option', option);
        draft.currentUpdateItemOption = option;
        draft.currentOptionvalue = optionValue;
        break;
      case UPDATE_ITEM_OPTION_SUCCESS:
        draft.updateItemOptionLoading = false;
        draft.updateItemOptionSuccess = true;
        break;
      case UPDATE_ITEM_OPTION_FAILURE:
        draft.updateItemOptionLoading = false;
        draft.updateItemOptionSuccess = false;
        break;
      case UPDATE_ITEM_OPTION_ERROR:
        draft.updateItemOptionLoading = false;
        draft.updateItemOptionSuccess = false;
        break;
      case UPDATE_ITEM_OPTION_CLEAR:
        draft.updateItemOptionLoading = false;
        draft.currentUpdateItemId = "";
        draft.currentUpdateItemOption = "";
        draft.updateItemOptionSuccess = false;
        break;
      default:
        break;
    }
  });
}
