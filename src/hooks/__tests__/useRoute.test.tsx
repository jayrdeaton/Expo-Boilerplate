import { act, renderHook, waitFor } from '@testing-library/react-native'

import { Providers } from '../../components'
import store from '../../store'
import { useRoute } from '../'

describe('useRoute', () => {
  it('returns route methods and state', () => {
    const { result } = renderHook(() => useRoute(), { wrapper: Providers })
    expect(result.current).toHaveProperty('name')
    expect(result.current).toHaveProperty('setName')
  })
  it('setName updates Redux', async () => {
    const { result } = renderHook(() => useRoute(), { wrapper: Providers })
    act(() => result.current.setName('home'))
    await waitFor(() => {
      expect(store.getState().route.name).toBe('home')
    })
  })
})
