import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import employeeReducer from "./employee/employeeReducers";
import menuReducer from "./menu/menuReducer";
import subscriptionReducer from "./subscription/subscriptionReducer";
import paymentReducer from "./payment/paymentReducer";
import productCatalogReducer from "./productCatalog/productCatalogReducers";
import offerReducer from "./offer/offerReducer";

// Combine the individual reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  menu: menuReducer,
  subscription: subscriptionReducer,
  payment: paymentReducer,
  productCatalog: productCatalogReducer,
  offer: offerReducer,
});

// Export the rootReducer
export { rootReducer };

// Define and export the RootState type
export type RootState = ReturnType<typeof rootReducer>;
