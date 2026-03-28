import { render } from '@testing-library/react-native'
import React from 'react'

import { Line, Providers } from '../'

describe('Line', () => {
  it('renders without crashing', () => {
    render(<Line />, { wrapper: Providers })
  })
})
