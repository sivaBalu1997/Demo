import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

// Exports
export default Store;
