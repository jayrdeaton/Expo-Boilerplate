/* global jest */
module.exports = {
  KeyboardController: {
    addListener: jest.fn(),
    dismiss: jest.fn(),
    removeListener: jest.fn(),
    setInputMode: jest.fn()
  },
  KeyboardProvider: ({ children }: { children?: React.ReactNode }) => children,
  KeyboardAwareScrollView: ({ children }: { children?: React.ReactNode }) => children,
  useKeyboardHandler: jest.fn()
}
