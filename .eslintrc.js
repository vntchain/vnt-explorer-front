module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  plugins: [
    "react-hooks"
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/react"
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        semi: false
      }
    ],
    "react-hooks/rules-of-hooks": "error"
  }
};
