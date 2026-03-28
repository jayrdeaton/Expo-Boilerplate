import { render } from '@testing-library/react-native'
import React from 'react'

import { Paginator, Providers } from '../'

describe('Paginator', () => {
  it('renders without crashing', () => {
    render(<Paginator collection='products' icon='test' id='test_id' onChange={() => {}} />, { wrapper: Providers })
  })
})
