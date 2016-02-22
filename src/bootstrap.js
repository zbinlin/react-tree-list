"use strict";

import "./bootstrap/index.scss";
import "tether";
import "bootstrap";

import React from "react";
import ReactDOM from "react-dom";

import App from "./app";
import configureStore from "./store";

const store = configureStore();

ReactDOM.render(
    <App store={store} />,
    document.getElementById("viewport")
);
