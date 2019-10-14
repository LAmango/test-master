import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import card from "../card/ducks";

const loggerMiddleware = createLogger(); // initialize logger

const createStoreWithMiddleware = applyMiddleware(loggerMiddleware, thunk)(
  createStore
); // apply logger to redux

const reducer = combineReducers({
  card
});

const storeConfig = initialState =>
  createStoreWithMiddleware(reducer, initialState);
export default storeConfig;
