import { render } from '@testing-library/react-native'
import React from 'react'

import { Logo, Providers } from '../'

describe('Logo', () => {
  it('renders without crashing', () => {
    render(<Logo />, { wrapper: Providers })
  })
})
