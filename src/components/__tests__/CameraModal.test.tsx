import { render } from '@testing-library/react-native'
import React from 'react'

import { CameraModal, Providers } from '../'

describe('CameraModal', () => {
  it('renders without crashing', () => {
    render(<CameraModal visible={false} onClose={() => {}} onChange={() => {}} />, { wrapper: Providers })
  })
})
