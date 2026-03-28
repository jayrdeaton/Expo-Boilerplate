import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { ListFilters, ListSearches, ListSorts } from '../types'

export type ListState = {
  filters: ListFilters
  searches: ListSearches
  sorts: ListSorts
}

const initialState: ListState = {
  filters: {} as ListFilters,
  searches: {} as ListSearches,
  sorts: {} as ListSorts
}

const slice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    initialize(state, action: PayloadAction<Partial<ListState>>) {
      return { ...state, ...action.payload }
    },
    setFilters(state, action: PayloadAction<ListFilters>) {
      state.filters = action.payload
    },
    setSearches(state, action: PayloadAction<ListSearches>) {
      state.searches = action.payload
    },
    setSorts(state, action: PayloadAction<ListSorts>) {
      state.sorts = action.payload
    }
  }
})

export const listActions = slice.actions

export default slice.reducer
