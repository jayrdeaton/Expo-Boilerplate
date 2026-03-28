import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, SwipeableModal } from '../'

describe('SwipeableModal', () => {
  it('renders without crashing', () => {
    render(
      <SwipeableModal onClose={() => {}} visible={false}>
        <></>
      </SwipeableModal>,
      { wrapper: Providers }
    )
  })
})
