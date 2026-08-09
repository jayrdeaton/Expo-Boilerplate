// jest-expo's own preset only registers babel-jest for `\.[jt]sx?$` (js/jsx/ts/tsx) - it never
// matches `.mjs`. Packages resolved to a `.mjs` file via their "react-native" export condition
// (any dual-CJS/ESM @rific package, e.g. after the Toaster worklets fix) skip transform
// entirely and hit Jest's raw `import` syntax, throwing "Cannot use import statement outside
// a module". This registers the same babel-jest transform for `.mjs` too - a general jest-expo
// gap, not specific to any one package. No .d.ts ships for this internal jest-expo path, so
// require() rather than a typed import.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { resolveBabelOptions } = require('jest-expo/src/resolveBabelOptions')

export default {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./jest.setup.ts', './node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.claude/worktrees/'],
  transform: {
    '\\.mjs$': ['babel-jest', resolveBabelOptions(process.cwd())]
  },
  moduleNameMapper: {
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/redux/(.*)$': '<rootDir>/src/redux/$1',
    '^@/types$': '<rootDir>/src/types/index.ts',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1'
  }
}
