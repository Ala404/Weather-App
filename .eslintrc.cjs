/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:cypress",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
};
