import { act, renderHook } from '@testing-library/react-native'

import { useThrottle } from '../'

describe('useThrottle', () => {
  it('returns a throttle function', async () => {
    const { result } = renderHook(() => useThrottle())
    expect(result.current).toBeDefined()
    expect(typeof result.current).toBe('function')
  })
  it('throttles repeated calls within the delay', () => {
    jest.useFakeTimers()
    const spy = jest.fn()
    const { result } = renderHook(() => useThrottle())
    act(() => {
      result.current(spy, 1000)
      result.current(spy, 1000)
      result.current(spy, 1000)
    })
    expect(spy).toHaveBeenCalledTimes(1)
    act(() => {
      jest.advanceTimersByTime(1000)
      result.current(spy, 1000)
    })
    expect(spy).toHaveBeenCalledTimes(2)
    jest.useRealTimers()
  })
})
