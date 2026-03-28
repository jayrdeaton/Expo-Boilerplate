/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react/display-name */

/* global jest */
jest.mock('react-native-reanimated', () => {
  const RN = require('react-native')
  const passthrough = (value: unknown) => value
  const passthroughLast = (...values: unknown[]) => values[values.length - 1]

  const Animated = {
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

  return Animated
})

jest.mock('react-native-worklets', () => ({
  createSerializable: (value: unknown) => value,
  isWorkletFunction: () => false,
  runOnJS: (fn: (...args: unknown[]) => unknown) => fn,
  runOnUI: (fn: (...args: unknown[]) => unknown) => fn
}))

globalThis.IS_REACT_ACT_ENVIRONMENT = true

// @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const Icon = ({ children }: any) => children || null
  return {
    Ionicons: Icon,
    MaterialCommunityIcons: Icon,
    MaterialIcons: Icon,
    FontAwesome: Icon,
    default: { Ionicons: Icon }
  }
})

// Some code imports deeper paths (createIconSet / createIconSetFromFontello)
jest.mock('@expo/vector-icons/createIconSet', () => {
  const Icon = ({ children }: any) => children || null
  return Icon
})
jest.mock('@expo/vector-icons/createIconSetFromFontello', () => {
  const Icon = ({ children }: any) => children || null
  return Icon
})
// also mock potential built paths
jest.mock('@expo/vector-icons/build/createIconSet', () => {
  const Icon = ({ children }: any) => children || null
  return Icon
})
// also mock potential built path for MaterialCommunityIcons createIconSet
try {
  jest.mock('@expo/vector-icons/build/MaterialCommunityIcons', () => {
    const Icon = ({ children }: any) => children || null
    return Icon
  })
} catch {
  // ignore if not present
}

// @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () => ({
  clear: () => Promise.resolve(null),
  getAllKeys: () => Promise.resolve([]),
  getItem: () => Promise.resolve(null),
  removeItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(null)
}))

// @react-native-community/netinfo
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn().mockResolvedValue({
    type: 'wifi',
    isConnected: true,
    isInternetReachable: true,
    details: {
      isConnectionExpensive: false,
      ssid: 'test-network',
      strength: 100
    }
  }),
  refresh: jest.fn().mockResolvedValue({
    type: 'wifi',
    isConnected: true,
    isInternetReachable: true
  }),
  useNetInfo: jest.fn(() => ({
    type: 'wifi',
    isConnected: true,
    isInternetReachable: true
  }))
}))

// @react-navigation/drawer
jest.mock('@react-navigation/drawer', () => ({
  useDrawerStatus: () => 'closed'
}))

// @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  NavigationContainer: ({ children }) => children,
  useIsFocused: () => true,
  useNavigation: () => ({
    addListener: jest.fn(() => jest.fn()),
    canGoBack: jest.fn(() => false),
    dispatch: jest.fn(),
    goBack: jest.fn(),
    isFocused: jest.fn(() => true),
    getState: jest.fn(() => ({ index: 0, routes: [] })),
    navigate: jest.fn(),
    openDrawer: jest.fn(),
    removeListener: jest.fn(),
    reset: jest.fn(),
    setOptions: jest.fn(),
    setParams: jest.fn()
  }),
  getState: jest.fn(() => ({ index: 0, routes: [] })),
  useRoute: () => ({
    key: 'test-route-key',
    name: 'test-route-name',
    params: {}
  }),
  useFocusEffect: jest.fn()
}))

// expo-audio
jest.mock('expo-audio', () => ({
  Audio: {
    getPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
    requestPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
    Sound: jest.fn().mockImplementation(() => ({
      getStatusAsync: jest.fn().mockResolvedValue({}),
      loadAsync: jest.fn().mockResolvedValue(undefined),
      pauseAsync: jest.fn().mockResolvedValue(undefined),
      playAsync: jest.fn().mockResolvedValue(undefined),
      setOnPlaybackStatusUpdate: jest.fn(),
      stopAsync: jest.fn().mockResolvedValue(undefined),
      unloadAsync: jest.fn().mockResolvedValue(undefined)
    }))
  },
  setAudioModeAsync: jest.fn(),
  useAudioPlayer: jest.fn(() => ({
    duration: 0,
    currentTime: 0,
    isLoaded: false,
    isPlaying: false,
    load: jest.fn().mockResolvedValue(undefined),
    play: jest.fn(),
    pause: jest.fn(),
    stop: jest.fn(),
    seekTo: jest.fn(),
    addListener: jest.fn(() => ({
      remove: jest.fn()
    }))
  }))
}))

// expo-background-task
jest.mock('expo-background-task', () => ({
  defineTask: jest.fn(),
  getStatusAsync: jest.fn().mockResolvedValue({ status: 1 }),
  registerTaskAsync: jest.fn().mockResolvedValue(undefined),
  unregisterTaskAsync: jest.fn().mockResolvedValue(undefined)
}))

// expo-blur
jest.mock('expo-blur', () => ({
  BlurView: ({ children }) => children
}))

// expo-camera
jest.mock('expo-camera', () => ({
  ...jest.requireActual('expo-camera'),
  useCameraPermissions: () => [{ granted: true, canAskAgain: false }, jest.fn()],
  CameraView: ({ children }) => children
}))

// expo-keep-awake
jest.mock('expo-keep-awake', () => ({
  activateKeepAwakeAsync: jest.fn(),
  deactivateKeepAwake: jest.fn()
}))

// expo-linking
jest.mock('expo-linking', () => ({
  useLinkingURL: () => null
}))

// expo-sqlite (mock native SQLite for Node/Jest)
jest.mock('expo-sqlite', () => {
  const makeResult = () => ({ rows: { length: 0, item: (_: number) => undefined } })

  const makeTx = () => ({
    executeSql: (_sql: string, _params?: any[], success?: Function) => {
      const res = makeResult()
      if (typeof success === 'function') success(null, res)
      return res
    }
  })

  return {
    openDatabaseSync: (_name?: string) => ({
      transaction: (cb: Function) => cb(makeTx())
    }),
    openDatabase: (_name?: string) => ({
      transaction: (cb: Function) => cb(makeTx())
    })
  }
})

// expo-splash-screen
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn().mockResolvedValue(undefined),
  setOptions: jest.fn(),
  hideAsync: jest.fn().mockResolvedValue(undefined)
}))

// expo-task-manager
jest.mock('expo-task-manager', () => ({
  defineTask: jest.fn(),
  getTaskOptionsAsync: jest.fn().mockResolvedValue({}),
  isTaskDefined: jest.fn().mockReturnValue(false),
  isTaskRegisteredAsync: jest.fn().mockResolvedValue(false),
  registerTaskAsync: jest.fn().mockResolvedValue(undefined),
  unregisterTaskAsync: jest.fn().mockResolvedValue(undefined)
}))

// react-native-ble-plx
jest.mock('react-native-ble-plx', () => ({
  BleManager: jest.fn().mockImplementation(() => ({
    cancelDeviceConnection: jest.fn().mockResolvedValue({}),
    connectToDevice: jest.fn().mockResolvedValue({}),
    discoverAllServicesAndCharacteristics: jest.fn().mockResolvedValue({}),
    monitorCharacteristicForService: jest.fn(),
    onDeviceDisconnected: jest.fn(),
    readCharacteristicForService: jest.fn().mockResolvedValue({}),
    startDeviceScan: jest.fn(),
    stopDeviceScan: jest.fn(),
    writeCharacteristicWithoutResponseForService: jest.fn().mockResolvedValue({}),
    writeCharacteristicWithResponseForService: jest.fn().mockResolvedValue({})
  })),
  State: {
    PoweredOff: 'PoweredOff',
    PoweredOn: 'PoweredOn'
  }
}))

// react-native-keyboard-controller
jest.mock('react-native-keyboard-controller', () => ({
  KeyboardController: {
    addListener: jest.fn(),
    dismiss: jest.fn(),
    removeListener: jest.fn(),
    setInputMode: jest.fn()
  },
  KeyboardProvider: ({ children }) => children,
  useKeyboardHandler: jest.fn()
}))

// react-native-reanimated
// jest.mock('react-native-reanimated', () => ({
//   __esModule: true,
//   // minimal default export to support <Animated.View/>
//   default: {
//     View: ({ children }) => children,
//     Image: ({ children }) => children
//   },
//   useAnimatedStyle: jest.fn((_fn) => ({})),
//   useSharedValue: jest.fn((initialValue) => ({ value: initialValue })),
//   useAnimatedScrollHandler: jest.fn(() => jest.fn()),
//   withTiming: jest.fn((v) => v)
// }))

// reanimated-color-picker
jest.mock('reanimated-color-picker', () => ({
  colorKit: { isDark: jest.fn(() => false) },
  HueSlider: () => null,
  Panel1: () => null,
  Swatches: () => null,
  default: ({ children }) => children
}))

// react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  // create a simple chainable gesture-like object
  const makeGesture = () => {
    const g: any = {}
    g.onUpdate = () => g
    g.onEnd = () => g
    g.onStart = () => g
    g.onChange = () => g
    return g
  }

  return {
    PanGestureHandler: ({ children }: any) => children,
    PinchGestureHandler: ({ children }: any) => children,
    State: { ACTIVE: 'ACTIVE', END: 'END' },
    Gesture: {
      Pinch: () => makeGesture(),
      Pan: () => makeGesture(),
      Simultaneous: (..._gs: any[]) => makeGesture(),
      Race: (..._gs: any[]) => makeGesture(),
      Sequence: (..._gs: any[]) => makeGesture()
    },
    GestureDetector: ({ children }: any) => children
  }
})

// react-native-keyboard-controller additions
jest.mock('react-native-keyboard-controller', () => ({
  KeyboardController: {
    addListener: jest.fn(),
    dismiss: jest.fn(),
    removeListener: jest.fn(),
    setInputMode: jest.fn()
  },
  KeyboardProvider: ({ children }) => children,
  KeyboardAwareScrollView: ({ children }) => children,
  useKeyboardHandler: jest.fn()
}))

// react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  ...jest.requireActual('react-native-safe-area-context'),
  SafeAreaProvider: ({ children }) => children,
  SafeAreaInsetsContext: {
    Consumer: ({ children }) => children({ top: 0, right: 0, bottom: 0, left: 0 })
  },
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 })
}))

// react-native-svg
jest.mock('react-native-svg', () => ({
  __esModule: true,
  default: ({ children }) => children,
  Svg: ({ children }) => children,
  Circle: 'Circle',
  G: 'G',
  Path: 'Path'
}))

// redux-persist
jest.mock('redux-persist', () => {
  const actual = jest.requireActual('redux-persist')
  return {
    ...actual,
    persistStore: jest.fn(() => ({ purge: jest.fn(), flush: jest.fn() })),
    persistReducer: (_config, reducer) => reducer,
    persistCombineReducers: (_config, reducers) => reducers,
    createMigrate: jest.fn(),
    createTransform: jest.fn(),
    getStoredState: jest.fn().mockResolvedValue(undefined)
  }
})

// redux-persist PersistGate (integration/react)
jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }) => children
}))

// Mock Theme component to render children inside react-native-paper Provider during tests
jest.mock('/Users/jay/Developer/CashierFu-Utility/src/components/Theme', () => {
  const React = jest.requireActual('react')
  const Paper = jest.requireActual('react-native-paper')
  return {
    Theme: ({ children }: any) => React.createElement(Paper.Provider, null, children)
  }
})

// Mock react-native-paper MaterialCommunityIcon implementations (different build paths)
try {
  jest.mock('react-native-paper/src/components/MaterialCommunityIcon', () => {
    const React = jest.requireActual('react')
    return ({ children }: any) => React.createElement('Text', null, children || null)
  })
} catch {
  /* ignore if path not found */
}
try {
  jest.mock('react-native-paper/lib/commonjs/src/components/MaterialCommunityIcon', () => {
    const React = jest.requireActual('react')
    return ({ children }: any) => React.createElement('Text', null, children || null)
  })
} catch {
  /* ignore if path not found */
}

// Surface unhandled promise rejections and uncaught exceptions during tests
// Surface unhandled promise rejections and uncaught exceptions during tests
const handleUnhandledRejection = (reason: any) => {
  // eslint-disable-next-line no-console
  console.error('UnhandledRejection in tests:', reason)
}

const handleUncaughtException = (err: any) => {
  // eslint-disable-next-line no-console
  console.error('UncaughtException in tests:', err)
}

if (typeof process !== 'undefined' && process && process.on) {
  process.on('unhandledRejection', handleUnhandledRejection)
  process.on('uncaughtException', handleUncaughtException)
}

// Suppress Animated native warnings in tests and provide RAF polyfills
try {
  // suppress the 'Animated: `useNativeDriver`' warnings from RN Animated native helper
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
} catch {
  // ignore if the path isn't present in this environment
}

// Provide a basic requestAnimationFrame/cancelAnimationFrame for animation updates in tests
if (typeof globalThis.requestAnimationFrame === 'undefined') {
  globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0)
}
if (typeof globalThis.cancelAnimationFrame === 'undefined') {
  globalThis.cancelAnimationFrame = (id: any) => clearTimeout(id)
}
