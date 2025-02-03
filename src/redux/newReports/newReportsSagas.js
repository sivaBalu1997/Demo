import { put, call, takeLatest } from "redux-saga/effects";
import { showSuccessToast, showErrorToast } from "util/toastUtils";
import { salesSummarySuccess, salesSummaryFailure, salesByItemCategoryFailure, salesByItemCategorySuccess, salesByRevenueClassSuccess, salesByRevenueClassFailure, actualSalesRequest, actualSalesFailure, actualSalesSuccess, actualSalesThirdPartySuccess, actualSalesThirdPartyFailure, hourlySalesSuccess, hourlySalesFailure, liveDiscountSuccess, liveDiscountFailure, liveOpenSalesSuccess, liveOpenSalesFailure, liveOrdersSuccess, liveOrdersFailure, liveRefundsSuccess, liveRefundsFailure, liveNetSalesSuccess, liveNetSalesFailure, liveOrderNonDineInSuccess, liveOrderNonDineInFailure, discountSummarySuccess, discountSummaryFailure, cancellationSummarySuccess, cancellationSummaryFailure, employeeStaffTipGratuitySuccess, employeeStaffTipGratuityFailure, employeeStaffDiscountSuccess, employeeStaffDiscountFailure, employeeStaffPerformanceFailure, employeeStaffPerformanceSuccess, employeeStaffActivitySuccess, employeeStaffActivityFailure } from "./newReportsActions";
import { ACTUAL_SALES_REQUEST, ACTUAL_SALES_THIRD_PARTY_REQUEST, CANCELLATION_SUMMARY_REQUEST, DISCOUNT_SUMMARY_REQUEST, EMPLOYEE_STAFF_ACTIVITY_REQUEST, EMPLOYEE_STAFF_DISCOUNT_REQUEST, EMPLOYEE_STAFF_PERFORMANCE_REQUEST, EMPLOYEE_STAFF_TIP_GRATUITY_REQUEST, HOURLY_SALES_REQUEST, LIVE_DISCOUNT_REQUEST, LIVE_NET_SALES_REQUEST, LIVE_OPEN_SALES_REQUEST, LIVE_ORDER_NON_DINE_IN_REQUEST, LIVE_ORDERS_REQUEST, LIVE_REFUNDS_REQUEST, SALES_BY_ITEM_CATEGORY_REQUEST, SALES_BY_REVENUE_CLASS_REQUEST, SALES_SUMMARY_REQUEST } from "./newReportsConstants";
import { getActualSales, getCancellationSummary, getDiscountSummary, getEmployeeStaffActivity, getEmployeeStaffDiscount, getEmployeeStaffPerformance, getEmployeeStaffTipGratuity, getHourlySalesChart, getLiveDiscount, getLiveNetSales, getLiveOpenSales, getLiveOrderNonDineIn, getLiveOrders, getLiveRefunds, getSalesByItemCategory, getSalesByRevenueClass, getSalesSummary } from "./newReportsApi";
import { decryptJson } from "util/react-ec-utils";

export function* salesSummaryRequestSaga(action) {
    try {
        const response = yield call(getSalesSummary, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of salesSummaryRequestSaga", { decryptedData });
            yield put(salesSummarySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(salesSummaryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(salesSummaryFailure(error));
    }
}

export function* salesByItemCategoryRequestSaga(action) {
    try {
        const response = yield call(getSalesByItemCategory, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of salesByItemCategoryRequestSaga", { decryptedData })
            yield put(salesByItemCategorySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(salesByItemCategoryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(salesByItemCategoryFailure(error));
    }
}

export function* salesByRevenueClassRequestSaga(action) {
    try {
        const response = yield call(getSalesByRevenueClass, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of salesByRevenueClassRequestSaga", { decryptedData })
            yield put(salesByRevenueClassSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(salesByRevenueClassFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(salesByRevenueClassFailure(error));
    }
}

export function* actualSalesRequestSaga(action) {
    try {
        const response = yield call(getActualSales, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of actualSalesRequestSaga", { decryptedData })
            yield put(actualSalesSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(actualSalesFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(actualSalesFailure(error));
    }
}

export function* actualSalesThirdPartyRequestSaga(action) {
    try {
        const response = yield call(getActualSales, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of actualSalesThirdPartyRequestSaga", { decryptedData })
            yield put(actualSalesThirdPartySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(actualSalesThirdPartyFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(actualSalesThirdPartyFailure(error));
    }
}


export function* hourlySalesRequestSaga(action) {
    try {
        const response = yield call(getHourlySalesChart, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of hourlySalesRequestSaga", { decryptedData })
            yield put(hourlySalesSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(hourlySalesFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(hourlySalesFailure(error));
    }
}

export function* liveDiscountRequestSaga(action) {
    try {
        const response = yield call(getLiveDiscount, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of liveDiscountRequestSaga", { decryptedData })
            yield put(liveDiscountSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveDiscountFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveDiscountFailure(error));
    }
}

//liveOpenSalesRequestSaga
export function* liveOpenSalesRequestSaga(action) {
    try {
        const response = yield call(getLiveOpenSales, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of liveOpenSalesRequestSaga", { decryptedData })
            yield put(liveOpenSalesSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveOpenSalesFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveOpenSalesFailure(error));
    }
}

//liveOrdersRequestSaga
export function* liveOrdersRequestSaga(action) {
    try {
        const response = yield call(getLiveOrders, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of liveOrdersRequestSaga", { decryptedData })
            yield put(liveOrdersSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveOrdersFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveOrdersFailure(error));
    }
}

//liveRefundsRequestSaga
export function* liveRefundsRequestSaga(action) {
    try {
        const response = yield call(getLiveRefunds, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of liveRefundsRequestSaga", { decryptedData })
            yield put(liveRefundsSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveRefundsFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveRefundsFailure(error));
    }
}

//liveNetSalesRequestSaga
export function* liveNetSalesRequestSaga(action) {
    try {
        const response = yield call(getLiveNetSales, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of liveNetSalesRequestSaga", { decryptedData })
            yield put(liveNetSalesSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveNetSalesFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveNetSalesFailure(error));
    }
}

//liveOrderNonDineInRequestSaga
export function* liveOrderNonDineInRequestSaga(action) {
    try {
        const response = yield call(getLiveOrderNonDineIn, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of liveOrderNonDineInRequestSaga", { decryptedData })
            yield put(liveOrderNonDineInSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(liveOrderNonDineInFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(liveOrderNonDineInFailure(error));
    }
}

//discountSummaryRequestSaga
export function* discountSummaryRequestSaga(action) {
    try {
        const response = yield call(getDiscountSummary, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of discountSummaryRequestSaga", { decryptedData })
            yield put(discountSummarySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(discountSummaryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(discountSummaryFailure(error));
    }
}

//cancellationSummaryRequestSaga
export function* cancellationSummaryRequestSaga(action) {
    try {
        const response = yield call(getCancellationSummary, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of cancellationSummaryRequestSaga", { decryptedData })
            yield put(cancellationSummarySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(cancellationSummaryFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(cancellationSummaryFailure(error));
    }
}

//employeeStaffTipGratuityRequestSaga
export function* employeeStaffTipGratuityRequestSaga(action) {
    try {
        const response = yield call(getEmployeeStaffTipGratuity, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of employeeStaffTipGratuityRequestSaga", { decryptedData })
            yield put(employeeStaffTipGratuitySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(employeeStaffTipGratuityFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(employeeStaffTipGratuityFailure(error));
    }
}

//employeeStaffDiscountRequestSaga
export function* employeeStaffDiscountRequestSaga(action) {
    try {
        const response = yield call(getEmployeeStaffDiscount, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of employeeStaffDiscountRequestSaga", { decryptedData })
            yield put(employeeStaffDiscountSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(employeeStaffDiscountFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(employeeStaffDiscountFailure(error));
    }
}

//employeeStaffPerformanceRequestSaga
export function* employeeStaffPerformanceRequestSaga(action) {
    try {
        const response = yield call(getEmployeeStaffPerformance, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of employeeStaffPerformanceRequestSaga", { decryptedData })
            yield put(employeeStaffPerformanceSuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(employeeStaffPerformanceFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(employeeStaffPerformanceFailure(error));
    }
}

//employeeStaffActivityRequestSaga
export function* employeeStaffActivityRequestSaga(action) {
    try {
        const response = yield call(getEmployeeStaffActivity, action.payload);
        const decryptedData = decryptJson(response?.data?.encryptedText)
        if (response.status === 200) {
            // console.log("response of employeeStaffActivityRequestSaga", { decryptedData })
            yield put(employeeStaffActivitySuccess(decryptedData));
            showSuccessToast(decryptedData?.message);
        } else {
            yield put(employeeStaffActivityFailure(decryptedData?.message));
            showErrorToast(decryptedData?.message);
        }
    } catch (error) {
        yield put(employeeStaffActivityFailure(error));
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
    yield takeLatest(EMPLOYEE_STAFF_TIP_GRATUITY_REQUEST, employeeStaffTipGratuityRequestSaga);
    yield takeLatest(EMPLOYEE_STAFF_DISCOUNT_REQUEST, employeeStaffDiscountRequestSaga);
    yield takeLatest(EMPLOYEE_STAFF_PERFORMANCE_REQUEST, employeeStaffPerformanceRequestSaga);
    yield takeLatest(EMPLOYEE_STAFF_ACTIVITY_REQUEST, employeeStaffActivityRequestSaga);
}