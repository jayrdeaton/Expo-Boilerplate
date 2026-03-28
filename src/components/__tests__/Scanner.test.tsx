import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, Scanner } from '../'

describe('Scanner', () => {
  it('renders without crashing', () => {
    render(
      <Scanner onScan={() => {}}>
        <></>
      </Scanner>,
      { wrapper: Providers }
    )
  })
})
