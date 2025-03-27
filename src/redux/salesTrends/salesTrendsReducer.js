import { produce } from "immer";
import {
CATEGORIES_LEVEL_SALES_TREND_REQUEST,
CATEGORIES_LEVEL_SALES_TREND_SUCCESS,
CATEGORIES_LEVEL_SALES_TREND_FAILURE,

ITEMS_LEVEL_SALES_TREND_REQUEST,
ITEMS_LEVEL_SALES_TREND_SUCCESS,
ITEMS_LEVEL_SALES_TREND_FAILURE,

SALES_TRENDS_REQUEST,
SALES_TRENDS_SUCCESS,
SALES_TRENDS_FAILURE,

} from "./salesTrendsConstants";

const initialNewReportsState = {
  salesTrendsLoading: false,
  salesTrendsSuccess: [],
  salesTrendsFailure: false,

  categoriesLevelsalesTrendLoading: false,
  categoriesLevelsalesTrendSuccess: [],
  categoriesLevelsalesTrendFailure: false,

  itemsLevelsalesTrendLoading: false,
  itemsLevelsalesTrendSuccess: [],
  itemsLevelsalesTrendFailure: false,
};

export default function checkInReportsReducer(
  state = initialNewReportsState,
  action
) {
  return produce(state, (draft) => {
    switch (action.type) {


      case SALES_TRENDS_REQUEST:
        draft.salesTrendsLoading = true;
        draft.salesTrendsSuccess = [];
        draft.salesTrendsFailure = false;
        break;
      case SALES_TRENDS_SUCCESS:
        draft.salesTrendsSuccess = action.payload;
        draft.salesTrendsLoading = false;
        draft.salesTrendsFailure = false;
        break;
      case SALES_TRENDS_FAILURE:
        draft.salesTrendsSuccess = [];
        draft.salesTrendsLoading = false;
        draft.salesTrendsFailure = true;
        break;


      case CATEGORIES_LEVEL_SALES_TREND_REQUEST:
        draft.categoriesLevelsalesTrendLoading = true;
        draft.categoriesLevelsalesTrendSuccess = [];
        draft.categoriesLevelsalesTrendFailure = false;
        break;
      case CATEGORIES_LEVEL_SALES_TREND_SUCCESS:
        draft.categoriesLevelsalesTrendSuccess = action.payload;
        draft.categoriesLevelsalesTrendLoading = false;
        draft.categoriesLevelsalesTrendFailure = false;
        break;
      case CATEGORIES_LEVEL_SALES_TREND_FAILURE:
        draft.categoriesLevelsalesTrendSuccess = [];
        draft.categoriesLevelsalesTrendLoading = false;
        draft.categoriesLevelsalesTrendFailure = true;
        break;


        case ITEMS_LEVEL_SALES_TREND_REQUEST:
          draft.itemsLevelsalesTrendLoading = true;
          draft.itemsLevelsalesTrendSuccess = [];
          draft.itemsLevelsalesTrendFailure = false;
          break;
        case ITEMS_LEVEL_SALES_TREND_SUCCESS:
          draft.itemsLevelsalesTrendSuccess = action.payload;
          draft.itemsLevelsalesTrendLoading = false;
          draft.itemsLevelsalesTrendFailure = false;
          break;
        case ITEMS_LEVEL_SALES_TREND_FAILURE:
          draft.itemsLevelsalesTrendSuccess = [];
          draft.itemsLevelsalesTrendLoading = false;
          draft.itemsLevelsalesTrendFailure = true;
          break;
  
      default:
        break;
    }
  });
}
