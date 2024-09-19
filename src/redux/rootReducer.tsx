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
  imageReducer,
  storeMockDataReducer,
  storeMockDataFilteredReducer,
  addMockDataReducer,
} from "./productCatalog/productCatalogReducers";
import offerReducer from "./offer/offerReducer";
import { primarypagereducer,itemCustomizationsReducer,PricingDetailReducer,imageReducer } from "./productCatalog/productCatalogReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  menu: menuReducer,
  subscription: subscriptionReducer,
  payment: paymentReducer,
  productCatalog: productCatalogReducer,
  offer: offerReducer,
  primarypage: primarypagereducer,
  itemCustomizationsReducer1: itemCustomizationsReducer,
  PricingDetailReducer: PricingDetailReducer,
  storeMockDataReducer: storeMockDataReducer,
  storeMockDataFilteredReducer: storeMockDataFilteredReducer,
  addMockDataReducer: addMockDataReducer,
});

export { rootReducer };

export type RootState = ReturnType<typeof rootReducer>;
