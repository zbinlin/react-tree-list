"use strict";

import React from "react";
import { Router, IndexRoute, Route, browserHistory } from "react-router";

import {
    Root,
} from "./containers";

export default (
    <Router history={browserHistory}>
        <Route path="/">
            <IndexRoute component={Root} />
        </Route>
    </Router>
);
