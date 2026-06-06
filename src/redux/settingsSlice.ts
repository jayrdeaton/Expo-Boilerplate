import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SettingsState = {
  blur: boolean
  vibrate: boolean
  debug: boolean
}

const initialState: SettingsState = {
  blur: true,
  vibrate: true,
  debug: false
}

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setBlur: (state, action: PayloadAction<boolean>) => ({ ...state, blur: action.payload }),
    setVibrate: (state, action: PayloadAction<boolean>) => ({ ...state, vibrate: action.payload }),
    setDebug: (state, action: PayloadAction<boolean>) => ({ ...state, debug: action.payload }),
    resetSettings: () => initialState
  }
})

export const settingsActions = slice.actions

export default slice.reducer
