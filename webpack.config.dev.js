"use strict";

const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

module.exports = {
    entry: {
        bootstrap: "./src/bootstrap.js",
        vendor: ["babel-polyfill", "jquery", "tether", "bootstrap"],
        app: [
            "webpack-dev-server/client?http://localhost:8080",
            "webpack/hot/dev-server",
        ],
    },
    output: {
        path: "./dist",
        filename: "bundle.js",
    },
    devtool: "inline-source-map",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "react-hot!babel?presets[]=react&presets[]=es2015",
                exclude: /node_modules/,
            },
            {
                test: require.resolve("tether"),
                loader: "imports?this=>window&define=>false&require=>false&exports=>false",
            },
            {
                test: /src\/bootstrap\/index\.scss/,
                loaders: ["style", "css?-autoprefixer&sourceMap", "postcss", "sass"],
            },
            {
                test: /\.(s[ac]|c)ss$/,
                exclude: /node_modules|\/src\/bootstrap\/index.scss/,
                loaders: ["style", "css?modules&-autoprefixer&sourceMap&localIdentName=[name]-[local]--[hash:base64:4]", "postcss", "sass"],
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
    ],
};
