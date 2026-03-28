import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, ScrollView } from '../'

describe('ScrollView', () => {
  it('renders without crashing', () => {
    render(
      <ScrollView>
        <></>
      </ScrollView>,
      { wrapper: Providers }
    )
  })
})
