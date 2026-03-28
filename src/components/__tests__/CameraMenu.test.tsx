import { render } from '@testing-library/react-native'
import React from 'react'

import { CameraMenu, Providers } from '../'

describe('CameraMenu', () => {
  it('renders without crashing', () => {
    render(<CameraMenu />, { wrapper: Providers })
  })
})
