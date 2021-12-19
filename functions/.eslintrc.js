module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
  },
  plugins: ['prettier'],
  extends: ['prettier', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
  },
  ignorePatterns: ['node_modules/'],
  rules: {
    'prettier/prettier': 'error',
  },
};
