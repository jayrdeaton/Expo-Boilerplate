import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit'
import { createThemeReducer } from '@rific/auto-paper'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

import { colors } from '@/constants/theme'

import settings from './settingsSlice'

const theme = createThemeReducer({ color: colors.primary })

const hasError = (action: unknown): action is { error?: unknown } => typeof action === 'object' && action !== null && 'error' in action && Boolean(action.error)

const errorMiddleware: Middleware = () => (next) => (action) => {
  if (!hasError(action)) return next(action)
  return action
}

const rootReducer = combineReducers({ settings, theme })

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
