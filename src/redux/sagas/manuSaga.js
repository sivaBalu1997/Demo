import { put, call, takeLatest } from "redux-saga/effects";
import { successAddEmployee } from "../actions/employeeActions";
import {
  errorGetMenus,
  failedGetMenus,
  successGetMenus,
  failedUpdateItemOption,
  successUpdateItemOption,
} from "../actions/menuAction";
import { getMenu, updateItemOptions } from "../api/menuApi";
import { GET_MENUS_REQUEST } from "../constants/employeeContants";
import { UPDATE_ITEM_OPTION_REQUEST } from "../constants/menuConstants";

function* getMenuSaga(action) {
  try {
    const response = yield call(getMenu, action.payload);
    if (response.status === 200) {
      //console.log("Outlets :" + response.data);
      yield put(successGetMenus(response.data));
    }
  } catch (err) {
    yield put(failedGetMenus({ message: "Please Try Again" }));
  }
}

function* updateItemOptionSaga(action) {
  // console.log('Update Menu:', action.payload);
  try {
    const response = yield call(updateItemOptions, action.payload);
    // console.log('Res:', response.data);

    if (response.status === 200) {
      yield put(successUpdateItemOption());
    }
  } catch (err) {
    console.log(err);
    yield put(failedUpdateItemOption());
  }
}

export default function* employeeSaga() {
  yield takeLatest(GET_MENUS_REQUEST, getMenuSaga);
  yield takeLatest(UPDATE_ITEM_OPTION_REQUEST, updateItemOptionSaga);
}
