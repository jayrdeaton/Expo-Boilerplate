import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type SettingsState = {
  debug: boolean
}

export const defaultSettingsState: SettingsState = {
  debug: false
}

const slice = createSlice({
  name: 'settings',
  initialState: defaultSettingsState,
  reducers: {
    setDebug: (state, action: PayloadAction<boolean>) => ({ ...state, debug: action.payload }),
    resetSettings: () => defaultSettingsState
  }
})

export const settingsActions = slice.actions
export default slice.reducer
