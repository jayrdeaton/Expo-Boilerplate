import { render } from '@testing-library/react-native'
import React from 'react'

import { Footer, Providers } from '../'

describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />, { wrapper: Providers })
  })
})
