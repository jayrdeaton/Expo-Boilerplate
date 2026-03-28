const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const prettierRecommended = require('eslint-plugin-prettier/recommended')
const simpleImportSort = require('eslint-plugin-simple-import-sort')
const tsParser = require('@typescript-eslint/parser')
const eslintReactNative = require('eslint-plugin-react-native')

module.exports = defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  },
  expoConfig,
  prettierRecommended,
  {
    ignores: ['dist/**', 'node_modules/**', 'ios/**', 'android/**', '.expo/**', '.vscode/**']
  },
  {
    plugins: {
      'react-native': eslintReactNative,
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
      // 'react-native/no-unused-styles': 'warn',
      'react-native/no-raw-text': 'off'
    }
  }
])
