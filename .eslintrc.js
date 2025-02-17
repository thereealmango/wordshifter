module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  ignorePatterns: [
    "**/*/*.js",
    "*.js",
    "*.css",
    "*.scss",
    "*.svg",
    "*.json",
    "*.png",
    "dangerfile.ts",
    "package.json",
    "yarn.lock",
    "d.ts",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ["**/*.tsx", "**/*.ts"],
      rules: {
        "react/prop-types": 0,
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
