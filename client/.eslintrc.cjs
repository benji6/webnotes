/* eslint-env node */

module.exports = {
  env: { browser: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y"],
  rules: {
    "@typescript-eslint/no-non-null-assertion": 0,
    "jsx-a11y/no-autofocus": 0,
    "no-console": 2,
  },
  settings: {
    react: { version: "detect" },
  },
};
