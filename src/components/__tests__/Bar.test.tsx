import { render } from '@testing-library/react-native'
import React from 'react'

import { Bar } from '../'

describe('Bar', () => {
  it('renders with title and caption', () => {
    render(
      <Bar title='Title' caption='Caption'>
        Child
      </Bar>
    )
  })
  it('renders without children', () => {
    render(<Bar title='Title' />)
  })
})
