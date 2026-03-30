import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState, settingsActions } from '../store'

const settingsSelector = (state: RootState) => state.settings

export const useSettings = () => {
  const { blur, headerLock, footerLock, sound, vibrate, debug, keepAwake } = useSelector(settingsSelector)
  const dispatch = useDispatch()
  const reset = useCallback(async () => {
    await AsyncStorage.clear()
  }, [])
  const setBlur = useCallback((value: boolean) => dispatch(settingsActions.setBlur(value)), [dispatch])
  const setHeaderLock = useCallback((value: boolean) => dispatch(settingsActions.setHeaderLock(value)), [dispatch])
  const setFooterLock = useCallback((value: boolean) => dispatch(settingsActions.setFooterLock(value)), [dispatch])
  // feedback
  const setSound = useCallback((value: boolean) => dispatch(settingsActions.setSound(value)), [dispatch])
  const setVibrate = useCallback((value: boolean) => dispatch(settingsActions.setVibrate(value)), [dispatch])
  // advanced
  const setDebug = useCallback((value: boolean) => dispatch(settingsActions.setDebug(value)), [dispatch])
  const setKeepAwake = useCallback((value: boolean) => dispatch(settingsActions.setKeepAwake(value)), [dispatch])
  return {
    reset,
    // theme
    blur,
    setBlur,
    headerLock,
    footerLock,
    setHeaderLock,
    setFooterLock,
    // feedback
    sound,
    setSound,
    vibrate,
    setVibrate,
    // advanced
    debug,
    setDebug,
    keepAwake,
    setKeepAwake
  }
}
