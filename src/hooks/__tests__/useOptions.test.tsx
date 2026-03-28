import { act, renderHook, waitFor } from '@testing-library/react-native'

import { Providers } from '../../components'
import { useOptions } from '../'

describe('useOptions', () => {
  it('returns options and set', () => {
    const { result } = renderHook(() => useOptions('testScreen'), { wrapper: Providers })
    expect(result.current).toHaveProperty('setOptions')
  })
  it('set updates local state and Redux', async () => {
    type Opts = { foo?: number; bar?: string }
    const { result } = renderHook(() => useOptions<Opts>('screen-1'), { wrapper: Providers })
    act(() => {
      result.current.setOptions({ foo: 42 })
    })
    await waitFor(() => {
      expect(result.current.foo).toBe(42)
    })
  })
})
