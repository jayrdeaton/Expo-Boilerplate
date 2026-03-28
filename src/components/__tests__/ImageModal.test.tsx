import { render } from '@testing-library/react-native'
import React from 'react'

import { ImageModal, Providers } from '../'

describe('ImageModal', () => {
  it('renders without crashing', () => {
    render(<ImageModal visible={false} image='test.png' onDismiss={() => {}} />, { wrapper: Providers })
  })
})
