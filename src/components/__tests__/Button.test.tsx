import { render } from '@testing-library/react-native'
import React from 'react'

import { Button, Providers } from '../'

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button>Test</Button>, { wrapper: Providers })
  })
})
