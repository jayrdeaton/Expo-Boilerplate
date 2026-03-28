import { render } from '@testing-library/react-native'
import React from 'react'

import { PinchableImage, Providers } from '../'

describe('PinchableImage', () => {
  it('renders without crashing', () => {
    render(<PinchableImage image='https://example.com/image.png' />, { wrapper: Providers })
  })
})
