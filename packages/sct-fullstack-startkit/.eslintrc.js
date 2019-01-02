'use strict';

// Ref: https://medium.com/@RossWhitehouse/setting-up-eslint-in-react-c20015ef35f7
module.exports = {
  // Ref: https://ithelp.ithome.com.tw/articles/10193569
  // Issue: "Parsing error: Unexpected token ="
  parser: 'babel-eslint',
  // Ref: https://github.com/yannickcr/eslint-plugin-react#configuration
  extends: [
    'airbnb', // default rule defined here
    // 'plugin:react/recommended',  // special for react rule
  ],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  // Ref: https://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    es6: true,
    browser: true, // allow using fetch, window, alert and so on.
    node: true, // allow use require, module and so on.
  },
  rules: {
    'no-console': 'off',
    'no-alert': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    // force user to write jsdoc comment of function/class/etc
    'require-jsdoc': ['error', {
        require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: true,
            FunctionExpression: true,
        },
    }],
    // force user to write jsdoc comment of parameters of function/class/etc
    'valid-jsdoc': 2,
    // 'import/no-named-as-default': 0,
    // 'import/no-named-as-default-member': 0,
  },
  settings: {
    // Ref: https://github.com/yannickcr/eslint-plugin-react#configuration
    react: {
      version: '16.7',
    },
  }
};
