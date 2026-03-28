import { render } from '@testing-library/react-native'
import React from 'react'

import { ActivityIndicator, Providers } from '../'

describe('ActivityIndicator', () => {
  it('renders correctly', () => {
    render(<ActivityIndicator />, { wrapper: Providers })
  })
})
