import { renderHook } from '@testing-library/react-native'

import { Providers } from '../../components'
import { useTheme } from '../'

describe('useTheme', () => {
  it('returns theme methods and state', async () => {
    const { result } = renderHook(() => useTheme(), { wrapper: Providers })
    expect(result.current).toHaveProperty('theme')
    expect(result.current).toHaveProperty('appearance')
    expect(result.current).toHaveProperty('setAppearance')
    expect(result.current).toHaveProperty('color')
    expect(result.current).toHaveProperty('setColor')
  })
})
