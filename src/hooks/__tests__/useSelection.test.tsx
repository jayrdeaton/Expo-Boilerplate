import { act, renderHook, waitFor } from '@testing-library/react-native'

import { Providers } from '../../components'
import store from '../../store'
import { useSelection } from '../'

describe('useSelection', () => {
  it('returns selection methods and state', () => {
    const { result } = renderHook(() => useSelection(), { wrapper: Providers })
    expect(result.current).toHaveProperty('containerId')
    expect(result.current).toHaveProperty('setContainerId')
  })
  it('setContainerId writes string, null, and removes when undefined', async () => {
    const { result } = renderHook(() => useSelection(), { wrapper: Providers })
    act(() => result.current.setContainerId('abc'))
    await waitFor(() => expect(store.getState().selection.containerId).toBe('abc'))

    act(() => result.current.setContainerId(null))
    await waitFor(() => {
      expect(store.getState().selection.containerId).toBeNull()
    })

    act(() => result.current.setContainerId(undefined as unknown as string))
    await waitFor(() => {
      expect(store.getState().selection.containerId).toBeUndefined()
    })
  })
})
