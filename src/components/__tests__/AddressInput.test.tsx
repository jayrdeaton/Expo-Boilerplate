import { render } from '@testing-library/react-native'
import React from 'react'

import { AddressInput } from '../'

describe('AddressInput', () => {
  it('renders correctly', () => {
    render(<AddressInput onChange={() => {}} />)
  })
})
