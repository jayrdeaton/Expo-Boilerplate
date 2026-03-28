import { render } from '@testing-library/react-native'
import React from 'react'

import { PaginateButton, Providers } from '../'

describe('PaginateButton', () => {
  it('renders without crashing', () => {
    render(<PaginateButton />, { wrapper: Providers })
  })
})
