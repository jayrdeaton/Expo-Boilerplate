import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, Surface } from '../'

describe('Surface', () => {
  it('renders without crashing', () => {
    render(
      <Surface>
        <></>
      </Surface>,
      { wrapper: Providers }
    )
  })
})
