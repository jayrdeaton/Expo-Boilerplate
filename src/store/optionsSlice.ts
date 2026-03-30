import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type OptionsState = Record<string, object>

const initialState: OptionsState = {}

const slice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<OptionsState>) => ({ ...state, ...action.payload }),
    setOptions: (state, action: PayloadAction<OptionsState>) => ({ ...state, ...action.payload })
  }
})

export const optionsActions = slice.actions

export default slice.reducer
