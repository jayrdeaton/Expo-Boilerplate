import { HapticPressProvider } from '@rific/haptic-press'
import { Toaster, ToastProvider } from '@rific/toaster'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as ReduxProvider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, type RootState, store } from '@/redux/store'

import { Theme } from './Theme'

export type ProvidersProps = { children: React.ReactNode }

const HapticPressBootstrap = ({ children }: ProvidersProps) => {
  const vibrate = useSelector((state: RootState) => state.settings.vibrate)
  return <HapticPressProvider enabled={vibrate}>{children}</HapticPressProvider>
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <PersistGate persistor={persistor}>
            <HapticPressBootstrap>
              <KeyboardProvider>
                <Theme>
                  <ToastProvider>
                    {children}
                    <Toaster />
                  </ToastProvider>
                </Theme>
              </KeyboardProvider>
            </HapticPressBootstrap>
          </PersistGate>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
