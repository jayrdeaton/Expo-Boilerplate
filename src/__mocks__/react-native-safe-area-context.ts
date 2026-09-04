module.exports = {
  SafeAreaProvider: ({ children }: { children?: React.ReactNode }) => children,
  SafeAreaInsetsContext: {
    Consumer: ({ children }: { children?: (insets: object) => React.ReactNode }) => children?.({ top: 0, right: 0, bottom: 0, left: 0 })
  },
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 })
}
