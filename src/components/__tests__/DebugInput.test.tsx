import { render } from '@testing-library/react-native'
import React from 'react'

import { DebugInput, Providers } from '../'

describe('DebugInput', () => {
  it('renders without crashing', () => {
    render(<DebugInput />, { wrapper: Providers })
  })
})
