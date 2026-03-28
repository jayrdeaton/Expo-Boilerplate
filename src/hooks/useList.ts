import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Filter, Sort } from '../models'
import { listActions, RootState } from '../store'

const defaultSort = (collection: string): Sort => {
  switch (collection) {
    default:
      return new Sort({ title: 1 })
  }
}

const isEqual = (a: unknown, b: unknown) => {
  try {
    return JSON.stringify(a) === JSON.stringify(b)
  } catch {
    return false
  }
}

const selector = (state: RootState) => state.list

export const useList = (collection?: string, params?: Filter) => {
  const list = useSelector(selector)
  const dispatch = useDispatch()
  const [filter, setFilter] = useState<Filter>(list.filters[collection] || new Filter())
  const [search, setSearch] = useState<string>(params?.search || '')
  const prevParamsSearchRef = useRef(params?.search)
  // Update search only when params.search changes (not when user manually changes search)
  useEffect(() => {
    if (params?.search !== undefined && params?.search !== prevParamsSearchRef.current) {
      // Only apply the incoming param if it actually differs from current search
      if (params.search !== search) setSearch(params.search)
      prevParamsSearchRef.current = params.search
    }
  }, [params?.search, search])
  const [sort, setSort] = useState<Sort>(list.sorts[collection] || defaultSort(collection))
  const hash = useMemo(() => `filter=${Filter.prepare(filter, params, { search })}&sort=${Sort.prepare(sort)}`, [filter, params, search, sort])
  const updateFilter = useCallback(
    (value: Filter) => {
      if (!collection) throw new Error('useList missing collection')
      if (isEqual(value, list.filters[collection])) return
      const _filter = new Filter(value)
      delete _filter.search
      setFilter(_filter)
      const _filters = Object.assign({}, list.filters)
      _filters[collection] = _filter
      dispatch(listActions.setFilters(_filters))
    },
    [collection, dispatch, list.filters]
  )
  const updateSearch = useCallback(
    (value: string) => {
      if (!collection) throw new Error('useList missing collection')
      if (search === value) return
      // Reset the ref when search is manually cleared so params can be applied again
      if (value === '') {
        prevParamsSearchRef.current = undefined
      }
      setSearch(value)
    },
    [collection, search]
  )
  const updateSort = useCallback(
    (value: Sort) => {
      if (!collection) throw new Error('useList missing collection')
      if (isEqual(value, list.sorts[collection])) return
      const _sort = new Sort(value)
      setSort(_sort)
      const _sorts = Object.assign({}, list.sorts)
      // Store a plain object in Redux (avoid serializing class instances)
      _sorts[collection] = { ..._sort }
      dispatch(listActions.setSorts(_sorts))
    },
    [collection, dispatch, list.sorts]
  )
  return { filter, setFilter: updateFilter, hash, search, setSearch: updateSearch, sort, setSort: updateSort }
}
