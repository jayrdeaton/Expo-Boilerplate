import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, TouchableRipple } from '../'

describe('TouchableRipple', () => {
  it('renders without crashing', () => {
    render(
      <TouchableRipple>
        <></>
      </TouchableRipple>,
      { wrapper: Providers }
    )
  })
})
