module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["xo", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      extends: ["xo-typescript"],
      files: ["*.ts", "*.tsx"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-refresh"],
  settings: {
    react: {
      version: "18",
    },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: false },
    ],
    "react/react-in-jsx-scope": "off",
  },
}
