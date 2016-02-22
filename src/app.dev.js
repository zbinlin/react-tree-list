"use strict";

import React, { Component, PropTypes } from "react";
import { Provider } from "react-redux";

import routes from "./routes";
import DevTools from "./containers/devtools";

export default class App extends Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <div className="fill">
                    {routes}
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};
