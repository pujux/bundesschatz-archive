const nextCoreWebVitals = require("eslint-config-next/core-web-vitals");
const nextTypeScript = require("eslint-config-next/typescript");

module.exports = [
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "eslint.config.js"],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
