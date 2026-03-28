import { render } from '@testing-library/react-native'
import React from 'react'

import { Header, Providers } from '../'

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header title='Test' />, { wrapper: Providers })
  })
})
