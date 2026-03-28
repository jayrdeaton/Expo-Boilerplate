import { render } from '@testing-library/react-native'
import React from 'react'

import { FAB, Providers } from '../'

describe('FAB', () => {
  it('renders without crashing', () => {
    render(<FAB icon='plus' />, { wrapper: Providers })
  })
})
