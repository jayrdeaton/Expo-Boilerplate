import { act, renderHook } from '@testing-library/react-native'

import { Providers } from '../../components'
import { useList } from '..'

describe('useList', () => {
  it('returns list methods and state', () => {
    const { result } = renderHook(() => useList('test'), { wrapper: Providers })
    expect(result.current).toHaveProperty('filter')
    expect(result.current).toHaveProperty('setFilter')
    expect(result.current).toHaveProperty('sort')
    expect(result.current).toHaveProperty('setSort')
    expect(result.current).toHaveProperty('search')
    expect(result.current).toHaveProperty('setSearch')
    expect(result.current).toHaveProperty('hash')
  })
  it('updates hash when filter/search/sort change', () => {
    const { result } = renderHook(() => useList('products'), { wrapper: Providers })
    const before = result.current.hash
    act(() => {
      result.current.setSearch('abc')
    })
    const after = result.current.hash
    expect(after).not.toEqual(before)
  })
})
