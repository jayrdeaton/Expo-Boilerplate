import { render } from '@testing-library/react-native'
import React from 'react'

import { Divider } from '../'

describe('Divider', () => {
  it('renders without crashing', () => {
    render(<Divider />)
  })
})
