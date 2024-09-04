import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import employeeReducer from "./employee/employeeReducers";
import menuReducer from "./menu/menuReducer";
import subscriptionReducer from "./subscription/subscriptionReducer";
import paymentReducer from "./payment/paymentReducer";
import productCatalogReducer from "./productCatalog/productCatalogReducers";
import offerReducer from "./offer/offerReducer";
import { Apidatas, PricingDetailReducer, itemCustomizationsReducer, primarypagereducer } from "./productCatalogSprint-99/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  menu: menuReducer,
  subscription: subscriptionReducer,
  payment: paymentReducer,
  productCatalog: productCatalogReducer,
  offer: offerReducer,
  primarypage:primarypagereducer,
  itemCustomizationsReducer1:itemCustomizationsReducer,
  PricingDetailReducer:PricingDetailReducer,
  Apireducer:Apidatas
});

export { rootReducer };

export type RootState = ReturnType<typeof rootReducer>;
