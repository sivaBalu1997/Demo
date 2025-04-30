import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import employeeReducer from "./employee/employeeReducers";
import menuReducer from "./menu/menuReducer";
import subscriptionReducer from "./subscription/subscriptionReducer";
import paymentReducer from "./payment/paymentReducer";
// import offerReducer from "./offer/offerReducer";
import productCatalogReducer, {
  primarypagereducer,
  itemCustomizationsReducer,
  PricingDetailReducer,
  storeMockDataReducer,
  storeMockDataFilteredReducer,
  addMockDataReducer,
  imageUploadReducer,
  addMockDataHiddenReducer,
  getItemCodeReducer,
  selectedMockDataReducer,
  getPopularItemReducer,
  searchforamitemreducer,
  storeDataReducer,
} from "./productCatalog/productCatalogReducers";
import offerReducer from "./offer/offerReducer";
import newReportsReducer from "./newReports/newReportsReducer";
import checkInReportsReducer from "./checkInReports/checkInReportsReducer";
import productReportsReducer from "./productReports/productReportsReducer";
import customerInsightsReducer from "./customerInsights/customerInsightsReducer";
import staffReportsReducer from "./staffReports/staffReportsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  menu: menuReducer,
  subscription: subscriptionReducer,
  payment: paymentReducer,
  productCatalog: productCatalogReducer,
  searchItem: searchforamitemreducer,
  offer: offerReducer,
  primarypage: primarypagereducer,
  itemCustomizationsReducer1: itemCustomizationsReducer,
  PricingDetailReducer: PricingDetailReducer,
  storeMockDataReducer: storeMockDataReducer,
  storeMockDataFilteredReducer: storeMockDataFilteredReducer,
  addMockDataReducer: addMockDataReducer,
  imageUpload: imageUploadReducer,
  addMockDataHiddenReducer: addMockDataHiddenReducer,
  getItemCodeReducer: getItemCodeReducer,
  selectedMockDataReducer: selectedMockDataReducer,
  getPopularItemReducer: getPopularItemReducer,
  menuReducer: menuReducer,
  storeDataReducer: storeDataReducer,
  newReports: newReportsReducer,
  checkInReports: checkInReportsReducer,
  productReports: productReportsReducer,
  customerInsights: customerInsightsReducer,
  staffReports: staffReportsReducer,
});

export { rootReducer };

export type RootState = ReturnType<typeof rootReducer>;
