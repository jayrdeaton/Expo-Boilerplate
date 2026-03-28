import { render } from '@testing-library/react-native'
import React from 'react'

import { DebugPanel, Providers } from '../'

describe('DebugPanel', () => {
  it('renders without crashing', () => {
    render(<DebugPanel />, { wrapper: Providers })
  })
})
