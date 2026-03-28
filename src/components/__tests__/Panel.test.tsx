import { render } from '@testing-library/react-native'
import React from 'react'

import { Panel, Providers } from '../'

describe('Panel', () => {
  it('renders without crashing', () => {
    render(
      <Panel>
        <></>
      </Panel>,
      { wrapper: Providers }
    )
  })
})
