import { render } from '@testing-library/react-native'
import React from 'react'

import { Bounds } from '../'

describe('Bounds', () => {
  it('renders without crashing', () => {
    render(<Bounds color='red' />)
  })
})
