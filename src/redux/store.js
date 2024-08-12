import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'MP_ROOT',
    storage,
    whitelist: ['auth', 'menu'], 
    blacklist: ['employee', 'subscription', 'payment', 'productCatalog', 'offer'], 
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  

const sagaMiddleware = createSagaMiddleware();

const Store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

// Create persistor
const persistor = persistStore(Store);

// Exports
export default Store;

export { Store, persistor };
