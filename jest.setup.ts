/* eslint-disable @typescript-eslint/no-require-imports */

/* global jest */
jest.mock('react-native-reanimated', () => {
  const RN = require('react-native')
  const passthrough = (value: unknown) => value
  const passthroughLast = (...values: unknown[]) => values[values.length - 1]

  return {
    View: RN.View,
    Text: RN.Text,
    Image: RN.Image,
    ScrollView: RN.ScrollView,
    FlatList: RN.FlatList,
    createAnimatedComponent: (Component: unknown) => Component,
    useSharedValue: <T>(value: T) => ({ value }),
    useAnimatedStyle: (updater?: () => unknown) => (typeof updater === 'function' ? updater() : {}),
    useAnimatedProps: (updater?: () => unknown) => (typeof updater === 'function' ? updater() : {}),
    useAnimatedScrollHandler: (handler: (...args: unknown[]) => unknown) => handler,
    useDerivedValue: (updater?: () => unknown) => ({ value: typeof updater === 'function' ? updater() : undefined }),
    withTiming: passthrough,
    withSpring: passthrough,
    withDecay: passthrough,
    withDelay: (_ms: number, value: unknown) => value,
    withRepeat: (value: unknown) => value,
    withSequence: passthroughLast,
    cancelAnimation: jest.fn(),
    interpolate: passthrough,
    interpolateColor: () => '#000000',
    runOnJS: (fn: (...args: unknown[]) => unknown) => fn,
    runOnUI: (fn: (...args: unknown[]) => unknown) => fn,
    useAnimatedRef: () => ({ current: null }),
    measure: () => ({ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 }),
    scrollTo: jest.fn(),
    Easing: {
      linear: passthrough,
      ease: passthrough,
      in: passthrough,
      out: passthrough,
      inOut: passthrough,
      bezier: () => passthrough
    },
    Extrapolation: {
      CLAMP: 'clamp',
      EXTEND: 'extend',
      IDENTITY: 'identity'
    },
    FadeIn: { duration: () => ({}) },
    FadeOut: { duration: () => ({}) },
    Layout: { duration: () => ({}) },
    default: {
      View: RN.View,
      Text: RN.Text,
      Image: RN.Image,
      ScrollView: RN.ScrollView,
      FlatList: RN.FlatList,
      createAnimatedComponent: (Component: unknown) => Component,
      call: jest.fn()
    }
  }
})

jest.mock('react-native-worklets', () => ({
  createSerializable: (value: unknown) => value,
  isWorkletFunction: () => false,
  runOnJS: (fn: (...args: unknown[]) => unknown) => fn,
  runOnUI: (fn: (...args: unknown[]) => unknown) => fn
}))
;(globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true

// @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const Icon = ({ children }: { children?: React.ReactNode }) => children || null
  return {
    Ionicons: Icon,
    MaterialCommunityIcons: Icon,
    MaterialIcons: Icon,
    FontAwesome: Icon,
    default: { Ionicons: Icon }
  }
})

// @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () => ({
  clear: () => Promise.resolve(null),
  getAllKeys: () => Promise.resolve([]),
  getItem: () => Promise.resolve(null),
  removeItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(null)
}))

// expo-audio
jest.mock('expo-audio', () => ({
  useAudioPlayer: jest.fn(() => ({
    play: jest.fn(),
    seekTo: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn()
  })),
  // @rific/feedback-press/audio's useAudioPool builds its pool with createAudioPlayer (a plain
  // factory), not the useAudioPlayer hook — both need mocking here.
  createAudioPlayer: jest.fn(() => ({
    play: jest.fn(),
    seekTo: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn()
  }))
}))

// expo-blur
jest.mock('expo-blur', () => ({
  BlurView: ({ children }: { children?: React.ReactNode }) => children
}))

// expo-font: resolved true by default so components that gate on an icon font (see Theme.tsx's
// own useFonts(MaterialCommunityIcons.font)) don't need per-test setup just to render past it.
// isLoaded/loadAsync are also needed here (not just useFonts): @expo/vector-icons/MaterialCommunityIcons
// (the exact subpath react-native-paper's own Icon renderer imports, distinct from the
// '@expo/vector-icons' barrel mocked below) calls Font.isLoaded/Font.loadAsync directly in its own
// component lifecycle, real font asset resolution and all, any time an actual icon renders.
jest.mock('expo-font', () => ({
  isLoaded: () => true,
  loadAsync: () => Promise.resolve(),
  useFonts: () => [true, null]
}))

// expo-linking
jest.mock('expo-linking', () => ({
  useLinkingURL: () => null
}))

// expo-splash-screen
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn().mockResolvedValue(undefined),
  setOptions: jest.fn(),
  hideAsync: jest.fn().mockResolvedValue(undefined)
}))

// react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const makeGesture = () => {
    const g: Record<string, () => typeof g> = {}
    g.onUpdate = () => g
    g.onEnd = () => g
    g.onStart = () => g
    g.onChange = () => g
    return g
  }
  return {
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
})

// react-native-keyboard-controller
jest.mock('react-native-keyboard-controller', () => ({
  KeyboardController: {
    addListener: jest.fn(),
    dismiss: jest.fn(),
    removeListener: jest.fn(),
    setInputMode: jest.fn()
  },
  KeyboardProvider: ({ children }: { children?: React.ReactNode }) => children,
  KeyboardAwareScrollView: ({ children }: { children?: React.ReactNode }) => children,
  useKeyboardHandler: jest.fn()
}))

// react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children?: React.ReactNode }) => children,
  SafeAreaInsetsContext: {
    Consumer: ({ children }: { children?: (insets: object) => React.ReactNode }) => children?.({ top: 0, right: 0, bottom: 0, left: 0 })
  },
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 })
}))

// redux-persist
jest.mock('redux-persist', () => {
  const actual = jest.requireActual('redux-persist')
  return {
    ...actual,
    persistStore: jest.fn(() => ({ purge: jest.fn(), flush: jest.fn() })),
    persistReducer: (_config: unknown, reducer: unknown) => reducer,
    persistCombineReducers: (_config: unknown, reducers: unknown) => reducers,
    createMigrate: jest.fn(),
    createTransform: jest.fn(),
    getStoredState: jest.fn().mockResolvedValue(undefined)
  }
})

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }: { children?: React.ReactNode }) => children
}))

const handleUnhandledRejection = (reason: unknown) => {
  console.error('UnhandledRejection in tests:', reason) // eslint-disable-line no-console
}
const handleUncaughtException = (err: unknown) => {
  console.error('UncaughtException in tests:', err) // eslint-disable-line no-console
}

if (typeof process !== 'undefined' && process?.on) {
  process.on('unhandledRejection', handleUnhandledRejection)
  process.on('uncaughtException', handleUncaughtException)
}

try {
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
} catch {
  // ignore
}

if (typeof globalThis.requestAnimationFrame === 'undefined') {
  globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0)
}
if (typeof globalThis.cancelAnimationFrame === 'undefined') {
  globalThis.cancelAnimationFrame = (id: number | null | undefined) => clearTimeout(id ?? undefined)
}
