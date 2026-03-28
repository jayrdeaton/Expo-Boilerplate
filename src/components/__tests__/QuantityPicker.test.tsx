import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, QuantityPicker } from '../'

describe('QuantityPicker', () => {
  it('renders without crashing', () => {
    render(<QuantityPicker onChange={() => {}} value={{}} />, { wrapper: Providers })
  })
})
