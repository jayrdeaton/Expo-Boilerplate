import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SettingsState = {
  // theme
  blur: boolean
  headerLock: boolean
  footerLock: boolean
  // feedback
  sound: boolean
  vibrate: boolean
  // advanced
  debug: boolean
  keepAwake: boolean
}

const initialState: SettingsState = {
  // theme
  blur: true,
  headerLock: false,
  footerLock: false,
  // feedback
  sound: false,
  vibrate: false,
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
    setBlur: (state, action: PayloadAction<boolean>) => ({ ...state, blur: action.payload }),
    setHeaderLock: (state, action: PayloadAction<boolean>) => ({ ...state, headerLock: action.payload }),
    setFooterLock: (state, action: PayloadAction<boolean>) => ({ ...state, footerLock: action.payload }),
    setSound: (state, action: PayloadAction<boolean>) => ({ ...state, sound: action.payload }),
    setVibrate: (state, action: PayloadAction<boolean>) => ({ ...state, vibrate: action.payload }),
    setDebug: (state, action: PayloadAction<boolean>) => ({ ...state, debug: action.payload }),
    setKeepAwake: (state, action: PayloadAction<boolean>) => ({ ...state, keepAwake: action.payload })
  }
})

export const settingsActions = slice.actions

export default slice.reducer
