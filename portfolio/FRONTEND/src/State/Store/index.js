import { createStore } from "redux";
import { thunk } from "redux-thunk";
import { applyMiddleware } from "redux";
import { combinedReducers } from "../reducers/combine-reducers";
export const store = createStore(combinedReducers, applyMiddleware(thunk));
