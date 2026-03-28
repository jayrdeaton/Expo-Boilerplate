import { render } from '@testing-library/react-native'
import React from 'react'

import { ListMenu, Providers } from '../'

describe('ListMenu', () => {
  it('renders without crashing', () => {
    render(<ListMenu collection='products' />, { wrapper: Providers })
  })
})
