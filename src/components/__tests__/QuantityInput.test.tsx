import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, QuantityInput } from '../'

describe('QuantityInput', () => {
  it('renders without crashing', () => {
    render(<QuantityInput color='black' value='0' onChangeText={() => {}} />, { wrapper: Providers })
  })
})
