import { render } from '@testing-library/react-native'
import React from 'react'

import { MenuItem, Providers } from '../'

describe('MenuItem', () => {
  it('renders without crashing', () => {
    render(<MenuItem title='Test' />, { wrapper: Providers })
  })
})
