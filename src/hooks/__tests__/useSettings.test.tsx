import { renderHook } from '@testing-library/react-native'

import { Providers } from '../../components'
import { useSettings } from '../'

describe('useSettings', () => {
  it('returns settings methods and state', () => {
    const { result } = renderHook(() => useSettings(), { wrapper: Providers })
    // theme
    expect(result.current).toHaveProperty('blur')
    expect(result.current).toHaveProperty('footerLock')
    expect(result.current).toHaveProperty('headerLock')
    // feedback
    expect(result.current).toHaveProperty('sound')
    expect(result.current).toHaveProperty('vibrate')
    // advanced
    expect(result.current).toHaveProperty('debug')
    expect(result.current).toHaveProperty('keepAwake')
  })
})
