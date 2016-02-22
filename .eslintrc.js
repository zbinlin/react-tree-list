"use strict";

module.exports = {
    "rules": {
        "indent": [
            2,
            4,
            {
                "SwitchCase": 1,
            },
        ],
        "quotes": [
            2,
            "double",
        ],
        "linebreak-style": [
            2,
            "unix",
        ],
        "semi": [
            2,
            "always",
        ],
        "no-console": [
            0,
        ],
        "comma-dangle": [
            1,
            "always-multiline",
        ],
        "no-unused-vars": [
            2,
            {
                "args": "none",
                "varsIgnorePattern": "React",
            },
        ],
    },
    "env": {
        "es6": true,
        "node": true,
        "browser": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
    },
    "plugins": [
        "react",
    ],
};
