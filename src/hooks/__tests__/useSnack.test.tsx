import { act, renderHook } from '@testing-library/react-native'

import { Providers } from '../../components'
import { useSnack } from '../'

describe('useSnack', () => {
  it('returns snack methods and state', () => {
    const { result } = renderHook(() => useSnack(), { wrapper: Providers })
    expect(result.current).toHaveProperty('snack')
    expect(result.current).toHaveProperty('clear')
    expect(result.current).toHaveProperty('setSnack')
    expect(result.current).toHaveProperty('error')
    expect(result.current).toHaveProperty('info')
    expect(result.current).toHaveProperty('success')
    expect(result.current).toHaveProperty('warning')
    act(() => {
      result.current.error('error')
      result.current.info('info')
      result.current.success('success')
      result.current.warning('warning')
      result.current.clear()
    })
  })
})
