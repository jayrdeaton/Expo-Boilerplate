import { render } from '@testing-library/react-native'
import React from 'react'

import { ImagesInput, Providers } from '../'

describe('ImagesInput', () => {
  it('renders without crashing', () => {
    render(<ImagesInput value={[]} onChange={() => {}} />, { wrapper: Providers })
  })
})
