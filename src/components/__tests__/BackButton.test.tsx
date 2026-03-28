import { render } from '@testing-library/react-native'
import React from 'react'

import { BackButton, Providers } from '../'

describe('BackButton', () => {
  it('renders without crashing', () => {
    render(<BackButton />, { wrapper: Providers })
  })
})
