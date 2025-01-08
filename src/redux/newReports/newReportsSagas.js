import { put, call, takeLatest } from "redux-saga/effects";
import { showSuccessToast, showErrorToast } from "util/toastUtils";
import { salesSummarySuccess, salesSummaryFailure, salesByItemCategoryFailure, salesByItemCategorySuccess, salesByRevenueClassSuccess, salesByRevenueClassFailure, actualSalesRequest, actualSalesFailure, actualSalesSuccess, actualSalesThirdPartySuccess, actualSalesThirdPartyFailure, hourlySalesSuccess, hourlySalesFailure, liveDiscountSuccess, liveDiscountFailure, liveOpenSalesSuccess, liveOpenSalesFailure, liveOrdersSuccess, liveOrdersFailure, liveRefundsSuccess, liveRefundsFailure, liveNetSalesSuccess, liveNetSalesFailure, liveOrderNonDineInSuccess, liveOrderNonDineInFailure, discountSummarySuccess, discountSummaryFailure, cancellationSummarySuccess, cancellationSummaryFailure } from "./newReportsActions";
import { ACTUAL_SALES_REQUEST, ACTUAL_SALES_THIRD_PARTY_REQUEST, CANCELLATION_SUMMARY_REQUEST, DISCOUNT_SUMMARY_REQUEST, HOURLY_SALES_REQUEST, LIVE_DISCOUNT_REQUEST, LIVE_NET_SALES_REQUEST, LIVE_OPEN_SALES_REQUEST, LIVE_ORDER_NON_DINE_IN_REQUEST, LIVE_ORDERS_REQUEST, LIVE_REFUNDS_REQUEST, SALES_BY_ITEM_CATEGORY_REQUEST, SALES_BY_REVENUE_CLASS_REQUEST, SALES_SUMMARY_REQUEST } from "./newReportsConstants";
import { getActualSales, getCancellationSummary, getDiscountSummary, getHourlySalesChart, getLiveDiscount, getLiveNetSales, getLiveOpenSales, getLiveOrderNonDineIn, getLiveOrders, getLiveRefunds, getSalesByItemCategory, getSalesByRevenueClass, getSalesSummary } from "./newReportsApi";

export function* salesSummaryRequestSaga(action) {
    try {
        const response = yield call(getSalesSummary, action.payload);
        if (response.status === 200) {
            console.log("response of salesSummaryRequestSaga", { response });
            yield put(salesSummarySuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(salesSummaryFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(salesSummaryFailure(error));
    }
}

export function* salesByItemCategoryRequestSaga(action) {
    try {
        const response = yield call(getSalesByItemCategory, action.payload);
        if (response.status === 200) {
            console.log("response of salesByItemCategoryRequestSaga", { response })
            yield put(salesByItemCategorySuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(salesByItemCategoryFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(salesByItemCategoryFailure(error));
    }
}

export function* salesByRevenueClassRequestSaga(action) {
    try {
        const response = yield call(getSalesByRevenueClass, action.payload);
        if (response.status === 200) {
            console.log("response of salesByRevenueClassRequestSaga", { response })
            yield put(salesByRevenueClassSuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(salesByRevenueClassFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(salesByRevenueClassFailure(error));
    }
}

export function* actualSalesRequestSaga(action) {
    try {
        const response = yield call(getActualSales, action.payload);
        if (response.status === 200) {
            console.log("response of actualSalesRequestSaga", { response })
            yield put(actualSalesSuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(actualSalesFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(actualSalesFailure(error));
    }
}

export function* actualSalesThirdPartyRequestSaga(action) {
    try {
        const response = yield call(getActualSales, action.payload);
        if (response.status === 200) {
            console.log("response of actualSalesThirdPartyRequestSaga", { response })
            yield put(actualSalesThirdPartySuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(actualSalesThirdPartyFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(actualSalesThirdPartyFailure(error));
    }
}


export function* hourlySalesRequestSaga(action) {
    try {
        const response = yield call(getHourlySalesChart, action.payload);
        if (response.status === 200) {
            console.log("response of hourlySalesRequestSaga", { response })
            yield put(hourlySalesSuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(hourlySalesFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(hourlySalesFailure(error));
    }
}

export function* liveDiscountRequestSaga(action) {
    try {
        const response = yield call(getLiveDiscount, action.payload);
        if (response.status === 200) {
            console.log("response of liveDiscountRequestSaga", { response })
            yield put(liveDiscountSuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(liveDiscountFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(liveDiscountFailure(error));
    }
}

//liveOpenSalesRequestSaga
export function* liveOpenSalesRequestSaga(action) {
    try {
        const response = yield call(getLiveOpenSales, action.payload);
        if (response.status === 200) {
            console.log("response of liveOpenSalesRequestSaga", { response })
            yield put(liveOpenSalesSuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(liveOpenSalesFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(liveOpenSalesFailure(error));
    }
}

//liveOrdersRequestSaga
export function* liveOrdersRequestSaga(action) {
    try {
        const response = yield call(getLiveOrders, action.payload);
        if (response.status === 200) {
            console.log("response of liveOrdersRequestSaga", { response })
            yield put(liveOrdersSuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(liveOrdersFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(liveOrdersFailure(error));
    }
}

//liveRefundsRequestSaga
export function* liveRefundsRequestSaga(action) {
    try {
        const response = yield call(getLiveRefunds, action.payload);
        if (response.status === 200) {
            console.log("response of liveRefundsRequestSaga", { response })
            yield put(liveRefundsSuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(liveRefundsFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(liveRefundsFailure(error));
    }
}

//liveNetSalesRequestSaga
export function* liveNetSalesRequestSaga(action) {
    try {
        const response = yield call(getLiveNetSales, action.payload);
        if (response.status === 200) {
            console.log("response of liveNetSalesRequestSaga", { response })
            yield put(liveNetSalesSuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(liveNetSalesFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(liveNetSalesFailure(error));
    }
}

//liveOrderNonDineInRequestSaga
export function* liveOrderNonDineInRequestSaga(action) {
    try {
        const response = yield call(getLiveOrderNonDineIn, action.payload);
        if (response.status === 200) {
            console.log("response of liveOrderNonDineInRequestSaga", { response })
            yield put(liveOrderNonDineInSuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(liveOrderNonDineInFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(liveOrderNonDineInFailure(error));
    }
}

//discountSummaryRequestSaga
export function* discountSummaryRequestSaga(action) {
    try {
        const response = yield call(getDiscountSummary, action.payload);
        if (response.status === 200) {
            console.log("response of discountSummaryRequestSaga", { response })
            yield put(discountSummarySuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(discountSummaryFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(discountSummaryFailure(error));
    }
}

//cancellationSummaryRequestSaga
export function* cancellationSummaryRequestSaga(action) {
    try {
        const response = yield call(getCancellationSummary, action.payload);
        if (response.status === 200) {
            console.log("response of cancellationSummaryRequestSaga", { response })
            yield put(cancellationSummarySuccess(response?.data));
            showSuccessToast(response?.data?.message);
        } else {
            yield put(cancellationSummaryFailure(response?.data?.message));
            showErrorToast(response?.data?.message);
        }
    } catch (error) {
        yield put(cancellationSummaryFailure(error));
    }
}


export default function* watchNewReportRequest() {
    yield takeLatest(SALES_SUMMARY_REQUEST, salesSummaryRequestSaga);
    yield takeLatest(SALES_BY_ITEM_CATEGORY_REQUEST, salesByItemCategoryRequestSaga);
    yield takeLatest(SALES_BY_REVENUE_CLASS_REQUEST, salesByRevenueClassRequestSaga);
    yield takeLatest(ACTUAL_SALES_REQUEST, actualSalesRequestSaga);
    yield takeLatest(ACTUAL_SALES_THIRD_PARTY_REQUEST, actualSalesThirdPartyRequestSaga);
    yield takeLatest(HOURLY_SALES_REQUEST, hourlySalesRequestSaga);
    yield takeLatest(LIVE_DISCOUNT_REQUEST, liveDiscountRequestSaga);
    yield takeLatest(LIVE_OPEN_SALES_REQUEST, liveOpenSalesRequestSaga);
    yield takeLatest(LIVE_ORDERS_REQUEST, liveOrdersRequestSaga);
    yield takeLatest(LIVE_REFUNDS_REQUEST, liveRefundsRequestSaga);
    yield takeLatest(LIVE_NET_SALES_REQUEST, liveNetSalesRequestSaga);
    yield takeLatest(LIVE_ORDER_NON_DINE_IN_REQUEST, liveOrderNonDineInRequestSaga);
    yield takeLatest(DISCOUNT_SUMMARY_REQUEST, discountSummaryRequestSaga);
    yield takeLatest(CANCELLATION_SUMMARY_REQUEST, cancellationSummaryRequestSaga);
}