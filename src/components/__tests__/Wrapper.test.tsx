import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, Wrapper } from '../'

describe('Wrapper', () => {
  it('renders without crashing', () => {
    render(
      <Wrapper>
        <></>
      </Wrapper>,
      { wrapper: Providers }
    )
  })
})
