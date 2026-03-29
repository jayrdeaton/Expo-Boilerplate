import { renderHook } from '@testing-library/react-native'

import { Providers } from '../../components'
import { useSettings } from '../'

describe('useSettings', () => {
  it('returns settings methods and state', () => {
    const { result } = renderHook(() => useSettings(), { wrapper: Providers })
    expect(result.current).toHaveProperty('headerLock')
    expect(result.current).toHaveProperty('imageMode')
    expect(result.current).toHaveProperty('paginate')
    expect(result.current).toHaveProperty('search')
    expect(result.current).toHaveProperty('debug')
    expect(result.current).toHaveProperty('keepAwake')
  })
})
