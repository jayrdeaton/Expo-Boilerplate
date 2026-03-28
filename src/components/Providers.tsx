import 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from '../store'
import { ScrollViewProvider } from './ScrollViewProvider'
import { Theme } from './Theme'

export type ProvidersProps = {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => (
  <SafeAreaProvider>
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <KeyboardProvider>
          <ScrollViewProvider>
            <Theme>{children}</Theme>
          </ScrollViewProvider>
        </KeyboardProvider>
      </PersistGate>
    </ReduxProvider>
  </SafeAreaProvider>
)
