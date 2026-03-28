import { render } from '@testing-library/react-native'
import React from 'react'

import { LogoButton, Providers } from '../'

describe('LogoButton', () => {
  it('renders without crashing', () => {
    render(<LogoButton />, { wrapper: Providers })
  })
})
