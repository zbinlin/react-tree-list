"use strict";

import { UPDATE_LOCATION } from "react-router-redux";

export default function updateLocation(state = {}, action) {
    switch (action.type) {
        case UPDATE_LOCATION:
            return {};
        default:
            return state;
    }
}
