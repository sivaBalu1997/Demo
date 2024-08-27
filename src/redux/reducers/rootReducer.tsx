import { combineReducers } from "redux";

import authReducer from "./authReducer";
import employeeReducer from "./employeeReducers";
import menuReducer from "./menuReducer";
import subscriptionReducer from "./subscriptionReducer";
import paymentReducer from "./paymentReducer";
import productCatalogReducer from "./productCatalogReducers";
import offerReducer from "./offerReducer";

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
