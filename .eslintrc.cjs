module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["xo", "prettier"],
  overrides: [
    {
      extends: ["xo-typescript", "prettier"],
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/consistent-type-definitions": [
          "error",
          "interface",
        ],
        "@typescript-eslint/consistent-type-assertions": ["off"],
      },
    },
    {
      files: ["src/**/models/**/*.ts"],
      rules: { "@typescript-eslint/naming-convention": "off" },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: { "no-implicit-coercion": "off" },
};
