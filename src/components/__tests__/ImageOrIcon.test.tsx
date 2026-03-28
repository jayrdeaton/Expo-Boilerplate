import { render } from '@testing-library/react-native'
import React from 'react'

import { ImageOrIcon, Providers } from '../'

describe('ImageOrIcon', () => {
  it('renders with icon', () => {
    render(<ImageOrIcon icon='cog' />, { wrapper: Providers })
  })
  it('renders with image', () => {
    render(<ImageOrIcon icon='cog' image='https://example.com/image.png' />, { wrapper: Providers })
  })
})
