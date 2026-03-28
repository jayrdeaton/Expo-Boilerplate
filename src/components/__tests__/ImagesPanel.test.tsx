import { render } from '@testing-library/react-native'
import React from 'react'

import { ImagesPanel, Providers } from '../'

describe('ImagesPanel', () => {
  it('renders without crashing', () => {
    render(<ImagesPanel title='test' />, { wrapper: Providers })
  })
})
