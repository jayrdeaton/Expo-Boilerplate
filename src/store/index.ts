import AsyncStorage from '@react-native-async-storage/async-storage'
import { Action, combineReducers, configureStore, Dispatch, Middleware } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

import options, { optionsActions } from './optionsSlice'
import route, { routeActions } from './routeSlice'
import settings, { settingsActions } from './settingsSlice'
import snack, { snackActions } from './snackSlice'
import theme, { themeActions } from './themeSlice'

type ActionWithError = Action & { error?: Error }
const errorMiddleware: Middleware = () => (next: Dispatch<ActionWithError>) => (action: ActionWithError) => {
  if (!action.error) return next(action)
  return action
}

const rootReducer = combineReducers({
  options,
  route,
  settings,
  snack,
  theme
})

const persistConfig = { key: 'root', storage: AsyncStorage }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
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

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { optionsActions, routeActions, settingsActions, snackActions, themeActions }
