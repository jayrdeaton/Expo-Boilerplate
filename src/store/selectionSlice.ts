import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SelectionState = {
  containerId: string | null
}

const initialState: SelectionState = {
  containerId: null
}

const slice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    initialize(state, action: PayloadAction<Partial<SelectionState>>) {
      return { ...state, ...action.payload }
    },
    setContainerId(state, action: PayloadAction<string | null | undefined>) {
      state.containerId = action.payload
    }
  }
})

export const selectionActions = slice.actions

export default slice.reducer
