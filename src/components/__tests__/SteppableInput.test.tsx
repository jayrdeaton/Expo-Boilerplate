import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, SteppableInput } from '../'

describe('SteppableInput', () => {
  it('renders without crashing', () => {
    render(<SteppableInput max={10} min={0} onChangeText={() => {}} value={5} />, { wrapper: Providers })
  })
})
