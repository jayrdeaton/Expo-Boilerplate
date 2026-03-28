import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, Timer } from '../'

describe('Timer', () => {
  it('renders without crashing', () => {
    render(
      <Timer duration={1} radius={20} started={null} onStart={() => {}} onStop={() => {}}>
        <></>
      </Timer>,
      { wrapper: Providers }
    )
  })
})
