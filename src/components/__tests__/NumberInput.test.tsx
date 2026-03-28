import { render } from '@testing-library/react-native'
import React from 'react'

import { NumberInput, Providers } from '../'

describe('NumberInput', () => {
  it('renders without crashing', () => {
    render(<NumberInput value={0} onChangeNumber={() => {}} />, { wrapper: Providers })
  })
})
