import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, TextInput } from '../'

describe('TextInput', () => {
  it('renders without crashing', () => {
    render(<TextInput value='' onChangeText={() => {}} />, { wrapper: Providers })
  })
})
