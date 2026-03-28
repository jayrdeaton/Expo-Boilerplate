import { render } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'

import { CollapsibleSurface, Providers } from '../'

describe('CollapsibleSurface', () => {
  it('renders without crashing', () => {
    render(
      <CollapsibleSurface icon='test' onPress={() => {}} title='Test' visible={false}>
        <Text>Content</Text>
      </CollapsibleSurface>,
      { wrapper: Providers }
    )
  })
})
