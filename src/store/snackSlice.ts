import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Snack } from '../components'

export type SnackState = {
  snack?: Snack
}

const initialState: SnackState = {
  snack: undefined
}

const slice = createSlice({
  name: 'snack',
  initialState,
  reducers: {
    setSnack(state, action: PayloadAction<Snack | undefined>) {
      state.snack = action.payload
    }
  }
})

export const snackActions = slice.actions

export default slice.reducer
