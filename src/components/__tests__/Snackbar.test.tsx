import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, Snackbar } from '../'

describe('Snackbar', () => {
  it('renders without crashing', () => {
    render(<Snackbar />, { wrapper: Providers })
  })
})
