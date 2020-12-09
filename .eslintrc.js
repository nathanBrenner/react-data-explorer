module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["prettier", "eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["import", "node", "promise", "react", "react-hooks"],
  settings: { react: { version: "detect" } },
  rules: {
    indent: "off",
    "react/jsx-uses-vars": "error",
    "no-unsafe-negation": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": 0,
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};
