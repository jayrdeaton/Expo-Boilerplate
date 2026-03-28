import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, TextPanel } from '../'

describe('TextPanel', () => {
  it('renders without crashing', () => {
    render(<TextPanel caption='Caption' text='Text' />, { wrapper: Providers })
  })
})
