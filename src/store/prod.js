"use strict";

import { createStore, applyMiddleware, compose } from "redux";
import { browserHistory } from "react-router";
import { syncHistory } from "react-router-redux";

import reducer from "../reducers";

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
const finalCreateStore = compose(
    applyMiddleware(reduxRouterMiddleware)
)(createStore);

export default function __createStore__(initialState) {
    return finalCreateStore(reducer, initialState);
}
