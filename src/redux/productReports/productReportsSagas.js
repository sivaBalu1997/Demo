import { put, call, takeLatest, debounce, fork } from "redux-saga/effects";
import { showSuccessToast, showErrorToast } from "util/toastUtils";


import { decryptJson } from "util/react-ec-utils";

import {
    PRODUCT_INSIGHTS_TOP_REVENUE_REQUEST,
    PRODUCT_INSIGHTS_TOP_POPULAR_REQUEST,
    PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_REQUEST,
    PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_REQUEST,
    PRODUCT_INSIGHTS_CANCELLED_ITEMS_REQUEST,
    PRODUCT_INSIGHTS_CANCELLED_REASONS_REQUEST,
    PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_REQUEST,
    PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_REQUEST,
    PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_REQUEST,
    PRODUCT_INSIGHTS_TOP_LEAST_POPULAR_REQUEST,
    PRODUCT_INSIGHTS_TOP_LEAST_POPULAR_REVENUE_REQUEST,
} from './productReportsConstants';

import {
    productInsightsTopRevenueSuccess,
    productInsightsTopRevenueFailure,
    productInsightsTopPopularSuccess,
    productInsightsTopPopularFailure,
    productInsightsTopPopularRevenueSuccess,
    productInsightsTopPopularRevenueFailure,
    productInsightsTopRevenueStreamsSuccess,
    productInsightsTopRevenueStreamsFailure,
    productInsightsCancelledItemsSuccess,
    productInsightsCancelledItemsFailure,
    productInsightsCancelledReasonsSuccess,
    productInsightsCancelledReasonsFailure,
    productInsightsItemsCancelledReasonsSuccess,
    productInsightsItemsCancelledReasonsFailure,
    productAvailabilityByChannelsSuccess,
    productAvailabilityByChannelsFailure,
    productAvailabilityByChannelsDetailsSuccess,
    productAvailabilityByChannelsDetailsFailure,
    productInsightsTopLeastPopularSuccess,
    productInsightsTopLeastPopularFailure,
    productInsightsTopLeastPopularRevenueSuccess,
    productInsightsTopLeastPopularRevenueFailure,
} from './productReportsActions';

import {
    getProductInsightsTopRevenue,
    getProductInsightsTopPopular,
    getProductInsightsTopPopularRevenue,
    getProductInsightsTopRevenueStreams,
    getProductInsightsCancelledItems,
    getProductInsightsCancelledReasons,
    getProductInsightsItemsCancelledReasons,
    getProductInsightsAvailabilityByChannels,
    getProductInsightsAvailabilityByChannelsDetails,
    getProductInsightsTopLeastPopular,
    getProductInsightsTopLeastPopularRevenue,
} from './productReportsApi';

function* productInsightsTopRevenueSaga(action) {
    try {
        const response = yield call(getProductInsightsTopRevenue, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(productInsightsTopRevenueSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(productInsightsTopRevenueFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(productInsightsTopRevenueFailure(error));
    }
}

function* productInsightsTopPopularSaga(action) {
    try {
        const response = yield call(getProductInsightsTopPopular, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(productInsightsTopPopularSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(productInsightsTopPopularFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(productInsightsTopPopularFailure(error));
    }
}

function* productInsightsTopLeastPopularSaga(action) {
    try {
        const response = yield call(getProductInsightsTopLeastPopular, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(productInsightsTopLeastPopularSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(productInsightsTopLeastPopularFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(productInsightsTopLeastPopularFailure(error));
    }
}

function* productInsightsTopPopularRevenueSaga(action) {
    try {
        const response = yield call(getProductInsightsTopPopularRevenue, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(productInsightsTopPopularRevenueSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(productInsightsTopPopularRevenueFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(productInsightsTopPopularRevenueFailure(error));
    }
}

function* productInsightsTopLeastPopularRevenueSaga(action) {
    try {
        const response = yield call(getProductInsightsTopLeastPopularRevenue, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(productInsightsTopLeastPopularRevenueSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(productInsightsTopLeastPopularRevenueFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(productInsightsTopLeastPopularRevenueFailure(error));
    }
}

function* productInsightsTopRevenueStreamsSaga(action) {
    try {
        const response = yield call(getProductInsightsTopRevenueStreams, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(productInsightsTopRevenueStreamsSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(productInsightsTopRevenueStreamsFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(productInsightsTopRevenueStreamsFailure(error));
    }
}

function* productInsightsCancelledItemsSaga(action) {
    try {
        const response = yield call(getProductInsightsCancelledItems, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(productInsightsCancelledItemsSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(productInsightsCancelledItemsFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(productInsightsCancelledItemsFailure(error));
    }
}

function* productInsightsCancelledReasonsSaga(action) {
    try {
        const response = yield call(getProductInsightsCancelledReasons, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(productInsightsCancelledReasonsSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(productInsightsCancelledReasonsFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(productInsightsCancelledReasonsFailure(error));
    }
}

function* productInsightsItemsCancelledReasonsSaga(action) {
    try {
        const response = yield call(getProductInsightsItemsCancelledReasons, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(productInsightsItemsCancelledReasonsSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(productInsightsItemsCancelledReasonsFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(productInsightsItemsCancelledReasonsFailure(error));
    }
}

function* productAvailabilityByChannelsSaga(action) {
    try {
        const response = yield call(getProductInsightsAvailabilityByChannels, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(productAvailabilityByChannelsSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(productAvailabilityByChannelsFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(productAvailabilityByChannelsFailure(error));
    }
}

function* productAvailabilityByChannelsDetailsSaga(action) {
    try {
        const response = yield call(getProductInsightsAvailabilityByChannelsDetails, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            yield put(productAvailabilityByChannelsDetailsSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(productAvailabilityByChannelsDetailsFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(productAvailabilityByChannelsDetailsFailure(error));
    }
}

export default function* watchNewReportRequest() {
    // Product Reports watchers
    yield takeLatest(PRODUCT_INSIGHTS_TOP_REVENUE_REQUEST, productInsightsTopRevenueSaga);
    yield takeLatest(PRODUCT_INSIGHTS_TOP_POPULAR_REQUEST, productInsightsTopPopularSaga);
    yield takeLatest(PRODUCT_INSIGHTS_TOP_LEAST_POPULAR_REQUEST, productInsightsTopLeastPopularSaga);
    yield takeLatest(PRODUCT_INSIGHTS_TOP_POPULAR_REVENUE_REQUEST, productInsightsTopPopularRevenueSaga);
    yield takeLatest(PRODUCT_INSIGHTS_TOP_LEAST_POPULAR_REVENUE_REQUEST, productInsightsTopLeastPopularRevenueSaga);
    yield takeLatest(PRODUCT_INSIGHTS_TOP_REVENUE_STREAMS_REQUEST, productInsightsTopRevenueStreamsSaga);
    yield takeLatest(PRODUCT_INSIGHTS_CANCELLED_ITEMS_REQUEST, productInsightsCancelledItemsSaga);
    yield takeLatest(PRODUCT_INSIGHTS_CANCELLED_REASONS_REQUEST, productInsightsCancelledReasonsSaga);
    yield takeLatest(PRODUCT_INSIGHTS_ITEMS_CANCELLED_REASONS_REQUEST, productInsightsItemsCancelledReasonsSaga);
    yield takeLatest(PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_REQUEST, productAvailabilityByChannelsSaga);
    yield takeLatest(PRODUCT_INSIGHTS_AVAILABILITY_BY_CHANNELS_DETAILS_REQUEST, productAvailabilityByChannelsDetailsSaga);
}