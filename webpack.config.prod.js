"use strict";

const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

module.exports = {
    entry: {
        bootstrap: "./src/bootstrap.js",
        vendor: ["babel-polyfill", "jquery", "tether", "bootstrap"],
    },
    output: {
        path: "./dist",
        filename: "bundle.js",
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel?presets[]=react&presets[]=es2015",
                exclude: /node_modules/,
            },
            {
                test: require.resolve("tether"),
                loader: "imports?this=>window&define=>false&require=>false&exports=>false",
            },
            {
                test: /src\/bootstrap\/index\.scss/,
                loaders: ["style", "css?-autoprefixer", "sass"],
            },
            {
                test: /\.(s[ac]|c)ss$/,
                exclude: /node_modules|\/src\/bootstrap\/index\.scss/,
                loaders: ["style", "css?modules&-autoprefixer", "postcss", "sass"],
            },
        ],
    },
    postcss: [
        autoprefixer({
            browsers: [
                "last 2 version",
                "Android >= 2.2",
                "iOS >= 4",
                "last 2 OperaMobile version",
                "last 2 OperaMini version",
            ],
        }),
    ],
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ],
};
