import { render } from '@testing-library/react-native'
import React from 'react'

import { Overlay, Providers } from '../'

describe('Overlay', () => {
  it('renders without crashing', () => {
    render(
      <Overlay opacity={0.5}>
        <></>
      </Overlay>,
      { wrapper: Providers }
    )
  })
})
