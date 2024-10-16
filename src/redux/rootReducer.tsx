import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import employeeReducer from "./employee/employeeReducers";
import menuReducer from "./menu/menuReducer";
import subscriptionReducer from "./subscription/subscriptionReducer";
import paymentReducer from "./payment/paymentReducer";
// import offerReducer from "./offer/offerReducer";
import productCatalogReducer, { primarypagereducer,itemCustomizationsReducer,PricingDetailReducer,imageReducer, storeMockDataReducer, storeMockDataFilteredReducer, addMockDataReducer,imageUploadReducer, addMockDataHiddenReducer, getItemCodeReducer, selectedMockDataReducer, getPopularItemReducer, searchforamitemreducer } from "./productCatalog/productCatalogReducers";
import offerReducer from "./offer/offerReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  menu: menuReducer,
  subscription: subscriptionReducer,
  payment: paymentReducer,
  productCatalog: productCatalogReducer,
  searchItem:searchforamitemreducer,
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
  menuReducer:menuReducer

  
});
 
export { rootReducer };
 
export type RootState = ReturnType<typeof rootReducer>;
 
 