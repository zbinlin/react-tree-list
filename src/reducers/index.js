"use strict";

import { combineReducers } from "redux";

import routing from "./routing";
import updateLocation from "./update-location";
import tree from "./tree-item";

export default combineReducers({
    routing,
    updateLocation,
    tree,
});
