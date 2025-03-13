import { put, call, takeLatest, debounce, fork } from "redux-saga/effects";
import { showSuccessToast, showErrorToast } from "util/toastUtils";
import {
  summaryInsightsCustomerVolumeSuccess,
  summaryInsightsCustomerVolumeFailure,
  summaryInsightsCustomerByTenureSuccess,
  summaryInsightsCustomerByTenureFailure,
  summaryInsightsCustomerByTotalSpendSuccess,
  summaryInsightsCustomerByTotalSpendFailure,
  summaryInsightsCustomerByAvgCoverSizeSuccess,
  summaryInsightsCustomerByAvgCoverSizeFailure,
  summaryInsightsCustomerByLoyaltyLevelsSuccess,
  summaryInsightsCustomerByLoyaltyLevelsFailure,
  detailedInsightsSummarySuccess,
  detailedInsightsSummaryFailure,
  detailedInsightsDineInSuccess,
  detailedInsightsDineInFailure,
  detailedInsightsOffPremSuccess,
  detailedInsightsOffPremFailure,
  detailedInsightsCustomerOrderSuccess,
  detailedInsightsCustomerOrderFailure,
  detailedInsightsLatestOrderSuccess,
  detailedInsightsLatestOrderFailure,
  detailedInsightsCustomerTopFavItemsSuccess,
  detailedInsightsCustomerTopFavItemsFailure,
} from "./customerInsightsActions";
import {
  SUMMARY_INSIGHTS_CUSTOMER_VOLUME_REQUEST,
  SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_REQUEST,
  SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_REQUEST,
  SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_REQUEST,
  SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_REQUEST,
  DETAILED_INSIGHTS_SUMMARY_REQUEST,
  DETAILED_INSIGHTS_DINE_IN_REQUEST,
  DETAILED_INSIGHTS_OFF_PREM_REQUEST,
  DETAILED_INSIGHTS_CUSTOMERS_ORDER_REQUEST,
  DETAILED_INSIGHTS_LATEST_ORDER_REQUEST,
  DETAILED_INSIGHTS_CUSTOMERS_TOP_FAV_ITEM_REQUEST,
} from "./customerInsightsConstants";
import {
  getSummaryInsightsCustomerVolume,
  getSummaryInsightsCustomerByTenure,
  getSummaryInsightsCustomersByTotalSpend,
  getSummaryInsightsCustomersByAvgCoverSize,
  getSummaryInsightsCustomersByLoyalty,
  getDetailedInsightsSummary,
  getDetailedInsightsDineIn,
  getDetailedInsightsOffPrem,
  getDetailedInsightsCustomersOrder,
  getDetailedInsightsLatestOrder,
  getDetailedInsightsCustomersTopFavItems,
} from "./customerInsightsApi";
import { decryptJson } from "util/react-ec-utils";

export function* summaryInsightsCustomerVolumeSaga(action) {
  try {
    const response = yield call(
      getSummaryInsightsCustomerVolume,
      action.payload
    );
    const decryptedData = decryptJson(response?.data?.encryptedText);
    if (response.status === 200) {
      yield put(summaryInsightsCustomerVolumeSuccess(decryptedData));
      showSuccessToast(decryptedData?.message);
    } else {
      yield put(summaryInsightsCustomerVolumeFailure(decryptedData?.message));
      showErrorToast(decryptedData?.message);
    }
  } catch (error) {
    yield put(summaryInsightsCustomerVolumeFailure(error));
  }
}

export function* summaryInsightsCustomerByTenureSaga(action) {
  try {
    const response = yield call(
      getSummaryInsightsCustomerByTenure,
      action.payload
    );
    const decryptedData = decryptJson(response?.data?.encryptedText);
    if (response.status === 200) {
      yield put(summaryInsightsCustomerByTenureSuccess(decryptedData));
      showSuccessToast(decryptedData?.message);
    } else {
      yield put(summaryInsightsCustomerByTenureFailure(decryptedData?.message));
      showErrorToast(decryptedData?.message);
    }
  } catch (error) {
    yield put(summaryInsightsCustomerByTenureFailure(error));
  }
}

export function* summaryInsightsCustomerByTotalSpendSaga(action) {
  try {
    const response = yield call(
      getSummaryInsightsCustomersByTotalSpend,
      action.payload
    );
    const decryptedData = decryptJson(response?.data?.encryptedText);
    if (response.status === 200) {
      yield put(summaryInsightsCustomerByTotalSpendSuccess(decryptedData));
      showSuccessToast(decryptedData?.message);
    } else {
      yield put(
        summaryInsightsCustomerByTotalSpendFailure(decryptedData?.message)
      );
      showErrorToast(decryptedData?.message);
    }
  } catch (error) {
    yield put(summaryInsightsCustomerByTotalSpendFailure(error));
  }
}

export function* summaryInsightsCustomerByAvgCoverSizeSaga(action) {
  try {
    const response = yield call(
      getSummaryInsightsCustomersByAvgCoverSize,
      action.payload
    );
    const decryptedData = decryptJson(response?.data?.encryptedText);
    if (response.status === 200) {
      yield put(summaryInsightsCustomerByAvgCoverSizeSuccess(decryptedData));
      showSuccessToast(decryptedData?.message);
    } else {
      yield put(
        summaryInsightsCustomerByAvgCoverSizeFailure(decryptedData?.message)
      );
      showErrorToast(decryptedData?.message);
    }
  } catch (error) {
    yield put(summaryInsightsCustomerByAvgCoverSizeFailure(error));
  }
}

export function* summaryInsightsCustomerByLoyaltyLevelSaga(action) {
  try {
    const response = yield call(
      getSummaryInsightsCustomersByLoyalty,
      action.payload
    );
    const decryptedData = decryptJson(response?.data?.encryptedText);
    if (response.status === 200) {
      yield put(summaryInsightsCustomerByLoyaltyLevelsSuccess(decryptedData));
      showSuccessToast(decryptedData?.message);
    } else {
      yield put(
        summaryInsightsCustomerByLoyaltyLevelsFailure(decryptedData?.message)
      );
      showErrorToast(decryptedData?.message);
    }
  } catch (error) {
    yield put(summaryInsightsCustomerByLoyaltyLevelsFailure(error));
  }
}

export function* detailedInsightsSummarySaga(action) {
  try {
    const response = yield call(getDetailedInsightsSummary, action.payload);
    const decryptedData = decryptJson(response?.data?.encryptedText);
    if (response.status === 200) {
      yield put(detailedInsightsSummarySuccess(decryptedData));
      showSuccessToast(decryptedData?.message);
    } else {
      yield put(detailedInsightsSummaryFailure(decryptedData?.message));
      showErrorToast(decryptedData?.message);
    }
  } catch (error) {
    yield put(detailedInsightsSummaryFailure(error));
  }
}

export function* detailedInsightsDineInSaga(action) {
  try {
    const response = yield call(getDetailedInsightsDineIn, action.payload);
    const decryptedData = decryptJson(response?.data?.encryptedText);
    if (response.status === 200) {
      yield put(detailedInsightsDineInSuccess(decryptedData));
      showSuccessToast(decryptedData?.message);
    } else {
      yield put(detailedInsightsDineInFailure(decryptedData?.message));
      showErrorToast(decryptedData?.message);
    }
  } catch (error) {
    yield put(detailedInsightsDineInFailure(error));
  }
}

export function* detailedInsightsOffPremSaga(action) {
  try {
    const response = yield call(getDetailedInsightsOffPrem, action.payload);
    const decryptedData = decryptJson(response?.data?.encryptedText);
    if (response.status === 200) {
      yield put(detailedInsightsOffPremSuccess(decryptedData));
      showSuccessToast(decryptedData?.message);
    } else {
      yield put(detailedInsightsOffPremFailure(decryptedData?.message));
      showErrorToast(decryptedData?.message);
    }
  } catch (error) {
    yield put(detailedInsightsOffPremFailure(error));
  }
}

export function* detailedInsightsCustomersOrderSaga(action) {
  try {
    const response = yield call(
      getDetailedInsightsCustomersOrder,
      action.payload
    );
    const decryptedData = decryptJson(response?.data?.encryptedText);
    if (response.status === 200) {
      yield put(detailedInsightsCustomerOrderSuccess(decryptedData));
      showSuccessToast(decryptedData?.message);
    } else {
      yield put(detailedInsightsCustomerOrderFailure(decryptedData?.message));
      showErrorToast(decryptedData?.message);
    }
  } catch (error) {
    yield put(detailedInsightsCustomerOrderFailure(error));
  }
}

export function* detailedInsightsLatestOrderSaga(action) {
  try {
    const response = yield call(getDetailedInsightsLatestOrder, action.payload);
    const decryptedData = decryptJson(response?.data?.encryptedText);
    if (response.status === 200) {
      yield put(detailedInsightsLatestOrderSuccess(decryptedData));
      showSuccessToast(decryptedData?.message);
    } else {
      yield put(detailedInsightsLatestOrderFailure(decryptedData?.message));
      showErrorToast(decryptedData?.message);
    }
  } catch (error) {
    yield put(detailedInsightsLatestOrderFailure(error));
  }
}

export function* detailedInsightsCustomersTopFavItemsSaga(action) {
  try {
    const response = yield call(
      getDetailedInsightsCustomersTopFavItems,
      action.payload
    );
    const decryptedData = decryptJson(response?.data?.encryptedText);
    if (response.status === 200) {
      yield put(detailedInsightsCustomerTopFavItemsSuccess(decryptedData));
      showSuccessToast(decryptedData?.message);
    } else {
      yield put(
        detailedInsightsCustomerTopFavItemsFailure(decryptedData?.message)
      );
      showErrorToast(decryptedData?.message);
    }
  } catch (error) {
    yield put(detailedInsightsCustomerTopFavItemsFailure(error));
  }
}

export default function* watchNewReportRequest() {
  yield takeLatest(
    SUMMARY_INSIGHTS_CUSTOMER_VOLUME_REQUEST,
    summaryInsightsCustomerVolumeSaga
  );
  yield takeLatest(
    SUMMARY_INSIGHTS_CUSTOMER_BY_TENURE_REQUEST,
    summaryInsightsCustomerByTenureSaga
  );
  yield takeLatest(
    SUMMARY_INSIGHTS_CUSTOMERS_BY_TOTAL_SPEND_REQUEST,
    summaryInsightsCustomerByTotalSpendSaga
  );
  yield takeLatest(
    SUMMARY_INSIGHTS_CUSTOMERS_BY_AVG_COVER_SIZE_REQUEST,
    summaryInsightsCustomerByAvgCoverSizeSaga
  ); //);
  yield takeLatest(
    SUMMARY_INSIGHTS_CUSTOMERS_BY_LOYALTY_REQUEST,
    summaryInsightsCustomerByLoyaltyLevelSaga
  ); //);

  yield takeLatest(
    DETAILED_INSIGHTS_SUMMARY_REQUEST,
    detailedInsightsSummarySaga
  ); //);
  yield takeLatest(
    DETAILED_INSIGHTS_DINE_IN_REQUEST,
    detailedInsightsDineInSaga
  ); //);
  yield takeLatest(
    DETAILED_INSIGHTS_OFF_PREM_REQUEST,
    detailedInsightsOffPremSaga
  ); //);
  yield takeLatest(
    DETAILED_INSIGHTS_CUSTOMERS_ORDER_REQUEST,
    detailedInsightsCustomersOrderSaga
  ); //);
  yield takeLatest(
    DETAILED_INSIGHTS_LATEST_ORDER_REQUEST,
    detailedInsightsLatestOrderSaga
  ); //);
  yield takeLatest(
    DETAILED_INSIGHTS_CUSTOMERS_TOP_FAV_ITEM_REQUEST,
    detailedInsightsCustomersTopFavItemsSaga
  ); //);

}
