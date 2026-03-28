import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, WrappingRow } from '../'

describe('WrappingRow', () => {
  it('renders without crashing', () => {
    render(
      <WrappingRow>
        <></>
      </WrappingRow>,
      { wrapper: Providers }
    )
  })
})
