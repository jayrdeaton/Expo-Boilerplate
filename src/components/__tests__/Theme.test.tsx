import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, Theme } from '../'

describe('Theme', () => {
  it('renders children', () => {
    render(
      <Theme>
        <></>
      </Theme>,
      { wrapper: Providers }
    )
  })
})
