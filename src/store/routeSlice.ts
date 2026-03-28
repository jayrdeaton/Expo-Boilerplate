import { createSlice } from '@reduxjs/toolkit'

export type RouteState = {
  name: string | null
}

const initialState: RouteState = {
  name: 'settings'
}

const slice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    initialize(state, action: { payload: Partial<RouteState> }) {
      return { ...state, ...action.payload }
    },
    setName(state, action: { payload: string }) {
      state.name = action.payload
    }
  }
})

export const routeActions = slice.actions

export default slice.reducer
