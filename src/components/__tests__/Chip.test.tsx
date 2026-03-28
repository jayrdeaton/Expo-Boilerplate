import { render } from '@testing-library/react-native'
import React from 'react'

import { Chip, Providers } from '../'

describe('Chip', () => {
  it('renders without crashing', () => {
    render(<Chip>Test Chip</Chip>, { wrapper: Providers })
  })
})
