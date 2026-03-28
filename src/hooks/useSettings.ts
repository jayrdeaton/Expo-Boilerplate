import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState, settingsActions } from '../store'

type ScannerDevice = { id: string; name: string }

const settingsSelector = (state: RootState) => state.settings

export const useSettings = () => {
  const { blur, headerLock, footerLock, imageMode, imageView, paginate, search, camera, cameraRatio, scannerAuto, scannerDevice, scannerMode, cameraTimeout, scannerTypes, sound, vibrate, debug, keepAwake } = useSelector(settingsSelector)
  const dispatch = useDispatch()
  const reset = useCallback(async () => {
    await AsyncStorage.clear()
  }, [])
  const setBlur = useCallback((value: boolean) => dispatch(settingsActions.setBlur(value)), [dispatch])
  const setHeaderLock = useCallback((value: boolean) => dispatch(settingsActions.setHeaderLock(value)), [dispatch])
  const setFooterLock = useCallback((value: boolean) => dispatch(settingsActions.setFooterLock(value)), [dispatch])
  const setImageMode = useCallback((value: 'cover' | 'contain' | 'fill') => dispatch(settingsActions.setImageMode(value)), [dispatch])
  const setImageView = useCallback((value: boolean) => dispatch(settingsActions.setImageView(value)), [dispatch])
  const setPaginate = useCallback((value: boolean) => dispatch(settingsActions.setPaginate(value)), [dispatch])
  const setSearch = useCallback((value: boolean) => dispatch(settingsActions.setSearch(value)), [dispatch])
  // camera/scanner removed
  // advanced
  const setDebug = useCallback((value: boolean) => dispatch(settingsActions.setDebug(value)), [dispatch])
  const setKeepAwake = useCallback((value: boolean) => dispatch(settingsActions.setKeepAwake(value)), [dispatch])
  return {
    reset,
    blur,
    setBlur,
    headerLock,
    footerLock,
    setHeaderLock,
    setFooterLock,
    imageMode,
    setImageMode,
    imageView,
    setImageView,
    paginate,
    setPaginate,
    search,
    setSearch,
    // camera/scanner removed
    debug,
    setDebug,
    keepAwake,
    setKeepAwake
  }
}
