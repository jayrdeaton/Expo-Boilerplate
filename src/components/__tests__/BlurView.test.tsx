import { render } from '@testing-library/react-native'
import React from 'react'

import { BlurView, Providers } from '../'

describe('BlurView', () => {
  it('renders without crashing', async () => {
    render(<BlurView />, { wrapper: Providers })
  })
})
