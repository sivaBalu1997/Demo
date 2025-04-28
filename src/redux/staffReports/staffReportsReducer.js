import { produce } from "immer";
import {
    STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_REQUEST,
    STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_SUCCESS,
    STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_FAILURE,
    STAFF_OVERVIEW_ACTIVITIES_REQUEST,
    STAFF_OVERVIEW_ACTIVITIES_SUCCESS,
    STAFF_OVERVIEW_ACTIVITIES_FAILURE,
    STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_TABLE_REQUEST,
    STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_TABLE_SUCCESS,
    STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_TABLE_FAILURE,
    STAFF_TREND_SALES_PERFORMANCE_REQUEST,
    STAFF_TREND_SALES_PERFORMANCE_SUCCESS,
    STAFF_TREND_SALES_PERFORMANCE_FAILURE,
    // STAFF_TREND_SALES_PERFORMANCE_ORDERS_REQUEST,
    // STAFF_TREND_SALES_PERFORMANCE_ORDERS_SUCCESS,
    // STAFF_TREND_SALES_PERFORMANCE_ORDERS_FAILURE,
    STAFF_TREND_REVENUE_IMPACT_PERFORMANCE_REQUEST,
    STAFF_TREND_REVENUE_IMPACT_PERFORMANCE_SUCCESS,
    STAFF_TREND_REVENUE_IMPACT_PERFORMANCE_FAILURE,
    STAFF_TREND_ERROR_PERFORMANCE_REQUEST,
    STAFF_TREND_ERROR_PERFORMANCE_SUCCESS,
    STAFF_TREND_ERROR_PERFORMANCE_FAILURE,
} from "./staffReportsConstants";
   

const initialNewReportsState = {
    // Staff Overview Employee Performance
    staffOverviewEmployeePerformanceLoading: false,
    staffOverviewEmployeePerformanceSuccess: [],
    staffOverviewEmployeePerformanceFailure: false,

    // Staff Overview Activities
    staffOverviewActivitiesLoading: false,
    staffOverviewActivitiesSuccess: [],
    staffOverviewActivitiesFailure: false,

    // Staff Overview Employee Performance Table
    staffOverviewEmployeePerformanceTableLoading: false,
    staffOverviewEmployeePerformanceTableSuccess: [],
    staffOverviewEmployeePerformanceTableFailure: false,

    // Staff Trend Sales Performance
    staffTrendSalesPerformanceLoading: false,
    staffTrendSalesPerformanceSuccess: [],
    staffTrendSalesPerformanceFailure: false,

    // Staff Trend Sales Performance Orders
    // staffTrendSalesPerformanceOrdersLoading: false,
    // staffTrendSalesPerformanceOrdersSuccess: [],
    // staffTrendSalesPerformanceOrdersFailure: false,

    // Staff Trend Revenue Impact Performance
    staffTrendRevenueImpactPerformanceLoading: false,
    staffTrendRevenueImpactPerformanceSuccess: [],
    staffTrendRevenueImpactPerformanceFailure: false,

    // Staff Trend Error Performance
    staffTrendErrorPerformanceLoading: false,
    staffTrendErrorPerformanceSuccess: [],
    staffTrendErrorPerformanceFailure: false,

 
};

export default function checkInReportsReducer(state = initialNewReportsState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_REQUEST:
                draft.staffOverviewEmployeePerformanceLoading = true;
                draft.staffOverviewEmployeePerformanceSuccess = [];
                draft.staffOverviewEmployeePerformanceFailure = false;
                break;
            case STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_SUCCESS:
                draft.staffOverviewEmployeePerformanceSuccess = action.payload;
                draft.staffOverviewEmployeePerformanceLoading = false;
                draft.staffOverviewEmployeePerformanceFailure = false;
                break;
            case STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_FAILURE:
                draft.staffOverviewEmployeePerformanceSuccess = [];
                draft.staffOverviewEmployeePerformanceLoading = false;
                draft.staffOverviewEmployeePerformanceFailure = true;
                break;

            case STAFF_OVERVIEW_ACTIVITIES_REQUEST:
                draft.staffOverviewActivitiesLoading = true;
                draft.staffOverviewActivitiesSuccess = [];
                draft.staffOverviewActivitiesFailure = false;
                break;
            case STAFF_OVERVIEW_ACTIVITIES_SUCCESS:
                draft.staffOverviewActivitiesSuccess = action.payload;
                draft.staffOverviewActivitiesLoading = false;
                draft.staffOverviewActivitiesFailure = false;
                break;
            case STAFF_OVERVIEW_ACTIVITIES_FAILURE:
                draft.staffOverviewActivitiesSuccess = [];
                draft.staffOverviewActivitiesLoading = false;
                draft.staffOverviewActivitiesFailure = true;
                break;

            case STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_TABLE_REQUEST:
                draft.staffOverviewEmployeePerformanceTableLoading = true;
                draft.staffOverviewEmployeePerformanceTableSuccess = [];
                draft.staffOverviewEmployeePerformanceTableFailure = false;
                break;
            case STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_TABLE_SUCCESS:
                draft.staffOverviewEmployeePerformanceTableSuccess = action.payload;
                draft.staffOverviewEmployeePerformanceTableLoading = false;
                draft.staffOverviewEmployeePerformanceTableFailure = false;
                break;
            case STAFF_OVERVIEW_EMPLOYEE_PERFORMANCE_TABLE_FAILURE:
                draft.staffOverviewEmployeePerformanceTableSuccess = [];
                draft.staffOverviewEmployeePerformanceTableLoading = false;
                draft.staffOverviewEmployeePerformanceTableFailure = true;
                break;

            case STAFF_TREND_SALES_PERFORMANCE_REQUEST:
                draft.staffTrendSalesPerformanceLoading = true;
                draft.staffTrendSalesPerformanceSuccess = [];
                draft.staffTrendSalesPerformanceFailure = false;
                break;
            case STAFF_TREND_SALES_PERFORMANCE_SUCCESS:
                draft.staffTrendSalesPerformanceSuccess = action.payload;
                draft.staffTrendSalesPerformanceLoading = false;
                draft.staffTrendSalesPerformanceFailure = false;
                break;
            case STAFF_TREND_SALES_PERFORMANCE_FAILURE:
                draft.staffTrendSalesPerformanceSuccess = [];
                draft.staffTrendSalesPerformanceLoading = false;
                draft.staffTrendSalesPerformanceFailure = true;
                break;

            // case STAFF_TREND_SALES_PERFORMANCE_ORDERS_REQUEST:
            //     draft.staffTrendSalesPerformanceOrdersLoading = true;
            //     draft.staffTrendSalesPerformanceOrdersSuccess = [];
            //     draft.staffTrendSalesPerformanceOrdersFailure = false;
            //     break;
            // case STAFF_TREND_SALES_PERFORMANCE_ORDERS_SUCCESS:
            //     draft.staffTrendSalesPerformanceOrdersLoading = false;
            //     draft.staffTrendSalesPerformanceOrdersSuccess = action.payload;
            //     draft.staffTrendSalesPerformanceOrdersFailure = false;
            //     break;
            // case STAFF_TREND_SALES_PERFORMANCE_ORDERS_FAILURE:
            //     draft.staffTrendSalesPerformanceOrdersLoading = false;
            //     draft.staffTrendSalesPerformanceOrdersSuccess = [];
            //     draft.staffTrendSalesPerformanceOrdersFailure = true;
            //     break;

            case STAFF_TREND_REVENUE_IMPACT_PERFORMANCE_REQUEST:
                draft.staffTrendRevenueImpactPerformanceLoading = true;
                draft.staffTrendRevenueImpactPerformanceSuccess = [];
                draft.staffTrendRevenueImpactPerformanceFailure = false;
                break;
            case STAFF_TREND_REVENUE_IMPACT_PERFORMANCE_SUCCESS:
                draft.staffTrendRevenueImpactPerformanceSuccess = action.payload;
                draft.staffTrendRevenueImpactPerformanceLoading = false;
                draft.staffTrendRevenueImpactPerformanceFailure = false;
                break;
            case STAFF_TREND_REVENUE_IMPACT_PERFORMANCE_FAILURE:
                draft.staffTrendRevenueImpactPerformanceSuccess = [];
                draft.staffTrendRevenueImpactPerformanceLoading = false;
                draft.staffTrendRevenueImpactPerformanceFailure = true;
                break;

            case STAFF_TREND_ERROR_PERFORMANCE_REQUEST:
                draft.staffTrendErrorPerformanceLoading = true;
                draft.staffTrendErrorPerformanceSuccess = [];
                draft.staffTrendErrorPerformanceFailure = false;
                break;
            case STAFF_TREND_ERROR_PERFORMANCE_SUCCESS:
                draft.staffTrendErrorPerformanceSuccess = action.payload;
                draft.staffTrendErrorPerformanceLoading = false;
                draft.staffTrendErrorPerformanceFailure = false;
                break;
            case STAFF_TREND_ERROR_PERFORMANCE_FAILURE:
                draft.staffTrendErrorPerformanceSuccess = [];
                draft.staffTrendErrorPerformanceLoading = false;
                draft.staffTrendErrorPerformanceFailure = true;
                break;           

            default:
                break;
        }
    })
}