import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type SettingsState = {
  debug: boolean
  soundEnabled: boolean
}

export const defaultSettingsState: SettingsState = {
  debug: false,
  soundEnabled: true
}

const slice = createSlice({
  name: 'settings',
  initialState: defaultSettingsState,
  reducers: {
    setDebug: (state, action: PayloadAction<boolean>) => ({ ...state, debug: action.payload }),
    setSoundEnabled: (state, action: PayloadAction<boolean>) => ({ ...state, soundEnabled: action.payload }),
    resetSettings: () => defaultSettingsState
  }
})

export const settingsActions = slice.actions
export default slice.reducer
