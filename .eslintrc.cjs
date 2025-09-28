module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  env: { es2022: true, node: true, browser: true, jest: true },
  plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  settings: { react: { version: "detect" } },
  rules: {
    "prettier/prettier": [
      "error",
      { printWidth: 100, singleQuote: false, semi: true },
    ],
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-require-imports": "off",
  },
  overrides: [
    {
      files: ["**/*.js"],
      rules: { "@typescript-eslint/no-require-imports": "off" },
    },
  ],
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "build/",
    ".expo/",
    ".expo-shared/",
    "android/",
    "ios/",
    "components/__tests__/**",
    "scripts/**",
    "server.js",
    "metro.config.js",
  ],
};
