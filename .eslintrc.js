module.exports = {
    extends: [
        "airbnb-base",
        "plugin:react/recommended",
    ],
    env: {
        browser: true,
        node: true,
        es6: true,
        jquery: true,
        jest: true,
    },
    rules: {
        "class-methods-use-this": "off",
        "indent": ["error", 4],
        "no-underscore-dangle": "off",
        "no-unused-vars": ["warn", { "vars": "local",  "argsIgnorePattern": "request|h|prevState|snapshot" }],
        "no-plusplus": 0,
        "max-len": ["warn", 180],
        "one-var": 0,
        "no-console": "off",
        "arrow-body-style": "off",
        "global-require": "off",
        "operator-linebreak": "off",
    },
    parser: "babel-eslint", // this lets us use ES6+ things in react like `= () => {}`
};