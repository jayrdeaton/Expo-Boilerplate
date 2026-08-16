const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const prettierRecommended = require('eslint-plugin-prettier/recommended')
const simpleImportSort = require('eslint-plugin-simple-import-sort')
const tsParser = require('@typescript-eslint/parser')
const reactNative = require('eslint-plugin-react-native')
const packageJson = require('eslint-plugin-package-json')

module.exports = defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    settings: { react: { version: '19' } }
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'ios/**', 'android/**', '.expo/**', '.vscode/**', 'coverage/**', '.yalc/**', '.claude/worktrees/**']
  },
  expoConfig,
  prettierRecommended,
  packageJson.configs.recommended,
  {
    extends: [packageJson.configs.recommended],
    files: ['package.json'],
    rules: {
      'package-json/order-properties': 'warn',
      'package-json/sort-collections': 'warn'
    }
  },
  {
    plugins: {
      'react-native': reactNative,
      'simple-import-sort': simpleImportSort
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    },
    rules: {
      'prettier/prettier': 'warn',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'no-console': 'warn',
      'react-native/sort-styles': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-unused-styles': 'warn',
      'react-native/no-raw-text': 'off',
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/set-state-in-effect': 'warn'
    }
  }
])
