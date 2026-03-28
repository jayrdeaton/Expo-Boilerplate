import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { Generic } from '../types'

export type SearchState = {
  query: string
  results: Generic[]
  includeProducts: boolean
  includeUnits: boolean
  includeContainers: boolean
  includeCatalogs: boolean
}

const initialState: SearchState = {
  query: '',
  results: [],
  includeProducts: true,
  includeUnits: true,
  includeContainers: true,
  includeCatalogs: true
}

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    initialize(state, action: PayloadAction<Partial<SearchState>>) {
      return { ...state, ...action.payload }
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload
    },
    setResults(state, action: PayloadAction<Generic[]>) {
      state.results = action.payload
    },
    clearResults(state) {
      state.results = []
    },
    setIncludeProducts(state, action: PayloadAction<boolean>) {
      state.includeProducts = action.payload
    },
    setIncludeUnits(state, action: PayloadAction<boolean>) {
      state.includeUnits = action.payload
    },
    setIncludeContainers(state, action: PayloadAction<boolean>) {
      state.includeContainers = action.payload
    },
    setIncludeCatalogs(state, action: PayloadAction<boolean>) {
      state.includeCatalogs = action.payload
    }
  }
})

export const searchActions = slice.actions

export default slice.reducer
