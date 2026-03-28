import { render } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'

import { Providers, Touchable } from '../'

describe('Touchable', () => {
  it('renders without crashing', () => {
    render(
      <Touchable>
        <Text>Test</Text>
      </Touchable>,
      { wrapper: Providers }
    )
  })
})
