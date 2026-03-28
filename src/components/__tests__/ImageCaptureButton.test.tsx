import { render } from '@testing-library/react-native'
import React from 'react'

import { ImageCaptureButton, Providers } from '../'

describe('ImageCaptureButton', () => {
  it('renders without crashing', () => {
    render(<ImageCaptureButton onChange={() => {}} />, { wrapper: Providers })
  })
})
