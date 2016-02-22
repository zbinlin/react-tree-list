"use strict";

const babel = require("babel-jest");

exports.process = function (src, filename) {
    if (/\.(s[ac]|c)ss$/.test(filename)) {
        return "";
    }
    return babel.process(src, filename);
};
