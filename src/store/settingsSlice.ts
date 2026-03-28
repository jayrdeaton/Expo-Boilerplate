import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { BarcodeType } from 'expo-camera'

import { strings } from '../constants'

type ScannerDevice = { id: string; name: string }

const scanTypesDefault: BarcodeType[] = ['code128', 'qr']

export type SettingsState = {
  blur: boolean
  headerLock: boolean
  footerLock: boolean
  imageMode: 'contain' | 'cover' | 'fill'
  imageView: boolean
  paginate: boolean
  search: boolean
  // feedback
  sound: boolean
  vibrate: boolean
  // scanner
  camera: string
  cameraRatio: string
  cameraTimeout: number
  scannerAuto: boolean
  scannerDevice: ScannerDevice | null
  scannerMode: 'bluetooth' | 'camera' | 'off'
  scannerTypes: BarcodeType[]
  // utility
  distribute: number
  history: boolean
  longPress: boolean
  merge: string
  reprice: string
  restock: string
  transfer: string
  // advanced
  debug: boolean
  keepAwake: boolean
}

const initialState: SettingsState = {
  // theme
  blur: true,
  headerLock: false,
  footerLock: false,
  imageMode: 'cover',
  imageView: true,
  paginate: false,
  search: false,
  // scanner
  camera: strings.on,
  cameraRatio: '1:1',
  cameraTimeout: 60,
  scannerAuto: false,
  scannerDevice: null,
  scannerMode: 'camera',
  scannerTypes: scanTypesDefault,
  sound: false,
  vibrate: false,
  // utility
  distribute: 5,
  history: false,
  longPress: false,
  merge: strings.manual,
  reprice: strings.manual,
  restock: strings.manual,
  transfer: strings.manual,
  // advanced
  debug: false,
  keepAwake: true
}

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    initialize(state, action: PayloadAction<Partial<SettingsState>>) {
      return { ...state, ...action.payload }
    },
    setBlur(state, action: PayloadAction<boolean>) {
      state.blur = action.payload
    },
    setHeaderLock(state, action: PayloadAction<boolean>) {
      state.headerLock = action.payload
    },
    setFooterLock(state, action: PayloadAction<boolean>) {
      state.footerLock = action.payload
    },
    setImageMode(state, action: PayloadAction<'contain' | 'cover' | 'fill'>) {
      state.imageMode = action.payload
    },
    setImageView(state, action: PayloadAction<boolean>) {
      state.imageView = action.payload
    },
    setPaginate(state, action: PayloadAction<boolean>) {
      state.paginate = action.payload
    },
    setSearch(state, action: PayloadAction<boolean>) {
      state.search = action.payload
    },
    setCamera(state, action: PayloadAction<string>) {
      state.camera = action.payload
    },
    setCameraRatio(state, action: PayloadAction<string | null>) {
      state.cameraRatio = action.payload
    },
    setCameraTimeout(state, action: PayloadAction<number>) {
      state.cameraTimeout = action.payload
    },
    setScannerAuto(state, action: PayloadAction<boolean>) {
      state.scannerAuto = action.payload
    },
    setScannerDevice(state, action: PayloadAction<ScannerDevice | null>) {
      state.scannerDevice = action.payload
    },
    setScannerMode(state, action: PayloadAction<'bluetooth' | 'camera' | 'off'>) {
      state.scannerMode = action.payload
    },
    setScannerTypes(state, action: PayloadAction<BarcodeType[]>) {
      state.scannerTypes = action.payload
    },
    setSound(state, action: PayloadAction<boolean>) {
      state.sound = action.payload
    },
    setVibrate(state, action: PayloadAction<boolean>) {
      state.vibrate = action.payload
    },
    setDistribute(state, action: PayloadAction<number>) {
      state.distribute = action.payload
    },
    setHistory(state, action: PayloadAction<boolean>) {
      state.history = action.payload
    },
    setLongPress(state, action: PayloadAction<boolean>) {
      state.longPress = action.payload
    },
    setMerge(state, action: PayloadAction<string>) {
      state.merge = action.payload
    },
    setReprice(state, action: PayloadAction<string>) {
      state.reprice = action.payload
    },
    setRestock(state, action: PayloadAction<string>) {
      state.restock = action.payload
    },
    setTransfer(state, action: PayloadAction<string>) {
      state.transfer = action.payload
    },
    setDebug(state, action: PayloadAction<boolean>) {
      state.debug = action.payload
    },
    setKeepAwake(state, action: PayloadAction<boolean>) {
      state.keepAwake = action.payload
    }
  }
})

export const settingsActions = slice.actions

export default slice.reducer
