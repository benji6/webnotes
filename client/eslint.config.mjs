// @ts-check

import eslintConfigPrettier from "eslint-config-prettier";
import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist"] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  { settings: { react: { version: "detect" } } },
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  eslintConfigPrettier,
];
