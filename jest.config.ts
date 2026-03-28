export default {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./jest.setup.ts', './node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: []
}
