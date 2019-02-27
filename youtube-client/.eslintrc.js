module.exports = {
  parser: "babel-eslint",
  extends: "airbnb-base",
  env: { browser: true },
  rules: {
    "linebreak-style": 0,
    "no-param-reassign": 0,
    "import/extensions": ["error", "never", { js: "always" }],
    "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
    "no-shadow": "off"
  }
};
