"use strict";

import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { browserHistory } from "react-router";
import { syncHistory } from "react-router-redux";

import reducer from "../reducers";

import createLogger from "redux-logger";
import DevTools from "../containers/devtools";

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
const loggerMiddleware = createLogger();
const finalCreateStore = compose(
    applyMiddleware(
        loggerMiddleware,
        thunkMiddleware,
        reduxRouterMiddleware
    ),
    DevTools.instrument()
)(createStore);

export default function __createStore__(initialState) {
    const store = finalCreateStore(reducer, initialState);

    // Required for replaying actions from devtools to work
    //reduxRouterMiddleware.listenForReplays(store);

    if (typeof module === "object" && module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("../reducers", () => {
            const nextRootReducer = require("../reducers");
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
