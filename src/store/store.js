import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import card from "../card/ducks";
import services from "../services";
import users from "./users";
import { apiMiddleware } from "./apiMiddleware";

const loggerMiddleware = createLogger(); // initialize logger

const createStoreWithMiddleware = applyMiddleware(
  loggerMiddleware,
  thunk,
  apiMiddleware
)(createStore); // apply logger to redux

const reducer = combineReducers({
  card,
  services,
  users
});

const storeConfig = initialState =>
  createStoreWithMiddleware(reducer, initialState);
export default storeConfig;
