import { hapticActions, HapticPressProvider, type HapticSettings } from '@rific/haptic-press'
import { scrollViewActions, type ScrollViewSettings, ScrollViewSettingsProvider } from '@rific/scroll-view'
import { Toaster, ToastProvider } from '@rific/toaster'
import React, { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, type RootState, store } from '@/redux/store'

import { Theme } from './Theme'

export type ProvidersProps = { children: React.ReactNode }

const HapticBridge = ({ children }: ProvidersProps) => {
  const haptic = useSelector((state: RootState) => state.haptic)
  const dispatch = useDispatch()
  const onChange = useCallback((s: HapticSettings) => dispatch(hapticActions.initialize(s)), [dispatch])
  return (
    <HapticPressProvider value={haptic} onChange={onChange}>
      {children}
    </HapticPressProvider>
  )
}

const ScrollViewBridge = ({ children }: ProvidersProps) => {
  const scrollView = useSelector((state: RootState) => state.scrollView)
  const dispatch = useDispatch()
  const onChange = useCallback(
    (settings: ScrollViewSettings) => dispatch(scrollViewActions.initialize(settings)),
    [dispatch]
  )
  return (
    <ScrollViewSettingsProvider onChange={onChange} value={scrollView}>
      {children}
    </ScrollViewSettingsProvider>
  )
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <PersistGate persistor={persistor}>
            <HapticBridge>
              <ScrollViewBridge>
                <KeyboardProvider>
                  <Theme>
                    <ToastProvider>
                      {children}
                      <Toaster />
                    </ToastProvider>
                  </Theme>
                </KeyboardProvider>
              </ScrollViewBridge>
            </HapticBridge>
          </PersistGate>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
