import AsyncStorage from '@react-native-async-storage/async-storage'
import { BarcodeType } from 'expo-camera'
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
  // scanner
  const setCamera = useCallback((value: string) => dispatch(settingsActions.setCamera(value)), [dispatch])
  const setCameraRatio = useCallback((value: string) => dispatch(settingsActions.setCameraRatio(value)), [dispatch])
  const setCameraTimeout = useCallback((value: number) => dispatch(settingsActions.setCameraTimeout(value)), [dispatch])
  const setScannerAuto = useCallback((value: boolean) => dispatch(settingsActions.setScannerAuto(value)), [dispatch])
  const setScannerDevice = useCallback((value: ScannerDevice) => dispatch(settingsActions.setScannerDevice(value)), [dispatch])
  const setScannerMode = useCallback((value: 'bluetooth' | 'camera' | 'off') => dispatch(settingsActions.setScannerMode(value)), [dispatch])
  const setScannerTypes = useCallback((value: BarcodeType[]) => dispatch(settingsActions.setScannerTypes(value)), [dispatch])
  const setSound = useCallback((value: boolean) => dispatch(settingsActions.setSound(value)), [dispatch])
  const setVibrate = useCallback((value: boolean) => dispatch(settingsActions.setVibrate(value)), [dispatch])
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
    camera,
    setCamera,
    cameraRatio,
    setCameraRatio,
    cameraTimeout,
    setCameraTimeout,
    scannerAuto,
    setScannerAuto,
    scannerDevice,
    setScannerDevice,
    scannerMode,
    setScannerMode,
    scannerTypes,
    setScannerTypes,
    sound,
    setSound,
    vibrate,
    setVibrate,
    debug,
    setDebug,
    keepAwake,
    setKeepAwake
  }
}
