import { renderHook } from '@testing-library/react-native'

import { Providers } from '../../components'
import { useLinking } from '../'

describe('useLinking', () => {
  it('does not throw on mount', () => {
    expect(() => renderHook(() => useLinking(), { wrapper: Providers })).not.toThrow()
  })
})
