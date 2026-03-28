import { renderHook } from '@testing-library/react-native'

import { useKeyboard } from '../'

describe('useKeyboard', () => {
  it('returns height shared value', () => {
    const { result } = renderHook(() => useKeyboard())
    expect(result.current).toHaveProperty('height')
  })
})
