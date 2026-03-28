import { render } from '@testing-library/react-native'
import React from 'react'

import { ListModePicker, Providers } from '../'

describe('ListModePicker', () => {
  it('renders without crashing', () => {
    render(<ListModePicker collection='products' />, { wrapper: Providers })
  })
})
