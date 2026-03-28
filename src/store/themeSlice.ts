import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { defaults } from '../constants'

export type ThemeAppearance = 'system' | 'light' | 'dark'

export type ThemeState = {
  appearance: ThemeAppearance
  color: string
}

const initialState: ThemeState = {
  appearance: 'system',
  color: defaults.color
}

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    initialize(state, action: PayloadAction<Partial<ThemeState>>) {
      return { ...state, ...action.payload }
    },
    setAppearance(state, action: PayloadAction<'system' | 'light' | 'dark'>) {
      state.appearance = action.payload
    },
    setColor(state, action: PayloadAction<string>) {
      state.color = action.payload
    }
  }
})

export const themeActions = slice.actions

export default slice.reducer
