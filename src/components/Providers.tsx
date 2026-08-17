import { Drawer } from '@rific/drawer'
import { FeedbackPressProvider, hapticActions, type HapticSettings } from '@rific/feedback-press'
import { scrollViewActions, type ScrollViewSettings, ScrollViewSettingsProvider } from '@rific/scroll-view'
import { type HistoryContainerProps, HistoryModal, Toaster, ToastProvider } from '@rific/toaster'
import * as Haptics from 'expo-haptics'
import React, { useCallback, useMemo } from 'react'
import { useWindowDimensions } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import * as RNPaper from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { useDefaultSounds } from '@/hooks/sounds/useDefaultSounds'
import { persistor, type RootState, store } from '@/redux/store'

import { Theme } from './Theme'

export type ProvidersProps = { children: React.ReactNode }

const HistoryDrawerContainer = ({ children, onClose, visible }: HistoryContainerProps) => {
  const { height } = useWindowDimensions()
  return (
    <Drawer open={visible} onClose={onClose} side='bottom' height={height * 0.85}>
      {children}
    </Drawer>
  )
}

const FeedbackBridge = ({ children }: ProvidersProps) => {
  const haptic = useSelector((state: RootState) => state.haptic)
  const soundEnabled = useSelector((state: RootState) => state.settings.soundEnabled)
  const dispatch = useDispatch()
  const onChange = useCallback((s: HapticSettings) => dispatch(hapticActions.initialize(s)), [dispatch])
  const { playClick, playPop } = useDefaultSounds()
  // undefined (not soundDisabled) so a muted global setting falls all the way back to
  // FeedbackPressProvider's own EMPTY_SOUND default, same as never passing `sound` at all.
  const sound = useMemo(() => (soundEnabled ? { selection: playClick, notification: playPop } : undefined), [soundEnabled, playClick, playPop])
  return (
    <FeedbackPressProvider initialValue={haptic} onChange={onChange} paper={RNPaper} sound={sound}>
      {children}
    </FeedbackPressProvider>
  )
}

const ScrollViewBridge = ({ children }: ProvidersProps) => {
  const scrollView = useSelector((state: RootState) => state.scrollView)
  const dispatch = useDispatch()
  const onChange = useCallback((settings: ScrollViewSettings) => dispatch(scrollViewActions.initialize(settings)), [dispatch])
  return (
    <ScrollViewSettingsProvider onChange={onChange} initialValue={scrollView}>
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
            <FeedbackBridge>
              <ScrollViewBridge>
                <KeyboardProvider>
                  <Theme>
                    <ToastProvider haptics={Haptics} paper={RNPaper}>
                      {children}
                      <Toaster historyModal={<HistoryModal Container={HistoryDrawerContainer} />} />
                    </ToastProvider>
                  </Theme>
                </KeyboardProvider>
              </ScrollViewBridge>
            </FeedbackBridge>
          </PersistGate>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
