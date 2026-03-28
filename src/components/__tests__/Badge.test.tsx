import { render } from '@testing-library/react-native'
import React from 'react'

import { Badge } from '../'

describe('Badge', () => {
  it('renders without crashing with a number as value', () => {
    render(<Badge style={{}}>{0}</Badge>)
  })
  it('renders without crashing with a string as value', () => {
    render(<Badge style={{}}>{'0'}</Badge>)
  })
})
