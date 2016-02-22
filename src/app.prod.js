"use strict";

import React, { Component, PropTypes } from "react";
import { Provider } from "react-redux";

import routes from "./routes";

export default class App extends Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                {routes}
            </Provider>
        );
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};
