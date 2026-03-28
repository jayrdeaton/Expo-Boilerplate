import { render } from '@testing-library/react-native'
import React from 'react'

import { HeaderLockButton, Providers } from '../'

describe('HeaderLockButton', () => {
  it('renders without crashing', () => {
    render(<HeaderLockButton />, { wrapper: Providers })
  })
})
