import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore, type Middleware } from '@reduxjs/toolkit'
import { themeReducer } from '@rific/auto-paper'
import { defaultSoundSettings, hapticReducer, soundReducer, type SoundSettings } from '@rific/feedback-press'
import { scrollViewReducer } from '@rific/scroll-view'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

import settings from './settingsSlice'

const hasError = (action: unknown): action is { error?: unknown } => typeof action === 'object' && action !== null && 'error' in action && Boolean(action.error)

const errorMiddleware: Middleware = () => (next) => (action) => {
  if (!hasError(action)) return next(action)
  return action
}

// @rific/feedback-press's own soundReducer defaults `enabled` to true unconditionally (that
// default isn't published with the dev-only override yet). Wrap it so a fresh install with no
// persisted preference (redux-persist finds nothing in AsyncStorage for the `sound` key) defaults
// muted in dev/simulator builds so Claude/local testing doesn't blast audio; production builds
// still default to sound on. All actual action handling still delegates to the package's reducer.
const initialSoundSettings: SoundSettings = { ...defaultSoundSettings, enabled: !__DEV__ }
const appSoundReducer = (state: SoundSettings = initialSoundSettings, action: { type: string }): SoundSettings => soundReducer(state, action)

const rootReducer = combineReducers({
  theme: themeReducer,
  scrollView: scrollViewReducer,
  haptic: hapticReducer,
  sound: appSoundReducer,
  settings
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
    return defaultMiddleware.concat(errorMiddleware)
  },
  reducer: persistedReducer
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
