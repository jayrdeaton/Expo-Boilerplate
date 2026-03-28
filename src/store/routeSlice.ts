import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    initialize: (state, action: PayloadAction<Partial<RouteState>>) => ({ ...state, ...action.payload }),
    setName: (state, action: PayloadAction<string>) => ({ ...state, name: action.payload })
  }
})

export const routeActions = slice.actions

export default slice.reducer
