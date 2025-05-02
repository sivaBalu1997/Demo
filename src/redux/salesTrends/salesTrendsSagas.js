import { put, call, takeLatest, debounce, fork } from "redux-saga/effects";
import { showErrorToast } from "util/toastUtils";
import {
  salesTrendsSuccess,
  salesTrendsFailure,

  categoriesLevelSalesTrendFailure,
  categoriesLevelSalesTrendSuccess,

  itemsLevelSalesTrendSuccess,
  itemsLevelSalesTrendFailure,
} from "./salesTrendsActions";
import {
  CATEGORIES_LEVEL_SALES_TREND_REQUEST,
  ITEMS_LEVEL_SALES_TREND_REQUEST,
  SALES_TRENDS_REQUEST,

} from "./salesTrendsConstants";
import {
  getCategoriesLevelSalesTrend,
  getItemsLevelSalesTrend,
  getSalesTrends
} from "./salesTrendsApi";
import { decryptJson } from "util/react-ec-utils";

export function* salesTrendsSaga(action) {
  try {
    const response = yield call(
      getSalesTrends,
      action.payload
    );
    const decryptedData = decryptJson(response?.data?.encryptedText);
    if (response.status === 200) {
      yield put(salesTrendsSuccess(decryptedData));
    } else {
      yield put(salesTrendsFailure(decryptedData?.message));
      showErrorToast(decryptedData?.message);
    }
  } catch (error) {
    yield put(salesTrendsFailure(error));
  }
}

export function* categoriesLevelSalesTrendSaga(action) {
  try {
    const response = yield call(
      getCategoriesLevelSalesTrend,
      action.payload
    );
    const decryptedData = decryptJson(response?.data?.encryptedText);
    if (response.status === 200) {
      yield put(categoriesLevelSalesTrendSuccess(decryptedData));
    } else {
      yield put(categoriesLevelSalesTrendFailure(decryptedData?.message));
      showErrorToast(decryptedData?.message);
    }
  } catch (error) {
    yield put(categoriesLevelSalesTrendFailure(error));
  }
}

export function* itemsLevelSalesTrendSaga(action) {
  try {
    const response = yield call(
      getItemsLevelSalesTrend,
      action.payload
    );
    const decryptedData = decryptJson(response?.data?.encryptedText);
    if (response.status === 200) {
      yield put(itemsLevelSalesTrendSuccess(decryptedData));
    } else {
      yield put(
        itemsLevelSalesTrendFailure(decryptedData?.message)
      );
      showErrorToast(decryptedData?.message);
    }
  } catch (error) {
    yield put(itemsLevelSalesTrendFailure(error));
  }
}

export default function* watchNewReportRequest() {
  yield takeLatest(
    SALES_TRENDS_REQUEST,
    salesTrendsSaga
  );
  yield takeLatest(
    CATEGORIES_LEVEL_SALES_TREND_REQUEST,
    categoriesLevelSalesTrendSaga
  );
  yield takeLatest(
    ITEMS_LEVEL_SALES_TREND_REQUEST,
    itemsLevelSalesTrendSaga
  );

}
