/* global jest */
const actual = jest.requireActual('redux-persist')

module.exports = {
  ...actual,
  persistStore: jest.fn(() => ({ purge: jest.fn(), flush: jest.fn() })),
  persistReducer: (_config: unknown, reducer: unknown) => reducer,
  persistCombineReducers: (_config: unknown, reducers: unknown) => reducers,
  createMigrate: jest.fn(),
  createTransform: jest.fn(),
  getStoredState: jest.fn().mockResolvedValue(undefined)
}
