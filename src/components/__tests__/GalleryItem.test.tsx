import { render } from '@testing-library/react-native'
import React from 'react'

import { GalleryItem, Providers } from '../'

describe('GalleryItem', () => {
  it('renders without crashing', () => {
    render(<GalleryItem item={{}} icon='test' />, { wrapper: Providers })
  })
})
