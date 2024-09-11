import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./rootReducer";
import rootSaga from "./rootSaga";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
 
const persistConfig = {
    key: 'MP_ROOT',
    storage,
    whitelist: ['auth'],
    blacklist: ['menu', 'employee', 'subscription', 'payment', 'productCatalog', 'offer'],
};
 
const persistedReducer = persistReducer(persistConfig, rootReducer);
 
const sagaMiddleware = createSagaMiddleware();
 
// Use type assertion to avoid TypeScript errors
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 
const Store = createStore(
    persistedReducer,
    composeEnhancers(
        applyMiddleware(sagaMiddleware)
    )
);
 
sagaMiddleware.run(rootSaga);
 
const persistor = persistStore(Store);
 
export default Store;
export { Store, persistor };