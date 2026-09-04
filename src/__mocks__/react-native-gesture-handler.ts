const makeGesture = () => {
  const g: Record<string, () => typeof g> = {}
  g.onUpdate = () => g
  g.onEnd = () => g
  g.onStart = () => g
  g.onChange = () => g
  return g
}

module.exports = {
  PanGestureHandler: ({ children }: { children?: React.ReactNode }) => children,
  PinchGestureHandler: ({ children }: { children?: React.ReactNode }) => children,
  GestureHandlerRootView: ({ children }: { children?: React.ReactNode }) => children,
  State: { ACTIVE: 'ACTIVE', END: 'END' },
  Gesture: {
    Pinch: () => makeGesture(),
    Pan: () => makeGesture(),
    Native: () => makeGesture(),
    Simultaneous: (..._gs: unknown[]) => makeGesture(),
    Race: (..._gs: unknown[]) => makeGesture(),
    Sequence: (..._gs: unknown[]) => makeGesture()
  },
  GestureDetector: ({ children }: { children?: React.ReactNode }) => children
}
