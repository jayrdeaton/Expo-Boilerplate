import { render } from '@testing-library/react-native'
import React from 'react'

import { ImagePickButton, Providers } from '../'

describe('ImagePickButton', () => {
  it('renders without crashing', () => {
    render(<ImagePickButton onChange={() => {}} />, { wrapper: Providers })
  })
})
